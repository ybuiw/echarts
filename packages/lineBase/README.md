react echarts line base
===
基础线性echarts图表。提取常用api进行封装的echarts插件。

### 安装

```bash
npm install --save @ahwecharts/line-base
```

### 引入

```jsx
import LineBaseEcharts from '@ahwecharts/line-base';
or
import { LineBaseEcharts } from 'ahwecharts';
```

### 基本用法

<!--DemoStart,bgWhite,codePen,codeSandbox--> 
```js
import ReactDOM from 'react-dom';
import LineBaseEcharts from '@ahwecharts/line-base';

ReactDOM.render(
  <div>
    <LineBaseEcharts
      smooth
      colors={['#f00']}
      areaStyle={{
        show: true,
        isGrad: true,
        color: ['#ff0', 'rgba(255, 255, 255, 0)']
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
| smooth | 是否平滑曲线显示 | boolean | `false` |
| colors | 线条颜色 | string[] | -- |
| color | 文字颜色 | string | `#333` |
| lineColor | x, y轴轴线线条颜色 | string | `#abb9d0` |
| splitColor | x, y轴网格线条颜色 | string | `#e0e7f3` |
| fontSize | 字体大小 | number / string | `14` |
| grid | 组件容器 | `GridComponentOption` | `{}` |
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
| value | 值 | number | -- |


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
| color | 渐变颜色不填则默认线条颜色 | string[color, color] | -- |