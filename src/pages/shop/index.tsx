import { Card, Col, Row, Modal, message, notification } from "antd";
import Meta from "antd/es/card/Meta";
import { ExclamationCircleFilled, SmileOutlined } from "@ant-design/icons";
import { useStore } from "../../store";
import "./index.scss";
import { http } from "../../common/util";
import { formatDate } from "../../common/tool";
const { confirm } = Modal;
function Shop() {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: "订单信息",
      description: "你兑换的物品正在准备中哦~",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };
  const { userStore } = useStore();
  const getCreditInfo = async () => {
    let value = 0;
    // 签到的积分
    const res = await http.get(
      `/getSignInList?username=${userStore.getUserInfo()}`
    );
    const resData = res.data.data;
    resData.map((data: any) => {
      value += data.credit;
    });
    // 参加活动增加的积分
    const res2 = await http.get(
      `/getAddCredit?username=${userStore.getUserInfo()}`
    );
    if (res2.data.code === 1) {
      const res2Data = res2.data.data;
      res2Data.map((data: any) => {
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
    return value;
  };
  const showPromiseConfirm = (event: any) => {
    const cardElement = event.currentTarget;
    const metaElementDescrip = cardElement.querySelector(
      ".ant-card-meta-description"
    );
    const metaElementTitle = cardElement.querySelector(".ant-card-meta-title");
    const description = metaElementDescrip.textContent;
    const itemName = metaElementTitle.textContent;
    const credit = parseInt(description);
    const formattedDate = formatDate();

    confirm({
      title: "Do you want to redeem this item?",
      icon: <ExclamationCircleFilled />,
      content: "When clicked the OK button, you will redeem this",
      async onOk() {
        const allCredit = await getCreditInfo();
        if (credit > allCredit) {
          message.error("积分不足", 1);
        } else {
          const res = await http.get(
            `/buyItem?username=${userStore.getUserInfo()}&date=${formattedDate}&credit=${credit}&itemName=${itemName}`
          );
          if (res.data.code === 1) {
            message.success("购买成功", 1, openNotification);
          }
        }
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
              <Meta title="采血针" description="4积分" />
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
              <Meta title="血糖试纸" description="9积分" />
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
              <Meta title="血糖仪" description="59积分" />
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
              <Meta title="华为手表" description="99积分" />
            </Card>
          </Col>
        </Row>
        {contextHolder}
      </div>
    </div>
  );
}
export default Shop;
