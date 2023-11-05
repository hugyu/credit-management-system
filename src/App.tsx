import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./Login";
import CreditInfo from "./pages/creditInfo";
import LayoutScreen from "./pages/Layout";
import UserInfo from "./pages/userInfo";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<LayoutScreen />}>
        <Route path="checkIn" element={''} />
          <Route path="userInfo" element={<UserInfo />}></Route>
          <Route path="creditInfo" element={<CreditInfo/>} />
      </Route>
      {/* <Route index element={istoken?<LoginScreen />:<LayoutScreen />}></Route> */}
    </Routes>
  </Router>
  );
}

export default App;
