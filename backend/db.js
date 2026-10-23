const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();

const dataFile = path.join(__dirname, 'data', 'leads.json');

// Initialize local JSON storage if not present
const defaultData = {
  status_checks: [],
  contact_submissions: [
    {
      id: "demo-contact-1",
      name: "Suresh Varma",
      email: "suresh.varma@example.com",
      phone: "+91 98480 12345",
      company: "Varma Infotech",
      service: "Turnkey Construction",
      message: "Looking to build a 3-floor villa (G+2) in Madhurawada, Visakhapatnam. Plot size 240 sq yards. Need quotation for Premium package.",
      status: "new",
      timestamp: new Date(Date.now() - 3600000 * 4).toISOString()
    },
    {
      id: "demo-contact-2",
      name: "Ananya Reddy",
      email: "ananya.r@example.com",
      phone: "+91 99890 54321",
      company: "",
      service: "Architectural 3D Design",
      message: "Need contemporary architectural plan and 3D elevation for our upcoming east-facing residential plot in Yendada.",
      status: "contacted",
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
    }
  ],
  site_visit_bookings: [
    {
      id: "demo-visit-1",
      name: "Ravi Kumar Patnaik",
      phone: "+91 94400 98765",
      email: "ravi.patnaik@example.com",
      plotLocation: "Sheela Nagar, Visakhapatnam",
      plotSize: "200 sq.yds",
      packageInterest: "Luxury Package (₹2,250/sqft)",
      preferredDate: "2026-10-18",
      preferredTime: "11:00 AM",
      message: "Site is cleared. Please bring engineer for soil inspection and layout feasibility.",
      status: "pending",
      timestamp: new Date(Date.now() - 3600000 * 6).toISOString()
    },
    {
      id: "demo-visit-2",
      name: "Pooja Sharma",
      phone: "+91 98765 43210",
      email: "pooja.sharma@example.com",
      plotLocation: "Rushikonda Beach Road, Vizag",
      plotSize: "300 sq.yds",
      packageInterest: "Royal Package (₹2,550/sqft)",
      preferredDate: "2026-10-20",
      preferredTime: "04:30 PM",
      message: "Planning a sea-facing duplex villa. Want to discuss floor plans and structural warranty.",
      status: "in-progress",
      timestamp: new Date(Date.now() - 3600000 * 48).toISOString()
    }
  ],
  newsletter_subscribers: [
    {
      id: "demo-sub-1",
      email: "venkat.m@gmail.com",
      source: "website-footer",
      status: "active",
      subscribedAt: new Date(Date.now() - 3600000 * 12).toISOString()
    },
    {
      id: "demo-sub-2",
      email: "priya.k@outlook.com",
      source: "blog-popup",
      status: "active",
      subscribedAt: new Date(Date.now() - 3600000 * 72).toISOString()
    }
  ],
  chatbot_leads: [
    {
      id: "demo-chat-1",
      projectType: "Independent House (G+1)",
      projectSize: "2200 sq.ft",
      serviceRequired: "Turnkey Construction",
      timeline: "Within 3 Months",
      contact: "+91 91234 56789",
      source: "chatbot",
      status: "new",
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
    }
  ],
  lead_magnets: [
    {
      id: "demo-magnet-1",
      name: "Karthik Naidu",
      email: "karthik.naidu@gmail.com",
      phone: "+91 98888 77777",
      source: "Cost Estimation Checklist PDF",
      type: "lead_magnet",
      status: "new",
      timestamp: new Date(Date.now() - 3600000 * 18).toISOString()
    }
  ]
};

const readStorage = () => {
  try {
    if (!fs.existsSync(dataFile)) {
      fs.mkdirSync(path.dirname(dataFile), { recursive: true });
      fs.writeFileSync(dataFile, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    const content = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.error("Error reading JSON fallback storage:", err);
    return defaultData;
  }
};

const writeStorage = (data) => {
  try {
    fs.mkdirSync(path.dirname(dataFile), { recursive: true });
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing JSON fallback storage:", err);
  }
};

let pool = null;
let usePostgres = false;

if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  } catch (e) {
    console.warn("Postgres pool creation deferred, fallback enabled.");
  }
}

// Initialize database tables
const initDB = async () => {
  if (!pool) {
    readStorage();
    console.log("Running in resilient storage mode (JSON Storage enabled).");
    return;
  }

  const query = `
    CREATE TABLE IF NOT EXISTS status_checks (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      client_name VARCHAR(255) NOT NULL,
      timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contact_submissions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      company VARCHAR(255),
      service VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      status VARCHAR(50) DEFAULT 'new',
      timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS site_visit_bookings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(255),
      "plotLocation" VARCHAR(255) NOT NULL,
      "plotSize" VARCHAR(100),
      "packageInterest" VARCHAR(100),
      "preferredDate" VARCHAR(50),
      "preferredTime" VARCHAR(50),
      message TEXT,
      status VARCHAR(50) DEFAULT 'pending',
      timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) UNIQUE NOT NULL,
      source VARCHAR(100) DEFAULT 'website',
      status VARCHAR(50) DEFAULT 'active',
      "subscribedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS chatbot_leads (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      "projectType" VARCHAR(255),
      "projectSize" VARCHAR(255),
      "serviceRequired" VARCHAR(255),
      timeline VARCHAR(255),
      contact VARCHAR(255) NOT NULL,
      source VARCHAR(100) DEFAULT 'chatbot',
      status VARCHAR(50) DEFAULT 'new',
      timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS lead_magnets (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      source VARCHAR(100) DEFAULT 'website',
      type VARCHAR(100) DEFAULT 'lead_magnet',
      status VARCHAR(50) DEFAULT 'new',
      timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  try {
    await pool.query(query);
    usePostgres = true;
    console.log("PostgreSQL connected & initialized successfully");
  } catch (err) {
    usePostgres = false;
    readStorage();
    console.warn("PostgreSQL not accessible (" + err.message + "). Fallback storage active with full persistence.");
  }
};

// Resilient query dispatcher
const query = async (text, params = []) => {
  if (usePostgres && pool) {
    try {
      return await pool.query(text, params);
    } catch (err) {
      console.warn("PostgreSQL query error, falling back to local storage:", err.message);
    }
  }

  // Fallback simulator for SQL queries
  const store = readStorage();
  const trimmed = text.trim();

  // 1. SELECT queries
  if (trimmed.toUpperCase().startsWith('SELECT')) {
    let tableName = null;
    const match = trimmed.match(/FROM\s+([a-zA-Z0-9_]+)/i);
    if (match) tableName = match[1];

    if (tableName && store[tableName]) {
      let rows = [...store[tableName]];

      // Filter by email if WHERE email = $1
      if (trimmed.includes('WHERE email = $1') && params[0]) {
        rows = rows.filter(r => r.email && r.email.toLowerCase() === params[0].toLowerCase());
      }

      // Sort by timestamp or subscribedAt DESC
      rows.sort((a, b) => {
        const dateA = new Date(a.timestamp || a.subscribedAt || 0);
        const dateB = new Date(b.timestamp || b.subscribedAt || 0);
        return dateB - dateA;
      });

      return { rows, rowCount: rows.length };
    }
    return { rows: [], rowCount: 0 };
  }

  // 2. INSERT queries
  if (trimmed.toUpperCase().startsWith('INSERT INTO')) {
    const match = trimmed.match(/INSERT INTO\s+([a-zA-Z0-9_]+)/i);
    const tableName = match ? match[1] : null;

    if (tableName) {
      if (!store[tableName]) store[tableName] = [];
      const newId = crypto.randomUUID ? crypto.randomUUID() : 'id-' + Date.now();
      let newRow = { id: newId };

      if (tableName === 'contact_submissions') {
        newRow = {
          id: newId,
          name: params[0],
          email: params[1],
          phone: params[2],
          company: params[3] || '',
          service: params[4],
          message: params[5],
          status: 'new',
          timestamp: new Date().toISOString()
        };
      } else if (tableName === 'site_visit_bookings') {
        newRow = {
          id: newId,
          name: params[0],
          phone: params[1],
          email: params[2],
          plotLocation: params[3],
          plotSize: params[4],
          packageInterest: params[5],
          preferredDate: params[6],
          preferredTime: params[7],
          message: params[8] || '',
          status: 'pending',
          timestamp: new Date().toISOString()
        };
      } else if (tableName === 'newsletter_subscribers') {
        newRow = {
          id: newId,
          email: params[0],
          source: params[1] || 'website',
          status: 'active',
          subscribedAt: new Date().toISOString()
        };
      } else if (tableName === 'chatbot_leads') {
        newRow = {
          id: newId,
          projectType: params[0],
          projectSize: params[1],
          serviceRequired: params[2],
          timeline: params[3],
          contact: params[4],
          source: params[5] || 'chatbot',
          status: 'new',
          timestamp: new Date().toISOString()
        };
      } else if (tableName === 'lead_magnets') {
        newRow = {
          id: newId,
          name: params[0],
          email: params[1],
          phone: params[2],
          source: params[3] || 'website',
          type: 'lead_magnet',
          status: 'new',
          timestamp: new Date().toISOString()
        };
      } else if (tableName === 'status_checks') {
        newRow = {
          id: newId,
          client_name: params[0],
          timestamp: new Date().toISOString()
        };
      }

      store[tableName].unshift(newRow);
      writeStorage(store);
      return { rows: [newRow], rowCount: 1 };
    }
  }

  // 3. UPDATE queries
  if (trimmed.toUpperCase().startsWith('UPDATE')) {
    const match = trimmed.match(/UPDATE\s+([a-zA-Z0-9_]+)\s+SET\s+status\s*=\s*\$1\s+WHERE\s+id\s*=\s*\$2/i);
    if (match) {
      const tableName = match[1];
      const newStatus = params[0];
      const targetId = params[1];

      if (store[tableName]) {
        const item = store[tableName].find(i => String(i.id) === String(targetId));
        if (item) {
          item.status = newStatus;
          writeStorage(store);
          return { rows: [item], rowCount: 1 };
        }
      }
    }
  }

  // 4. DELETE queries
  if (trimmed.toUpperCase().startsWith('DELETE FROM')) {
    const match = trimmed.match(/DELETE FROM\s+([a-zA-Z0-9_]+)\s+WHERE\s+id\s*=\s*\$1/i);
    if (match) {
      const tableName = match[1];
      const targetId = params[0];

      if (store[tableName]) {
        const initialLen = store[tableName].length;
        store[tableName] = store[tableName].filter(i => String(i.id) !== String(targetId));
        writeStorage(store);
        return { rows: [], rowCount: initialLen - store[tableName].length };
      }
    }
  }

  return { rows: [], rowCount: 0 };
};

module.exports = {
  query,
  initDB
};
