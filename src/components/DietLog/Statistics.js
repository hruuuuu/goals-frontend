import { React, useState, useEffect } from 'react';
import axios from 'axios';

import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';

import { API_URL } from '../../utils/config';

import MealGraph from './MealGraph';

function Statistics(props) {
  const { daySummary, mealDietlog, setMainTab } = props;
  const { calories, protein, fat, carb } = daySummary;

  const [tab, setTab] = useState(1);
  const [breakfast, setBreakfast] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carb: 0,
  });
  const [lunch, setLunch] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carb: 0,
  });
  const [dinner, setDinner] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carb: 0,
  });
  const [others, setOthers] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carb: 0,
  });

  const isFetchingMealDietlog = mealDietlog.length === 0;

  echarts.use([
    TitleComponent,
    TooltipComponent,
    PieChart,
    LegendComponent,
    SVGRenderer,
  ]);

  const handleSumMeal = (arr, data) => {
    return arr.reduce((prev, arr) => prev + Math.round(arr[data] * 10), 0) / 10;
  };

  const getDietlogFood = async (id, meal) => {
    const data = { id: id };
    try {
      const response = await axios.post(`${API_URL}/dietlog/food`, data, {
        withCredentials: true,
      });
      const foods = response.data;
      switch (meal) {
        case 'breakfast':
          setBreakfast({
            ...breakfast,
            calories: handleSumMeal(foods, 'calories'),
            protein: handleSumMeal(foods, 'protein'),
            fat: handleSumMeal(foods, 'fat'),
            carb: handleSumMeal(foods, 'carb'),
          });
          break;
        case 'lunch':
          setLunch({
            ...lunch,
            calories: handleSumMeal(foods, 'calories'),
            protein: handleSumMeal(foods, 'protein'),
            fat: handleSumMeal(foods, 'fat'),
            carb: handleSumMeal(foods, 'carb'),
          });
          break;
        case 'dinner':
          setDinner({
            ...dinner,
            calories: handleSumMeal(foods, 'calories'),
            protein: handleSumMeal(foods, 'protein'),
            fat: handleSumMeal(foods, 'fat'),
            carb: handleSumMeal(foods, 'carb'),
          });
          break;
        case 'others':
          setOthers({
            ...others,
            calories: handleSumMeal(foods, 'calories'),
            protein: handleSumMeal(foods, 'protein'),
            fat: handleSumMeal(foods, 'fat'),
            carb: handleSumMeal(foods, 'carb'),
          });
          break;
        default:
          return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dayData = [
    { value: protein, name: '?????????' },
    { value: fat, name: '??????' },
    { value: carb, name: '???????????????' },
  ];

  const mealData = [
    {
      value: breakfast.calories,
      name: '??????',
      itemStyle: { color: '#f8bc5d' },
    },
    { value: lunch.calories, name: '??????', itemStyle: { color: '#ef8b90' } },
    { value: dinner.calories, name: '??????', itemStyle: { color: '#76b8d3' } },
    { value: others.calories, name: '??????', itemStyle: { color: '#74b08d' } },
  ];

  const leftSeries = {
    name: '??????',
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
    data: dayData,
  };

  const rightSeries = {
    name: '??????',
    type: 'pie',
    center: ['75%', '50%'],
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
        borderWidth: 0,
      },
    },
    labelLine: {
      show: false,
    },
    data: mealData,
  };

  const option = {
    title: [
      {
        text: '???????????????????????????',
        top: '10%',
        left: '24%',
        textAlign: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#6b9c66',
        },
      },
      {
        text: '??????????????????????????????',
        subtext: `?????????${calories}???`,
        top: '10%',
        left: '74%',
        textAlign: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#6b9c66',
        },
      },
    ],
    color: ['#76b8d3', '#f8bc5d', '#ef8b90'],
    tooltip: {
      trigger: 'item',
    },
    legend: [
      {
        top: '85%',
        left: '3.5%',
        orient: 'horizontal',
        icon: 'circle',
        width: '45%',
        data: dayData,
      },
      {
        top: '85%',
        left: '58%',
        orient: 'horizontal',
        icon: 'circle',
        width: '45%',
        data: mealData,
      },
    ],
    series: [leftSeries, rightSeries],
  };

  const tabs = [
    { id: 1, name: '????????????' },
    { id: 2, name: '??????' },
    { id: 3, name: '??????' },
    { id: 4, name: '??????' },
    { id: 5, name: '??????' },
  ];

  const graphLayout = () => {
    switch (tab) {
      case 1:
        return (
          <>
            <ReactEChartsCore
              echarts={echarts}
              option={option}
              notMerge={true}
              lazyUpdate={true}
              opts={{ renderer: 'svg', height: '510' }}
            />
          </>
        );
      case 2:
        return (
          <>
            <MealGraph
              statics={breakfast}
              rightSeries={rightSeries}
              mealData={mealData}
              title="????????????????????????"
              setMainTab={setMainTab}
            />
          </>
        );
      case 3:
        return (
          <>
            <MealGraph
              statics={lunch}
              rightSeries={rightSeries}
              mealData={mealData}
              title="????????????????????????"
              setMainTab={setMainTab}
            />
          </>
        );
      case 4:
        return (
          <>
            <MealGraph
              statics={dinner}
              rightSeries={rightSeries}
              mealData={mealData}
              title="????????????????????????"
              setMainTab={setMainTab}
            />
          </>
        );
      case 5:
        return (
          <>
            <MealGraph
              statics={others}
              rightSeries={rightSeries}
              mealData={mealData}
              title="????????????????????????"
              setMainTab={setMainTab}
            />
          </>
        );
      default:
        return dayData;
    }
  };

  useEffect(() => {
    if (!isFetchingMealDietlog) {
      mealDietlog.forEach((meal) => {
        switch (meal.category_id) {
          case 1:
            getDietlogFood(meal.id, 'breakfast');
            break;
          case 2:
            getDietlogFood(meal.id, 'lunch');
            break;
          case 3:
            getDietlogFood(meal.id, 'dinner');
            break;
          case 4:
            getDietlogFood(meal.id, 'others');
            break;
          default:
            return;
        }
      });
    }
  }, [mealDietlog]);

  return (
    <>
      <div className="d-flex justify-content-center">
        {tabs.map((item) => {
          const { id, name } = item;
          return (
            <button
              key={id}
              type="button"
              className={`e-btn e-btn--plain e-btn--secondary e-btn--medium l-dietlog__btn me-2 ${
                tab === id ? 'active' : ''
              }`}
              onClick={() => {
                setTab(id);
              }}
            >
              {name}
            </button>
          );
        })}
      </div>
      {graphLayout()}
    </>
  );
}

export default Statistics;
