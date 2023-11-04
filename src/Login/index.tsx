import "./index.scss";
import zxcvbn from 'zxcvbn';

import {
  LockOutlined,
  UserOutlined,
  InfoCircleOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Checkbox,
  Tooltip,
  Progress,
} from "antd";
import { useState } from "react";

function Login() {
   // 获取上下文 form 实例
   const [form] = Form.useForm();
   // 监听密码的改变
  const password = Form.useWatch('pwd', form);
  console.log(password)
  
  const watchStrength = (password: string): number => {
    const analysisValue = zxcvbn(password)
    // score得分只有0~4，且只有整数范围并没有小数
    return (analysisValue.score + 1) * 20
  }


  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  //   type FieldType = {
  //     username?: string;
  //     password?: string;
  //     remember?: string;
  //   };
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
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={16} justify={"center"}>
            <Col span={12}>
              <Form.Item
                name="name"
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
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} justify={"center"}>
            <Col span={12}>
              <Form.Item
                name="pwd"
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
          <Row gutter={16} justify={"center"}>
            <Col span={12}>
              <Form.Item
                name="confirmPwd"
                label="ConfirmPassword"
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('pwd') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The new password that you entered do not match!'));
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
          <Row gutter={16} justify={"center"}>
            <Col span={12}>
             
              
              <Progress
                  percent={password ? watchStrength(password) : 0}
                  steps={5}
                  size={[35,8]}
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
        </Form>
      </Drawer>
    </div>
  );
}

export default Login;
