import React from 'react';

import ReactECharts from 'echarts-for-react';

function MealGraph(props) {
  const { statics, graphRightSeries, mealData, title, setMainTab } = props;
  const { calories, protein, fat, carb } = statics;

  const isEmptyStatistics = statics.calories === 0;

  const data = [
    { value: protein, name: '蛋白質', itemStyle: { color: '#76b8d3' } },
    { value: fat, name: '脂肪', itemStyle: { color: '#f8bc5d' } },
    {
      value: carb,
      name: '碳水化合物',
      itemStyle: { color: '#ef8b90' },
    },
  ];

  const leftSeries = {
    name: '成分',
    type: 'pie',
    center: ['25%', '50%'],
    radius: ['30%', '50%'],
    avoidLabelOverlap: false,
    itemStyle: {
      borderRadius: 10,
      borderColor: '#fff',
      borderWidth: 5,
    },
    label: {
      show: false,
      position: 'center',
    },
    emphasis: {
      label: {
        show: true,
        fontSize: '18',
        fontWeight: 'normal',
        textBorderWidth: 0,
      },
    },
    labelLine: {
      show: false,
    },
    data: data,
  };

  const rightSeries = {
    data: [protein, fat, carb],
    type: 'bar',
    colorBy: data,
    showBackground: true,
    backgroundStyle: {
      color: '#f2f2f2',
      borderRadius: 5,
    },
    label: {
      show: true,
    },
  };

  const option = {
    title: {
      text: title,
      subtext: `總熱量${calories}卡`,
      top: '10%',
      left: '50%',
      textAlign: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6b9c66',
      },
    },
    color: ['#76b8d3', '#f8bc5d', '#ef8b90'],
    tooltip: {
      trigger: 'item',
    },
    grid: {
      top: '25%',
      right: '3.5%',
      bottom: '20%',
      left: '58%',
      containLabel: true,
    },
    legend: [
      {
        top: '85%',
        left: '3.5%',
        orient: 'horizontal',
        icon: 'circle',
        width: '45%',
        data: data,
      },
      {
        top: '85%',
        left: '58%',
        orient: 'horizontal',
        icon: 'circle',
        width: '45%',
        data: data,
      },
    ],
    xAxis: {
      type: 'category',
      show: false,
      data: ['蛋白質', '脂肪', '碳水化合物'],
    },
    yAxis: {
      type: 'value',
    },
    series: [leftSeries, rightSeries],
  };

  return (
    <>
      <div className="position-relative">
        {isEmptyStatistics && (
          <div className="c-cover">
            <h3>添加日誌以獲得數據</h3>
            <button
              className="e-btn e-btn--primary e-btn--medium c-cover__action"
              onClick={() => {
                setMainTab(1);
              }}
            >
              添加日誌
            </button>
          </div>
        )}
        <ReactECharts
          option={option}
          notMerge={true}
          lazyUpdate={true}
          opts={{ renderer: 'svg', height: '510' }}
        />
      </div>
    </>
  );
}

export default MealGraph;
