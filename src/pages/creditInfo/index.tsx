import "./index.scss";
import CountUp from "react-countup";
import { Col, Drawer, message, Row, Select, Statistic, Upload } from "antd";
import { Button, Form, Input } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { CreditType, DataType } from "@/types/credit";
import { http } from "../../common/util";
import { useStore } from "../../store";
import { formatDate, handleDate } from "../../common/tool";
// table 数据类型定义
const columns: ColumnsType<DataType> = [
  {
    title: "Index",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "Credit",
    dataIndex: "credit",
    key: "credit",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 6 ? "geekblue" : "green";

          return (
            <Tag color={color} key={tag}>
              {tag}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const formatter = (value: number) => <CountUp end={value} separator="," />;
// Form layout
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */
// table 页面每页的数据条数

const PAGE_SIZE = 4;
function CreditInfo() {
  // 控制兑换积分drawer是否打开
  const [open, setOpen] = useState(false);
  // 打开
  const showDrawer = () => {
    setOpen(true);
  };
  // 关闭
  const onClose = () => {
    setOpen(false);
  };
  // 上传积分
  const onFinish = async (values: any) => {
    const formattedDate = formatDate();
    const res = await http.get(
      `/addCredit?username=${userStore.getUserInfo()}&date=${formattedDate}&credit=${creditValue}`
    );
    if (res.data.code === 1) {
      message.success(res.data.message, 1);
    }
  };

  // 处理上传的文件
  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const { userStore } = useStore();
  const [creditInfo, setCreditInfo] = useState<CreditType>();
  // 页码设置
  const [currentPage, setCurrentPage] = useState(1);
  // 页面页码设置
  const handlePageChange = (page: number) => {
    const endPage = Math.floor((dataSource?.length as number) / PAGE_SIZE);
    let newPage = page + 1;
    if (newPage == endPage) {
      setCurrentPage(1);
    } else {
      setCurrentPage(newPage);
    }
  };
  const paginationProps = {
    current: currentPage, //当前页码
    pageSize: PAGE_SIZE, // 每页数据条数
    showTotal: () => <span>总共{dataSource?.length}项</span>,

    onChange: (page: number) => handlePageChange(page), //改变页码的函数
    hideOnSinglePage: false,
    showSizeChanger: false,
  };
  const [dataSource, setDataSource] = useState<DataType[]>();

  // 应该是获取总的记录
   const getCreditInfo = async () => {
    let value = 0;
    let day = 0;
    let dataSource: DataType[] = [];
    // 签到的积分
    const res = await http.get(
      `/getSignInList?username=${userStore.getUserInfo()}`
    );
    const resData = res.data.data;

    resData.map((data: any, index: number) => {
      let object = {
        key: String(index + 1),
        index: index + 1,
        date: handleDate(data.date),
        credit: data.credit,
        tags: ["SignIn"],
      };
      dataSource.push(object);

      value += data.credit;
      if (data.credit === 1) {
        day++;
      }
    });
    // 参加活动增加的积分
    const res2 = await http.get(
      `/getAddCredit?username=${userStore.getUserInfo()}`
    );
    if (res2.data.code === 1) {
      const res2Data = res2.data.data;
      res2Data.map((data: any, index: number) => {
        let object = {
          key: String(index + 1 + res.data.data.length),
          index: index + 1 + res.data.data.length,
          date: handleDate(data.date),
          credit: data.credit,
          tags: ["CheckIn"],
        };
        dataSource.push(object);

        value += data.credit;
      });
    }
    
    // 已经购买了 消耗过的积分
    const res3 = await http.get(
      `/getBuyItem?username=${userStore.getUserInfo()}`
    );
    if (res3.data.code === 1) {
      const res3Data = res3.data.data;
      console.log(res3Data);
      
      res3Data.map((data: any) => {
        value -= data.credit;
      });
    }
    const resCreditInfo: CreditType = { dayCount: day, creditValue: value };
    setCreditInfo(resCreditInfo);
    setDataSource(dataSource);
  };
  // 增加积分的分值
  const [creditValue, setCreditValue] = useState(0);
  // 增加积分时 select选择框的变化回调
  const handleChange = (value: number) => {
    setCreditValue(value);
  };
  useEffect(() => {
    getCreditInfo();
  }, []);
  return (
    <div className="Creditcontainer">
      <div className="creHead">
        <Row gutter={50}>
          <Col span={12}>
            <Statistic
              title="Credit"
              value={creditInfo?.creditValue}
              formatter={formatter}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Cumulative Sign-in Days"
              value={creditInfo?.dayCount}
              formatter={formatter}
            />
          </Col>
        </Row>
        <Button
          className="creBtn"
          type="primary"
          onClick={showDrawer}
          icon={<PlusOutlined />}
        >
          兑换积分
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={paginationProps}
      />
      <Drawer
        title="Add credit"
        width={650}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
        >
          <Form.Item name="theme" label="Theme" rules={[{ required: true }]}>
            <Select
              onChange={handleChange}
              options={[
                { value: 3, label: "完成门诊随访" },
                { value: 5, label: "参加扩展活动" },
                { value: 8, label: "参加科研招募" },
              ]}
            />
          </Form.Item>

          <Form.Item name="introduction" label="Introduction">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="Upload Materials"
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}
export default CreditInfo;
