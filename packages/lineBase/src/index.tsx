import React, { useEffect, useRef } from 'react';

import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent, GridComponentOption } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use(
  [GridComponent, TooltipComponent, LineChart, CanvasRenderer]
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
  color?: string[]
}

interface LineBaseProps {
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

const EChartsBar = (props: LineBaseProps) => {
  const {
    width = '100%',
    height = '100%',
    smooth = false,
    colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
    color = '#333',
    lineColor = '#abb9d0',
    splitColor = '#e0e7f3',
    fontSize = 14,
    data = [],
    xAxis = {},
    yAxis = {},
    grid = {},
    areaStyle = {},
    onClick
  } = props;

  console.log(grid)

  const chartRef = useRef<any>(null)
  let myChart: any = null;
  useEffect(() => {
    myChart = echarts.init(chartRef.current);
    myChart.clear();
    const _names: string[] = [];
    data.length > 0 && data.map((item: any) => {
      _names.push(item.name);
    })
    const _grid: GridComponentOption = {...{
      top: '5%',
      bottom: '10%',
      left: '10%',
      right: '5%',
    }, ...grid};
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
    let _areaColor: any;
    if (areaStyle.isGrad) {
      if (Array.isArray(areaStyle.color) && areaStyle.color.length > 1) {
        _areaColor = {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: areaStyle.color[0]
          }, {
              offset: 1, color: areaStyle.color[1]
          }],
          global: false
        }
      } else {
        _areaColor = {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: colors[0]
          }, {
            offset: 1, color: 'rgba(255,255,255,0)'
          }],
          global: false
        }
      }
    }
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        transitionDuration: 0,
        axisPointer: {
          type: 'shadow'
        }
      },
      color: colors,
      grid: _grid,
      xAxis: _xAxis,
      yAxis: _yAxis,
      series: [
        {
          data: data,
          type: 'line',
          smooth: smooth,
          areaStyle: areaStyle.show ? {
            color: _areaColor
          } : undefined,
          lineStyle: {
            width: 1
          }
        }
      ]
    }, true);
    window.addEventListener("resize", myChart.resize);
    window.addEventListener('load', myChart.resize, false);
    myChart.off('click');
    myChart.on('click', (v: any) => {
      onClick?.(v.data);
      console.log(v.data)
    })
    return () => {
      window.removeEventListener('resize', myChart.resize, false);
      window.removeEventListener('load', myChart.resize, false);
      myChart.dispose();
      myChart = null;
    }
  }, [data])
  
  return (
    <div ref={chartRef}  style={{
      'width': width,
      'height': height }}>
    </div>
  )
}

export default EChartsBar;