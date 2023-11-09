import * as echarts from "echarts";
import { useEffect, useRef } from "react";

function echartInit(
  node: any,
  xData: string[],
  sData: string[],
  title: string
) {
  const myChart = echarts.init(node);
  // 绘制图表
  myChart.setOption({
    title: {
      text: title,
    },
    tooltip: {},
    xAxis: {
      type: "category",
      data: xData,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "血糖",
        type: "line",
        data: sData,
        smooth: true,
      },
    ],
    markLine: {
      data: [
        { yAxis: 3.9, label: { show: false } },
        { yAxis: 5.2, label: { show: false } },
      ],
    },
  });
}

function Line({
  style,
  xData,
  sData,
  title,
}: {
  style: any;
  xData: string[];
  sData: string[];
  title: string;
}) {
  const nodeRef = useRef(null);
  useEffect(() => {
    echartInit(nodeRef.current, xData, sData, title);
  }, [xData, sData, title]);

  return <div ref={nodeRef} style={style}></div>;
}

export default Line;
