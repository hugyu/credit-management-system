import { Form, Select } from "antd";
const { Option } = Select;

export const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }} defaultValue={"86"}>
      <Option value="86">+86</Option>
    </Select>
  </Form.Item>
);
