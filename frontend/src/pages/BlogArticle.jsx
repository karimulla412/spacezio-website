import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { articlesContent } from '../data/articlesContent';
import { blogData } from '../data/mock';
import SEO from '../components/SEO';

const BlogArticle = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    // Find article content
    const articleData = articlesContent[articleId];
    if (articleData) {
      setArticle(articleData);
      
      // Find related articles from same category
      const related = blogData
        .filter(a => a.category === articleData.category && a.id !== articleId)
        .slice(0, 2);
      setRelatedArticles(related);

      
      // Scroll to top
      window.scrollTo(0, 0);
    }
  }, [articleId]);

  if (!article) {
    return (
      <div className="min-h-screen bg-black pt-32 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Article Not Found</h2>
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
    <div className="min-h-screen bg-black pt-32">
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
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Insights
        </Button>
      </div>

      {/* Hero Image */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-12">
        <div className="relative h-96 rounded-2xl overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-[#F35A61] text-white text-sm font-semibold rounded-full mb-6">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-6 text-gray-400 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(article.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {article.readTime}
            </div>
            <button
              onClick={handleShare}
              className="flex items-center hover:text-[#01B3D1] transition-colors"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <hr className="border-gray-800 my-12" />

        {/* Article Content */}
        <div 
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
            prose-ul:text-gray-300 prose-ul:my-6 prose-ul:space-y-2
            prose-ol:text-gray-300 prose-ol:my-6 prose-ol:space-y-2
            prose-li:leading-relaxed
            prose-strong:text-white prose-strong:font-semibold
            prose-a:text-[#01B3D1] prose-a:no-underline hover:prose-a:underline
            prose-table:border-collapse prose-table:w-full prose-table:my-8
            prose-th:bg-gray-800 prose-th:text-white prose-th:p-4 prose-th:text-left
            prose-td:border prose-td:border-gray-700 prose-td:p-4 prose-td:text-gray-300
            [&_.lead-paragraph]:text-xl [&_.lead-paragraph]:text-gray-300 [&_.lead-paragraph]:leading-relaxed [&_.lead-paragraph]:mb-8
            [&_.highlight-box]:bg-gradient-to-br [&_.highlight-box]:from-[#F35A61]/15 [&_.highlight-box]:to-[#F35A61]/5
            [&_.highlight-box]:border [&_.highlight-box]:border-[#F35A61]/30 [&_.highlight-box]:rounded-xl [&_.highlight-box]:p-6 [&_.highlight-box]:my-8
            [&_.case-study-box]:bg-gradient-to-br [&_.case-study-box]:from-blue-900/20 [&_.case-study-box]:to-blue-800/10
            [&_.case-study-box]:border [&_.case-study-box]:border-blue-500/30 [&_.case-study-box]:rounded-xl [&_.case-study-box]:p-6 [&_.case-study-box]:my-8
            [&_.milestone-box]:bg-gradient-to-br [&_.milestone-box]:from-green-900/20 [&_.milestone-box]:to-green-800/10
            [&_.milestone-box]:border [&_.milestone-box]:border-green-500/30 [&_.milestone-box]:rounded-xl [&_.milestone-box]:p-6 [&_.milestone-box]:my-8
            [&_.cta-box]:bg-gradient-to-r [&_.cta-box]:from-[#F35A61] [&_.cta-box]:via-[#B85C8D] [&_.cta-box]:to-[#01B3D1]
            [&_.cta-box]:rounded-2xl [&_.cta-box]:p-8 [&_.cta-box]:text-center [&_.cta-box]:my-12
            [&_.cta-box_h3]:text-white [&_.cta-box_h3]:text-2xl [&_.cta-box_h3]:mb-4
            [&_.cta-box_p]:text-white/90 [&_.cta-box_p]:mb-6
            [&_.cta-button]:inline-block [&_.cta-button]:bg-white [&_.cta-button]:text-slate-950
            [&_.cta-button]:px-8 [&_.cta-button]:py-4 [&_.cta-button]:rounded-lg [&_.cta-button]:font-bold
            [&_.cta-button]:no-underline [&_.cta-button]:transition-all hover:[&_.cta-button]:bg-gray-100"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <hr className="border-gray-800 my-12" />

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#F35A61] via-[#B85C8D] to-[#01B3D1] rounded-2xl p-8 md:p-12 text-center my-12 shadow-2xl">
          <h3 className="text-3xl font-bold text-white mb-4">
            Planning a Construction Project?
          </h3>
          <p className="text-xl text-white/90 mb-8">
            Let's discuss how we can help you build your dream home with technology, transparency, and guaranteed quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-slate-950 hover:bg-slate-100 font-bold shadow-2xl hover:scale-105 px-8 py-6 text-lg font-semibold"
              onClick={() => navigate('/contact')}
            >
              Schedule Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
              onClick={() => navigate('/packages')}
            >
              View Packages
            </Button>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 mb-12">
            <h3 className="text-3xl font-bold text-white mb-8">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedArticles.map((related) => (
                <div
                  key={related.id}
                  onClick={() => navigate(`/insights/${related.id}`)}
                  className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden hover:border-[#01B3D1]/50 transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-[#01B3D1] text-white text-xs font-semibold rounded-full mb-3">
                      {related.category}
                    </span>
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#F35A61] transition-colors">
                      {related.title}
                    </h4>
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {related.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-gray-500 text-sm">
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
