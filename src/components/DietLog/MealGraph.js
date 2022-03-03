import React from 'react';

import ReactECharts from 'echarts-for-react';

function MealGraph(props) {
  const { statics, graphRightSeries, mealData, title } = props;
  const {
    calories,
    protien,
    fat,
    saturated_fat,
    trans_fat,
    carb,
    sugar,
    sodium,
  } = statics;

  const data = [
    { value: protien, name: '蛋白質', itemStyle: { color: '#76b8d3' } },
    { value: fat, name: '脂肪', itemStyle: { color: '#f8bc5d' } },
    {
      value: saturated_fat,
      name: '飽和脂肪',
      itemStyle: { color: '#95b06b' },
    },
    {
      value: trans_fat,
      name: '反式脂肪',
      itemStyle: { color: '#3aa1cb' },
    },
    {
      value: carb,
      name: '碳水化合物',
      itemStyle: { color: '#ef8b90' },
    },
    { value: sugar, name: '糖', itemStyle: { color: '#74b08d' } },
    {
      value: sodium / 1000,
      name: '鈉',
      itemStyle: { color: '#56879b' },
    },
  ];

  const leftSeries = {
    name: '成分',
    type: 'pie',
    center: ['25%', '50%'],
    radius: ['40%', '60%'],
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
    legend: {
      bottom: '0',
      left: '0',
      orient: 'horizontal',
      width: '50%',
    },
    data: data,
  };

  const rightSeries = {
    data: [protien, fat, saturated_fat, trans_fat, carb, sugar, sodium],
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
      top: '6%',
      left: '50%',
      textAlign: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#6b9c66',
      },
    },
    color: [
      '#76b8d3',
      '#f8bc5d',
      '#95b06b',
      '#3aa1cb',
      '#ef8b90',
      '#74b08d',
      '#bdbdbd',
    ],
    tooltip: {
      trigger: 'item',
    },
    grid: {
      top: '20%',
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
        width: '50%',
        data: data,
      },
      {
        top: '85%',
        left: '58%',
        orient: 'horizontal',
        icon: 'circle',
        width: '50%',
        data: data,
      },
    ],
    xAxis: {
      type: 'category',
      show: false,
      data: [
        '蛋白質',
        '脂肪',
        '飽和脂肪',
        '反式脂肪',
        '碳水化合物',
        '糖',
        '鈉',
      ],
    },
    yAxis: {
      type: 'value',
    },
    series: [leftSeries, rightSeries],
  };

  return (
    <>
      <ReactECharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        opts={{ renderer: 'svg', height: '510' }}
      />
    </>
  );
}

export default MealGraph;
