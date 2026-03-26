import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className='bg-blue-600 text-white px-6 py-4 flex justify-between items-center'>
      <span className='font-bold text-lg'>WalletAI</span>
      <div className='flex gap-6 text-sm'>
        <Link to='/' className='hover:underline'>
          Dashboard
        </Link>
        <Link to='/transactions' className='hover:underline'>
          Transactions
        </Link>
        <Link to='/ai' className='hover:underline'>
          AI Advisor
        </Link>
        <Link to='/news' className='hover:underline'>
          News
        </Link>
        <button onClick={handleLogout} className='hover:underline'>
          Logout
        </button>
      </div>
    </nav>
  );
}
