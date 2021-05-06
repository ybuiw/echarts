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

echarts.use([_components.TooltipComponent, _components.LegendComponent, _charts.PieChart, _renderers.CanvasRenderer]);

var EChartsPie = function EChartsPie(props) {
  var _props$width = props.width,
      width = _props$width === void 0 ? '100%' : _props$width,
      _props$height = props.height,
      height = _props$height === void 0 ? '100%' : _props$height,
      _props$colors = props.colors,
      colors = _props$colors === void 0 ? ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'] : _props$colors,
      _props$label = props.label,
      label = _props$label === void 0 ? {} : _props$label,
      _props$series = props.series,
      series = _props$series === void 0 ? {} : _props$series,
      _props$legend = props.legend,
      legend = _props$legend === void 0 ? {} : _props$legend,
      _props$data = props.data,
      data = _props$data === void 0 ? [] : _props$data,
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

      var _legend = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, {
        bottom: '5%',
        left: 'center',
        icon: 'circle',
        show: true
      }), legend);

      myChart.setOption({
        tooltip: {
          trigger: 'item',
          transitionDuration: 0
        },
        legend: _legend,
        color: colors,
        series: [{
          data: data,
          type: 'pie',
          radius: series.radius ? series.radius : '70%',
          center: series.center ? series.center : ['50%', '50%'],
          label: {
            show: label.show,
            alignTo: label.edgeDistance ? 'edge' : 'none',
            fontSize: label.fontSize,
            edgeDistance: label.edgeDistance,
            minMargin: label.minMargin ? label.minMargin : 10,
            color: label.color,
            lineHeight: label.lineHeight ? label.lineHeight : 20,
            formatter: label.formatter ? label.formatter : false
          },
          labelLine: {
            length: label.length ? label.length : 10,
            length2: label.length2 ? label.length2 : 20
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

var _default = EChartsPie;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiZWNoYXJ0cyIsInVzZSIsIlRvb2x0aXBDb21wb25lbnQiLCJMZWdlbmRDb21wb25lbnQiLCJQaWVDaGFydCIsIkNhbnZhc1JlbmRlcmVyIiwiRUNoYXJ0c1BpZSIsInByb3BzIiwid2lkdGgiLCJoZWlnaHQiLCJjb2xvcnMiLCJsYWJlbCIsInNlcmllcyIsImxlZ2VuZCIsImRhdGEiLCJpc1N3aXRjaCIsInN3aXRjaFRpbWUiLCJvbkNsaWNrIiwiY2hhcnRSZWYiLCJteUNoYXJ0Iiwic2V0TXlDaGFydCIsImlzSGlnaCIsImhpZ2hJbmRleCIsInNldEhpZ2hJbmRleCIsIl9teUNoYXJ0IiwiaW5pdCIsImN1cnJlbnQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVzaXplIiwib2ZmIiwib24iLCJ2IiwiY29uc29sZSIsImxvZyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkaXNwb3NlIiwiY2xlYXIiLCJfbmFtZXMiLCJsZW5ndGgiLCJtYXAiLCJpdGVtIiwicHVzaCIsIm5hbWUiLCJfbGVnZW5kIiwiYm90dG9tIiwibGVmdCIsImljb24iLCJzaG93Iiwic2V0T3B0aW9uIiwidG9vbHRpcCIsInRyaWdnZXIiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJjb2xvciIsInR5cGUiLCJyYWRpdXMiLCJjZW50ZXIiLCJhbGlnblRvIiwiZWRnZURpc3RhbmNlIiwiZm9udFNpemUiLCJtaW5NYXJnaW4iLCJsaW5lSGVpZ2h0IiwiZm9ybWF0dGVyIiwibGFiZWxMaW5lIiwibGVuZ3RoMiIsImZhdWx0QnlIb3VyVGltZSIsInNldEludGVydmFsIiwibiIsImRpc3BhdGNoQWN0aW9uIiwic2VyaWVzSW5kZXgiLCJkYXRhSW5kZXgiLCJjbGVhckludGVydmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQUEsT0FBTyxDQUFDQyxHQUFSLENB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LElBQUksRUFBRSxTQURlO0FBRXJCZSxZQUFBQSxXQUFXLEVBQUUsQ0FGUTtBQUdyQkMsWUFBQUEsU0FBUyxFQUFFSDtBQUhVLFdBQXZCOztBQUtBLGNBQUlBLENBQUMsSUFBSXJELElBQUksQ0FBQ3lCLE1BQUwsR0FBYyxDQUF2QixFQUEwQjtBQUN4QixtQkFBTyxDQUFQO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsbUJBQU80QixDQUFDLEdBQUcsQ0FBWDtBQUNEO0FBQ0YsU0FYVyxDQUFaO0FBWUQsT0FiNEIsRUFhMUJuRCxVQWIwQixDQUE3QjtBQWNEOztBQUNELFdBQU8sWUFBTTtBQUNYdUQsTUFBQUEsYUFBYSxDQUFDTixlQUFELENBQWI7QUFDRCxLQUZEO0FBR0QsR0FyQkQsRUFxQkcsQ0FBQzlDLE9BQUQsRUFBVUosUUFBVixFQUFvQk0sTUFBcEIsRUFBNEJQLElBQTVCLENBckJIO0FBdUJBLHNCQUNFO0FBQUssSUFBQSxHQUFHLEVBQUVJLFFBQVY7QUFDRSxJQUFBLEtBQUssRUFBRTtBQUNMLGVBQVNWLEtBREo7QUFFTCxnQkFBVUM7QUFGTDtBQURULElBREY7QUFRRCxDQW5IRDs7ZUFxSGVILFUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0ICogYXMgZWNoYXJ0cyBmcm9tICdlY2hhcnRzL2NvcmUnO1xyXG5pbXBvcnQgeyBUb29sdGlwQ29tcG9uZW50LCBMZWdlbmRDb21wb25lbnQsIExlZ2VuZENvbXBvbmVudE9wdGlvbiAgfSBmcm9tICdlY2hhcnRzL2NvbXBvbmVudHMnO1xyXG5pbXBvcnQgeyBQaWVDaGFydCB9IGZyb20gJ2VjaGFydHMvY2hhcnRzJztcclxuaW1wb3J0IHsgQ2FudmFzUmVuZGVyZXIgfSBmcm9tICdlY2hhcnRzL3JlbmRlcmVycyc7XHJcblxyXG5lY2hhcnRzLnVzZShcclxuICBbVG9vbHRpcENvbXBvbmVudCwgTGVnZW5kQ29tcG9uZW50LCBQaWVDaGFydCwgQ2FudmFzUmVuZGVyZXJdXHJcbik7XHJcblxyXG5pbnRlcmZhY2UgTGFiZWxQcm9wcyB7XHJcbiAgc2hvdz86IGJvb2xlYW47XHJcbiAgLyoqIOWtl+S9k+minOiJsiAqL1xyXG4gIGNvbG9yPzogc3RyaW5nO1xyXG4gIC8qKiDlrZfkvZPlpKflsI/vvIzpu5jorqQxNOWDj+e0oCAqL1xyXG4gIGZvbnRTaXplPzogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIC8qKiBcclxuICAgKiDmoIfnrb7lhoXlrrnmoLzlvI9cclxuICAgKiBAe2F977ya57O75YiX5ZCN44CCXHJcbiAgICogQHtife+8muaVsOaNruWQjeOAglxyXG4gICAqIEB7Y33vvJrmlbDmja7lgLzjgIJcclxuICAgKiBAe2R977ya55m+5YiG5q+U44CCXHJcbiAgICovXHJcbiAgZm9ybWF0dGVyPzogc3RyaW5nIHwgRnVuY3Rpb247XHJcbiAgZWRnZURpc3RhbmNlPzogbnVtYmVyIHwgc3RyaW5nO1xyXG4gIC8qKiDooYzpq5ggKi9cclxuICBsaW5lSGVpZ2h0PzogbnVtYmVyO1xyXG4gIC8qKiDnrKzkuIDmrrXlvJXlr7znur/plb/luqYgKi9cclxuICBsZW5ndGg/OiBudW1iZXI7XHJcbiAgLyoqIOesrOS6jOauteW8leWvvOe6v+mVv+W6piAqL1xyXG4gIGxlbmd0aDI/OiBudW1iZXI7XHJcbiAgLyoqIOagh+etvuS5i+mXtOmXtOi3ne+8jOm7mOiupDEw5YOP57SgICovXHJcbiAgbWluTWFyZ2luPzogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgU2VyaWVzUHJvcHMge1xyXG4gIGNlbnRlcj86IHN0cmluZ1tdIHwgbnVtYmVyIHwgc3RyaW5nO1xyXG4gIHJhZGl1cz86IHN0cmluZ1tdIHwgbnVtYmVyW10gfCBudW1iZXIgfCBzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBQaWVCYXNlUHJvcHMge1xyXG4gIGRhdGE/OiBhbnlbXTtcclxuICB3aWR0aD86IHN0cmluZztcclxuICBoZWlnaHQ/OiBzdHJpbmc7XHJcbiAgLyoqIOmlvOWbvuminOiJsiAqL1xyXG4gIGNvbG9ycz86IHN0cmluZ1tdO1xyXG4gIGxhYmVsPzogTGFiZWxQcm9wcztcclxuICAvKiog6aW85Zu+5bGe5oCnICovXHJcbiAgc2VyaWVzPzogU2VyaWVzUHJvcHM7XHJcbiAgLyoqIOWbvuS+i+e7hOS7tiwgYXBpOiBodHRwczovL2VjaGFydHMuYXBhY2hlLm9yZy96aC9vcHRpb24uaHRtbCNsZWdlbmQgKi9cclxuICBsZWdlbmQ/OiBMZWdlbmRDb21wb25lbnRPcHRpb247XHJcbiAgLyoqIOaYr+WQpuiHquWKqOWIh+aNoiBUb29sdGlwICovXHJcbiAgaXNTd2l0Y2g/OiBib29sZWFuO1xyXG4gIC8qKiDoh6rliqjliIfmjaLkuovku7Yg6buY6K6kIDIwMDDvvIgyU++8iSAqL1xyXG4gIHN3aXRjaFRpbWU/OiBudW1iZXI7XHJcbiAgb25DbGljaz86ICh2OiBhbnkpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmNvbnN0IEVDaGFydHNQaWUgPSAocHJvcHM6IFBpZUJhc2VQcm9wcykgPT4ge1xyXG4gIGNvbnN0IHtcclxuICAgIHdpZHRoID0gJzEwMCUnLFxyXG4gICAgaGVpZ2h0ID0gJzEwMCUnLFxyXG4gICAgY29sb3JzID0gWycjNTQ3MGM2JywgJyM5MWNjNzUnLCAnI2ZhYzg1OCcsICcjZWU2NjY2JywgJyM3M2MwZGUnLCAnIzNiYTI3MicsICcjZmM4NDUyJywgJyM5YTYwYjQnLCAnI2VhN2NjYyddLFxyXG4gICAgbGFiZWwgPSB7fSxcclxuICAgIHNlcmllcyA9IHt9LFxyXG4gICAgbGVnZW5kID0ge30sXHJcbiAgICBkYXRhID0gW10sXHJcbiAgICBpc1N3aXRjaCA9IGZhbHNlLFxyXG4gICAgc3dpdGNoVGltZSA9IDIwMDAsXHJcbiAgICBvbkNsaWNrXHJcbiAgfSA9IHByb3BzO1xyXG5cclxuICBjb25zdCBjaGFydFJlZiA9IHVzZVJlZjxhbnk+KG51bGwpXHJcbiAgY29uc3QgW215Q2hhcnQsIHNldE15Q2hhcnRdID0gdXNlU3RhdGU8YW55PihudWxsKTtcclxuICBjb25zdCBbaXNIaWdoXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcclxuICBjb25zdCBbaGlnaEluZGV4LCBzZXRIaWdoSW5kZXhdID0gdXNlU3RhdGU8bnVtYmVyPigwKTtcclxuICBcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGxldCBfbXlDaGFydDogYW55ID0gZWNoYXJ0cy5pbml0KGNoYXJ0UmVmLmN1cnJlbnQpO1xyXG4gICAgc2V0TXlDaGFydChfbXlDaGFydClcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBfbXlDaGFydC5yZXNpemUsIGZhbHNlKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgX215Q2hhcnQucmVzaXplLCBmYWxzZSk7XHJcbiAgICBfbXlDaGFydC5vZmYoJ2NsaWNrJyk7XHJcbiAgICBfbXlDaGFydC5vbignY2xpY2snLCAodjogYW55KSA9PiB7XHJcbiAgICAgIG9uQ2xpY2s/Lih2LmRhdGEpO1xyXG4gICAgICBjb25zb2xlLmxvZyh2LmRhdGEpXHJcbiAgICB9KVxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIF9teUNoYXJ0LnJlc2l6ZSwgZmFsc2UpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIF9teUNoYXJ0LnJlc2l6ZSwgZmFsc2UpO1xyXG4gICAgICBfbXlDaGFydC5kaXNwb3NlKCk7XHJcbiAgICB9XHJcbiAgfSwgW10pXHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAobXlDaGFydCkge1xyXG4gICAgICBteUNoYXJ0LmNsZWFyKCk7XHJcbiAgICAgIGNvbnN0IF9uYW1lczogc3RyaW5nW10gPSBbXTtcclxuICAgICAgZGF0YS5sZW5ndGggPiAwICYmIGRhdGEubWFwKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICBfbmFtZXMucHVzaChpdGVtLm5hbWUpO1xyXG4gICAgICB9KVxyXG4gICAgICBjb25zdCBfbGVnZW5kOiBMZWdlbmRDb21wb25lbnRPcHRpb24gPSB7Li4ue1xyXG4gICAgICAgIGJvdHRvbTogJzUlJyxcclxuICAgICAgICBsZWZ0OiAnY2VudGVyJyxcclxuICAgICAgICBpY29uOiAnY2lyY2xlJyxcclxuICAgICAgICBzaG93OiB0cnVlXHJcbiAgICAgIH0sIC4uLmxlZ2VuZH07XHJcbiAgICAgIG15Q2hhcnQuc2V0T3B0aW9uKHtcclxuICAgICAgICB0b29sdGlwOiB7XHJcbiAgICAgICAgICB0cmlnZ2VyOiAnaXRlbScsXHJcbiAgICAgICAgICB0cmFuc2l0aW9uRHVyYXRpb246IDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsZWdlbmQ6IF9sZWdlbmQsXHJcbiAgICAgICAgY29sb3I6IGNvbG9ycyxcclxuICAgICAgICBzZXJpZXM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgdHlwZTogJ3BpZScsXHJcbiAgICAgICAgICAgIHJhZGl1czogc2VyaWVzLnJhZGl1cyA/IHNlcmllcy5yYWRpdXMgOiAnNzAlJyxcclxuICAgICAgICAgICAgY2VudGVyOiBzZXJpZXMuY2VudGVyID8gc2VyaWVzLmNlbnRlciA6IFsnNTAlJywgJzUwJSddLFxyXG4gICAgICAgICAgICBsYWJlbDoge1xyXG4gICAgICAgICAgICAgIHNob3c6IGxhYmVsLnNob3csXHJcbiAgICAgICAgICAgICAgYWxpZ25UbzogbGFiZWwuZWRnZURpc3RhbmNlID8gJ2VkZ2UnIDogJ25vbmUnLFxyXG4gICAgICAgICAgICAgIGZvbnRTaXplOiBsYWJlbC5mb250U2l6ZSxcclxuICAgICAgICAgICAgICBlZGdlRGlzdGFuY2U6IGxhYmVsLmVkZ2VEaXN0YW5jZSxcclxuICAgICAgICAgICAgICBtaW5NYXJnaW46IGxhYmVsLm1pbk1hcmdpbiA/IGxhYmVsLm1pbk1hcmdpbiA6IDEwLFxyXG4gICAgICAgICAgICAgIGNvbG9yOiBsYWJlbC5jb2xvcixcclxuICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiBsYWJlbC5saW5lSGVpZ2h0ID8gbGFiZWwubGluZUhlaWdodCA6IDIwLFxyXG4gICAgICAgICAgICAgIGZvcm1hdHRlcjogbGFiZWwuZm9ybWF0dGVyID8gbGFiZWwuZm9ybWF0dGVyIDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGFiZWxMaW5lOiB7XHJcbiAgICAgICAgICAgICAgbGVuZ3RoOiBsYWJlbC5sZW5ndGggPyBsYWJlbC5sZW5ndGggOiAxMCxcclxuICAgICAgICAgICAgICBsZW5ndGgyOiBsYWJlbC5sZW5ndGgyID8gbGFiZWwubGVuZ3RoMiA6IDIwLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LCB0cnVlKTtcclxuICAgIH1cclxuICB9LCBbbXlDaGFydCwgZGF0YV0pXHJcbiAgXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGxldCBmYXVsdEJ5SG91clRpbWU6IGFueTtcclxuICAgIGlmIChteUNoYXJ0ICYmIGlzU3dpdGNoICYmICFpc0hpZ2ggJiYgZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGZhdWx0QnlIb3VyVGltZSA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICBzZXRIaWdoSW5kZXgobiA9PiB7XHJcbiAgICAgICAgICBteUNoYXJ0LmRpc3BhdGNoQWN0aW9uKHtcclxuICAgICAgICAgICAgdHlwZTogJ3Nob3dUaXAnLFxyXG4gICAgICAgICAgICBzZXJpZXNJbmRleDogMCxcclxuICAgICAgICAgICAgZGF0YUluZGV4OiBuXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmIChuID49IGRhdGEubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuICsgMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sIHN3aXRjaFRpbWUpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhckludGVydmFsKGZhdWx0QnlIb3VyVGltZSlcclxuICAgIH1cclxuICB9LCBbbXlDaGFydCwgaXNTd2l0Y2gsIGlzSGlnaCwgZGF0YV0pXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IHJlZj17Y2hhcnRSZWZ9XHJcbiAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgJ3dpZHRoJzogd2lkdGgsXHJcbiAgICAgICAgJ2hlaWdodCc6IGhlaWdodFxyXG4gICAgICB9fT5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRUNoYXJ0c1BpZTsiXX0=