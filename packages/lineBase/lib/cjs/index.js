"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var echarts = _interopRequireWildcard(require("echarts/core"));

var _components = require("echarts/components");

var _charts = require("echarts/charts");

var _renderers = require("echarts/renderers");

echarts.use([_components.GridComponent, _components.TooltipComponent, _charts.LineChart, _renderers.CanvasRenderer]);

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
  var chartRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      myChart = _useState2[0],
      setMyChart = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 1),
      isHigh = _useState4[0];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      highIndex = _useState6[0],
      setHighIndex = _useState6[1];

  (0, _react.useEffect)(function () {
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
  (0, _react.useEffect)(function () {
    if (myChart) {
      myChart.clear();
      var _names = [];
      data.length > 0 && data.map(function (item) {
        _names.push(item.name);
      });

      var _grid = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, {
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
  (0, _react.useEffect)(function () {
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
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: chartRef,
    style: {
      'width': width,
      'height': height
    }
  });
};

var _default = EChartsLine;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiZWNoYXJ0cyIsInVzZSIsIkdyaWRDb21wb25lbnQiLCJUb29sdGlwQ29tcG9uZW50IiwiTGluZUNoYXJ0IiwiQ2FudmFzUmVuZGVyZXIiLCJFQ2hhcnRzTGluZSIsInByb3BzIiwid2lkdGgiLCJoZWlnaHQiLCJzbW9vdGgiLCJjb2xvcnMiLCJjb2xvciIsImxpbmVDb2xvciIsInNwbGl0Q29sb3IiLCJmb250U2l6ZSIsImRhdGEiLCJ4QXhpcyIsInlBeGlzIiwiZ3JpZCIsImFyZWFTdHlsZSIsImlzU3dpdGNoIiwic3dpdGNoVGltZSIsIm9uQ2xpY2siLCJjaGFydFJlZiIsIm15Q2hhcnQiLCJzZXRNeUNoYXJ0IiwiaXNIaWdoIiwiaGlnaEluZGV4Iiwic2V0SGlnaEluZGV4IiwiX215Q2hhcnQiLCJpbml0IiwiY3VycmVudCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNpemUiLCJvZmYiLCJvbiIsInYiLCJjb25zb2xlIiwibG9nIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRpc3Bvc2UiLCJjbGVhciIsIl9uYW1lcyIsImxlbmd0aCIsIm1hcCIsIml0ZW0iLCJwdXNoIiwibmFtZSIsIl9ncmlkIiwidG9wIiwiYm90dG9tIiwibGVmdCIsInJpZ2h0IiwiX3hBeGlzIiwidHlwZSIsImJvdW5kYXJ5R2FwIiwiYXhpc0xhYmVsIiwicm90YXRlIiwiYXhpc0xpbmUiLCJzaG93IiwibGluZVN0eWxlIiwiYXhpc1RpY2siLCJpc1RpY2siLCJzcGxpdExpbmUiLCJfeUF4aXMiLCJfYXJlYUNvbG9yIiwiaXNHcmFkIiwiQXJyYXkiLCJpc0FycmF5IiwieCIsInkiLCJ4MiIsInkyIiwiY29sb3JTdG9wcyIsIm9mZnNldCIsImdsb2JhbCIsInNldE9wdGlvbiIsInRvb2x0aXAiLCJ0cmlnZ2VyIiwidHJhbnNpdGlvbkR1cmF0aW9uIiwiZW50ZXJhYmxlIiwiYXhpc1BvaW50ZXIiLCJzZXJpZXMiLCJ1bmRlZmluZWQiLCJmYXVsdEJ5SG91clRpbWUiLCJzZXRJbnRlcnZhbCIsIm4iLCJkaXNwYXRjaEFjdGlvbiIsInNlcmllc0luZGV4IiwiZGF0YUluZGV4IiwiY2xlYXJJbnRlcnZhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUNFLENBQUNDLHlCQUFELEVBQWdCQyw0QkFBaEIsRUFBa0NDLGlCQUFsQyxFQUE2Q0MseUJBQTdDLENBREY7O0FBd0VBLElBQU1DLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNDLEtBQUQsRUFBMEI7QUFDNUMscUJBaUJJQSxLQWpCSixDQUNFQyxLQURGO0FBQUEsTUFDRUEsS0FERiw2QkFDVSxNQURWO0FBQUEsc0JBaUJJRCxLQWpCSixDQUVFRSxNQUZGO0FBQUEsTUFFRUEsTUFGRiw4QkFFVyxNQUZYO0FBQUEsc0JBaUJJRixLQWpCSixDQUdFRyxNQUhGO0FBQUEsTUFHRUEsTUFIRiw4QkFHVyxLQUhYO0FBQUEsc0JBaUJJSCxLQWpCSixDQUlFSSxNQUpGO0FBQUEsTUFJRUEsTUFKRiw4QkFJVyxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLFNBQXZCLEVBQWtDLFNBQWxDLEVBQTZDLFNBQTdDLEVBQXdELFNBQXhELEVBQW1FLFNBQW5FLEVBQThFLFNBQTlFLEVBQXlGLFNBQXpGLENBSlg7QUFBQSxxQkFpQklKLEtBakJKLENBS0VLLEtBTEY7QUFBQSxNQUtFQSxLQUxGLDZCQUtVLE1BTFY7QUFBQSx5QkFpQklMLEtBakJKLENBTUVNLFNBTkY7QUFBQSxNQU1FQSxTQU5GLGlDQU1jLFNBTmQ7QUFBQSwwQkFpQklOLEtBakJKLENBT0VPLFVBUEY7QUFBQSxNQU9FQSxVQVBGLGtDQU9lLFNBUGY7QUFBQSx3QkFpQklQLEtBakJKLENBUUVRLFFBUkY7QUFBQSxNQVFFQSxRQVJGLGdDQVFhLEVBUmI7QUFBQSxvQkFpQklSLEtBakJKLENBU0VTLElBVEY7QUFBQSxN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UyxFQUFFSDtBQUhVLFdBQXZCOztBQUtBLGNBQUlBLENBQUMsSUFBSXhFLElBQUksQ0FBQzZCLE1BQUwsR0FBYyxDQUF2QixFQUEwQjtBQUN4QixtQkFBTyxDQUFQO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsbUJBQU8yQyxDQUFDLEdBQUcsQ0FBWDtBQUNEO0FBQ0YsU0FYVyxDQUFaO0FBWUQsT0FiNEIsRUFhMUJsRSxVQWIwQixDQUE3QjtBQWNEOztBQUNELFdBQU8sWUFBTTtBQUNYc0UsTUFBQUEsYUFBYSxDQUFDTixlQUFELENBQWI7QUFDRCxLQUZEO0FBR0QsR0FyQkQsRUFxQkcsQ0FBQzdELE9BQUQsRUFBVUosUUFBVixFQUFvQk0sTUFBcEIsRUFBNEJYLElBQTVCLENBckJIO0FBdUJBLHNCQUNFO0FBQUssSUFBQSxHQUFHLEVBQUVRLFFBQVY7QUFDRSxJQUFBLEtBQUssRUFBRTtBQUNMLGVBQVNoQixLQURKO0FBRUwsZ0JBQVVDO0FBRkw7QUFEVCxJQURGO0FBUUQsQ0F2TUQ7O2VBeU1lSCxXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0ICogYXMgZWNoYXJ0cyBmcm9tICdlY2hhcnRzL2NvcmUnO1xuaW1wb3J0IHsgR3JpZENvbXBvbmVudCwgVG9vbHRpcENvbXBvbmVudCwgR3JpZENvbXBvbmVudE9wdGlvbiB9IGZyb20gJ2VjaGFydHMvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBMaW5lQ2hhcnQgfSBmcm9tICdlY2hhcnRzL2NoYXJ0cyc7XG5pbXBvcnQgeyBDYW52YXNSZW5kZXJlciB9IGZyb20gJ2VjaGFydHMvcmVuZGVyZXJzJztcblxuZWNoYXJ0cy51c2UoXG4gIFtHcmlkQ29tcG9uZW50LCBUb29sdGlwQ29tcG9uZW50LCBMaW5lQ2hhcnQsIENhbnZhc1JlbmRlcmVyXVxuKTtcblxuaW50ZXJmYWNlIHhBeGlzUHJvcHMge1xuICBjb2xvcj86IHN0cmluZztcbiAgZm9udFNpemU/OiBudW1iZXI7XG4gIGxpbmVDb2xvcj86IHN0cmluZyB8IGJvb2xlYW47XG4gIHNwbGl0Q29sb3I/OiBzdHJpbmcgfCBib29sZWFuO1xuICByb3RhdGU/OiBudW1iZXI7XG4gIGlzVGljaz86IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSB5QXhpc1Byb3BzIHtcbiAgbmFtZT86IHN0cmluZztcbiAgY29sb3I/OiBzdHJpbmc7XG4gIGZvbnRTaXplPzogbnVtYmVyO1xuICBsaW5lQ29sb3I/OiBzdHJpbmcgfCBib29sZWFuO1xuICBzcGxpdENvbG9yPzogc3RyaW5nIHwgYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIGFyZWFTdHlsZVByb3BzIHtcbiAgc2hvdz86IGJvb2xlYW47XG4gIGlzR3JhZD86IGJvb2xlYW47XG4gIGNvbG9yPzogc3RyaW5nW11cbn1cblxuaW50ZXJmYWNlIExpbmVCYXNlUHJvcHMge1xuICBkYXRhPzogYW55W107XG4gIHdpZHRoPzogc3RyaW5nO1xuICBoZWlnaHQ/OiBzdHJpbmc7XG4gIC8qKiDmmK/lkKblubPmu5Hmm7Lnur/mmL7npLogKi9cbiAgc21vb3RoPzogYm9vbGVhbjtcbiAgLyoqIOWtl+S9k+minOiJsiAqL1xuICBjb2xvcj86IHN0cmluZztcbiAgLyoqIHgsIHnovbTovbTnur/nur/mnaHpopzoibIgKi9cbiAgbGluZUNvbG9yPzogc3RyaW5nO1xuICAvKiogeCwgeei9tOe9keagvOe6v+adoeminOiJsiAqL1xuICBzcGxpdENvbG9yPzogc3RyaW5nO1xuICAvKiog5a2X5L2T5aSn5bCP77yM6buY6K6kMTTlg4/ntKAgKi9cbiAgZm9udFNpemU/OiBudW1iZXIgfCBzdHJpbmc7XG4gIC8qKiDmipjnur/popzoibIgKi9cbiAgY29sb3JzPzogc3RyaW5nW107XG4gIC8qKiDmmK/lkKboh6rliqjliIfmjaIgVG9vbHRpcCAqL1xuICBpc1N3aXRjaD86IGJvb2xlYW47XG4gIC8qKiDoh6rliqjliIfmjaLkuovku7Yg6buY6K6kIDIwMDDvvIgyU++8iSAqL1xuICBzd2l0Y2hUaW1lPzogbnVtYmVyO1xuICAvKiog5Yy65Z+f5aGr5YWF5qC35byPICovXG4gIGFyZWFTdHlsZT86IGFyZWFTdHlsZVByb3BzO1xuICAvKipcbiAgICogWCDovbTphY3nva5cbiAgICogQGNvbG9yIOaWh+Wtl+minOiJslxuICAgKiBAc2l6ZSDmloflrZflpKflsI9cbiAgICogQGxpbmVDb2xvciB46L206L2057q/57q/5p2h6aKc6ImyLCBmYWxzZSDliJnkuI3mmL7npLpcbiAgICogQHNwbGl0Q29sb3IgeOi9tOe9keagvOe6v+adoeminOiJsiwgZmFsc2Ug5YiZ5LiN5pi+56S6LCDpu5jorqR0cnVlXG4gICAqIEByb3RhdGUg5Yi75bqm5qCH562+5peL6L2s6KeS5bqmXG4gICAqIEBpc1RpY2sg5piv5ZCm5pi+56S65Z2Q5qCH6L205Yi75bqmXG4gICAqL1xuICB4QXhpcz86IHhBeGlzUHJvcHM7XG4gIC8qKlxuICAgKiB5IOi9tOmFjee9rlxuICAgKiBAbmFtZSDlnZDmoIfovbTlkI3np7BcbiAgICogQGNvbG9yIOaWh+Wtl+minOiJslxuICAgKiBAc2l6ZSDmloflrZflpKflsI9cbiAgICogQGxpbmVDb2xvciB56L206L2057q/57q/5p2h6aKc6ImyLCBmYWxzZSDliJnkuI3mmL7npLpcbiAgICogQHNwbGl0Q29sb3Igeei9tOe9keagvOe6v+adoeminOiJsiwgZmFsc2Ug5YiZ5LiN5pi+56S6LCDpu5jorqRmYWxzZVxuICAgKi9cbiAgeUF4aXM/OiB5QXhpc1Byb3BzO1xuICBncmlkPzogR3JpZENvbXBvbmVudE9wdGlvbjtcbiAgb25DbGljaz86ICh2OiBhbnkpID0+IHZvaWQ7XG59XG5cbmNvbnN0IEVDaGFydHNMaW5lID0gKHByb3BzOiBMaW5lQmFzZVByb3BzKSA9PiB7XG4gIGNvbnN0IHtcbiAgICB3aWR0aCA9ICcxMDAlJyxcbiAgICBoZWlnaHQgPSAnMTAwJScsXG4gICAgc21vb3RoID0gZmFsc2UsXG4gICAgY29sb3JzID0gWycjNTQ3MGM2JywgJyM5MWNjNzUnLCAnI2ZhYzg1OCcsICcjZWU2NjY2JywgJyM3M2MwZGUnLCAnIzNiYTI3MicsICcjZmM4NDUyJywgJyM5YTYwYjQnLCAnI2VhN2NjYyddLFxuICAgIGNvbG9yID0gJyMzMzMnLFxuICAgIGxpbmVDb2xvciA9ICcjYWJiOWQwJyxcbiAgICBzcGxpdENvbG9yID0gJyNlMGU3ZjMnLFxuICAgIGZvbnRTaXplID0gMTQsXG4gICAgZGF0YSA9IFtdLFxuICAgIHhBeGlzID0ge30sXG4gICAgeUF4aXMgPSB7fSxcbiAgICBncmlkID0ge30sXG4gICAgYXJlYVN0eWxlID0ge30sXG4gICAgaXNTd2l0Y2ggPSBmYWxzZSxcbiAgICBzd2l0Y2hUaW1lID0gMjAwMCxcbiAgICBvbkNsaWNrXG4gIH0gPSBwcm9wcztcblxuICBjb25zdCBjaGFydFJlZiA9IHVzZVJlZjxhbnk+KG51bGwpXG4gIGNvbnN0IFtteUNoYXJ0LCBzZXRNeUNoYXJ0XSA9IHVzZVN0YXRlPGFueT4obnVsbCk7XG4gIGNvbnN0IFtpc0hpZ2hdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25zdCBbaGlnaEluZGV4LCBzZXRIaWdoSW5kZXhdID0gdXNlU3RhdGU8bnVtYmVyPigwKTtcbiAgXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgX215Q2hhcnQ6IGFueSA9IGVjaGFydHMuaW5pdChjaGFydFJlZi5jdXJyZW50KTtcbiAgICBzZXRNeUNoYXJ0KF9teUNoYXJ0KVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgX215Q2hhcnQucmVzaXplLCBmYWxzZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBfbXlDaGFydC5yZXNpemUsIGZhbHNlKTtcbiAgICBfbXlDaGFydC5vZmYoJ2NsaWNrJyk7XG4gICAgX215Q2hhcnQub24oJ2NsaWNrJywgKHY6IGFueSkgPT4ge1xuICAgICAgb25DbGljaz8uKHYuZGF0YSk7XG4gICAgICBjb25zb2xlLmxvZyh2LmRhdGEpXG4gICAgfSlcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coMilcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBfbXlDaGFydC5yZXNpemUsIGZhbHNlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgX215Q2hhcnQucmVzaXplLCBmYWxzZSk7XG4gICAgICBfbXlDaGFydC5kaXNwb3NlKCk7XG4gICAgfVxuICB9LCBbXSlcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChteUNoYXJ0KSB7XG4gICAgICBteUNoYXJ0LmNsZWFyKCk7XG4gICAgICBjb25zdCBfbmFtZXM6IHN0cmluZ1tdID0gW107XG4gICAgICBkYXRhLmxlbmd0aCA+IDAgJiYgZGF0YS5tYXAoKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICBfbmFtZXMucHVzaChpdGVtLm5hbWUpO1xuICAgICAgfSlcbiAgICAgIGNvbnN0IF9ncmlkOiBHcmlkQ29tcG9uZW50T3B0aW9uID0gey4uLntcbiAgICAgICAgdG9wOiAnNSUnLFxuICAgICAgICBib3R0b206ICcxMCUnLFxuICAgICAgICBsZWZ0OiAnMTAlJyxcbiAgICAgICAgcmlnaHQ6ICc1JScsXG4gICAgICB9LCAuLi5ncmlkfTtcbiAgICAgIGNvbnN0IF94QXhpczogYW55ID0ge1xuICAgICAgICB0eXBlOiAnY2F0ZWdvcnknLFxuICAgICAgICBib3VuZGFyeUdhcDogZmFsc2UsXG4gICAgICAgIGF4aXNMYWJlbDoge1xuICAgICAgICAgIGNvbG9yOiB4QXhpcy5jb2xvciA/IHhBeGlzLmNvbG9yIDogY29sb3IsXG4gICAgICAgICAgZm9udFNpemU6IHhBeGlzLmZvbnRTaXplID8geEF4aXMuZm9udFNpemUgOiBmb250U2l6ZSxcbiAgICAgICAgICByb3RhdGU6IHhBeGlzLnJvdGF0ZSA/IHhBeGlzLnJvdGF0ZSA6IDAsXG4gICAgICAgIH0sXG4gICAgICAgIGF4aXNMaW5lOiB7XG4gICAgICAgICAgc2hvdzogeEF4aXMubGluZUNvbG9yID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZSxcbiAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgIGNvbG9yOiB4QXhpcy5saW5lQ29sb3IgPyB4QXhpcy5saW5lQ29sb3IgOiBsaW5lQ29sb3IsXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBheGlzVGljazoge1xuICAgICAgICAgIHNob3c6IHhBeGlzLmlzVGljayxcbiAgICAgICAgfSxcbiAgICAgICAgc3BsaXRMaW5lOiB7XG4gICAgICAgICAgc2hvdzogeEF4aXMuc3BsaXRDb2xvciA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgIGNvbG9yOiB4QXhpcy5zcGxpdENvbG9yID8geEF4aXMuc3BsaXRDb2xvciA6IHNwbGl0Q29sb3IsXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkYXRhOiBfbmFtZXNcbiAgICAgIH1cbiAgICAgIGNvbnN0IF95QXhpczogYW55ID0ge1xuICAgICAgICBuYW1lOiB5QXhpcy5uYW1lLFxuICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICBheGlzTGFiZWw6IHtcbiAgICAgICAgICBjb2xvcjogeUF4aXMuY29sb3IgPyB5QXhpcy5jb2xvciA6IGNvbG9yLFxuICAgICAgICAgIGZvbnRTaXplOiB5QXhpcy5mb250U2l6ZSA/IHlBeGlzLmZvbnRTaXplIDogZm9udFNpemUsXG4gICAgICAgIH0sXG4gICAgICAgIGF4aXNMaW5lOiB7XG4gICAgICAgICAgc2hvdzogeUF4aXMubGluZUNvbG9yID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZSxcbiAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgIGNvbG9yOiB5QXhpcy5saW5lQ29sb3IgPyB5QXhpcy5saW5lQ29sb3IgOiBsaW5lQ29sb3IsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgYXhpc1RpY2s6IHtcbiAgICAgICAgICBzaG93OiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgc3BsaXRMaW5lOiB7XG4gICAgICAgICAgc2hvdzogeUF4aXMuc3BsaXRDb2xvciA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWUsXG4gICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICBjb2xvcjogeUF4aXMuc3BsaXRDb2xvciA/IHlBeGlzLnNwbGl0Q29sb3IgOiBzcGxpdENvbG9yLFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICAgIGxldCBfYXJlYUNvbG9yOiBhbnk7XG4gICAgICBpZiAoYXJlYVN0eWxlLmlzR3JhZCkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmVhU3R5bGUuY29sb3IpICYmIGFyZWFTdHlsZS5jb2xvci5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgX2FyZWFDb2xvciA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICB4MjogMCxcbiAgICAgICAgICAgIHkyOiAxLFxuICAgICAgICAgICAgY29sb3JTdG9wczogW3tcbiAgICAgICAgICAgICAgb2Zmc2V0OiAwLCBjb2xvcjogYXJlYVN0eWxlLmNvbG9yWzBdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAxLCBjb2xvcjogYXJlYVN0eWxlLmNvbG9yWzFdXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIGdsb2JhbDogZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX2FyZWFDb2xvciA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICB4MjogMCxcbiAgICAgICAgICAgIHkyOiAxLFxuICAgICAgICAgICAgY29sb3JTdG9wczogW3tcbiAgICAgICAgICAgICAgb2Zmc2V0OiAwLCBjb2xvcjogY29sb3JzWzBdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIG9mZnNldDogMSwgY29sb3I6ICdyZ2JhKDI1NSwyNTUsMjU1LDApJ1xuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBnbG9iYWw6IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBteUNoYXJ0LnNldE9wdGlvbih7XG4gICAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgICB0cmlnZ2VyOiAnYXhpcycsXG4gICAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiAwLFxuICAgICAgICAgIGVudGVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBheGlzUG9pbnRlcjoge1xuICAgICAgICAgICAgdHlwZTogJ3NoYWRvdydcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbG9yOiBjb2xvcnMsXG4gICAgICAgIGdyaWQ6IF9ncmlkLFxuICAgICAgICB4QXhpczogX3hBeGlzLFxuICAgICAgICB5QXhpczogX3lBeGlzLFxuICAgICAgICBzZXJpZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgc21vb3RoOiBzbW9vdGgsXG4gICAgICAgICAgICBhcmVhU3R5bGU6IGFyZWFTdHlsZS5zaG93ID8ge1xuICAgICAgICAgICAgICBjb2xvcjogX2FyZWFDb2xvclxuICAgICAgICAgICAgfSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgICB3aWR0aDogMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuICB9LCBbbXlDaGFydCwgZGF0YV0pXG4gIFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBmYXVsdEJ5SG91clRpbWU6IGFueTtcbiAgICBpZiAobXlDaGFydCAmJiBpc1N3aXRjaCAmJiAhaXNIaWdoICYmIGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgZmF1bHRCeUhvdXJUaW1lID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBzZXRIaWdoSW5kZXgobiA9PiB7XG4gICAgICAgICAgbXlDaGFydC5kaXNwYXRjaEFjdGlvbih7XG4gICAgICAgICAgICB0eXBlOiAnc2hvd1RpcCcsXG4gICAgICAgICAgICBzZXJpZXNJbmRleDogMCxcbiAgICAgICAgICAgIGRhdGFJbmRleDogblxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChuID49IGRhdGEubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuICsgMVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sIHN3aXRjaFRpbWUpXG4gICAgfVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhckludGVydmFsKGZhdWx0QnlIb3VyVGltZSlcbiAgICB9XG4gIH0sIFtteUNoYXJ0LCBpc1N3aXRjaCwgaXNIaWdoLCBkYXRhXSlcblxuICByZXR1cm4gKFxuICAgIDxkaXYgcmVmPXtjaGFydFJlZn1cbiAgICAgIHN0eWxlPXt7XG4gICAgICAgICd3aWR0aCc6IHdpZHRoLFxuICAgICAgICAnaGVpZ2h0JzogaGVpZ2h0XG4gICAgICB9fT5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBFQ2hhcnRzTGluZTsiXX0=