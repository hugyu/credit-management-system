import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { getToken } from "./common/token";
import Login from "./Login";
import NotFound from "./pages/components/NotFound";
import CreditInfo from "./pages/creditInfo";
import DataAnalyze from "./pages/dataAnalyze";
import LayoutScreen from "./pages/Layout";
import Shop from "./pages/shop";
import UserInfo from "./pages/userInfo";

function App() {
  const token = getToken();

  return (
    <Router>
      <Routes>
        {!token && (
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
        )}
        {token && (
          <Route path="/" element={<Navigate to="/index" replace={true} />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/index" element={<LayoutScreen />}>
          <Route path="userInfo" element={<UserInfo />} />
          <Route path="creditInfo" element={<CreditInfo />} />
          <Route path="shop" element={<Shop />} />
          <Route path="dataAnalyze" element={<DataAnalyze />} />
          <Route path="*" element={<NotFound />} /> // 匹配不到路由时显示404页面
        </Route>
        <Route path="*" element={<NotFound />} /> // 匹配不到路由时显示404页面
      </Routes>
    </Router>
  );
}

export default App;
