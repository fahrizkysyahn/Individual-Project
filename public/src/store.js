import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import transactionReducer from "./features/transaction/transactionSlice";
import newsReducer from "./features/news/newsSlice";
import aiReducer from "./features/ai/aiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
    news: newsReducer,
    ai: aiReducer,
  },
});

export default store;
