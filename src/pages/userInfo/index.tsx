import "./index.scss";
import { Descriptions, Tooltip, Typography } from "antd";
import { Button, Drawer, Form, Input, Select, Space } from "antd";
import type { DescriptionsProps } from "antd";
import { useState } from "react";
function UserInfo() {
  const [open, setOpen] = useState(false);
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
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
      label: "Live",
      children: "Hangzhou, Zhejiang",
    },
    {
      key: "4",
      label: "Remark",
      children: "empty",
    },
    {
      key: "5",
      label: "Address",
      children:
        "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China",
    },
  ];
  const provinceData = ["Zhejiang", "Jiangsu"];
  type CityName = keyof typeof cityData;
  const cityData = {
    Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],
    Jiangsu: ["Nanjing", "Suzhou", "Zhenjiang"],
  };
  const [cities, setCities] = useState(cityData[provinceData[0] as CityName]);
  const [secondCity, setSecondCity] = useState(
    cityData[provinceData[0] as CityName][0]
  );

  const handleProvinceChange = (value: CityName) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };

  const onSecondCityChange = (value: CityName) => {
    setSecondCity(value);
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
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form
          name="complex-form"
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Username">
            <Space>
              <Form.Item
                name="username"
                noStyle
                rules={[{ required: true, message: "Username is required" }]}
              >
                <Input style={{ width: 160 }} placeholder="Please input" />
              </Form.Item>
              <Tooltip title="Useful information">
                <Typography.Link href="#API">Need Help?</Typography.Link>
              </Tooltip>
            </Space>
          </Form.Item>
          <Form.Item label="Address">
            <Space.Compact>
              <Form.Item
                name={["address", "province"]}
                noStyle
                rules={[{ required: true, message: "Province is required" }]}
              >
                <Select
                  //@ts-ignore
                  defaultValue={provinceData[0]}
                  style={{ width: 120 }}
                  onChange={handleProvinceChange}
                  options={provinceData.map((province) => ({
                    label: province,
                    value: province,
                  }))}
                />
                <Select
                  style={{ width: 120 }}
                  //@ts-ignore
                  value={secondCity}
                  onChange={onSecondCityChange}
                  options={cities.map((city) => ({ label: city, value: city }))}
                />
              </Form.Item>
              <Form.Item
                name={["address", "street"]}
                noStyle
                rules={[{ required: true, message: "Street is required" }]}
              >
                <Input style={{ width: "50%" }} placeholder="Input street" />
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
