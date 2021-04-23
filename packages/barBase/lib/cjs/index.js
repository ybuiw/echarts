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

echarts.use([_components.GridComponent, _components.TooltipComponent, _charts.BarChart, _renderers.CanvasRenderer]);

var EChartsBar = function EChartsBar(props) {
  var _props$width = props.width,
      width = _props$width === void 0 ? '100%' : _props$width,
      _props$height = props.height,
      height = _props$height === void 0 ? '100%' : _props$height,
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
      _props$itemStyle = props.itemStyle,
      itemStyle = _props$itemStyle === void 0 ? {} : _props$itemStyle,
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
          type: 'bar',
          barWidth: itemStyle.barWidth,
          itemStyle: {
            color: _areaColor,
            borderRadius: itemStyle.borderRadius ? itemStyle.borderRadius : 0
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

var _default = EChartsBar;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiZWNoYXJ0cyIsInVzZSIsIkdyaWRDb21wb25lbnQiLCJUb29sdGlwQ29tcG9uZW50IiwiQmFyQ2hhcnQiLCJDYW52YXNSZW5kZXJlciIsIkVDaGFydHNCYXIiLCJwcm9wcyIsIndpZHRoIiwiaGVpZ2h0IiwiY29sb3JzIiwiY29sb3IiLCJsaW5lQ29sb3IiLCJzcGxpdENvbG9yIiwiZm9udFNpemUiLCJkYXRhIiwieEF4aXMiLCJ5QXhpcyIsImdyaWQiLCJhcmVhU3R5bGUiLCJpdGVtU3R5bGUiLCJpc1N3aXRjaCIsInN3aXRjaFRpbWUiLCJvbkNsaWNrIiwiY2hhcnRSZWYiLCJteUNoYXJ0Iiwic2V0TXlDaGFydCIsImlzSGlnaCIsImhpZ2hJbmRleCIsInNldEhpZ2hJbmRleCIsIl9teUNoYXJ0IiwiaW5pdCIsImN1cnJlbnQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVzaXplIiwib2ZmIiwib24iLCJ2IiwiY29uc29sZSIsImxvZyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkaXNwb3NlIiwiY2xlYXIiLCJfbmFtZXMiLCJsZW5ndGgiLCJtYXAiLCJpdGVtIiwicHVzaCIsIm5hbWUiLCJfZ3JpZCIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsIl94QXhpcyIsInR5cGUiLCJheGlzTGFiZWwiLCJyb3RhdGUiLCJheGlzTGluZSIsInNob3ciLCJsaW5lU3R5bGUiLCJheGlzVGljayIsImlzVGljayIsInNwbGl0TGluZSIsIl95QXhpcyIsIl9hcmVhQ29sb3IiLCJpc0dyYWQiLCJBcnJheSIsImlzQXJyYXkiLCJ4IiwieSIsIngyIiwieTIiLCJjb2xvclN0b3BzIiwib2Zmc2V0IiwiZ2xvYmFsIiwic2V0T3B0aW9uIiwidG9vbHRpcCIsInRyaWdnZXIiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJlbnRlcmFibGUiLCJheGlzUG9pbnRlciIsInNlcmllcyIsImJhcldpZHRoIiwiYm9yZGVyUmFkaXVzIiwiZmF1bHRCeUhvdXJUaW1lIiwic2V0SW50ZXJ2YWwiLCJuIiwiZGlzcGF0Y2hBY3Rpb24iLCJzZXJpZXNJbmRleCIsImRhdGFJbmRleCIsImNsZWFySW50ZXJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUVBQSxPQUFPLENBQUNDLEdBQVIsQ0FDRSxDQUFDQyx5QkFBRCxFQUFnQkMsNEJBQWhCLEVBQWtDQyxnQkFBbEMsRUFBNENDLHlCQUE1QyxDQURGOztBQTZFQSxJQUFNQyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDQyxLQUFELEVBQXlCO0FBQUEscUJBa0J0Q0EsS0FsQnNDLENBRXhDQyxLQUZ3QztBQUFBLE1BRXhDQSxLQUZ3Qyw2QkFFaEMsTUFGZ0M7QUFBQSxzQkFrQnRDRCxLQWxCc0MsQ0FHeENFLE1BSHdDO0FBQUEsTUFHeENBLE1BSHdDLDhCQUcvQixNQUgrQjtBQUFBLHNCQWtCdENGLEtBbEJzQyxDQUl4Q0csTUFKd0M7QUFBQSxNQUl4Q0EsTUFKd0MsOEJBSS9CLENBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsU0FBdkIsRUFBa0MsU0FBbEMsRUFBNkMsU0FBN0MsRUFBd0QsU0FBeEQsRUFBbUUsU0FBbkUsRUFBOEUsU0FBOUUsRUFBeUYsU0FBekYsQ0FKK0I7QUFBQSxxQkFrQnRDSCxLQWxCc0MsQ0FLeENJLEtBTHdDO0FBQUEsTUFLeENBLEtBTHdDLDZCQUtoQyxNQUxnQztBQUFBLHlCQWtCdENKLEtBbEJzQyxDQU14Q0ssU0FOd0M7QUFBQSxNQU14Q0EsU0FOd0MsaUNBTTVCLFNBTjRCO0FBQUEsMEJBa0J0Q0wsS0FsQnNDLENBT3hDTSxVQVB3QztBQUFBLE1BT3hDQSxVQVB3QyxrQ0FPM0IsU0FQMkI7QUFBQSx3QkFrQnRDTixLQWxCc0MsQ0FReENPLFFBUndDO0FBQUEsTUFReENBLFFBUndDLGdDQVE3QixFQVI2QjtBQUFBLG9CQWtCdENQLEtBbEJzQyxDQVN4Q1EsSUFUd0M7QUFB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QUEyRCxDQUFDLEVBQUk7QUFDaEIvRCxVQUFBQSxPQUFPLENBQUNnRSxjQUFSLENBQXVCO0FBQ3JCakMsWUFBQUEsSUFBSSxFQUFFLFNBRGU7QUFFckJrQyxZQUFBQSxXQUFXLEVBQUUsQ0FGUTtBQUdyQkMsWUFBQUEsU0FBUyxFQUFFSDtBQUhVLFdBQXZCOztBQUtBLGNBQUlBLENBQUMsSUFBSXpFLElBQUksQ0FBQzhCLE1BQUwsR0FBYyxDQUF2QixFQUEwQjtBQUN4QixtQkFBTyxDQUFQO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsbUJBQU8yQyxDQUFDLEdBQUcsQ0FBWDtBQUNEO0FBQ0YsU0FYVyxDQUFaO0FBWUQsT0FiNEIsRUFhMUJsRSxVQWIwQixDQUE3QjtBQWNEOztBQUNELFdBQU8sWUFBTTtBQUNYc0UsTUFBQUEsYUFBYSxDQUFDTixlQUFELENBQWI7QUFDRCxLQUZEO0FBR0QsR0FyQkQsRUFxQkcsQ0FBQzdELE9BQUQsRUFBVUosUUFBVixFQUFvQk0sTUFBcEIsRUFBNEJaLElBQTVCLENBckJIO0FBdUJBLHNCQUNFO0FBQUssSUFBQSxHQUFHLEVBQUVTLFFBQVY7QUFDRSxJQUFBLEtBQUssRUFBRTtBQUNMLGVBQVNoQixLQURKO0FBRUwsZ0JBQVVDO0FBRkw7QUFEVCxJQURGO0FBUUQsQ0FwTUQ7O2VBc01lSCxVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0ICogYXMgZWNoYXJ0cyBmcm9tICdlY2hhcnRzL2NvcmUnO1xuaW1wb3J0IHsgR3JpZENvbXBvbmVudCwgVG9vbHRpcENvbXBvbmVudCwgR3JpZENvbXBvbmVudE9wdGlvbiB9IGZyb20gJ2VjaGFydHMvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBCYXJDaGFydCB9IGZyb20gJ2VjaGFydHMvY2hhcnRzJztcbmltcG9ydCB7IENhbnZhc1JlbmRlcmVyIH0gZnJvbSAnZWNoYXJ0cy9yZW5kZXJlcnMnO1xuXG5lY2hhcnRzLnVzZShcbiAgW0dyaWRDb21wb25lbnQsIFRvb2x0aXBDb21wb25lbnQsIEJhckNoYXJ0LCBDYW52YXNSZW5kZXJlcl1cbik7XG5cbmludGVyZmFjZSB4QXhpc1Byb3BzIHtcbiAgY29sb3I/OiBzdHJpbmc7XG4gIGZvbnRTaXplPzogbnVtYmVyO1xuICBsaW5lQ29sb3I/OiBzdHJpbmcgfCBib29sZWFuO1xuICBzcGxpdENvbG9yPzogc3RyaW5nIHwgYm9vbGVhbjtcbiAgcm90YXRlPzogbnVtYmVyO1xuICBpc1RpY2s/OiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgeUF4aXNQcm9wcyB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGNvbG9yPzogc3RyaW5nO1xuICBmb250U2l6ZT86IG51bWJlcjtcbiAgbGluZUNvbG9yPzogc3RyaW5nIHwgYm9vbGVhbjtcbiAgc3BsaXRDb2xvcj86IHN0cmluZyB8IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBhcmVhU3R5bGVQcm9wcyB7XG4gIHNob3c/OiBib29sZWFuO1xuICBpc0dyYWQ/OiBib29sZWFuO1xuICBjb2xvcj86IHN0cmluZ1tdXG59XG5cbmludGVyZmFjZSBpdGVtU3R5bGVQcm9wcyB7XG4gIGJhcldpZHRoPzogbnVtYmVyO1xuICBib3JkZXJSYWRpdXM/OiBudW1iZXJbXTtcbn1cblxuaW50ZXJmYWNlIEJhckJhc2VQcm9wcyB7XG4gIGRhdGE/OiBhbnlbXTtcbiAgd2lkdGg/OiBzdHJpbmc7XG4gIGhlaWdodD86IHN0cmluZztcbiAgLyoqIOWtl+S9k+minOiJsiAqL1xuICBjb2xvcj86IHN0cmluZztcbiAgLyoqIHgsIHnovbTovbTnur/nur/mnaHpopzoibIgKi9cbiAgbGluZUNvbG9yPzogc3RyaW5nO1xuICAvKiogeCwgeei9tOe9keagvOe6v+adoeminOiJsiAqL1xuICBzcGxpdENvbG9yPzogc3RyaW5nO1xuICAvKiog5a2X5L2T5aSn5bCP77yM6buY6K6kMTTlg4/ntKAgKi9cbiAgZm9udFNpemU/OiBudW1iZXIgfCBzdHJpbmc7XG4gIC8qKiDmn7Hnirblm77popzoibIgKi9cbiAgY29sb3JzPzogc3RyaW5nW107XG4gIC8qKiDmmK/lkKboh6rliqjliIfmjaIgVG9vbHRpcCAqL1xuICBpc1N3aXRjaD86IGJvb2xlYW47XG4gIC8qKiDoh6rliqjliIfmjaLkuovku7Yg6buY6K6kIDIwMDDvvIgyU++8iSAqL1xuICBzd2l0Y2hUaW1lPzogbnVtYmVyO1xuICAvKiog5p+x54q25Zu+5aGr5YWF5qC35byPICovXG4gIGFyZWFTdHlsZT86IGFyZWFTdHlsZVByb3BzO1xuICAvKiog5p+x54q25Zu+5qC35byPICovXG4gIGl0ZW1TdHlsZT86IGl0ZW1TdHlsZVByb3BzO1xuICAvKipcbiAgICogWCDovbTphY3nva5cbiAgICogQGNvbG9yIOaWh+Wtl+minOiJslxuICAgKiBAc2l6ZSDmloflrZflpKflsI9cbiAgICogQGxpbmVDb2xvciB46L206L2057q/57q/5p2h6aKc6ImyLCBmYWxzZSDliJnkuI3mmL7npLpcbiAgICogQHNwbGl0Q29sb3IgeOi9tOe9keagvOe6v+adoeminOiJsiwgZmFsc2Ug5YiZ5LiN5pi+56S6LCDpu5jorqR0cnVlXG4gICAqIEByb3RhdGUg5Yi75bqm5qCH562+5peL6L2s6KeS5bqmXG4gICAqIEBpc1RpY2sg5piv5ZCm5pi+56S65Z2Q5qCH6L205Yi75bqmXG4gICAqL1xuICB4QXhpcz86IHhBeGlzUHJvcHM7XG4gIC8qKlxuICAgKiB5IOi9tOmFjee9rlxuICAgKiBAbmFtZSDlnZDmoIfovbTlkI3np7BcbiAgICogQGNvbG9yIOaWh+Wtl+minOiJslxuICAgKiBAc2l6ZSDmloflrZflpKflsI9cbiAgICogQGxpbmVDb2xvciB56L206L2057q/57q/5p2h6aKc6ImyLCBmYWxzZSDliJnkuI3mmL7npLpcbiAgICogQHNwbGl0Q29sb3Igeei9tOe9keagvOe6v+adoeminOiJsiwgZmFsc2Ug5YiZ5LiN5pi+56S6LCDpu5jorqRmYWxzZVxuICAgKi9cbiAgeUF4aXM/OiB5QXhpc1Byb3BzO1xuICBncmlkPzogR3JpZENvbXBvbmVudE9wdGlvbjtcbiAgb25DbGljaz86ICh2OiBhbnkpID0+IHZvaWQ7XG59XG5cbmNvbnN0IEVDaGFydHNCYXIgPSAocHJvcHM6IEJhckJhc2VQcm9wcykgPT4ge1xuICBjb25zdCB7XG4gICAgd2lkdGggPSAnMTAwJScsXG4gICAgaGVpZ2h0ID0gJzEwMCUnLFxuICAgIGNvbG9ycyA9IFsnIzU0NzBjNicsICcjOTFjYzc1JywgJyNmYWM4NTgnLCAnI2VlNjY2NicsICcjNzNjMGRlJywgJyMzYmEyNzInLCAnI2ZjODQ1MicsICcjOWE2MGI0JywgJyNlYTdjY2MnXSxcbiAgICBjb2xvciA9ICcjMzMzJyxcbiAgICBsaW5lQ29sb3IgPSAnI2FiYjlkMCcsXG4gICAgc3BsaXRDb2xvciA9ICcjZTBlN2YzJyxcbiAgICBmb250U2l6ZSA9IDE0LFxuICAgIGRhdGEgPSBbXSxcbiAgICB4QXhpcyA9IHt9LFxuICAgIHlBeGlzID0ge30sXG4gICAgZ3JpZCA9IHt9LFxuICAgIGFyZWFTdHlsZSA9IHt9LFxuICAgIGl0ZW1TdHlsZSA9IHt9LFxuICAgIGlzU3dpdGNoID0gZmFsc2UsXG4gICAgc3dpdGNoVGltZSA9IDIwMDAsXG4gICAgb25DbGlja1xuICB9ID0gcHJvcHM7XG5cbiAgY29uc3QgY2hhcnRSZWYgPSB1c2VSZWY8YW55PihudWxsKVxuICBjb25zdCBbbXlDaGFydCwgc2V0TXlDaGFydF0gPSB1c2VTdGF0ZTxhbnk+KG51bGwpO1xuICBjb25zdCBbaXNIaWdoXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW2hpZ2hJbmRleCwgc2V0SGlnaEluZGV4XSA9IHVzZVN0YXRlPG51bWJlcj4oMCk7XG4gIFxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IF9teUNoYXJ0OiBhbnkgPSBlY2hhcnRzLmluaXQoY2hhcnRSZWYuY3VycmVudCk7XG4gICAgc2V0TXlDaGFydChfbXlDaGFydClcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIF9teUNoYXJ0LnJlc2l6ZSwgZmFsc2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgX215Q2hhcnQucmVzaXplLCBmYWxzZSk7XG4gICAgX215Q2hhcnQub2ZmKCdjbGljaycpO1xuICAgIF9teUNoYXJ0Lm9uKCdjbGljaycsICh2OiBhbnkpID0+IHtcbiAgICAgIG9uQ2xpY2s/Lih2LmRhdGEpO1xuICAgICAgY29uc29sZS5sb2codi5kYXRhKVxuICAgIH0pXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKDIpXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgX215Q2hhcnQucmVzaXplLCBmYWxzZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIF9teUNoYXJ0LnJlc2l6ZSwgZmFsc2UpO1xuICAgICAgX215Q2hhcnQuZGlzcG9zZSgpO1xuICAgIH1cbiAgfSwgW10pXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAobXlDaGFydCkge1xuICAgICAgbXlDaGFydC5jbGVhcigpO1xuICAgICAgY29uc3QgX25hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgZGF0YS5sZW5ndGggPiAwICYmIGRhdGEubWFwKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgX25hbWVzLnB1c2goaXRlbS5uYW1lKTtcbiAgICAgIH0pXG4gICAgICBjb25zdCBfZ3JpZDogR3JpZENvbXBvbmVudE9wdGlvbiA9IHsuLi57XG4gICAgICAgIHRvcDogJzUlJyxcbiAgICAgICAgYm90dG9tOiAnMTAlJyxcbiAgICAgICAgbGVmdDogJzEwJScsXG4gICAgICAgIHJpZ2h0OiAnNSUnLFxuICAgICAgfSwgLi4uZ3JpZH07XG4gICAgICBjb25zdCBfeEF4aXM6IGFueSA9IHtcbiAgICAgICAgdHlwZTogJ2NhdGVnb3J5JyxcbiAgICAgICAgYXhpc0xhYmVsOiB7XG4gICAgICAgICAgY29sb3I6IHhBeGlzLmNvbG9yID8geEF4aXMuY29sb3IgOiBjb2xvcixcbiAgICAgICAgICBmb250U2l6ZTogeEF4aXMuZm9udFNpemUgPyB4QXhpcy5mb250U2l6ZSA6IGZvbnRTaXplLFxuICAgICAgICAgIHJvdGF0ZTogeEF4aXMucm90YXRlID8geEF4aXMucm90YXRlIDogMCxcbiAgICAgICAgfSxcbiAgICAgICAgYXhpc0xpbmU6IHtcbiAgICAgICAgICBzaG93OiB4QXhpcy5saW5lQ29sb3IgPT09IGZhbHNlID8gZmFsc2UgOiB0cnVlLFxuICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgY29sb3I6IHhBeGlzLmxpbmVDb2xvciA/IHhBeGlzLmxpbmVDb2xvciA6IGxpbmVDb2xvcixcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGF4aXNUaWNrOiB7XG4gICAgICAgICAgc2hvdzogeEF4aXMuaXNUaWNrLFxuICAgICAgICB9LFxuICAgICAgICBzcGxpdExpbmU6IHtcbiAgICAgICAgICBzaG93OiB4QXhpcy5zcGxpdENvbG9yID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgY29sb3I6IHhBeGlzLnNwbGl0Q29sb3IgPyB4QXhpcy5zcGxpdENvbG9yIDogc3BsaXRDb2xvcixcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGE6IF9uYW1lc1xuICAgICAgfVxuICAgICAgY29uc3QgX3lBeGlzOiBhbnkgPSB7XG4gICAgICAgIG5hbWU6IHlBeGlzLm5hbWUsXG4gICAgICAgIHR5cGU6ICd2YWx1ZScsXG4gICAgICAgIGF4aXNMYWJlbDoge1xuICAgICAgICAgIGNvbG9yOiB5QXhpcy5jb2xvciA/IHlBeGlzLmNvbG9yIDogY29sb3IsXG4gICAgICAgICAgZm9udFNpemU6IHlBeGlzLmZvbnRTaXplID8geUF4aXMuZm9udFNpemUgOiBmb250U2l6ZSxcbiAgICAgICAgfSxcbiAgICAgICAgYXhpc0xpbmU6IHtcbiAgICAgICAgICBzaG93OiB5QXhpcy5saW5lQ29sb3IgPT09IGZhbHNlID8gZmFsc2UgOiB0cnVlLFxuICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgY29sb3I6IHlBeGlzLmxpbmVDb2xvciA/IHlBeGlzLmxpbmVDb2xvciA6IGxpbmVDb2xvcixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBheGlzVGljazoge1xuICAgICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBzcGxpdExpbmU6IHtcbiAgICAgICAgICBzaG93OiB5QXhpcy5zcGxpdENvbG9yID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZSxcbiAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgIGNvbG9yOiB5QXhpcy5zcGxpdENvbG9yID8geUF4aXMuc3BsaXRDb2xvciA6IHNwbGl0Q29sb3IsXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfVxuICAgICAgbGV0IF9hcmVhQ29sb3I6IGFueTtcbiAgICAgIGlmIChhcmVhU3R5bGUuaXNHcmFkKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFyZWFTdHlsZS5jb2xvcikgJiYgYXJlYVN0eWxlLmNvbG9yLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBfYXJlYUNvbG9yID0ge1xuICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgIHgyOiAwLFxuICAgICAgICAgICAgeTI6IDEsXG4gICAgICAgICAgICBjb2xvclN0b3BzOiBbe1xuICAgICAgICAgICAgICBvZmZzZXQ6IDAsIGNvbG9yOiBhcmVhU3R5bGUuY29sb3JbMF1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDEsIGNvbG9yOiBhcmVhU3R5bGUuY29sb3JbMV1cbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgZ2xvYmFsOiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfYXJlYUNvbG9yID0ge1xuICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgIHgyOiAwLFxuICAgICAgICAgICAgeTI6IDEsXG4gICAgICAgICAgICBjb2xvclN0b3BzOiBbe1xuICAgICAgICAgICAgICBvZmZzZXQ6IDAsIGNvbG9yOiBjb2xvcnNbMF1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgb2Zmc2V0OiAxLCBjb2xvcjogJ3JnYmEoMjU1LDI1NSwyNTUsMCknXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIGdsb2JhbDogZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG15Q2hhcnQuc2V0T3B0aW9uKHtcbiAgICAgICAgdG9vbHRpcDoge1xuICAgICAgICAgIHRyaWdnZXI6ICdheGlzJyxcbiAgICAgICAgICB0cmFuc2l0aW9uRHVyYXRpb246IDAsXG4gICAgICAgICAgZW50ZXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGF4aXNQb2ludGVyOiB7XG4gICAgICAgICAgICB0eXBlOiAnc2hhZG93J1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29sb3I6IGNvbG9ycyxcbiAgICAgICAgZ3JpZDogX2dyaWQsXG4gICAgICAgIHhBeGlzOiBfeEF4aXMsXG4gICAgICAgIHlBeGlzOiBfeUF4aXMsXG4gICAgICAgIHNlcmllczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICB0eXBlOiAnYmFyJyxcbiAgICAgICAgICAgIGJhcldpZHRoOiBpdGVtU3R5bGUuYmFyV2lkdGgsXG4gICAgICAgICAgICBpdGVtU3R5bGU6IHtcbiAgICAgICAgICAgICAgY29sb3I6IF9hcmVhQ29sb3IsXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogaXRlbVN0eWxlLmJvcmRlclJhZGl1cyA/IGl0ZW1TdHlsZS5ib3JkZXJSYWRpdXMgOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LCB0cnVlKTtcbiAgICB9XG4gIH0sIFtteUNoYXJ0LCBkYXRhXSlcbiAgXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGZhdWx0QnlIb3VyVGltZTogYW55O1xuICAgIGlmIChteUNoYXJ0ICYmIGlzU3dpdGNoICYmICFpc0hpZ2ggJiYgZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICBmYXVsdEJ5SG91clRpbWUgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHNldEhpZ2hJbmRleChuID0+IHtcbiAgICAgICAgICBteUNoYXJ0LmRpc3BhdGNoQWN0aW9uKHtcbiAgICAgICAgICAgIHR5cGU6ICdzaG93VGlwJyxcbiAgICAgICAgICAgIHNlcmllc0luZGV4OiAwLFxuICAgICAgICAgICAgZGF0YUluZGV4OiBuXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKG4gPj0gZGF0YS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG4gKyAxXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSwgc3dpdGNoVGltZSlcbiAgICB9XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoZmF1bHRCeUhvdXJUaW1lKVxuICAgIH1cbiAgfSwgW215Q2hhcnQsIGlzU3dpdGNoLCBpc0hpZ2gsIGRhdGFdKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiByZWY9e2NoYXJ0UmVmfVxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgJ3dpZHRoJzogd2lkdGgsXG4gICAgICAgICdoZWlnaHQnOiBoZWlnaHRcbiAgICAgIH19PlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEVDaGFydHNCYXI7Il19