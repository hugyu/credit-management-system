import "./index.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  UserOutlined,
  GoldOutlined,
  LogoutOutlined,
  LineChartOutlined,
  CalendarTwoTone,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import CollectionCreateForm from "../components/CollectionCreateForm";
import WelcomeContent from "../components/Welcome";
import { useStore } from "../../store";
import { http } from "../../common/util";
import { ResponseDataType } from "@/types/req";
import { formatDate } from "../../common/tool";
const { Header, Sider, Content } = Layout;

function LayoutScreen() {
  // Sider是否收起
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [open, setOpen] = useState(false);

  
  // 每日签到
  const onCreate = async (values: any) => {
   
    const formattedDate = formatDate()
    const res = await http.get(
      `/signIn?username=${userStore.getUserInfo()}&date=${formattedDate}&bgLevel=${
        values.bgValue
      }`
    );
    const data: ResponseDataType = res.data;
    if (data.code === 1) {
      
      message.success(data.message, 1);
    } else if (data.code === 2) {
      message.warning(data.message, 1);
    } else {
      message.error("网络错误", 1);
    }
    setOpen(false);
  };
  // 判断当前路由 Content中的内容动态显示
  const location = useLocation();
  // 是否显示欢迎页面
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (location.pathname === "/index" || location.pathname === "/index/") {
      setShowWelcome(true);
    } else {
      setShowWelcome(false);
    }
  }, [location]);
  // 获取用户名
  const { userStore, loginStore } = useStore();
  const name = userStore.getUserInfo();

  //退出登录
  const navigate = useNavigate();
  const onLogout = () => {
    userStore.setUserInfo("");
    loginStore.loginOut();
    navigate("/login", { replace: true });
  };
  // 菜单栏根据路由 动态选中
  const [selectedKeys, setSelectedKeys] = useState<string[]>([
    location.pathname,
  ]);
  const handleMenuSelect = ({ key }: { key: string }) => {
    setSelectedKeys([key]);
  };
  return (
    <div className="container">
      <Layout className="layout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedKeys}
            onSelect={handleMenuSelect}
            items={[
              {
                key: "/index/userInfo",
                icon: <UserOutlined />,
                label: <Link to={"/index/userInfo"}>用户</Link>,
              },
              {
                key: "/index/creditInfo",
                icon: <GoldOutlined />,
                label: <Link to={"/index/creditInfo"}>积分</Link>,
              },
              {
                key: "/index/shop",
                icon: <ShopOutlined />,
                label: <Link to={"/index/shop"}>商店</Link>,
              },
              {
                key: "/index/dataAnalyze",
                icon: <LineChartOutlined />,
                label: <Link to={"/index/dataAnalyze"}>分析</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="user-info">
              <Button
                className="signIn"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <CalendarTwoTone twoToneColor="#52c41a" /> 每日签到
              </Button>
              <span className="user-name">{`用户 : ${name}`}</span>
              <span className="user-logout">
                <Popconfirm
                  title="是否确认退出？"
                  okText="退出"
                  cancelText="取消"
                  onConfirm={onLogout}
                >
                  <LogoutOutlined /> 退出
                </Popconfirm>
              </span>
            </div>
            <CollectionCreateForm
              open={open}
              onCreate={onCreate}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {showWelcome ? <WelcomeContent /> : <Outlet />}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
export default LayoutScreen;
