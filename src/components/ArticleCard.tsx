import { Link } from 'react-router-dom';

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    image: string | null;
    type: 'article' | 'podcast-article';
  };
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Link
      to={`/article/${article.id}`}
      className="group bg-white border border-neutral-300 hover:border-black transition-all duration-300"
    >
      {/* Image placeholder */}
      <div className="aspect-video bg-neutral-900 relative overflow-hidden">
        {article.image ? (
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-600">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {article.type === 'podcast-article' && (
          <div className="absolute top-3 right-3 bg-amber-500 text-black text-xs font-bold px-3 py-1">
            🎙️ PODCAST
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Category */}
        <div className="text-xs font-bold text-amber-500 mb-2 tracking-wider">
          {article.category.toUpperCase()}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-amber-500 transition-colors line-clamp-2">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-neutral-500">
          <span>{article.author}</span>
          <span>•</span>
          <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
