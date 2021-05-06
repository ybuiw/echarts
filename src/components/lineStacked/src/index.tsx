import React, { useEffect, useRef, useState } from 'react';

import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, LegendComponent, GridComponentOption, LegendComponentOption } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use(
  [GridComponent, TooltipComponent, LegendComponent, LineChart, CanvasRenderer]
);

interface xAxisProps {
  color?: string;
  fontSize?: number;
  lineColor?: string | boolean;
  splitColor?: string | boolean;
  rotate?: number;
  isTick?: boolean;
}

interface yAxisProps {
  name?: string;
  color?: string;
  fontSize?: number;
  lineColor?: string | boolean;
  splitColor?: string | boolean;
}

interface areaStyleProps {
  show?: boolean;
  isGrad?: boolean;
}

interface LineStackedProps {
  data?: any[];
  width?: string;
  height?: string;
  /** 是否平滑曲线显示 */
  smooth?: boolean;
  /** 字体颜色 */
  color?: string;
  /** x, y轴轴线线条颜色 */
  lineColor?: string;
  /** x, y轴网格线条颜色 */
  splitColor?: string;
  /** 字体大小，默认14像素 */
  fontSize?: number | string;
  /** 折线颜色 */
  colors?: string[];
  /** 是否自动切换 Tooltip */
  isSwitch?: boolean;
  /** 自动切换事件 默认 2000（2S） */
  switchTime?: number;
  /** 图例组件, api: https://echarts.apache.org/zh/option.html#legend */
  legend?: LegendComponentOption;
  /** 区域填充样式 */
  areaStyle?: areaStyleProps;
  /**
   * X 轴配置
   * @color 文字颜色
   * @size 文字大小
   * @lineColor x轴轴线线条颜色, false 则不显示
   * @splitColor x轴网格线条颜色, false 则不显示, 默认true
   * @rotate 刻度标签旋转角度
   * @isTick 是否显示坐标轴刻度
   */
  xAxis?: xAxisProps;
  /**
   * y 轴配置
   * @name 坐标轴名称
   * @color 文字颜色
   * @size 文字大小
   * @lineColor y轴轴线线条颜色, false 则不显示
   * @splitColor y轴网格线条颜色, false 则不显示, 默认false
   */
  yAxis?: yAxisProps;
  grid?: GridComponentOption;
  onClick?: (v: any) => void;
}

const EChartsLine = (props: LineStackedProps) => {
  const {
    width = '100%',
    height = '100%',
    smooth = false,
    colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
    color = '#333',
    lineColor = '#abb9d0',
    splitColor = '#e0e7f3',
    fontSize = 14,
    legend = {},
    data = [],
    xAxis = {},
    yAxis = {},
    grid = {},
    areaStyle = {},
    isSwitch = false,
    switchTime = 2000,
    onClick
  } = props;

  const chartRef = useRef<any>(null)
  const [myChart, setMyChart] = useState<any>(null);
  const [isHigh] = useState<boolean>(false);
  const [highIndex, setHighIndex] = useState<number>(0);
  

  useEffect(() => {
    let _myChart: any = echarts.init(chartRef.current);
    setMyChart(_myChart)

    window.addEventListener("resize", _myChart.resize, false);
    window.addEventListener('load', _myChart.resize, false);
    _myChart.off('click');
    _myChart.on('click', (v: any) => {
      onClick?.(v.data);
      console.log(v.data)
    })
    return () => {
      console.log(2)
      window.removeEventListener('resize', _myChart.resize, false);
      window.removeEventListener('load', _myChart.resize, false);
      _myChart.dispose();
    }
  }, [])

  useEffect(() => {
    if (myChart) {
      myChart.clear();
      const _names: string[] = [];
      const _series: any[] = [];
      const _seriesName: string[] = [];
      data.length > 0 && data.map((item: any, index: number) => {
        _names.push(item.name);
        console.log(item)
        const _value: any[] = [];
        item.child.map((item2: any) => {
          _value.push(item2.value);
          _seriesName.push(item2.name);
        })
        let _areaColor: any;
        if (areaStyle.isGrad) {
          _areaColor = {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: colors[index]
            }, {
              offset: 1, color: 'rgba(255,255,255,0)'
            }],
            global: false
          }
        }
        _series.push({
          stack: 'stack',
          name: _seriesName[index],
          data: _value,
          type: 'line',
          smooth: smooth,
          areaStyle: areaStyle.show ? {
            color: _areaColor
          } : undefined,
          emphasis: {
            focus: 'series'
          },
          lineStyle: {
            width: 1
          }
        })
      })
      console.log(_series)
      const _grid: GridComponentOption = {...{
        top: '15%',
        bottom: '10%',
        left: '10%',
        right: '5%',
      }, ...grid};
      const _legend: LegendComponentOption = {...{
        show: true,
        icon: 'circle',
        data: _seriesName
      }, ...legend};
      const _xAxis: any = {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          color: xAxis.color ? xAxis.color : color,
          fontSize: xAxis.fontSize ? xAxis.fontSize : fontSize,
          rotate: xAxis.rotate ? xAxis.rotate : 0,
        },
        axisLine: {
          show: xAxis.lineColor === false ? false : true,
          lineStyle: {
            color: xAxis.lineColor ? xAxis.lineColor : lineColor,
          }
        },
        axisTick: {
          show: xAxis.isTick,
        },
        splitLine: {
          show: xAxis.splitColor ? true : false,
          lineStyle: {
            color: xAxis.splitColor ? xAxis.splitColor : splitColor,
          }
        },
        data: _names
      }
      const _yAxis: any = {
        name: yAxis.name,
        type: 'value',
        axisLabel: {
          color: yAxis.color ? yAxis.color : color,
          fontSize: yAxis.fontSize ? yAxis.fontSize : fontSize,
        },
        axisLine: {
          show: yAxis.lineColor === false ? false : true,
          lineStyle: {
            color: yAxis.lineColor ? yAxis.lineColor : lineColor,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: yAxis.splitColor === false ? false : true,
          lineStyle: {
            color: yAxis.splitColor ? yAxis.splitColor : splitColor,
          }
        },
      }
      
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0,
          enterable: true,
          axisPointer: {
            type: 'shadow'
          }
        },
        color: colors,
        grid: _grid,
        legend: _legend,
        xAxis: _xAxis,
        yAxis: _yAxis,
        series: _series
      }, true);
    }
  }, [myChart, data])
  
  useEffect(() => {
    let faultByHourTime: any;
    if (myChart && isSwitch && !isHigh && data.length > 0) {
      faultByHourTime = setInterval(() => {
        setHighIndex(n => {
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: n
          });
          if (n >= data.length - 1) {
            return 0;
          } else {
            return n + 1
          }
        })
      }, switchTime)
    }
    return () => {
      clearInterval(faultByHourTime)
    }
  }, [myChart, isSwitch, isHigh, data])

  return (
    <div ref={chartRef}
      style={{
        'width': width,
        'height': height
      }}>
    </div>
  )
}

export default EChartsLine;