import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../features/auth/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(form));
    if (login.fulfilled.match(result)) navigate("/");
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Login</h1>
        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='email'
            placeholder='Email'
            className='border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type='password'
            placeholder='Password'
            className='border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type='submit'
            disabled={loading}
            className='bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50'
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <p className='text-sm text-center mt-4'>
          Belum punya akun?{" "}
          <Link to='/register' className='text-blue-600 hover:underline'>
            Register
          </Link>
        </p>
        <div className='mt-4'>
          <a
            href='http://localhost:3000/auth/google'
            className='w-full block text-center border border-gray-300 py-2 rounded hover:bg-gray-50'
          >
            Login dengan Google
          </a>
        </div>
      </div>
    </div>
  );
}
