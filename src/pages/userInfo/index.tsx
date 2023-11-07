import "./index.scss";
import { Cascader, Descriptions } from "antd";
import { Button, Drawer, Form, Input, Select, Space } from "antd";
import type { DescriptionsProps } from "antd";
import { useState } from "react";
import { AreaOption } from "@/types/Form";
const { Option } = Select;
function UserInfo() {
  // 控制Drawer是否打开
  const [open, setOpen] = useState(false);
  // 打开
  const showDrawer = () => {
    setOpen(true);
  };
  // 关闭
  const onClose = () => {
    setOpen(false);
  };
  // 填写个人资料后的回调
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  // 个人资料列表中的数据
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "UserName",
      children: "Zhou Maomao",
    },
    {
      key: "2",
      label: "Telephone",
      children: "1810000000",
    },
    {
      key: "3",
      label: "BirthDate",
      children: "2002.10",
    },
    {
      key: "4",
      label: "Gender",
      children: "男",
    },
    {
      key: "5",
      label: "Address",
      children:
        "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China",
    },
  ];

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue={"86"}>
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );
  const options: AreaOption[] = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      children: [
        {
          value: "hangzhou",
          label: "Hangzhou",
        },
      ],
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      children: [
        {
          value: "nanjing",
          label: "Nanjing",
        },
      ],
    },
  ];

  const onChange = (value: any) => {
    console.log(value);
  };
  return (
    <div className="userContainer">
      <div className="descriptionCard">
        <Descriptions
          title="User Info"
          items={items}
          className="description"
          extra={
            <Button type="primary" onClick={showDrawer}>
              Edit
            </Button>
          }
          bordered
        />
      </div>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form
          name="complex-form"
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Address">
            <Space.Compact>
              <Form.Item
                name={"address"}
                rules={[
                  { required: true, message: "Please select your address!" },
                ]}
              >
                <Cascader
                  options={options}
                  onChange={onChange}
                  placeholder="Please select"
                />
              </Form.Item>
              <Form.Item
                name={"street"}
                rules={[
                  { required: true, message: "Please input your street!" },
                ]}
              >
                <Input placeholder="Input your street"></Input>
              </Form.Item>
            </Space.Compact>
          </Form.Item>
          <Form.Item label="BirthDate" style={{ marginBottom: 0 }}>
            <Form.Item
              name="year"
              rules={[{ required: true }]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            >
              <Input placeholder="Input birth year" />
            </Form.Item>
            <Form.Item
              name="month"
              rules={[{ required: true }]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}
            >
              <Input placeholder="Input birth month" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}
export default UserInfo;
