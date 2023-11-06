import "./index.scss";
import zxcvbn from "zxcvbn";

import {
  LockOutlined,
  UserOutlined,
  InfoCircleOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  // Space,
  Checkbox,
  Tooltip,
  Progress,
  message,
} from "antd";
import { useState } from "react";
import { http } from "../common/util";
import { FieldLoginType, FieldReqType } from "@/types/Form";
import { ResponseDataType } from "@/types/req";
import { setToken } from "../common/token";

function Login() {
  // 获取上下文 form 实例
  const [form] = Form.useForm();
  // 监听密码的改变
  const password = Form.useWatch("password", form);
  const watchStrength = (password: string): number => {
    const analysisValue = zxcvbn(password);
    // score得分只有0~4，且只有整数范围并没有小数
    return (analysisValue.score + 1) * 20;
  };
  // drawer是否打开
  const [open, setOpen] = useState(false);
  //注册的时候submit是否禁用
  const [disable, setDisable] = useState(true);
  // 打开drawer
  const showDrawer = () => {
    setOpen(true);
  };
  // 关闭drawer
  const onClose = () => {
    setOpen(false);
  };
  // 页面跳转
  const navigate = useNavigate();
  // 登录逻辑
  const loginReq = async (formLoginValue: FieldLoginType) => {
    const res = await http.post("/login", { ...formLoginValue });
    const data: ResponseDataType = res.data
    if (data.code === 1) {
      message.success(data.message, 1,loginSuccess)
    } else if (data.code === 2) {
      message.error(data.message,2)
    } else if (data.code === -1) {
      message.warning(data.message,2)
    }
  };
  // 登录后的操作
  const loginSuccess = () => {
    console.log('success');
    
    setToken('login_success_njupt')
    navigate('/index')
  }
  // 注册逻辑
  const registerReq = async (formReqValue: FieldReqType) => {
    const res = await http.post("/register", { ...formReqValue });
    const data:ResponseDataType=res.data
    if (data.code === -2) {
      message.error(data.message,2,()=>form.resetFields())
    } else if (data.code === -1) {
      message.warning('网络错误',2)
    } else if (data.code === 1) {
      message.success(data.message,2,onClose)
    }
  };
  return (
    <div className="container">
      <div className="bg-topLeft"></div>
      <div className="bg-topRight"></div>
      <div className="bg-bottomLeft"></div>
      <div className="bg-bottomRight"></div>
      <div className="card">
        <div className="left"></div>
        <div className="right">
          <div className="info">
            <div className="title">Login</div>
            <div className="detail">Please Login to continue</div>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={loginReq}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or &nbsp;
              <Button onClick={showDrawer} ghost type="primary">
                register now!
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Drawer
        title="Create a new account"
        width={450}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          onFinish={registerReq}
        >
          <Row gutter={16}>
            <Col span={15}>
              <Form.Item
                name="username"
                label="Name"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input
                  placeholder="Enter your username"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  suffix={
                    <Tooltip title="less than 10 words">
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>
                  }
                  maxLength={10}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={15}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please enter user password" },
                ]}
              >
                <Input.Password
                  placeholder="input password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={15}>
              <Form.Item
                name="confirmPassword"
                label="ConfirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        setDisable(false);
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="confirm password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={15}>
              <Progress
                percent={password ? watchStrength(password) : 0}
                steps={5}
                size={[48, 6]}
                showInfo={false}
                strokeColor={[
                  "#e74242",
                  "#EFBD47",
                  "#ffa500",
                  "#1bbf1b",
                  "#008000",
                ]}
              />
            </Col>
          </Row>
          <Row gutter={16} justify={"center"}>
            <Col span={15}>
              <Form.Item style={{ marginTop: "10px" }}>
                <Button type="primary" htmlType="submit" disabled={disable}>
                  submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
}

export default Login;
