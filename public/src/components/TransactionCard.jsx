export default function TransactionCard({ transaction, onDelete }) {
  return (
    <div className='bg-white rounded-lg shadow p-4 flex justify-between items-center'>
      <div>
        <p className='font-medium'>{transaction.description}</p>
        <p className='text-sm text-gray-500'>{transaction.transaction_date}</p>
      </div>
      <div className='flex items-center gap-4'>
        <span className='font-bold text-green-600'>
          Rp{Number(transaction.amount).toLocaleString("id-ID")}
        </span>
        <button
          onClick={() => onDelete(transaction.id)}
          className='text-red-500 text-sm hover:underline'
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
