/// <reference types="react" />
import { LegendComponentOption } from 'echarts/components';
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
declare const EChartsPie: (props: PieBaseProps) => JSX.Element;
export default EChartsPie;
