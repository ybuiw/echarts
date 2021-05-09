react echarts bar stacked
===
多柱状图echarts图表。提取常用api进行封装的echarts插件。

### 安装

```bash
npm install --save @ahwecharts/bar-stacked
```

### 引入

```jsx
import BarStackedEcharts from '@ahwecharts/bar-stacked';
or
import { BarStackedEcharts } from 'ahwecharts';
```


### 基本用法

<!--DemoStart,bgWhite,codePen,codeSandbox--> 
```js
import ReactDOM from 'react-dom';
import BarStackedEcharts from '@ahwecharts/bar-stacked';

ReactDOM.render(
  <div>
    <BarStackedEcharts
      itemStyle={{
        barWidth: 20
      }}
      data={[
        { 
          name: '周一', 
          child: [
            { name: '邮件营销1', value: 120},
            { name: '邮件营销2', value: 132},
            { name: '邮件营销3', value: 101},
            { name: '邮件营销4', value: 134},
            { name: '邮件营销5', value: 90},
          ]
        },
        { 
          name: '周二', 
          child: [
            { name: '邮件营销1', value: 220},
            { name: '邮件营销2', value: 182},
            { name: '邮件营销3', value: 191},
            { name: '邮件营销4', value: 234},
            { name: '邮件营销5', value: 290},
          ]
        },
        { 
          name: '周三', 
          child: [
            { name: '邮件营销1', value: 150},
            { name: '邮件营销2', value: 232},
            { name: '邮件营销3', value: 201},
            { name: '邮件营销4', value: 154},
            { name: '邮件营销5', value: 190},
          ]
        }
      ]}
    />
  </div>,
  _mount_
);
```
<!--End-->

## Props Bar Stacked

| 参数 | 说明 | 类型 | 默认值 |
| -------- | -------- | -------- | -------- |
| width | 宽 | string | `100%` |
| height | 高 | string | `100%` |
| isHorizontal | 是否横排 | boolean | `false` |
| colors | 柱状图颜色 | string[] | -- |
| color | 文字颜色 | string | `#333` |
| lineColor | x, y轴轴线线条颜色 | string | `#abb9d0` |
| splitColor | x, y轴网格线条颜色 | string | `#e0e7f3` |
| fontSize | 字体大小 | number / string | `14` |
| grid | 组件容器 | `GridComponentOption` | `{}` |
| legend | 图例组件 | `LegendComponentOption` | `{}` |
| xAxis | X 轴配置 | `xAxisProps` | -- |
| yAxis | Y 轴配置 | `yAxisProps` | -- |
| areaStyle | 柱状图填充样式 | `areaStyleProps` | -- |
| itemStyle | 柱状图填充样式 | `itemStyleProps` | -- |
| isSwitch | 是否自动切换 Tooltip | boolean | `false` |
| switchTime | 自动切换时间 | number | `2000` |
| data | 数据 | any[] | [] |
| onClick | 点击 | (v: any) => void | -- |


## Props data[]

| 参数 | 说明 | 类型 | 默认值 |
| -------- | -------- | -------- | -------- |
| name | 健 | string | -- |
| child | 值 | any[{name: string, value: number}] | -- |

## Props xAxisProps

| 参数 | 说明 | 类型 | 默认值 |
| -------- | -------- | -------- | -------- |
| color | 文字颜色 | string | `#333` |
| fontSize | 字体大小 | number / string | `14` |
| lineColor | x轴轴线线条颜色, false 则不显示 | string / boolean | `false` |
| splitColor | x轴网格线条颜色, false 则不显示, 默认true | string / boolean | `true` |
| rotate | 刻度标签旋转角度 | number | `0` |
| isTick | 是否显示坐标轴刻度 | boolean | `false` |


## Props yAxisProps

| 参数 | 说明 | 类型 | 默认值 |
| -------- | -------- | -------- | -------- |
| name | 坐标轴名称 | string | -- |
| color | 文字颜色 | string | `#333` |
| fontSize | 字体大小 | number / string | `14` |
| lineColor | y轴轴线线条颜色, false 则不显示 | string / boolean | `false` |
| splitColor | y轴网格线条颜色, false 则不显示, 默认true | string / boolean | `true` |


## Props itemStyleProps

| 参数 | 说明 | 类型 | 默认值 |
| -------- | -------- | -------- | -------- |
| isStack | 是否叠加显示 | boolean | `false` |
| barWidth | 柱条的宽度 | number | -- |
| borderRadius | 柱条圆角半径 | number[] | -- |

## Props GridComponentOption

[`API`](https://echarts.apache.org/zh/option.html#grid)


## Props LegendComponentOption

[`API`](https://echarts.apache.org/zh/option.html#legend)