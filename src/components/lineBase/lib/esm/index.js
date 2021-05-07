import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts/core';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([GridComponent, TooltipComponent, LineChart, CanvasRenderer]);

var EChartsLine = function EChartsLine(props) {
  var _props$width = props.width,
      width = _props$width === void 0 ? '100%' : _props$width,
      _props$height = props.height,
      height = _props$height === void 0 ? '100%' : _props$height,
      _props$smooth = props.smooth,
      smooth = _props$smooth === void 0 ? false : _props$smooth,
      _props$colors = props.colors,
      colors = _props$colors === void 0 ? ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'] : _props$colors,
      _props$color = props.color,
      color = _props$color === void 0 ? '#333' : _props$color,
      _props$lineColor = props.lineColor,
      lineColor = _props$lineColor === void 0 ? '#abb9d0' : _props$lineColor,
      _props$splitColor = props.splitColor,
      splitColor = _props$splitColor === void 0 ? '#e0e7f3' : _props$splitColor,
      _props$fontSize = props.fontSize,
      fontSize = _props$fontSize === void 0 ? 14 : _props$fontSize,
      _props$data = props.data,
      data = _props$data === void 0 ? [] : _props$data,
      _props$xAxis = props.xAxis,
      xAxis = _props$xAxis === void 0 ? {} : _props$xAxis,
      _props$yAxis = props.yAxis,
      yAxis = _props$yAxis === void 0 ? {} : _props$yAxis,
      _props$grid = props.grid,
      grid = _props$grid === void 0 ? {} : _props$grid,
      _props$areaStyle = props.areaStyle,
      areaStyle = _props$areaStyle === void 0 ? {} : _props$areaStyle,
      _props$isSwitch = props.isSwitch,
      isSwitch = _props$isSwitch === void 0 ? false : _props$isSwitch,
      _props$switchTime = props.switchTime,
      switchTime = _props$switchTime === void 0 ? 2000 : _props$switchTime,
      onClick = props.onClick;
  var chartRef = useRef(null);

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      myChart = _useState2[0],
      setMyChart = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 1),
      isHigh = _useState4[0];

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      highIndex = _useState6[0],
      setHighIndex = _useState6[1];

  useEffect(function () {
    var _myChart = echarts.init(chartRef.current);

    setMyChart(_myChart);
    window.addEventListener("resize", _myChart.resize, false);
    window.addEventListener('load', _myChart.resize, false);

    _myChart.off('click');

    _myChart.on('click', function (v) {
      onClick === null || onClick === void 0 ? void 0 : onClick(v.data);
      console.log(v.data);
    });

    return function () {
      console.log(2);
      window.removeEventListener('resize', _myChart.resize, false);
      window.removeEventListener('load', _myChart.resize, false);

      _myChart.dispose();
    };
  }, []);
  useEffect(function () {
    if (myChart) {
      myChart.clear();
      var _names = [];
      data.length > 0 && data.map(function (item) {
        _names.push(item.name);
      });

      var _grid = _objectSpread(_objectSpread({}, {
        top: '5%',
        bottom: '10%',
        left: '10%',
        right: '5%'
      }), grid);

      var _xAxis = {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          color: xAxis.color ? xAxis.color : color,
          fontSize: xAxis.fontSize ? xAxis.fontSize : fontSize,
          rotate: xAxis.rotate ? xAxis.rotate : 0
        },
        axisLine: {
          show: xAxis.lineColor === false ? false : true,
          lineStyle: {
            color: xAxis.lineColor ? xAxis.lineColor : lineColor
          }
        },
        axisTick: {
          show: xAxis.isTick
        },
        splitLine: {
          show: xAxis.splitColor ? true : false,
          lineStyle: {
            color: xAxis.splitColor ? xAxis.splitColor : splitColor
          }
        },
        data: _names
      };
      var _yAxis = {
        name: yAxis.name,
        type: 'value',
        axisLabel: {
          color: yAxis.color ? yAxis.color : color,
          fontSize: yAxis.fontSize ? yAxis.fontSize : fontSize
        },
        axisLine: {
          show: yAxis.lineColor === false ? false : true,
          lineStyle: {
            color: yAxis.lineColor ? yAxis.lineColor : lineColor
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: yAxis.splitColor === false ? false : true,
          lineStyle: {
            color: yAxis.splitColor ? yAxis.splitColor : splitColor
          }
        }
      };

      var _areaColor;

      if (areaStyle.isGrad) {
        if (Array.isArray(areaStyle.color) && areaStyle.color.length > 1) {
          _areaColor = {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: areaStyle.color[0]
            }, {
              offset: 1,
              color: areaStyle.color[1]
            }],
            global: false
          };
        } else {
          _areaColor = {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: colors[0]
            }, {
              offset: 1,
              color: 'rgba(255,255,255,0)'
            }],
            global: false
          };
        }
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
        xAxis: _xAxis,
        yAxis: _yAxis,
        series: [{
          data: data,
          type: 'line',
          smooth: smooth,
          areaStyle: areaStyle.show ? {
            color: _areaColor
          } : undefined,
          lineStyle: {
            width: 1
          }
        }]
      }, true);
    }
  }, [myChart, data]);
  useEffect(function () {
    var faultByHourTime;

    if (myChart && isSwitch && !isHigh && data.length > 0) {
      faultByHourTime = setInterval(function () {
        setHighIndex(function (n) {
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: n
          });

          if (n >= data.length - 1) {
            return 0;
          } else {
            return n + 1;
          }
        });
      }, switchTime);
    }

    return function () {
      clearInterval(faultByHourTime);
    };
  }, [myChart, isSwitch, isHigh, data]);
  return /*#__PURE__*/React.createElement("div", {
    ref: chartRef,
    style: {
      'width': width,
      'height': height
    }
  });
};

export default EChartsLine;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJ1c2VTdGF0ZSIsImVjaGFydHMiLCJHcmlkQ29tcG9uZW50IiwiVG9vbHRpcENvbXBvbmVudCIsIkxpbmVDaGFydCIsIkNhbnZhc1JlbmRlcmVyIiwidXNlIiwiRUNoYXJ0c0xpbmUiLCJwcm9wcyIsIndpZHRoIiwiaGVpZ2h0Iiwic21vb3RoIiwiY29sb3JzIiwiY29sb3IiLCJsaW5lQ29sb3IiLCJzcGxpdENvbG9yIiwiZm9udFNpemUiLCJkYXRhIiwieEF4aXMiLCJ5QXhpcyIsImdyaWQiLCJhcmVhU3R5bGUiLCJpc1N3aXRjaCIsInN3aXRjaFRpbWUiLCJvbkNsaWNrIiwiY2hhcnRSZWYiLCJteUNoYXJ0Iiwic2V0TXlDaGFydCIsImlzSGlnaCIsImhpZ2hJbmRleCIsInNldEhpZ2hJbmRleCIsIl9teUNoYXJ0IiwiaW5pdCIsImN1cnJlbnQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVzaXplIiwib2ZmIiwib24iLCJ2IiwiY29uc29sZSIsImxvZyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkaXNwb3NlIiwiY2xlYXIiLCJfbmFtZXMiLCJsZW5ndGgiLCJtYXAiLCJpdGVtIiwicHVzaCIsIm5hbWUiLCJfZ3JpZCIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsIl94QXhpcyIsInR5cGUiLCJib3VuZGFyeUdhcCIsImF4aXNMYWJlbCIsInJvdGF0ZSIsImF4aXNMaW5lIiwic2hvdyIsImxpbmVTdHlsZSIsImF4aXNUaWNrIiwiaXNUaWNrIiwic3BsaXRMaW5lIiwiX3lBeGlzIiwiX2FyZWFDb2xvciIsImlzR3JhZCIsIkFycmF5IiwiaXNBcnJheSIsIngiLCJ5IiwieDIiLCJ5MiIsImNvbG9yU3RvcHMiLCJvZmZzZXQiLCJnbG9iYWwiLCJzZXRPcHRpb24iLCJ0b29sdGlwIiwidHJpZ2dlciIsInRyYW5zaXRpb25EdXJhdGlvbiIsImVudGVyYWJsZSIsImF4aXNQb2ludGVyIiwic2VyaWVzIiwidW5kZWZpbmVkIiwiZmF1bHRCeUhvdXJUaW1lIiwic2V0SW50ZXJ2YWwiLCJuIiwiZGlzcGF0Y2hBY3Rpb24iLCJzZXJpZXNJbmRleCIsImRhdGFJbmRleCIsImNsZWFySW50ZXJ2YWwiXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBT0EsS0FBUCxJQUFnQkMsU0FBaEIsRUFBMkJDLE1BQTNCLEVBQW1DQyxRQUFuQyxRQUFtRCxPQUFuRDtBQUVBLE9BQU8sS0FBS0MsT0FBWixNQUF5QixjQUF6QjtBQUNBLFNBQVNDLGFBQVQsRUFBd0JDLGdCQUF4QixRQUFxRSxvQkFBckU7QUFDQSxTQUFTQyxTQUFULFFBQTBCLGdCQUExQjtBQUNBLFNBQVNDLGNBQVQsUUFBK0IsbUJBQS9CO0FBRUFKLE9BQU8sQ0FBQ0ssR0FBUixDQUNFLENBQUNKLGFBQUQsRUFBZ0JDLGdCQUFoQixFQUFrQ0MsU0FBbEMsRUFBNkNDLGNBQTdDLENBREY7O0FBd0VBLElBQU1FLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNDLEtBQUQsRUFBMEI7QUFDNUMscUJBaUJJQSxLQWpCSixDQUNFQyxLQURGO0FBQUEsTUFDRUEsS0FERiw2QkFDVSxNQURWO0FBQUEsc0JBaUJJRCxLQWpCSixDQUVFRSxNQUZGO0FBQUEsTUFFRUEsTUFGRiw4QkFFVyxNQUZYO0FBQUEsc0JBaUJJRixLQWpCSixDQUdFRyxNQUhGO0FBQUEsTUFHRUEsTUFIRiw4QkFHVyxLQUhYO0FBQUEsc0JBaUJJSCxLQWpCSixDQUlFSSxNQUpGO0FBQUEsTUFJRUEsTUFKRiw4QkFJVyxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLFNBQXZCLEVBQWtDLFNBQWxDLEVBQTZDLFNBQTdDLEVBQXdELFNBQXhELEVBQW1FLFNBQW5FLEVBQThFLFNBQTlFLEVBQXlGLFNBQXpGLENBSlg7QUFBQSxxQkFpQklKLEtBakJKLENBS0VLLEtBTEY7QUFBQSxNQUtFQSxLQUxGLDZCQUtVLE1BTFY7QUFBQSx5QkFpQklM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TyxJQUFJSixRQUFYLElBQXVCLENBQUNNLE1BQXhCLElBQWtDWCxJQUFJLENBQUM2QixNQUFMLEdBQWMsQ0FBcEQsRUFBdUQ7QUFDckR5QyxNQUFBQSxlQUFlLEdBQUdDLFdBQVcsQ0FBQyxZQUFNO0FBQ2xDMUQsUUFBQUEsWUFBWSxDQUFDLFVBQUEyRCxDQUFDLEVBQUk7QUFDaEIvRCxVQUFBQSxPQUFPLENBQUNnRSxjQUFSLENBQXVCO0FBQ3JCakMsWUFBQUEsSUFBSSxFQUFFLFNBRGU7QUFFckJrQyxZQUFBQSxXQUFXLEVBQUUsQ0FGUTtBQUdyQkMsWUFBQUEsU0FBUyxFQUFFSDtBQUhVLFdBQXZCOztBQUtBLGNBQUlBLENBQUMsSUFBSXhFLElBQUksQ0FBQzZCLE1BQUwsR0FBYyxDQUF2QixFQUEwQjtBQUN4QixtQkFBTyxDQUFQO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsbUJBQU8yQyxDQUFDLEdBQUcsQ0FBWDtBQUNEO0FBQ0YsU0FYVyxDQUFaO0FBWUQsT0FiNEIsRUFhMUJsRSxVQWIwQixDQUE3QjtBQWNEOztBQUNELFdBQU8sWUFBTTtBQUNYc0UsTUFBQUEsYUFBYSxDQUFDTixlQUFELENBQWI7QUFDRCxLQUZEO0FBR0QsR0FyQlEsRUFxQk4sQ0FBQzdELE9BQUQsRUFBVUosUUFBVixFQUFvQk0sTUFBcEIsRUFBNEJYLElBQTVCLENBckJNLENBQVQ7QUF1QkEsc0JBQ0U7QUFBSyxJQUFBLEdBQUcsRUFBRVEsUUFBVjtBQUNFLElBQUEsS0FBSyxFQUFFO0FBQ0wsZUFBU2hCLEtBREo7QUFFTCxnQkFBVUM7QUFGTDtBQURULElBREY7QUFRRCxDQXZNRDs7QUF5TUEsZUFBZUgsV0FBZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCAqIGFzIGVjaGFydHMgZnJvbSAnZWNoYXJ0cy9jb3JlJztcbmltcG9ydCB7IEdyaWRDb21wb25lbnQsIFRvb2x0aXBDb21wb25lbnQsIEdyaWRDb21wb25lbnRPcHRpb24gfSBmcm9tICdlY2hhcnRzL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgTGluZUNoYXJ0IH0gZnJvbSAnZWNoYXJ0cy9jaGFydHMnO1xuaW1wb3J0IHsgQ2FudmFzUmVuZGVyZXIgfSBmcm9tICdlY2hhcnRzL3JlbmRlcmVycyc7XG5cbmVjaGFydHMudXNlKFxuICBbR3JpZENvbXBvbmVudCwgVG9vbHRpcENvbXBvbmVudCwgTGluZUNoYXJ0LCBDYW52YXNSZW5kZXJlcl1cbik7XG5cbmludGVyZmFjZSB4QXhpc1Byb3BzIHtcbiAgY29sb3I/OiBzdHJpbmc7XG4gIGZvbnRTaXplPzogbnVtYmVyO1xuICBsaW5lQ29sb3I/OiBzdHJpbmcgfCBib29sZWFuO1xuICBzcGxpdENvbG9yPzogc3RyaW5nIHwgYm9vbGVhbjtcbiAgcm90YXRlPzogbnVtYmVyO1xuICBpc1RpY2s/OiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgeUF4aXNQcm9wcyB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGNvbG9yPzogc3RyaW5nO1xuICBmb250U2l6ZT86IG51bWJlcjtcbiAgbGluZUNvbG9yPzogc3RyaW5nIHwgYm9vbGVhbjtcbiAgc3BsaXRDb2xvcj86IHN0cmluZyB8IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBhcmVhU3R5bGVQcm9wcyB7XG4gIHNob3c/OiBib29sZWFuO1xuICBpc0dyYWQ/OiBib29sZWFuO1xuICBjb2xvcj86IHN0cmluZ1tdXG59XG5cbmludGVyZmFjZSBMaW5lQmFzZVByb3BzIHtcbiAgZGF0YT86IGFueVtdO1xuICB3aWR0aD86IHN0cmluZztcbiAgaGVpZ2h0Pzogc3RyaW5nO1xuICAvKiog5piv5ZCm5bmz5ruR5puy57q/5pi+56S6ICovXG4gIHNtb290aD86IGJvb2xlYW47XG4gIC8qKiDlrZfkvZPpopzoibIgKi9cbiAgY29sb3I/OiBzdHJpbmc7XG4gIC8qKiB4LCB56L206L2057q/57q/5p2h6aKc6ImyICovXG4gIGxpbmVDb2xvcj86IHN0cmluZztcbiAgLyoqIHgsIHnovbTnvZHmoLznur/mnaHpopzoibIgKi9cbiAgc3BsaXRDb2xvcj86IHN0cmluZztcbiAgLyoqIOWtl+S9k+Wkp+Wwj++8jOm7mOiupDE05YOP57SgICovXG4gIGZvbnRTaXplPzogbnVtYmVyIHwgc3RyaW5nO1xuICAvKiog5oqY57q/6aKc6ImyICovXG4gIGNvbG9ycz86IHN0cmluZ1tdO1xuICAvKiog5piv5ZCm6Ieq5Yqo5YiH5o2iIFRvb2x0aXAgKi9cbiAgaXNTd2l0Y2g/OiBib29sZWFuO1xuICAvKiog6Ieq5Yqo5YiH5o2i5LqL5Lu2IOm7mOiupCAyMDAw77yIMlPvvIkgKi9cbiAgc3dpdGNoVGltZT86IG51bWJlcjtcbiAgLyoqIOWMuuWfn+Whq+WFheagt+W8jyAqL1xuICBhcmVhU3R5bGU/OiBhcmVhU3R5bGVQcm9wcztcbiAgLyoqXG4gICAqIFgg6L206YWN572uXG4gICAqIEBjb2xvciDmloflrZfpopzoibJcbiAgICogQHNpemUg5paH5a2X5aSn5bCPXG4gICAqIEBsaW5lQ29sb3IgeOi9tOi9tOe6v+e6v+adoeminOiJsiwgZmFsc2Ug5YiZ5LiN5pi+56S6XG4gICAqIEBzcGxpdENvbG9yIHjovbTnvZHmoLznur/mnaHpopzoibIsIGZhbHNlIOWImeS4jeaYvuekuiwg6buY6K6kdHJ1ZVxuICAgKiBAcm90YXRlIOWIu+W6puagh+etvuaXi+i9rOinkuW6plxuICAgKiBAaXNUaWNrIOaYr+WQpuaYvuekuuWdkOagh+i9tOWIu+W6plxuICAgKi9cbiAgeEF4aXM/OiB4QXhpc1Byb3BzO1xuICAvKipcbiAgICogeSDovbTphY3nva5cbiAgICogQG5hbWUg5Z2Q5qCH6L205ZCN56ewXG4gICAqIEBjb2xvciDmloflrZfpopzoibJcbiAgICogQHNpemUg5paH5a2X5aSn5bCPXG4gICAqIEBsaW5lQ29sb3Igeei9tOi9tOe6v+e6v+adoeminOiJsiwgZmFsc2Ug5YiZ5LiN5pi+56S6XG4gICAqIEBzcGxpdENvbG9yIHnovbTnvZHmoLznur/mnaHpopzoibIsIGZhbHNlIOWImeS4jeaYvuekuiwg6buY6K6kZmFsc2VcbiAgICovXG4gIHlBeGlzPzogeUF4aXNQcm9wcztcbiAgZ3JpZD86IEdyaWRDb21wb25lbnRPcHRpb247XG4gIG9uQ2xpY2s/OiAodjogYW55KSA9PiB2b2lkO1xufVxuXG5jb25zdCBFQ2hhcnRzTGluZSA9IChwcm9wczogTGluZUJhc2VQcm9wcykgPT4ge1xuICBjb25zdCB7XG4gICAgd2lkdGggPSAnMTAwJScsXG4gICAgaGVpZ2h0ID0gJzEwMCUnLFxuICAgIHNtb290aCA9IGZhbHNlLFxuICAgIGNvbG9ycyA9IFsnIzU0NzBjNicsICcjOTFjYzc1JywgJyNmYWM4NTgnLCAnI2VlNjY2NicsICcjNzNjMGRlJywgJyMzYmEyNzInLCAnI2ZjODQ1MicsICcjOWE2MGI0JywgJyNlYTdjY2MnXSxcbiAgICBjb2xvciA9ICcjMzMzJyxcbiAgICBsaW5lQ29sb3IgPSAnI2FiYjlkMCcsXG4gICAgc3BsaXRDb2xvciA9ICcjZTBlN2YzJyxcbiAgICBmb250U2l6ZSA9IDE0LFxuICAgIGRhdGEgPSBbXSxcbiAgICB4QXhpcyA9IHt9LFxuICAgIHlBeGlzID0ge30sXG4gICAgZ3JpZCA9IHt9LFxuICAgIGFyZWFTdHlsZSA9IHt9LFxuICAgIGlzU3dpdGNoID0gZmFsc2UsXG4gICAgc3dpdGNoVGltZSA9IDIwMDAsXG4gICAgb25DbGlja1xuICB9ID0gcHJvcHM7XG5cbiAgY29uc3QgY2hhcnRSZWYgPSB1c2VSZWY8YW55PihudWxsKVxuICBjb25zdCBbbXlDaGFydCwgc2V0TXlDaGFydF0gPSB1c2VTdGF0ZTxhbnk+KG51bGwpO1xuICBjb25zdCBbaXNIaWdoXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW2hpZ2hJbmRleCwgc2V0SGlnaEluZGV4XSA9IHVzZVN0YXRlPG51bWJlcj4oMCk7XG4gIFxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IF9teUNoYXJ0OiBhbnkgPSBlY2hhcnRzLmluaXQoY2hhcnRSZWYuY3VycmVudCk7XG4gICAgc2V0TXlDaGFydChfbXlDaGFydClcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIF9teUNoYXJ0LnJlc2l6ZSwgZmFsc2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgX215Q2hhcnQucmVzaXplLCBmYWxzZSk7XG4gICAgX215Q2hhcnQub2ZmKCdjbGljaycpO1xuICAgIF9teUNoYXJ0Lm9uKCdjbGljaycsICh2OiBhbnkpID0+IHtcbiAgICAgIG9uQ2xpY2s/Lih2LmRhdGEpO1xuICAgICAgY29uc29sZS5sb2codi5kYXRhKVxuICAgIH0pXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKDIpXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgX215Q2hhcnQucmVzaXplLCBmYWxzZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIF9teUNoYXJ0LnJlc2l6ZSwgZmFsc2UpO1xuICAgICAgX215Q2hhcnQuZGlzcG9zZSgpO1xuICAgIH1cbiAgfSwgW10pXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAobXlDaGFydCkge1xuICAgICAgbXlDaGFydC5jbGVhcigpO1xuICAgICAgY29uc3QgX25hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgZGF0YS5sZW5ndGggPiAwICYmIGRhdGEubWFwKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgX25hbWVzLnB1c2goaXRlbS5uYW1lKTtcbiAgICAgIH0pXG4gICAgICBjb25zdCBfZ3JpZDogR3JpZENvbXBvbmVudE9wdGlvbiA9IHsuLi57XG4gICAgICAgIHRvcDogJzUlJyxcbiAgICAgICAgYm90dG9tOiAnMTAlJyxcbiAgICAgICAgbGVmdDogJzEwJScsXG4gICAgICAgIHJpZ2h0OiAnNSUnLFxuICAgICAgfSwgLi4uZ3JpZH07XG4gICAgICBjb25zdCBfeEF4aXM6IGFueSA9IHtcbiAgICAgICAgdHlwZTogJ2NhdGVnb3J5JyxcbiAgICAgICAgYm91bmRhcnlHYXA6IGZhbHNlLFxuICAgICAgICBheGlzTGFiZWw6IHtcbiAgICAgICAgICBjb2xvcjogeEF4aXMuY29sb3IgPyB4QXhpcy5jb2xvciA6IGNvbG9yLFxuICAgICAgICAgIGZvbnRTaXplOiB4QXhpcy5mb250U2l6ZSA/IHhBeGlzLmZvbnRTaXplIDogZm9udFNpemUsXG4gICAgICAgICAgcm90YXRlOiB4QXhpcy5yb3RhdGUgPyB4QXhpcy5yb3RhdGUgOiAwLFxuICAgICAgICB9LFxuICAgICAgICBheGlzTGluZToge1xuICAgICAgICAgIHNob3c6IHhBeGlzLmxpbmVDb2xvciA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWUsXG4gICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICBjb2xvcjogeEF4aXMubGluZUNvbG9yID8geEF4aXMubGluZUNvbG9yIDogbGluZUNvbG9yLFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYXhpc1RpY2s6IHtcbiAgICAgICAgICBzaG93OiB4QXhpcy5pc1RpY2ssXG4gICAgICAgIH0sXG4gICAgICAgIHNwbGl0TGluZToge1xuICAgICAgICAgIHNob3c6IHhBeGlzLnNwbGl0Q29sb3IgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICBjb2xvcjogeEF4aXMuc3BsaXRDb2xvciA/IHhBeGlzLnNwbGl0Q29sb3IgOiBzcGxpdENvbG9yLFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGF0YTogX25hbWVzXG4gICAgICB9XG4gICAgICBjb25zdCBfeUF4aXM6IGFueSA9IHtcbiAgICAgICAgbmFtZTogeUF4aXMubmFtZSxcbiAgICAgICAgdHlwZTogJ3ZhbHVlJyxcbiAgICAgICAgYXhpc0xhYmVsOiB7XG4gICAgICAgICAgY29sb3I6IHlBeGlzLmNvbG9yID8geUF4aXMuY29sb3IgOiBjb2xvcixcbiAgICAgICAgICBmb250U2l6ZTogeUF4aXMuZm9udFNpemUgPyB5QXhpcy5mb250U2l6ZSA6IGZvbnRTaXplLFxuICAgICAgICB9LFxuICAgICAgICBheGlzTGluZToge1xuICAgICAgICAgIHNob3c6IHlBeGlzLmxpbmVDb2xvciA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWUsXG4gICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICBjb2xvcjogeUF4aXMubGluZUNvbG9yID8geUF4aXMubGluZUNvbG9yIDogbGluZUNvbG9yLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGF4aXNUaWNrOiB7XG4gICAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIHNwbGl0TGluZToge1xuICAgICAgICAgIHNob3c6IHlBeGlzLnNwbGl0Q29sb3IgPT09IGZhbHNlID8gZmFsc2UgOiB0cnVlLFxuICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgY29sb3I6IHlBeGlzLnNwbGl0Q29sb3IgPyB5QXhpcy5zcGxpdENvbG9yIDogc3BsaXRDb2xvcixcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgICBsZXQgX2FyZWFDb2xvcjogYW55O1xuICAgICAgaWYgKGFyZWFTdHlsZS5pc0dyYWQpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJlYVN0eWxlLmNvbG9yKSAmJiBhcmVhU3R5bGUuY29sb3IubGVuZ3RoID4gMSkge1xuICAgICAgICAgIF9hcmVhQ29sb3IgPSB7XG4gICAgICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgeDI6IDAsXG4gICAgICAgICAgICB5MjogMSxcbiAgICAgICAgICAgIGNvbG9yU3RvcHM6IFt7XG4gICAgICAgICAgICAgIG9mZnNldDogMCwgY29sb3I6IGFyZWFTdHlsZS5jb2xvclswXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIG9mZnNldDogMSwgY29sb3I6IGFyZWFTdHlsZS5jb2xvclsxXVxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBnbG9iYWw6IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF9hcmVhQ29sb3IgPSB7XG4gICAgICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgeDI6IDAsXG4gICAgICAgICAgICB5MjogMSxcbiAgICAgICAgICAgIGNvbG9yU3RvcHM6IFt7XG4gICAgICAgICAgICAgIG9mZnNldDogMCwgY29sb3I6IGNvbG9yc1swXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBvZmZzZXQ6IDEsIGNvbG9yOiAncmdiYSgyNTUsMjU1LDI1NSwwKSdcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgZ2xvYmFsOiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbXlDaGFydC5zZXRPcHRpb24oe1xuICAgICAgICB0b29sdGlwOiB7XG4gICAgICAgICAgdHJpZ2dlcjogJ2F4aXMnLFxuICAgICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogMCxcbiAgICAgICAgICBlbnRlcmFibGU6IHRydWUsXG4gICAgICAgICAgYXhpc1BvaW50ZXI6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzaGFkb3cnXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb2xvcjogY29sb3JzLFxuICAgICAgICBncmlkOiBfZ3JpZCxcbiAgICAgICAgeEF4aXM6IF94QXhpcyxcbiAgICAgICAgeUF4aXM6IF95QXhpcyxcbiAgICAgICAgc2VyaWVzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICAgIHNtb290aDogc21vb3RoLFxuICAgICAgICAgICAgYXJlYVN0eWxlOiBhcmVhU3R5bGUuc2hvdyA/IHtcbiAgICAgICAgICAgICAgY29sb3I6IF9hcmVhQ29sb3JcbiAgICAgICAgICAgIH0gOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgICAgd2lkdGg6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sIHRydWUpO1xuICAgIH1cbiAgfSwgW215Q2hhcnQsIGRhdGFdKVxuICBcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgZmF1bHRCeUhvdXJUaW1lOiBhbnk7XG4gICAgaWYgKG15Q2hhcnQgJiYgaXNTd2l0Y2ggJiYgIWlzSGlnaCAmJiBkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIGZhdWx0QnlIb3VyVGltZSA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgc2V0SGlnaEluZGV4KG4gPT4ge1xuICAgICAgICAgIG15Q2hhcnQuZGlzcGF0Y2hBY3Rpb24oe1xuICAgICAgICAgICAgdHlwZTogJ3Nob3dUaXAnLFxuICAgICAgICAgICAgc2VyaWVzSW5kZXg6IDAsXG4gICAgICAgICAgICBkYXRhSW5kZXg6IG5cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAobiA+PSBkYXRhLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbiArIDFcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LCBzd2l0Y2hUaW1lKVxuICAgIH1cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYXJJbnRlcnZhbChmYXVsdEJ5SG91clRpbWUpXG4gICAgfVxuICB9LCBbbXlDaGFydCwgaXNTd2l0Y2gsIGlzSGlnaCwgZGF0YV0pXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHJlZj17Y2hhcnRSZWZ9XG4gICAgICBzdHlsZT17e1xuICAgICAgICAnd2lkdGgnOiB3aWR0aCxcbiAgICAgICAgJ2hlaWdodCc6IGhlaWdodFxuICAgICAgfX0+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRUNoYXJ0c0xpbmU7Il19