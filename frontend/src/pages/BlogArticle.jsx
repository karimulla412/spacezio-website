import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { blogData } from '../data/mock';
import SEO from '../components/SEO';

const BlogArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Extract ID or slug
  const articleId = parseInt(id) || 1;

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Find article
    const foundArticle = blogData.find(a => a.id === articleId);
    if (foundArticle) {
      setArticle(foundArticle);
      // Find related articles (same category or random)
      const related = blogData
        .filter(a => a.id !== articleId && a.category === foundArticle.category)
        .slice(0, 2);
      
      if (related.length < 2) {
        const others = blogData
          .filter(a => a.id !== articleId && !related.includes(a))
          .slice(0, 2 - related.length);
        setRelatedArticles([...related, ...others]);
      } else {
        setRelatedArticles(related);
      }
    }
  }, [articleId]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#FCFCF7] pt-32 flex items-center justify-center text-slate-900">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-950 mb-4">Article Not Found</h2>
          <Button onClick={() => navigate('/insights')} className="bg-[#F35A61] hover:bg-[#E04850] text-white font-semibold">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Insights
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFCF7] text-slate-900 font-sans antialiased selection:bg-[#FDF2F3] selection:text-white pt-28">
      <SEO 
        title={article.seoTitle || article.title}
        description={article.excerpt}
        type="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": article.title,
          "description": article.excerpt,
          "author": {
            "@type": "Organization",
            "name": "Spacexio"
          },
          "datePublished": article.date,
          "publisher": {
            "@type": "Organization",
            "name": "Spacexio",
            "logo": {
              "@type": "ImageObject",
              "url": "https://spacexio.com/logo.png"
            }
          }
        }}
      />
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/insights')}
          className="text-slate-600 hover:text-slate-950 hover:bg-slate-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Insights
        </Button>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 mb-12">
        <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-slate-100">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-6 lg:px-8 pb-20">
        <div className="mb-8">
          <span className="inline-block px-4 py-1.5 bg-[#FDF2F3] border border-[#FCA5A9] text-[#F35A61] text-xs font-mono font-bold uppercase rounded-full mb-6">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 mb-6 leading-tight tracking-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-6 text-slate-500 text-sm mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-[#01B3D1]" />
              {new Date(article.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-[#01B3D1]" />
              {article.readTime}
            </div>
            <button
              onClick={handleShare}
              className="flex items-center hover:text-[#01B3D1] transition-colors cursor-pointer"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
            {article.excerpt}
          </p>
        </div>

        <hr className="border-slate-200 my-10" />

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none
            prose-headings:text-slate-950 prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
            prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6
            prose-ul:text-slate-700 prose-ul:my-6 prose-ul:space-y-2
            prose-ol:text-slate-700 prose-ol:my-6 prose-ol:space-y-2
            prose-li:leading-relaxed
            prose-strong:text-slate-950 prose-strong:font-semibold
            prose-a:text-[#01B3D1] prose-a:no-underline hover:prose-a:underline
            prose-table:border-collapse prose-table:w-full prose-table:my-8
            prose-th:bg-slate-100 prose-th:text-slate-900 prose-th:p-4 prose-th:text-left
            prose-td:border prose-td:border-slate-200 prose-td:p-4 prose-td:text-slate-700
            [&_.lead-paragraph]:text-xl [&_.lead-paragraph]:text-slate-700 [&_.lead-paragraph]:leading-relaxed [&_.lead-paragraph]:mb-8
            [&_.highlight-box]:bg-[#FDF2F3]/60 [&_.highlight-box]:border [&_.highlight-box]:border-[#FCA5A9]/50 [&_.highlight-box]:rounded-2xl [&_.highlight-box]:p-6 [&_.highlight-box]:my-8
            [&_.case-study-box]:bg-[#EFFBFC]/60 [&_.case-study-box]:border [&_.case-study-box]:border-[#99E7EF] [&_.case-study-box]:rounded-2xl [&_.case-study-box]:p-6 [&_.case-study-box]:my-8
            [&_.milestone-box]:bg-emerald-50/60 [&_.milestone-box]:border [&_.milestone-box]:border-emerald-200 [&_.milestone-box]:rounded-2xl [&_.milestone-box]:p-6 [&_.milestone-box]:my-8
            [&_.cta-box]:bg-gradient-to-r [&_.cta-box]:from-[#F35A61] [&_.cta-box]:via-[#B85C8D] [&_.cta-box]:to-[#01B3D1]
            [&_.cta-box]:rounded-3xl [&_.cta-box]:p-8 [&_.cta-box]:text-center [&_.cta-box]:my-12 [&_.cta-box]:text-white
            [&_.cta-box_h3]:text-white [&_.cta-box_h3]:text-2xl [&_.cta-box_h3]:mb-4
            [&_.cta-box_p]:text-white/90 [&_.cta-box_p]:mb-6
            [&_.cta-button]:inline-block [&_.cta-button]:bg-white [&_.cta-button]:text-slate-950
            [&_.cta-button]:px-8 [&_.cta-button]:py-4 [&_.cta-button]:rounded-xl [&_.cta-button]:font-bold
            [&_.cta-button]:no-underline [&_.cta-button]:transition-all hover:[&_.cta-button]:bg-slate-100"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <hr className="border-slate-200 my-12" />

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1] rounded-3xl p-8 md:p-12 text-center my-12 shadow-2xl text-white">
          <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
            Planning a Construction Project?
          </h3>
          <p className="text-base sm:text-lg text-white/90 mb-8 max-w-2xl mx-auto font-normal leading-relaxed">
            Let's discuss how we can help you build your dream home with technology, transparency, and guaranteed quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-slate-950 hover:bg-slate-100 font-bold shadow-2xl hover:scale-105 px-8 py-6 text-sm rounded-xl cursor-pointer"
              onClick={() => navigate('/contact')}
            >
              Schedule Free Consultation
              <ArrowRight className="ml-2 h-4 w-4 text-[#F35A61]" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/10 hover:bg-white/20 text-white px-8 py-6 text-sm font-bold rounded-xl cursor-pointer"
              onClick={() => navigate('/packages')}
            >
              View Packages
            </Button>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-8 tracking-tight">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedArticles.map((related) => (
                <div
                  key={related.id}
                  onClick={() => navigate(`/insights/${related.id}`)}
                  className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-[#01B3D1]/50 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-[#EFFBFC] border border-[#99E7EF] text-[#01B3D1] text-xs font-mono font-bold uppercase rounded-full mb-3">
                      {related.category}
                    </span>
                    <h4 className="text-lg font-bold text-slate-950 mb-3 group-hover:text-[#F35A61] transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-slate-600 text-xs mb-4 line-clamp-2 font-normal leading-relaxed">
                      {related.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-slate-500 text-xs border-t border-slate-100 pt-3">
                      <span>{related.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default BlogArticle;
