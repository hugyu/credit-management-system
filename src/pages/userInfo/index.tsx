import "./index.scss";
import { Cascader, Descriptions, message } from "antd";
import { Button, Drawer, Form, Input, Select, Space } from "antd";
import type { DescriptionsProps } from "antd";
import { useEffect, useState } from "react";
import { AreaOption } from "../../types/form";
import { prefixSelector } from "../components/PrefixSelector";
import { http } from "../../common/util";
import { ResponseDataType } from "@/types/req";
import { useStore } from "../../store";
import { UserInfo } from "@/types/user";

const { Option } = Select;
// 配置message最大数量为1
message.config({
  maxCount: 1,
});
function UserInfoScreen() {
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
  // 省市选择变化回调
  const onChange = (value: any) => {
    console.log(value);
  };

  // 获取用户信息
  const { userStore } = useStore();
  const [userInfo, setUserInfo] = useState<UserInfo[] | undefined>([]);

  const handleDate = (date: string | undefined) => {
    return date ? new Date(date).toISOString().split("T")[0] : "";
  };
  // 个人资料列表中的数据
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "UserName",
      children: `${userInfo?.[0]?.username}`,
    },
    {
      key: "2",
      label: "Telephone",
      children: `${userInfo?.[0]?.userPhone}`,
    },
    {
      key: "3",
      label: "BirthDate",
      children: handleDate(userInfo?.[0]?.birthDate),
    },
    {
      key: "4",
      label: "Gender",
      children: `${userInfo?.[0]?.gender}`,
    },
    {
      key: "5",
      label: "Address",
      children: `${userInfo?.[0]?.address}`,
    },
  ];
  // 获取用户信息
  const getUserInfo = async () => {
    const res = await http.get(
      `/getUserInfo?username=${userStore.getUserInfo()}`
    );
    const data: ResponseDataType<UserInfo> = res.data;
    const userInfo = data.data;

    setUserInfo(userInfo);
    if (data.code === 2) {
      message.warning(data.message, 1, showDrawer);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
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
        title="Edit your detail"
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
                name={"cities"}
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
export default UserInfoScreen;
