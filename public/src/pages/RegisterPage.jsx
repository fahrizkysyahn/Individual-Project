import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../features/auth/authSlice";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(register(form));
    if (register.fulfilled.match(result)) navigate("/login");
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Register</h1>
        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='text'
            placeholder='Username'
            className='border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
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
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <p className='text-sm text-center mt-4'>
          Sudah punya akun?{" "}
          <Link to='/login' className='text-blue-600 hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
