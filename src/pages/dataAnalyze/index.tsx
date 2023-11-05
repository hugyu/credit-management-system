import "./index.scss";
import { Col, Progress, Row, Statistic } from "antd";
import CountUp from "react-countup";
import Bar from "../components/Bar";

const formatter = (value: number) => <CountUp end={value} separator="," />;
function DataAnalyze() {
  return (
    <div className="dataAnalyzeContainer">
      <div className="descriptionContainer">
        <Row gutter={50}>
          <Col span={8}>
            <Statistic
              title="Cumulative Sign-in Days"
              value={112893}
              formatter={formatter}
            />
          </Col>
          <Col span={8}>
            <Statistic title="Normal Days" value={5} formatter={formatter} />
          </Col>
          <Col span={8}>
            <Progress type="circle" percent={75} />
          </Col>
        </Row>
          </div>
          <div className="echartsContainer">
          <Bar
            style={{ width: "500px", height: "350px", margin: "0 auto" }}
            xData={['1','2','3','4']}
            sData={[1,2,3,4]}
            title="近期血糖情况"
          />
          </div>
    </div>
  );
}
export default DataAnalyze;
