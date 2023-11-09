import "./index.scss";
import { Col, Progress, Row, Statistic } from "antd";
import CountUp from "react-countup";
import Line from "../components/Line";
import { http } from "../../common/util";
import { useStore } from "../../store";
import { useEffect, useState } from "react";
import { handleDate } from "../../common/tool";

const formatter = (value: number) => <CountUp end={value} separator="," />;

function DataAnalyze() {
  const { userStore } = useStore();
  const [xData, setXdata] = useState<string[]>();
  const [sData, setSdata] = useState<string[]>();
  const [normalDays, setNormalDays] = useState(0);
  const [percent, setPercent] = useState(0);
  const getBloodValue = async () => {
    const res = await http.get(
      `/getSignInList?username=${userStore.getUserInfo()}`
    );
    const valueList = res.data.data;

    let xData: string[] = [];
    let sData: string[] = [];
    let normalDays = 0;
    valueList.map((object: { date: string; bgLevel: string }) => {
      xData.push(handleDate(object.date));
      sData.push(object.bgLevel);
      if (Number(object.bgLevel) >= 3.9 && Number(object.bgLevel) <= 5.6) {
        normalDays++;
      }
    });
    setXdata(xData);
    setSdata(sData);
    setNormalDays(normalDays);
    setPercent(Math.floor((normalDays * 100) / xData.length));
  };

  const handleFormat = (percent: number|undefined) => {
    if (percent) {
      if (percent === 100) {
        return 'A+' 
      } else if (percent >= 95) {
        return 'A'
      } else if (percent > 90) {
        return 'B'
      } else if (percent > 80) {
        return 'C'
      } else {
        return 'D'
      }
    }
  }
  const handleSuggestions=(percent: number|undefined) => {
    if (percent) {
      if (percent === 100) {
        return '你的血糖水平很健康哦' 
      } else if (percent >= 95) {
        return '你的血糖水平有些波动，总体正常'
      } else if (percent > 90) {
        return '你的血糖水平有些波动，请注意'
      } else if (percent > 80) {
        return '你的血糖水平波动异常，请注意'
      } else {
        return '你的血糖水平波动异常，请及时就医'
      }
    }
  }
  useEffect(() => {
    getBloodValue();
  }, []);
  return (
    <div className="dataAnalyzeContainer">
      <div className="descriptionContainer">
        <Row gutter={50}>
          <Col span={8}>
            <Statistic
              title="Cumulative Sign-in Days"
              value={xData?.length}
              formatter={formatter}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Normal Days"
              value={normalDays}
              formatter={formatter}
            />
          </Col>
          <Col span={8}>
            <Progress type="circle" percent={percent} format={handleFormat } />
          </Col>
        </Row>
        <div className="suggestions">Suggestions: <span className="suggestionSpan">{handleSuggestions(percent) }</span></div>
      </div>
      <div className="echartsContainer">
        <Line
          style={{ width: "1200px", height: "380px", margin: "0 auto" }}
          xData={xData?.length ? xData : []}
          sData={sData?.length ? sData : []}
          title="近期血糖情况"
        />
      </div>
    </div>
  );
}
export default DataAnalyze;
