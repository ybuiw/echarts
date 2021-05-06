import React, { useEffect, useRef, useState } from 'react';

import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent, LegendComponentOption  } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use(
  [TooltipComponent, LegendComponent, PieChart, CanvasRenderer]
);

interface LabelProps {
  show?: boolean;
  /** 字体颜色 */
  color?: string;
  /** 字体大小，默认14像素 */
  fontSize?: number | string;
  /** 
   * 标签内容格式
   * @{a}：系列名。
   * @{b}：数据名。
   * @{c}：数据值。
   * @{d}：百分比。
   */
  formatter?: string | Function;
  edgeDistance?: number | string;
  /** 行高 */
  lineHeight?: number;
  /** 第一段引导线长度 */
  length?: number;
  /** 第二段引导线长度 */
  length2?: number;
  /** 标签之间间距，默认10像素 */
  minMargin?: number;
}

interface SeriesProps {
  center?: string[] | number | string;
  radius?: string[] | number[] | number | string;
}

interface PieBaseProps {
  data?: any[];
  width?: string;
  height?: string;
  /** 饼图颜色 */
  colors?: string[];
  label?: LabelProps;
  /** 饼图属性 */
  series?: SeriesProps;
  /** 图例组件, api: https://echarts.apache.org/zh/option.html#legend */
  legend?: LegendComponentOption;
  /** 是否自动切换 Tooltip */
  isSwitch?: boolean;
  /** 自动切换事件 默认 2000（2S） */
  switchTime?: number;
  onClick?: (v: any) => void;
}

const EChartsPie = (props: PieBaseProps) => {
  const {
    width = '100%',
    height = '100%',
    colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
    label = {},
    series = {},
    legend = {},
    data = [],
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
      window.removeEventListener('resize', _myChart.resize, false);
      window.removeEventListener('load', _myChart.resize, false);
      _myChart.dispose();
    }
  }, [])

  useEffect(() => {
    if (myChart) {
      myChart.clear();
      const _names: string[] = [];
      data.length > 0 && data.map((item: any) => {
        _names.push(item.name);
      })
      const _legend: LegendComponentOption = {...{
        bottom: '5%',
        left: 'center',
        icon: 'circle',
        show: true,
      }, ...legend};
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          transitionDuration: 0,
        },
        legend: _legend,
        color: colors,
        series: [
          {
            data: data,
            type: 'pie',
            radius: series.radius ? series.radius : '70%',
            center: series.center ? series.center : ['50%', '50%'],
            label: {
              show: label.show,
              alignTo: label.edgeDistance ? 'edge' : 'none',
              fontSize: label.fontSize,
              edgeDistance: label.edgeDistance,
              minMargin: label.minMargin ? label.minMargin : 10,
              color: label.color,
              lineHeight: label.lineHeight ? label.lineHeight : 20,
              formatter: label.formatter ? label.formatter : false
            },
            labelLine: {
              length: label.length ? label.length : 10,
              length2: label.length2 ? label.length2 : 20,
            }
          }
        ]
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

export default EChartsPie;