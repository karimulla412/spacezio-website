const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const db = require('./db');
const {
  sendContactNotification,
  sendSiteVisitNotification,
  sendNewsletterWelcome,
  sendLeadMagnetEmail
} = require('./emailService');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*',
}));
app.use(express.json());

// Routes
const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.json({ message: 'Hello World from Node.js Backend' });
});

// Status Checks
apiRouter.post('/status', async (req, res) => {
  try {
    const { client_name } = req.body;
    const result = await db.query(
      'INSERT INTO status_checks (client_name) VALUES ($1) RETURNING *',
      [client_name]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

apiRouter.get('/status', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM status_checks ORDER BY timestamp DESC LIMIT 1000');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Contact Form
apiRouter.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, company, service, message } = req.body;
    const result = await db.query(
      `INSERT INTO contact_submissions (name, email, phone, company, service, message)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, email, phone, company, service, message]
    );
    
    // Async notification
    sendContactNotification(req.body).catch(console.error);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

apiRouter.get('/contact-submissions', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM contact_submissions ORDER BY timestamp DESC LIMIT 100');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Site Visit
apiRouter.post('/site-visit', async (req, res) => {
  try {
    const { name, phone, email, plotLocation, plotSize, packageInterest, preferredDate, preferredTime, message } = req.body;
    const result = await db.query(
      `INSERT INTO site_visit_bookings (name, phone, email, "plotLocation", "plotSize", "packageInterest", "preferredDate", "preferredTime", message)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [name, phone, email, plotLocation, plotSize, packageInterest, preferredDate, preferredTime, message]
    );
    
    sendSiteVisitNotification(req.body).catch(console.error);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

apiRouter.get('/site-visit-bookings', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM site_visit_bookings ORDER BY timestamp DESC LIMIT 100');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Newsletter
apiRouter.post('/newsletter/subscribe', async (req, res) => {
  try {
    const { email, source = 'website' } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const existing = await db.query('SELECT * FROM newsletter_subscribers WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'This email is already subscribed' });
    }

    await db.query(
      'INSERT INTO newsletter_subscribers (email, source) VALUES ($1, $2)',
      [email, source]
    );

    sendNewsletterWelcome(email).catch(console.error);

    res.json({ message: 'Successfully subscribed', email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

apiRouter.get('/newsletter/subscribers', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM newsletter_subscribers ORDER BY "subscribedAt" DESC LIMIT 100');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Chatbot Leads
apiRouter.post('/chatbot/lead', async (req, res) => {
  try {
    const { projectType, projectSize, serviceRequired, timeline, contact, source = 'chatbot' } = req.body;
    if (!contact) return res.status(400).json({ error: 'contact is required' });

    const result = await db.query(
      `INSERT INTO chatbot_leads ("projectType", "projectSize", "serviceRequired", timeline, contact, source)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [projectType, projectSize, serviceRequired, timeline, contact, source]
    );

    res.json({ message: 'Lead captured successfully', leadId: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

apiRouter.get('/chatbot/leads', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM chatbot_leads ORDER BY timestamp DESC LIMIT 100');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Lead Magnet
apiRouter.post('/lead-magnet', async (req, res) => {
  try {
    const { name, email, phone, source = 'website' } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

    await db.query(
      'INSERT INTO lead_magnets (name, email, phone, source) VALUES ($1, $2, $3, $4)',
      [name, email, phone, source]
    );

    sendLeadMagnetEmail(email, name).catch(console.error);

    res.json({ message: 'Success! Check your email for the guide.', email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

apiRouter.get('/lead-magnets', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM lead_magnets ORDER BY timestamp DESC LIMIT 100');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin Overview & Metrics
apiRouter.get('/admin/overview', async (req, res) => {
  try {
    const contacts = (await db.query('SELECT * FROM contact_submissions')).rows || [];
    const visits = (await db.query('SELECT * FROM site_visit_bookings')).rows || [];
    const subscribers = (await db.query('SELECT * FROM newsletter_subscribers')).rows || [];
    const chatbot = (await db.query('SELECT * FROM chatbot_leads')).rows || [];
    const magnets = (await db.query('SELECT * FROM lead_magnets')).rows || [];

    const totalLeads = contacts.length + visits.length + chatbot.length + magnets.length;
    
    // Calculate today's leads
    const today = new Date().toDateString();
    const isToday = (dateStr) => dateStr && new Date(dateStr).toDateString() === today;

    const todayCount = [
      ...contacts.map(c => c.timestamp),
      ...visits.map(v => v.timestamp),
      ...chatbot.map(b => b.timestamp),
      ...magnets.map(m => m.timestamp)
    ].filter(isToday).length;

    const pendingVisits = visits.filter(v => v.status === 'pending').length;

    res.json({
      totalLeads,
      todayLeads: todayCount,
      pendingVisits,
      counts: {
        contacts: contacts.length,
        siteVisits: visits.length,
        subscribers: subscribers.length,
        chatbotLeads: chatbot.length,
        leadMagnets: magnets.length,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Lead Status
apiRouter.patch('/leads/:type/:id/status', async (req, res) => {
  try {
    const { type, id } = req.params;
    const { status } = req.body;
    
    const tableMap = {
      contacts: 'contact_submissions',
      visits: 'site_visit_bookings',
      chatbot: 'chatbot_leads',
      magnets: 'lead_magnets',
      newsletter: 'newsletter_subscribers'
    };

    const tableName = tableMap[type] || type;
    const result = await db.query(
      `UPDATE ${tableName} SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );

    res.json({ success: true, updated: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete Lead
apiRouter.delete('/leads/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    
    const tableMap = {
      contacts: 'contact_submissions',
      visits: 'site_visit_bookings',
      chatbot: 'chatbot_leads',
      magnets: 'lead_magnets',
      newsletter: 'newsletter_subscribers'
    };

    const tableName = tableMap[type] || type;
    await db.query(`DELETE FROM ${tableName} WHERE id = $1`, [id]);

    res.json({ success: true, message: 'Record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Manual Lead Entry
apiRouter.post('/leads/manual', async (req, res) => {
  try {
    const { type, name, phone, email, notes, location, packageInterest } = req.body;
    
    if (type === 'visits') {
      const result = await db.query(
        `INSERT INTO site_visit_bookings (name, phone, email, "plotLocation", "plotSize", "packageInterest", "preferredDate", "preferredTime", message)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [name, phone, email || '', location || 'Visakhapatnam', 'Custom', packageInterest || 'Premium', 'To be scheduled', 'Morning', notes || 'Manual Admin Entry']
      );
      return res.json(result.rows[0]);
    }

    // Default to contact submission
    const result = await db.query(
      `INSERT INTO contact_submissions (name, email, phone, company, service, message)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, email || 'offline-lead@spacexio.com', phone, 'Direct Walk-in / Call', packageInterest || 'General Inquiry', notes || 'Manual Admin Entry']
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==================== CMS CONTENT MANAGEMENT ENDPOINTS ====================
const contentFile = path.join(__dirname, 'data', 'siteContent.json');

const getSiteContent = () => {
  try {
    if (fs.existsSync(contentFile)) {
      return JSON.parse(fs.readFileSync(contentFile, 'utf8'));
    }
  } catch (e) {
    console.error('Error reading siteContent.json:', e);
  }
  return {};
};

const saveSiteContent = (data) => {
  try {
    fs.mkdirSync(path.dirname(contentFile), { recursive: true });
    fs.writeFileSync(contentFile, JSON.stringify(data, null, 2));
    return true;
  } catch (e) {
    console.error('Error saving siteContent.json:', e);
    return false;
  }
};

// GET Site Content (public and admin)
apiRouter.get('/content', (req, res) => {
  const content = getSiteContent();
  res.json(content);
});

// UPDATE Entire Site Content or Sections
apiRouter.put('/content', (req, res) => {
  try {
    const current = getSiteContent();
    const updated = { ...current, ...req.body };
    saveSiteContent(updated);
    res.json({ success: true, message: 'Content updated successfully', content: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// ADD New Project
apiRouter.post('/content/projects', (req, res) => {
  try {
    const current = getSiteContent();
    const projects = current.projectsData || [];
    const newProject = {
      id: Date.now(),
      ...req.body
    };
    projects.unshift(newProject);
    current.projectsData = projects;
    saveSiteContent(current);
    res.json({ success: true, project: newProject, projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add project' });
  }
});

// DELETE Project
apiRouter.delete('/content/projects/:id', (req, res) => {
  try {
    const current = getSiteContent();
    const projectId = req.params.id;
    current.projectsData = (current.projectsData || []).filter(p => String(p.id) !== String(projectId));
    saveSiteContent(current);
    res.json({ success: true, message: 'Project removed', projects: current.projectsData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// ADD New Testimonial
apiRouter.post('/content/testimonials', (req, res) => {
  try {
    const current = getSiteContent();
    const testimonials = current.testimonialsData || [];
    const newTestimonial = {
      id: Date.now(),
      ...req.body
    };
    testimonials.unshift(newTestimonial);
    current.testimonialsData = testimonials;
    saveSiteContent(current);
    res.json({ success: true, testimonial: newTestimonial, testimonials });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add testimonial' });
  }
});

// DELETE Testimonial
apiRouter.delete('/content/testimonials/:id', (req, res) => {
  try {
    const current = getSiteContent();
    const testimonialId = req.params.id;
    current.testimonialsData = (current.testimonialsData || []).filter(t => String(t.id) !== String(testimonialId));
    saveSiteContent(current);
    res.json({ success: true, message: 'Testimonial removed', testimonials: current.testimonialsData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

app.use('/api', apiRouter);

// Serve static build in production
const frontendBuildPaths = [
  path.join(__dirname, '../frontend/build'),
  path.join(__dirname, 'frontend/build'),
  path.join(__dirname, '../../public_html')
];

const buildDir = frontendBuildPaths.find(p => fs.existsSync(p));
if (buildDir) {
  console.log(`Serving static files from: ${buildDir}`);
  app.use(express.static(buildDir));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(buildDir, 'index.html'));
  });
}

// Initialize DB and start server
db.initDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(err => {
  console.error("Failed to initialize database", err);
});
