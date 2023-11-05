import "./index.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  GoldOutlined,
  LogoutOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Popconfirm } from "antd";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
const { Header, Sider, Content } = Layout;
function LayoutScreen() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div className="container">
      <Layout className="layout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: <Link to={"/userInfo"}>用户</Link>,
              },
              {
                key: "2",
                icon: <GoldOutlined />,
                label: <Link to={"/creditInfo"}>积分</Link>,
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "nav 3",
              },
              {
                key: "4",
                icon: <CalendarOutlined />,
                label: "签到",
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
              <span className="user-name">用户</span>
              <span className="user-logout">
                <Popconfirm
                  title="是否确认退出？"
                  okText="退出"
                  cancelText="取消"
                  //   onConfirm={onLogout}
                >
                  <LogoutOutlined /> 退出
                </Popconfirm>
              </span>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
export default LayoutScreen;
