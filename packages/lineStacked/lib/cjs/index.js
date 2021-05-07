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

echarts.use([_components.GridComponent, _components.TooltipComponent, _components.LegendComponent, _charts.LineChart, _renderers.CanvasRenderer]);

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
      _props$legend = props.legend,
      legend = _props$legend === void 0 ? {} : _props$legend,
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
      var _series = [];
      var _seriesName = [];
      data.length > 0 && data.map(function (item, index) {
        _names.push(item.name);

        console.log(item);
        var _value = [];
        item.child.map(function (item2) {
          _value.push(item2.value);

          _seriesName.push(item2.name);
        });

        var _areaColor;

        if (areaStyle.isGrad) {
          _areaColor = {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: colors[index]
            }, {
              offset: 1,
              color: 'rgba(255,255,255,0)'
            }],
            global: false
          };
        }

        _series.push({
          stack: 'stack',
          name: _seriesName[index],
          data: _value,
          type: 'line',
          smooth: smooth,
          areaStyle: areaStyle.show ? {
            color: _areaColor
          } : undefined,
          emphasis: {
            focus: 'series'
          },
          lineStyle: {
            width: 1
          }
        });
      });
      console.log(_series);

      var _grid = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, {
        top: '15%',
        bottom: '10%',
        left: '10%',
        right: '5%'
      }), grid);

      var _legend = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, {
        show: true,
        icon: 'circle',
        data: _seriesName
      }), legend);

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
        legend: _legend,
        xAxis: _xAxis,
        yAxis: _yAxis,
        series: _series
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiZWNoYXJ0cyIsInVzZSIsIkdyaWRDb21wb25lbnQiLCJUb29sdGlwQ29tcG9uZW50IiwiTGVnZW5kQ29tcG9uZW50IiwiTGluZUNoYXJ0IiwiQ2FudmFzUmVuZGVyZXIiLCJFQ2hhcnRzTGluZSIsInByb3BzIiwid2lkdGgiLCJoZWlnaHQiLCJzbW9vdGgiLCJjb2xvcnMiLCJjb2xvciIsImxpbmVDb2xvciIsInNwbGl0Q29sb3IiLCJmb250U2l6ZSIsImxlZ2VuZCIsImRhdGEiLCJ4QXhpcyIsInlBeGlzIiwiZ3JpZCIsImFyZWFTdHlsZSIsImlzU3dpdGNoIiwic3dpdGNoVGltZSIsIm9uQ2xpY2siLCJjaGFydFJlZiIsIm15Q2hhcnQiLCJzZXRNeUNoYXJ0IiwiaXNIaWdoIiwiaGlnaEluZGV4Iiwic2V0SGlnaEluZGV4IiwiX215Q2hhcnQiLCJpbml0IiwiY3VycmVudCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNpemUiLCJvZmYiLCJvbiIsInYiLCJjb25zb2xlIiwibG9nIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRpc3Bvc2UiLCJjbGVhciIsIl9uYW1lcyIsIl9zZXJpZXMiLCJfc2VyaWVzTmFtZSIsImxlbmd0aCIsIm1hcCIsIml0ZW0iLCJpbmRleCIsInB1c2giLCJuYW1lIiwiX3ZhbHVlIiwiY2hpbGQiLCJpdGVtMiIsInZhbHVlIiwiX2FyZWFDb2xvciIsImlzR3JhZCIsInR5cGUiLCJ4IiwieSIsIngyIiwieTIiLCJjb2xvclN0b3BzIiwib2Zmc2V0IiwiZ2xvYmFsIiwic3RhY2siLCJzaG93IiwidW5kZWZpbmVkIiwiZW1waGFzaXMiLCJmb2N1cyIsImxpbmVTdHlsZSIsIl9ncmlkIiwidG9wIiwiYm90dG9tIiwibGVmdCIsInJpZ2h0IiwiX2xlZ2VuZCIsImljb24iLCJfeEF4aXMiLCJib3VuZGFyeUdhcCIsImF4aXNMYWJlbCIsInJvdGF0ZSIsImF4aXNMaW5lIiwiYXhpc1RpY2siLCJpc1RpY2siLCJzcGxpdExpbmUiLCJfeUF4aXMiLCJzZXRPcHRpb24iLCJ0b29sdGlwIiwidHJpZ2dlciIsInRyYW5zaXRpb25EdXJhdGlvbiIsImVudGVyYWJsZSIsImF4aXNQb2ludGVyIiwic2VyaWVzIiwiZmF1bHRCeUhvdXJUaW1lIiwic2V0SW50ZXJ2YWwiLCJuIiwiZGlzcGF0Y2hBY3Rpb24iLCJzZXJpZXNJbmRleCIsImRhdGFJbmRleCIsImNsZWFySW50ZXJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUVBQSxPQUFPLENBQUNDLEdBQVIsQ0FDRSxDQUFDQyx5QkFBRCxFQUFnQkMsNEJBQWhCLEVBQWtDQywyQkFBbEMsRUFBbURDLGlCQUFuRCxFQUE4REMseUJBQTlELENBREY7O0FBeUVBLElBQU1DLFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNDLEtBQUQsRUFBNkI7QUFDL0MscUJBa0JJQSxLQWxCSixDQUNFQyxLQURGO0FBQUEsTUFDRUEsS0FERiw2QkFDVSxNQURWO0FBQUEsc0JBa0JJRCxLQWxCSixDQUVFRSxNQUZGO0FBQUEsTUFFRUEsTUFGRiw4QkFFVyxNQUZYO0FBQUEsc0JBa0JJRixLQWxCSixDQUdFRyxNQUhGO0FBQUEsTUFHRUEsTUFIRiw4QkFHVyxLQUhYO0FBQUEsc0JBa0JJSCxLQWxCSixDQUlFSSxNQUpGO0FBQUEsTUFJRUEsTUFKRiw4QkFJVyxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLFNBQXZCLEVBQWtDLFNBQWxDLEVBQTZDLFNBQTdDLEVBQXdELFNBQXhELEVBQW1FLFNBQW5FLEVBQThFLFNBQTlFLEVBQXlGLFNBQXpGLENBSlg7QUFBQSxxQkFrQklKLEtBbEJKLENBS0VLLEtBTEY7QUFBQSxNQUtFQSxLQUxGLDZCQUtVLE1BTFY7QUFBQSx5QkFrQklMLEtBbEJKLENBTUVNLFNBTkY7QUFBQSxNQU1FQSxTQU5GLGlDQU1jLFNBTmQ7QUFBQSwwQkFrQklOLEtBbEJK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NkhHLENBQUNwQixPQUFELEVBQVVULElBQVYsQ0E3SEg7QUErSEEsd0JBQVUsWUFBTTtBQUNkLFFBQUlnRixlQUFKOztBQUNBLFFBQUl2RSxPQUFPLElBQUlKLFFBQVgsSUFBdUIsQ0FBQ00sTUFBeEIsSUFBa0NYLElBQUksQ0FBQytCLE1BQUwsR0FBYyxDQUFwRCxFQUF1RDtBQUNyRGlELE1BQUFBLGVBQWUsR0FBR0MsV0FBVyxDQUFDLFlBQU07QUFDbENwRSxRQUFBQSxZQUFZLENBQUMsVUFBQXFFLENBQUMsRUFBSTtBQUNoQnpFLFVBQUFBLE9BQU8sQ0FBQzBFLGNBQVIsQ0FBdUI7QUFDckJ4QyxZQUFBQSxJQUFJLEVBQUUsU0FEZTtBQUVyQnlDLFlBQUFBLFdBQVcsRUFBRSxDQUZRO0FBR3JCQyxZQUFBQSxTQUFTLEVBQUVIO0FBSFUsV0FBdkI7O0FBS0EsY0FBSUEsQ0FBQyxJQUFJbEYsSUFBSSxDQUFDK0IsTUFBTCxHQUFjLENBQXZCLEVBQTBCO0FBQ3hCLG1CQUFPLENBQVA7QUFDRCxXQUZELE1BRU87QUFDTCxtQkFBT21ELENBQUMsR0FBRyxDQUFYO0FBQ0Q7QUFDRixTQVhXLENBQVo7QUFZRCxPQWI0QixFQWExQjVFLFVBYjBCLENBQTdCO0FBY0Q7O0FBQ0QsV0FBTyxZQUFNO0FBQ1hnRixNQUFBQSxhQUFhLENBQUNOLGVBQUQsQ0FBYjtBQUNELEtBRkQ7QUFHRCxHQXJCRCxFQXFCRyxDQUFDdkUsT0FBRCxFQUFVSixRQUFWLEVBQW9CTSxNQUFwQixFQUE0QlgsSUFBNUIsQ0FyQkg7QUF1QkEsc0JBQ0U7QUFBSyxJQUFBLEdBQUcsRUFBRVEsUUFBVjtBQUNFLElBQUEsS0FBSyxFQUFFO0FBQ0wsZUFBU2pCLEtBREo7QUFFTCxnQkFBVUM7QUFGTDtBQURULElBREY7QUFRRCxDQTVNRDs7ZUE4TWVILFciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgKiBhcyBlY2hhcnRzIGZyb20gJ2VjaGFydHMvY29yZSc7XG5pbXBvcnQgeyBHcmlkQ29tcG9uZW50LCBUb29sdGlwQ29tcG9uZW50LCBMZWdlbmRDb21wb25lbnQsIEdyaWRDb21wb25lbnRPcHRpb24sIExlZ2VuZENvbXBvbmVudE9wdGlvbiB9IGZyb20gJ2VjaGFydHMvY29tcG9uZW50cyc7XG5pbXBvcnQgeyBMaW5lQ2hhcnQgfSBmcm9tICdlY2hhcnRzL2NoYXJ0cyc7XG5pbXBvcnQgeyBDYW52YXNSZW5kZXJlciB9IGZyb20gJ2VjaGFydHMvcmVuZGVyZXJzJztcblxuZWNoYXJ0cy51c2UoXG4gIFtHcmlkQ29tcG9uZW50LCBUb29sdGlwQ29tcG9uZW50LCBMZWdlbmRDb21wb25lbnQsIExpbmVDaGFydCwgQ2FudmFzUmVuZGVyZXJdXG4pO1xuXG5pbnRlcmZhY2UgeEF4aXNQcm9wcyB7XG4gIGNvbG9yPzogc3RyaW5nO1xuICBmb250U2l6ZT86IG51bWJlcjtcbiAgbGluZUNvbG9yPzogc3RyaW5nIHwgYm9vbGVhbjtcbiAgc3BsaXRDb2xvcj86IHN0cmluZyB8IGJvb2xlYW47XG4gIHJvdGF0ZT86IG51bWJlcjtcbiAgaXNUaWNrPzogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIHlBeGlzUHJvcHMge1xuICBuYW1lPzogc3RyaW5nO1xuICBjb2xvcj86IHN0cmluZztcbiAgZm9udFNpemU/OiBudW1iZXI7XG4gIGxpbmVDb2xvcj86IHN0cmluZyB8IGJvb2xlYW47XG4gIHNwbGl0Q29sb3I/OiBzdHJpbmcgfCBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgYXJlYVN0eWxlUHJvcHMge1xuICBzaG93PzogYm9vbGVhbjtcbiAgaXNHcmFkPzogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIExpbmVTdGFja2VkUHJvcHMge1xuICBkYXRhPzogYW55W107XG4gIHdpZHRoPzogc3RyaW5nO1xuICBoZWlnaHQ/OiBzdHJpbmc7XG4gIC8qKiDmmK/lkKblubPmu5Hmm7Lnur/mmL7npLogKi9cbiAgc21vb3RoPzogYm9vbGVhbjtcbiAgLyoqIOWtl+S9k+minOiJsiAqL1xuICBjb2xvcj86IHN0cmluZztcbiAgLyoqIHgsIHnovbTovbTnur/nur/mnaHpopzoibIgKi9cbiAgbGluZUNvbG9yPzogc3RyaW5nO1xuICAvKiogeCwgeei9tOe9keagvOe6v+adoeminOiJsiAqL1xuICBzcGxpdENvbG9yPzogc3RyaW5nO1xuICAvKiog5a2X5L2T5aSn5bCP77yM6buY6K6kMTTlg4/ntKAgKi9cbiAgZm9udFNpemU/OiBudW1iZXIgfCBzdHJpbmc7XG4gIC8qKiDmipjnur/popzoibIgKi9cbiAgY29sb3JzPzogc3RyaW5nW107XG4gIC8qKiDmmK/lkKboh6rliqjliIfmjaIgVG9vbHRpcCAqL1xuICBpc1N3aXRjaD86IGJvb2xlYW47XG4gIC8qKiDoh6rliqjliIfmjaLkuovku7Yg6buY6K6kIDIwMDDvvIgyU++8iSAqL1xuICBzd2l0Y2hUaW1lPzogbnVtYmVyO1xuICAvKiog5Zu+5L6L57uE5Lu2LCBhcGk6IGh0dHBzOi8vZWNoYXJ0cy5hcGFjaGUub3JnL3poL29wdGlvbi5odG1sI2xlZ2VuZCAqL1xuICBsZWdlbmQ/OiBMZWdlbmRDb21wb25lbnRPcHRpb247XG4gIC8qKiDljLrln5/loavlhYXmoLflvI8gKi9cbiAgYXJlYVN0eWxlPzogYXJlYVN0eWxlUHJvcHM7XG4gIC8qKlxuICAgKiBYIOi9tOmFjee9rlxuICAgKiBAY29sb3Ig5paH5a2X6aKc6ImyXG4gICAqIEBzaXplIOaWh+Wtl+Wkp+Wwj1xuICAgKiBAbGluZUNvbG9yIHjovbTovbTnur/nur/mnaHpopzoibIsIGZhbHNlIOWImeS4jeaYvuekulxuICAgKiBAc3BsaXRDb2xvciB46L20572R5qC857q/5p2h6aKc6ImyLCBmYWxzZSDliJnkuI3mmL7npLosIOm7mOiupHRydWVcbiAgICogQHJvdGF0ZSDliLvluqbmoIfnrb7ml4vovazop5LluqZcbiAgICogQGlzVGljayDmmK/lkKbmmL7npLrlnZDmoIfovbTliLvluqZcbiAgICovXG4gIHhBeGlzPzogeEF4aXNQcm9wcztcbiAgLyoqXG4gICAqIHkg6L206YWN572uXG4gICAqIEBuYW1lIOWdkOagh+i9tOWQjeensFxuICAgKiBAY29sb3Ig5paH5a2X6aKc6ImyXG4gICAqIEBzaXplIOaWh+Wtl+Wkp+Wwj1xuICAgKiBAbGluZUNvbG9yIHnovbTovbTnur/nur/mnaHpopzoibIsIGZhbHNlIOWImeS4jeaYvuekulxuICAgKiBAc3BsaXRDb2xvciB56L20572R5qC857q/5p2h6aKc6ImyLCBmYWxzZSDliJnkuI3mmL7npLosIOm7mOiupGZhbHNlXG4gICAqL1xuICB5QXhpcz86IHlBeGlzUHJvcHM7XG4gIGdyaWQ/OiBHcmlkQ29tcG9uZW50T3B0aW9uO1xuICBvbkNsaWNrPzogKHY6IGFueSkgPT4gdm9pZDtcbn1cblxuY29uc3QgRUNoYXJ0c0xpbmUgPSAocHJvcHM6IExpbmVTdGFja2VkUHJvcHMpID0+IHtcbiAgY29uc3Qge1xuICAgIHdpZHRoID0gJzEwMCUnLFxuICAgIGhlaWdodCA9ICcxMDAlJyxcbiAgICBzbW9vdGggPSBmYWxzZSxcbiAgICBjb2xvcnMgPSBbJyM1NDcwYzYnLCAnIzkxY2M3NScsICcjZmFjODU4JywgJyNlZTY2NjYnLCAnIzczYzBkZScsICcjM2JhMjcyJywgJyNmYzg0NTInLCAnIzlhNjBiNCcsICcjZWE3Y2NjJ10sXG4gICAgY29sb3IgPSAnIzMzMycsXG4gICAgbGluZUNvbG9yID0gJyNhYmI5ZDAnLFxuICAgIHNwbGl0Q29sb3IgPSAnI2UwZTdmMycsXG4gICAgZm9udFNpemUgPSAxNCxcbiAgICBsZWdlbmQgPSB7fSxcbiAgICBkYXRhID0gW10sXG4gICAgeEF4aXMgPSB7fSxcbiAgICB5QXhpcyA9IHt9LFxuICAgIGdyaWQgPSB7fSxcbiAgICBhcmVhU3R5bGUgPSB7fSxcbiAgICBpc1N3aXRjaCA9IGZhbHNlLFxuICAgIHN3aXRjaFRpbWUgPSAyMDAwLFxuICAgIG9uQ2xpY2tcbiAgfSA9IHByb3BzO1xuXG4gIGNvbnN0IGNoYXJ0UmVmID0gdXNlUmVmPGFueT4obnVsbClcbiAgY29uc3QgW215Q2hhcnQsIHNldE15Q2hhcnRdID0gdXNlU3RhdGU8YW55PihudWxsKTtcbiAgY29uc3QgW2lzSGlnaF0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFtoaWdoSW5kZXgsIHNldEhpZ2hJbmRleF0gPSB1c2VTdGF0ZTxudW1iZXI+KDApO1xuICBcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBfbXlDaGFydDogYW55ID0gZWNoYXJ0cy5pbml0KGNoYXJ0UmVmLmN1cnJlbnQpO1xuICAgIHNldE15Q2hhcnQoX215Q2hhcnQpXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBfbXlDaGFydC5yZXNpemUsIGZhbHNlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIF9teUNoYXJ0LnJlc2l6ZSwgZmFsc2UpO1xuICAgIF9teUNoYXJ0Lm9mZignY2xpY2snKTtcbiAgICBfbXlDaGFydC5vbignY2xpY2snLCAodjogYW55KSA9PiB7XG4gICAgICBvbkNsaWNrPy4odi5kYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKHYuZGF0YSlcbiAgICB9KVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygyKVxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIF9teUNoYXJ0LnJlc2l6ZSwgZmFsc2UpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBfbXlDaGFydC5yZXNpemUsIGZhbHNlKTtcbiAgICAgIF9teUNoYXJ0LmRpc3Bvc2UoKTtcbiAgICB9XG4gIH0sIFtdKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKG15Q2hhcnQpIHtcbiAgICAgIG15Q2hhcnQuY2xlYXIoKTtcbiAgICAgIGNvbnN0IF9uYW1lczogc3RyaW5nW10gPSBbXTtcbiAgICAgIGNvbnN0IF9zZXJpZXM6IGFueVtdID0gW107XG4gICAgICBjb25zdCBfc2VyaWVzTmFtZTogc3RyaW5nW10gPSBbXTtcbiAgICAgIGRhdGEubGVuZ3RoID4gMCAmJiBkYXRhLm1hcCgoaXRlbTogYW55LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIF9uYW1lcy5wdXNoKGl0ZW0ubmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW0pXG4gICAgICAgIGNvbnN0IF92YWx1ZTogYW55W10gPSBbXTtcbiAgICAgICAgaXRlbS5jaGlsZC5tYXAoKGl0ZW0yOiBhbnkpID0+IHtcbiAgICAgICAgICBfdmFsdWUucHVzaChpdGVtMi52YWx1ZSk7XG4gICAgICAgICAgX3Nlcmllc05hbWUucHVzaChpdGVtMi5uYW1lKTtcbiAgICAgICAgfSlcbiAgICAgICAgbGV0IF9hcmVhQ29sb3I6IGFueTtcbiAgICAgICAgaWYgKGFyZWFTdHlsZS5pc0dyYWQpIHtcbiAgICAgICAgICBfYXJlYUNvbG9yID0ge1xuICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgIHgyOiAwLFxuICAgICAgICAgICAgeTI6IDEsXG4gICAgICAgICAgICBjb2xvclN0b3BzOiBbe1xuICAgICAgICAgICAgICBvZmZzZXQ6IDAsIGNvbG9yOiBjb2xvcnNbaW5kZXhdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIG9mZnNldDogMSwgY29sb3I6ICdyZ2JhKDI1NSwyNTUsMjU1LDApJ1xuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBnbG9iYWw6IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9zZXJpZXMucHVzaCh7XG4gICAgICAgICAgc3RhY2s6ICdzdGFjaycsXG4gICAgICAgICAgbmFtZTogX3Nlcmllc05hbWVbaW5kZXhdLFxuICAgICAgICAgIGRhdGE6IF92YWx1ZSxcbiAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgc21vb3RoOiBzbW9vdGgsXG4gICAgICAgICAgYXJlYVN0eWxlOiBhcmVhU3R5bGUuc2hvdyA/IHtcbiAgICAgICAgICAgIGNvbG9yOiBfYXJlYUNvbG9yXG4gICAgICAgICAgfSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICBlbXBoYXNpczoge1xuICAgICAgICAgICAgZm9jdXM6ICdzZXJpZXMnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgIHdpZHRoOiAxXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIGNvbnNvbGUubG9nKF9zZXJpZXMpXG4gICAgICBjb25zdCBfZ3JpZDogR3JpZENvbXBvbmVudE9wdGlvbiA9IHsuLi57XG4gICAgICAgIHRvcDogJzE1JScsXG4gICAgICAgIGJvdHRvbTogJzEwJScsXG4gICAgICAgIGxlZnQ6ICcxMCUnLFxuICAgICAgICByaWdodDogJzUlJyxcbiAgICAgIH0sIC4uLmdyaWR9O1xuICAgICAgY29uc3QgX2xlZ2VuZDogTGVnZW5kQ29tcG9uZW50T3B0aW9uID0gey4uLntcbiAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgaWNvbjogJ2NpcmNsZScsXG4gICAgICAgIGRhdGE6IF9zZXJpZXNOYW1lXG4gICAgICB9LCAuLi5sZWdlbmR9O1xuICAgICAgY29uc3QgX3hBeGlzOiBhbnkgPSB7XG4gICAgICAgIHR5cGU6ICdjYXRlZ29yeScsXG4gICAgICAgIGJvdW5kYXJ5R2FwOiBmYWxzZSxcbiAgICAgICAgYXhpc0xhYmVsOiB7XG4gICAgICAgICAgY29sb3I6IHhBeGlzLmNvbG9yID8geEF4aXMuY29sb3IgOiBjb2xvcixcbiAgICAgICAgICBmb250U2l6ZTogeEF4aXMuZm9udFNpemUgPyB4QXhpcy5mb250U2l6ZSA6IGZvbnRTaXplLFxuICAgICAgICAgIHJvdGF0ZTogeEF4aXMucm90YXRlID8geEF4aXMucm90YXRlIDogMCxcbiAgICAgICAgfSxcbiAgICAgICAgYXhpc0xpbmU6IHtcbiAgICAgICAgICBzaG93OiB4QXhpcy5saW5lQ29sb3IgPT09IGZhbHNlID8gZmFsc2UgOiB0cnVlLFxuICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgY29sb3I6IHhBeGlzLmxpbmVDb2xvciA/IHhBeGlzLmxpbmVDb2xvciA6IGxpbmVDb2xvcixcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGF4aXNUaWNrOiB7XG4gICAgICAgICAgc2hvdzogeEF4aXMuaXNUaWNrLFxuICAgICAgICB9LFxuICAgICAgICBzcGxpdExpbmU6IHtcbiAgICAgICAgICBzaG93OiB4QXhpcy5zcGxpdENvbG9yID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgY29sb3I6IHhBeGlzLnNwbGl0Q29sb3IgPyB4QXhpcy5zcGxpdENvbG9yIDogc3BsaXRDb2xvcixcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRhdGE6IF9uYW1lc1xuICAgICAgfVxuICAgICAgY29uc3QgX3lBeGlzOiBhbnkgPSB7XG4gICAgICAgIG5hbWU6IHlBeGlzLm5hbWUsXG4gICAgICAgIHR5cGU6ICd2YWx1ZScsXG4gICAgICAgIGF4aXNMYWJlbDoge1xuICAgICAgICAgIGNvbG9yOiB5QXhpcy5jb2xvciA/IHlBeGlzLmNvbG9yIDogY29sb3IsXG4gICAgICAgICAgZm9udFNpemU6IHlBeGlzLmZvbnRTaXplID8geUF4aXMuZm9udFNpemUgOiBmb250U2l6ZSxcbiAgICAgICAgfSxcbiAgICAgICAgYXhpc0xpbmU6IHtcbiAgICAgICAgICBzaG93OiB5QXhpcy5saW5lQ29sb3IgPT09IGZhbHNlID8gZmFsc2UgOiB0cnVlLFxuICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgY29sb3I6IHlBeGlzLmxpbmVDb2xvciA/IHlBeGlzLmxpbmVDb2xvciA6IGxpbmVDb2xvcixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBheGlzVGljazoge1xuICAgICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBzcGxpdExpbmU6IHtcbiAgICAgICAgICBzaG93OiB5QXhpcy5zcGxpdENvbG9yID09PSBmYWxzZSA/IGZhbHNlIDogdHJ1ZSxcbiAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgIGNvbG9yOiB5QXhpcy5zcGxpdENvbG9yID8geUF4aXMuc3BsaXRDb2xvciA6IHNwbGl0Q29sb3IsXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfVxuICAgICAgXG4gICAgICBteUNoYXJ0LnNldE9wdGlvbih7XG4gICAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgICB0cmlnZ2VyOiAnYXhpcycsXG4gICAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiAwLFxuICAgICAgICAgIGVudGVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBheGlzUG9pbnRlcjoge1xuICAgICAgICAgICAgdHlwZTogJ3NoYWRvdydcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbG9yOiBjb2xvcnMsXG4gICAgICAgIGdyaWQ6IF9ncmlkLFxuICAgICAgICBsZWdlbmQ6IF9sZWdlbmQsXG4gICAgICAgIHhBeGlzOiBfeEF4aXMsXG4gICAgICAgIHlBeGlzOiBfeUF4aXMsXG4gICAgICAgIHNlcmllczogX3Nlcmllc1xuICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuICB9LCBbbXlDaGFydCwgZGF0YV0pXG4gIFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBmYXVsdEJ5SG91clRpbWU6IGFueTtcbiAgICBpZiAobXlDaGFydCAmJiBpc1N3aXRjaCAmJiAhaXNIaWdoICYmIGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgZmF1bHRCeUhvdXJUaW1lID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBzZXRIaWdoSW5kZXgobiA9PiB7XG4gICAgICAgICAgbXlDaGFydC5kaXNwYXRjaEFjdGlvbih7XG4gICAgICAgICAgICB0eXBlOiAnc2hvd1RpcCcsXG4gICAgICAgICAgICBzZXJpZXNJbmRleDogMCxcbiAgICAgICAgICAgIGRhdGFJbmRleDogblxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChuID49IGRhdGEubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuICsgMVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sIHN3aXRjaFRpbWUpXG4gICAgfVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhckludGVydmFsKGZhdWx0QnlIb3VyVGltZSlcbiAgICB9XG4gIH0sIFtteUNoYXJ0LCBpc1N3aXRjaCwgaXNIaWdoLCBkYXRhXSlcblxuICByZXR1cm4gKFxuICAgIDxkaXYgcmVmPXtjaGFydFJlZn1cbiAgICAgIHN0eWxlPXt7XG4gICAgICAgICd3aWR0aCc6IHdpZHRoLFxuICAgICAgICAnaGVpZ2h0JzogaGVpZ2h0XG4gICAgICB9fT5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBFQ2hhcnRzTGluZTsiXX0=