import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../features/news/newsSlice";
import Navbar from "../components/Navbar";

export default function NewsPage() {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <div className='max-w-4xl mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-6'>Financial News</h1>
        {loading && <p>Loading...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        <div className='flex flex-col gap-4'>
          {articles.map((article, idx) => (
            <a
              key={idx}
              href={article.url}
              target='_blank'
              rel='noreferrer'
              className='bg-white rounded-lg shadow p-4 hover:shadow-md transition'
            >
              <h2 className='font-semibold mb-1'>{article.title}</h2>
              <p className='text-sm text-gray-500 mb-2'>
                {article.source} ·{" "}
                {new Date(article.publishedAt).toLocaleDateString("id-ID")}
              </p>
              <p className='text-sm text-gray-700'>{article.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
