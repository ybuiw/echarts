react echarts pie base
===
基础饼图echarts图表。提取常用api进行封装的echarts插件。

### 安装

```bash
npm install --save @ahwecharts/pie-base
```

### 引入

```jsx
import LineBaseEcharts from '@ahwecharts/pie-base';
or
import { PieBaseEcharts } from 'ahwecharts';
```

### 基本用法

<!--DemoStart,bgWhite,codePen,codeSandbox--> 
```js
import ReactDOM from 'react-dom';
import PieBaseEcharts from '@ahwecharts/line-base';

ReactDOM.render(
  <div>
    <PieBaseEcharts
      isSwitch
      label={{
        show: true,
        formatter: '{b}\n{d}',
        length: 20,
        length2: 50,
      }}
      legend={{
        show: true,
      }}
      series={{
        radius: ['40%', '70%'],
        center: ['50%', '40%']
      }}
      data={[
        { name: 'Mon', value: 150},
        { name: 'Tue', value: 230},
        { name: 'Wed', value: 224},
        { name: 'Thu', value: 218},
        { name: 'Fri', value: 135},
        { name: 'Sat', value: 147},
        { name: 'Sun', value: 260},
      ]}
    />
  </div>,
  _mount_
);
```
<!--End-->

## Props Line

| 参数 | 说明 | 类型 | 默认值 |
| -------- | -------- | -------- | -------- |
| width | 宽 | string | `100%` |
| height | 高 | string | `100%` |
| colors | 饼图颜色 | string[] | -- |
| label | 标签属性 | `LabelProps` | -- |
| series | 饼图属性 | `SeriesProps` | -- |
| legend | 图例属性 | `LegendComponentOption` | -- |
| isSwitch | 是否自动切换 Tooltip | boolean | `false` |
| switchTime | 自动切换事件 | number | `2000` |
| data | 数据 | any[] | [] |
| onClick | 点击 | (v: any) => void | -- |


## Props data[]

| 参数 | 说明 | 类型 | 默认值 |
| -------- | -------- | -------- | -------- |
| name | 健 | string | -- |
| value | 值 | number | -- |


## Props LabelProps

| 参数 | 说明 | 类型 | 默认值 |
| -------- | -------- | -------- | -------- |
| show | 是否显示标签 | boolean | `false` |
| color | 文字颜色 | string | `#333` |
| fontSize | 字体大小 | number / string | `14` |
| formatter | 标签内容格式 | string / Function | -- |
| edgeDistance | 文字边距 | number | -- |
| lineHeight | 文字行高 | number | `20` |
| minMargin | 标签之间间距 | number | `10` |
| length | 第一段引导线长度 | number | `10` |
| length2 | 第二段引导线长度 | number | `20` |


## Props SeriesProps

| 参数 | 说明 | 类型 | 默认值 |
| -------- | -------- | -------- | -------- |
| center | 拼图位置 | string / number / string[] / number[] | -- |
| radius | 饼图半径 | string / number / string[] / number[] | -- |

## Props LegendComponentOption

[`API`](https://echarts.apache.org/zh/option.html#legend)