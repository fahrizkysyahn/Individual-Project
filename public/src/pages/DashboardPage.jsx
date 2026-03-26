import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../features/transaction/transactionSlice";
import Navbar from "../components/navbar";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { data: transactions, loading } = useSelector(
    (state) => state.transactions,
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const totalIncome = transactions
    .filter((t) => t.CategoryId === 1)
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.CategoryId === 2)
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <div className='max-w-4xl mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-6'>Dashboard</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='grid grid-cols-3 gap-4'>
            <div className='bg-white rounded-lg shadow p-6 text-center'>
              <p className='text-gray-500 text-sm mb-1'>Saldo</p>
              <p
                className={`text-2xl font-bold ${balance >= 0 ? "text-blue-600" : "text-red-600"}`}
              >
                Rp{balance.toLocaleString("id-ID")}
              </p>
            </div>
            <div className='bg-white rounded-lg shadow p-6 text-center'>
              <p className='text-gray-500 text-sm mb-1'>Total Pemasukan</p>
              <p className='text-2xl font-bold text-green-600'>
                Rp{totalIncome.toLocaleString("id-ID")}
              </p>
            </div>
            <div className='bg-white rounded-lg shadow p-6 text-center'>
              <p className='text-gray-500 text-sm mb-1'>Total Pengeluaran</p>
              <p className='text-2xl font-bold text-red-600'>
                Rp{totalExpense.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
