/// <reference types="react" />
import { GridComponentOption } from 'echarts/components';
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
    color?: string[];
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
declare const EChartsBar: (props: LineBaseProps) => JSX.Element;
export default EChartsBar;
