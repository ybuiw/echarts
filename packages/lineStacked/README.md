react echarts line stacked
===
多线性echarts图表。提取常用api进行封装的echarts插件。

### 安装

```bash
npm install --save @ahwecharts/line-stacked
```

### 引入

```jsx
import LineStackedEcharts from '@ahwecharts/line-stacked';
or
import { LineStackedEcharts } from 'ahwecharts';
```

### 基本用法

<!--DemoStart,bgWhite,codePen,codeSandbox--> 
```js
import ReactDOM from 'react-dom';
import LineStackedEcharts from '@ahwecharts/line-stacked';

ReactDOM.render(
  <div>
    <LineStackedEcharts
      smooth
      areaStyle={{
        show: true,
        isGrad: true
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
        },
        { 
          name: '周四', 
          child: [
            { name: '邮件营销1', value: 320},
            { name: '邮件营销2', value: 332},
            { name: '邮件营销3', value: 301},
            { name: '邮件营销4', value: 334},
            { name: '邮件营销5', value: 390},
          ]
        },
        { 
          name: '周五', 
          child: [
            { name: '邮件营销1', value: 820},
            { name: '邮件营销2', value: 932},
            { name: '邮件营销3', value: 901},
            { name: '邮件营销4', value: 934},
            { name: '邮件营销5', value: 1290},
          ]
        },
      ]}
    />
  </div>,
  _mount_
);
```
<!--End-->

## Props Line Stacked

| 参数 | 说明 | 类型 | 默认值 |
| -------- | -------- | -------- | -------- |
| width | 宽 | string | `100%` |
| height | 高 | string | `100%` |
| smooth | 是否平滑曲线显示 | boolean | `false` |
| colors | 线条颜色 | string[] | -- |
| color | 文字颜色 | string | `#333` |
| lineColor | x, y轴轴线线条颜色 | string | `#abb9d0` |
| splitColor | x, y轴网格线条颜色 | string | `#e0e7f3` |
| fontSize | 字体大小 | number / string | `14` |
| grid | 组件容器 | `GridComponentOption` | `{}` |
| legend | 图例组件 | `GridComponentOption` | `{}` |
| xAxis | X 轴配置 | `xAxisProps` | -- |
| yAxis | Y 轴配置 | `yAxisProps` | -- |
| areaStyle | 区域填充样式 | `areaStyleProps` | -- |
| isSwitch | 是否自动切换 Tooltip | boolean | `false` |
| switchTime | 自动切换事件 | number | `2000` |
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

## Props areaStyleProps

| 参数 | 说明 | 类型 | 默认值 |
| -------- | -------- | -------- | -------- |
| show | 是否显示填充样式 | boolean | `false` |
| isGrad | 是否渐变 | string | `#333` |

## Props LegendComponentOption

[`API`](https://echarts.apache.org/zh/option.html#legend)