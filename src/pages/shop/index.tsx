import { Card, Col, Row, Modal } from "antd";
import Meta from "antd/es/card/Meta";
import { ExclamationCircleFilled } from "@ant-design/icons";
import "./index.scss";
const { confirm } = Modal;
function Shop() {
  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to redeem this item?",
      icon: <ExclamationCircleFilled />,
      content: "When clicked the OK button, you will redeem this",
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
  };
  return (
    <div className="shopContainer">
      <div className="header">
        <div className="headerTitle">积分商场</div>
        <div className="headerInfo">
          欢迎光临我们的在线商店、让我们一同开启愉悦的购物之旅！
        </div>
      </div>
      <div className="goodList">
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/2215747482144/O1CN012Hqx8u1Ri03aEWlcu_!!0-item_pic.jpg_580x580q90.jpg_.webp"
                />
              }
              onClick={showPromiseConfirm}
            >
              <Meta title="采血针" description="39积分" />
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://g-search2.alicdn.com/img/bao/uploaded/i4/i2/2214170047969/O1CN01xDLcyc28jr4ZI2EQn_!!0-item_pic.jpg_580x580q90.jpg_.webp"
                />
              }
              onClick={showPromiseConfirm}
            >
              <Meta title="血糖试纸" description="99积分" />
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://g-search3.alicdn.com/img/bao/uploaded/i4/i3/3458379491/O1CN01Hmr7wT2JyvvhVFiOJ_!!0-item_pic.jpg_580x580q90.jpg_.webp"
                />
              }
              onClick={showPromiseConfirm}
            >
              <Meta title="血糖仪" description="599积分" />
            </Card>
          </Col>

          <Col className="gutter-row" span={6}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="手表"
                  src="https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/308465449/O1CN017r1eMX1q7h3ES3pSJ_!!308465449.jpg_580x580q90.jpg_.webp"
                />
              }
              onClick={showPromiseConfirm}
            >
              <Meta title="华为手表" description="999积分" />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default Shop;
