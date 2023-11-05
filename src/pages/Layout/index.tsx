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
import {
  Layout,
  Menu,
  Button,
  theme,
  Popconfirm,
  Form,
  Input,
  Modal,
} from "antd";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
const { Header, Sider, Content } = Layout;
interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}
const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Record today's blood glucose level"
      okText="Record"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="bgValue"
          label="blood glucose level"
          rules={[
            {
              required: true,
              message: "Please input the value of blood glucose!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
function LayoutScreen() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };
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
                icon: <ShopOutlined />,
                label: <Link to={"/shop"}>商店</Link>,
              },
              {
                key: "4",
                icon: <LineChartOutlined />,
                label: <Link to={"/dataAnalyze"}>分析</Link>,
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
              <span
                className="signIn"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <CalendarTwoTone twoToneColor="#52c41a" /> 每日签到
              </span>
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
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
export default LayoutScreen;
