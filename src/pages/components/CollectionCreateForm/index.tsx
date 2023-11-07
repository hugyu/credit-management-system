import { CollectionCreateFormProps } from "@/types/Form";
import { Form, Input, Modal } from "antd";

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
export default CollectionCreateForm;