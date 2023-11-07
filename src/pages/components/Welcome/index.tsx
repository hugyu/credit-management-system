import "./index.scss";
import { Avatar, Button, Card, Col, Row } from "antd";
import { useNavigate } from 'react-router-dom';
import {
  EditTwoTone,
  FundTwoTone,
  ShoppingTwoTone,
  PlayCircleOutlined,
} from "@ant-design/icons";
const { Meta } = Card;

const WelcomePage = () => {
  // 点击跳转到userInfo页
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/index/userInfo');
  }
  return (
    <div className="welcome-page">
      <h2 className="welcome-title">Health</h2>
      <Row gutter={112}>
        <Col span={8}>
          <Card hoverable style={{ width: 240 }} className="welcome-card">
            <Meta
              avatar={<Avatar icon={<EditTwoTone />} />}
              title="记录"
              description="记录您每天的血糖情况"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable style={{ width: 240 }} className="welcome-card">
            <Meta
              avatar={<Avatar icon={<FundTwoTone />} />}
              title="分析"
              description="分析您的血糖水平"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable style={{ width: 240 }} className="welcome-card">
            <Meta
              avatar={<Avatar icon={<ShoppingTwoTone />} />}
              title="兑换"
              description="使用积分兑换商品吧"
            />
          </Card>
        </Col>
      </Row>

      <Button
        type="primary"
        size="large"
        icon={<PlayCircleOutlined />}
        onClick={handleClick}
        className="welcome-button"
      >
        Get Started
      </Button>
    </div>
  );
};

export default WelcomePage;
