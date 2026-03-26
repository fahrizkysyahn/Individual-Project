import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  createTransaction,
  deleteTransaction,
} from "../features/transaction/transactionSlice";
import Navbar from "../components/navbar";
import TransactionCard from "../components/TransactionCard";

export default function TransactionsPage() {
  const dispatch = useDispatch();
  const { data: transactions, loading } = useSelector(
    (state) => state.transactions,
  );

  const [form, setForm] = useState({
    CategoryId: 1,
    amount: "",
    description: "",
    transaction_date: "",
  });

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createTransaction(form));
    setForm({
      CategoryId: 1,
      amount: "",
      description: "",
      transaction_date: "",
    });
  };

  const handleDelete = async (id) => {
    await dispatch(deleteTransaction(id));
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <div className='max-w-4xl mx-auto p-6'>
        <h1 className='text-2xl font-bold mb-6'>Transactions</h1>

        {/* Form tambah transaksi */}
        <div className='bg-white rounded-lg shadow p-6 mb-6'>
          <h2 className='font-semibold mb-4'>Tambah Transaksi</h2>
          <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
            <select
              className='border rounded px-4 py-2 col-span-2'
              value={form.CategoryId}
              onChange={(e) =>
                setForm({ ...form, CategoryId: Number(e.target.value) })
              }
            >
              <option value={1}>Income</option>
              <option value={2}>Expense</option>
            </select>
            <input
              type='number'
              placeholder='Jumlah (Rp)'
              className='border rounded px-4 py-2'
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
            <input
              type='date'
              className='border rounded px-4 py-2'
              value={form.transaction_date}
              onChange={(e) =>
                setForm({ ...form, transaction_date: e.target.value })
              }
            />
            <input
              type='text'
              placeholder='Deskripsi'
              className='border rounded px-4 py-2 col-span-2'
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <button
              type='submit'
              className='col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
            >
              Tambah
            </button>
          </form>
        </div>

        {/* List transaksi */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='flex flex-col gap-3'>
            {transactions.length === 0 && (
              <p className='text-gray-500'>Belum ada transaksi.</p>
            )}
            {transactions.map((t, idx) => (
              <TransactionCard
                key={t.id || idx}
                transaction={t}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
