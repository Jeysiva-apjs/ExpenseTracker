import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpenseTracker from "./components/ExpenseTracker";
import LoginPage from "./components/ExpenseTracker/LoginPage";
import RegisterPage from "./components/ExpenseTracker/RegisterPage";
import Appbar from "./components/ExpenseTracker/Appbar";
const App = () => {
  return (
    <div>
      <Router>
        <Appbar></Appbar>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
