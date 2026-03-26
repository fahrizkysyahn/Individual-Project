import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import AIAdvisorPage from "./pages/AIAdvisorPage";
import NewsPage from "./pages/NewsPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<DashboardPage />} />
        <Route path='/transactions' element={<TransactionsPage />} />
        <Route path='/ai' element={<AIAdvisorPage />} />
        <Route path='/news' element={<NewsPage />} />
      </Route>

      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}
