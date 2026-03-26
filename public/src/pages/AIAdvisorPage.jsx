import { useDispatch, useSelector } from "react-redux";
import { analyzeFinance } from "../features/ai/aiSlice";
import Navbar from "../components/navbar";

export default function AIAdvisorPage() {
  const dispatch = useDispatch();
  const { result, loading, error } = useSelector((state) => state.ai);

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <div className='max-w-3xl mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-6'>AI Financial Advisor</h1>
        <div className='bg-white rounded-lg shadow p-6'>
          <p className='text-gray-600 mb-4'>
            Klik tombol di bawah untuk mendapatkan analisis keuangan berdasarkan
            transaksi kamu.
          </p>
          <button
            onClick={() => dispatch(analyzeFinance())}
            disabled={loading}
            className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50'
          >
            {loading ? "Menganalisis..." : "Analisis Keuangan Saya"}
          </button>
          {error && <p className='text-red-500 mt-4'>{error}</p>}
          {result && (
            <div className='mt-6 bg-gray-50 rounded p-4 whitespace-pre-line text-gray-700'>
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
