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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiZWNoYXJ0cyIsInVzZSIsIlRvb2x0aXBDb21wb25lbnQiLCJMZWdlbmRDb21wb25lbnQiLCJQaWVDaGFydCIsIkNhbnZhc1JlbmRlcmVyIiwiRUNoYXJ0c1BpZSIsInByb3BzIiwid2lkdGgiLCJoZWlnaHQiLCJjb2xvcnMiLCJsYWJlbCIsInNlcmllcyIsImxlZ2VuZCIsImRhdGEiLCJpc1N3aXRjaCIsInN3aXRjaFRpbWUiLCJvbkNsaWNrIiwiY2hhcnRSZWYiLCJteUNoYXJ0Iiwic2V0TXlDaGFydCIsImlzSGlnaCIsImhpZ2hJbmRleCIsInNldEhpZ2hJbmRleCIsIl9teUNoYXJ0IiwiaW5pdCIsImN1cnJlbnQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVzaXplIiwib2ZmIiwib24iLCJ2IiwiY29uc29sZSIsImxvZyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkaXNwb3NlIiwiY2xlYXIiLCJfbmFtZXMiLCJsZW5ndGgiLCJtYXAiLCJpdGVtIiwicHVzaCIsIm5hbWUiLCJfbGVnZW5kIiwiYm90dG9tIiwibGVmdCIsImljb24iLCJzaG93Iiwic2V0T3B0aW9uIiwidG9vbHRpcCIsInRyaWdnZXIiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJjb2xvciIsInR5cGUiLCJyYWRpdXMiLCJjZW50ZXIiLCJhbGlnblRvIiwiZWRnZURpc3RhbmNlIiwiZm9udFNpemUiLCJtaW5NYXJnaW4iLCJsaW5lSGVpZ2h0IiwiZm9ybWF0dGVyIiwibGFiZWxMaW5lIiwibGVuZ3RoMiIsImZhdWx0QnlIb3VyVGltZSIsInNldEludGVydmFsIiwibiIsImRpc3BhdGNoQWN0aW9uIiwic2VyaWVzSW5kZXgiLCJkYXRhSW5kZXgiLCJjbGVhckludGVydmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQUEsT0FBTyxDQUFDQyxHQUFSLENB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LElBQUksRUFBRSxTQURlO0FBRXJCZSxZQUFBQSxXQUFXLEVBQUUsQ0FGUTtBQUdyQkMsWUFBQUEsU0FBUyxFQUFFSDtBQUhVLFdBQXZCOztBQUtBLGNBQUlBLENBQUMsSUFBSXJELElBQUksQ0FBQ3lCLE1BQUwsR0FBYyxDQUF2QixFQUEwQjtBQUN4QixtQkFBTyxDQUFQO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsbUJBQU80QixDQUFDLEdBQUcsQ0FBWDtBQUNEO0FBQ0YsU0FYVyxDQUFaO0FBWUQsT0FiNEIsRUFhMUJuRCxVQWIwQixDQUE3QjtBQWNEOztBQUNELFdBQU8sWUFBTTtBQUNYdUQsTUFBQUEsYUFBYSxDQUFDTixlQUFELENBQWI7QUFDRCxLQUZEO0FBR0QsR0FyQkQsRUFxQkcsQ0FBQzlDLE9BQUQsRUFBVUosUUFBVixFQUFvQk0sTUFBcEIsRUFBNEJQLElBQTVCLENBckJIO0FBdUJBLHNCQUNFO0FBQUssSUFBQSxHQUFHLEVBQUVJLFFBQVY7QUFDRSxJQUFBLEtBQUssRUFBRTtBQUNMLGVBQVNWLEtBREo7QUFFTCxnQkFBVUM7QUFGTDtBQURULElBREY7QUFRRCxDQW5IRDs7ZUFxSGVILFUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgKiBhcyBlY2hhcnRzIGZyb20gJ2VjaGFydHMvY29yZSc7XG5pbXBvcnQgeyBUb29sdGlwQ29tcG9uZW50LCBMZWdlbmRDb21wb25lbnQsIExlZ2VuZENvbXBvbmVudE9wdGlvbiAgfSBmcm9tICdlY2hhcnRzL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgUGllQ2hhcnQgfSBmcm9tICdlY2hhcnRzL2NoYXJ0cyc7XG5pbXBvcnQgeyBDYW52YXNSZW5kZXJlciB9IGZyb20gJ2VjaGFydHMvcmVuZGVyZXJzJztcblxuZWNoYXJ0cy51c2UoXG4gIFtUb29sdGlwQ29tcG9uZW50LCBMZWdlbmRDb21wb25lbnQsIFBpZUNoYXJ0LCBDYW52YXNSZW5kZXJlcl1cbik7XG5cbmludGVyZmFjZSBMYWJlbFByb3BzIHtcbiAgc2hvdz86IGJvb2xlYW47XG4gIC8qKiDlrZfkvZPpopzoibIgKi9cbiAgY29sb3I/OiBzdHJpbmc7XG4gIC8qKiDlrZfkvZPlpKflsI/vvIzpu5jorqQxNOWDj+e0oCAqL1xuICBmb250U2l6ZT86IG51bWJlciB8IHN0cmluZztcbiAgLyoqIFxuICAgKiDmoIfnrb7lhoXlrrnmoLzlvI9cbiAgICogQHthfe+8muezu+WIl+WQjeOAglxuICAgKiBAe2J977ya5pWw5o2u5ZCN44CCXG4gICAqIEB7Y33vvJrmlbDmja7lgLzjgIJcbiAgICogQHtkfe+8mueZvuWIhuavlOOAglxuICAgKi9cbiAgZm9ybWF0dGVyPzogc3RyaW5nIHwgRnVuY3Rpb247XG4gIGVkZ2VEaXN0YW5jZT86IG51bWJlciB8IHN0cmluZztcbiAgLyoqIOihjOmrmCAqL1xuICBsaW5lSGVpZ2h0PzogbnVtYmVyO1xuICAvKiog56ys5LiA5q615byV5a+857q/6ZW/5bqmICovXG4gIGxlbmd0aD86IG51bWJlcjtcbiAgLyoqIOesrOS6jOauteW8leWvvOe6v+mVv+W6piAqL1xuICBsZW5ndGgyPzogbnVtYmVyO1xuICAvKiog5qCH562+5LmL6Ze06Ze06Led77yM6buY6K6kMTDlg4/ntKAgKi9cbiAgbWluTWFyZ2luPzogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgU2VyaWVzUHJvcHMge1xuICBjZW50ZXI/OiBzdHJpbmdbXSB8IG51bWJlciB8IHN0cmluZztcbiAgcmFkaXVzPzogc3RyaW5nW10gfCBudW1iZXJbXSB8IG51bWJlciB8IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIFBpZUJhc2VQcm9wcyB7XG4gIGRhdGE/OiBhbnlbXTtcbiAgd2lkdGg/OiBzdHJpbmc7XG4gIGhlaWdodD86IHN0cmluZztcbiAgLyoqIOmlvOWbvuminOiJsiAqL1xuICBjb2xvcnM/OiBzdHJpbmdbXTtcbiAgbGFiZWw/OiBMYWJlbFByb3BzO1xuICAvKiog6aW85Zu+5bGe5oCnICovXG4gIHNlcmllcz86IFNlcmllc1Byb3BzO1xuICAvKiog5Zu+5L6L57uE5Lu2LCBhcGk6IGh0dHBzOi8vZWNoYXJ0cy5hcGFjaGUub3JnL3poL29wdGlvbi5odG1sI2xlZ2VuZCAqL1xuICBsZWdlbmQ/OiBMZWdlbmRDb21wb25lbnRPcHRpb247XG4gIC8qKiDmmK/lkKboh6rliqjliIfmjaIgVG9vbHRpcCAqL1xuICBpc1N3aXRjaD86IGJvb2xlYW47XG4gIC8qKiDoh6rliqjliIfmjaLkuovku7Yg6buY6K6kIDIwMDDvvIgyU++8iSAqL1xuICBzd2l0Y2hUaW1lPzogbnVtYmVyO1xuICBvbkNsaWNrPzogKHY6IGFueSkgPT4gdm9pZDtcbn1cblxuY29uc3QgRUNoYXJ0c1BpZSA9IChwcm9wczogUGllQmFzZVByb3BzKSA9PiB7XG4gIGNvbnN0IHtcbiAgICB3aWR0aCA9ICcxMDAlJyxcbiAgICBoZWlnaHQgPSAnMTAwJScsXG4gICAgY29sb3JzID0gWycjNTQ3MGM2JywgJyM5MWNjNzUnLCAnI2ZhYzg1OCcsICcjZWU2NjY2JywgJyM3M2MwZGUnLCAnIzNiYTI3MicsICcjZmM4NDUyJywgJyM5YTYwYjQnLCAnI2VhN2NjYyddLFxuICAgIGxhYmVsID0ge30sXG4gICAgc2VyaWVzID0ge30sXG4gICAgbGVnZW5kID0ge30sXG4gICAgZGF0YSA9IFtdLFxuICAgIGlzU3dpdGNoID0gZmFsc2UsXG4gICAgc3dpdGNoVGltZSA9IDIwMDAsXG4gICAgb25DbGlja1xuICB9ID0gcHJvcHM7XG5cbiAgY29uc3QgY2hhcnRSZWYgPSB1c2VSZWY8YW55PihudWxsKVxuICBjb25zdCBbbXlDaGFydCwgc2V0TXlDaGFydF0gPSB1c2VTdGF0ZTxhbnk+KG51bGwpO1xuICBjb25zdCBbaXNIaWdoXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW2hpZ2hJbmRleCwgc2V0SGlnaEluZGV4XSA9IHVzZVN0YXRlPG51bWJlcj4oMCk7XG4gIFxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IF9teUNoYXJ0OiBhbnkgPSBlY2hhcnRzLmluaXQoY2hhcnRSZWYuY3VycmVudCk7XG4gICAgc2V0TXlDaGFydChfbXlDaGFydClcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIF9teUNoYXJ0LnJlc2l6ZSwgZmFsc2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgX215Q2hhcnQucmVzaXplLCBmYWxzZSk7XG4gICAgX215Q2hhcnQub2ZmKCdjbGljaycpO1xuICAgIF9teUNoYXJ0Lm9uKCdjbGljaycsICh2OiBhbnkpID0+IHtcbiAgICAgIG9uQ2xpY2s/Lih2LmRhdGEpO1xuICAgICAgY29uc29sZS5sb2codi5kYXRhKVxuICAgIH0pXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBfbXlDaGFydC5yZXNpemUsIGZhbHNlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgX215Q2hhcnQucmVzaXplLCBmYWxzZSk7XG4gICAgICBfbXlDaGFydC5kaXNwb3NlKCk7XG4gICAgfVxuICB9LCBbXSlcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChteUNoYXJ0KSB7XG4gICAgICBteUNoYXJ0LmNsZWFyKCk7XG4gICAgICBjb25zdCBfbmFtZXM6IHN0cmluZ1tdID0gW107XG4gICAgICBkYXRhLmxlbmd0aCA+IDAgJiYgZGF0YS5tYXAoKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICBfbmFtZXMucHVzaChpdGVtLm5hbWUpO1xuICAgICAgfSlcbiAgICAgIGNvbnN0IF9sZWdlbmQ6IExlZ2VuZENvbXBvbmVudE9wdGlvbiA9IHsuLi57XG4gICAgICAgIGJvdHRvbTogJzUlJyxcbiAgICAgICAgbGVmdDogJ2NlbnRlcicsXG4gICAgICAgIGljb246ICdjaXJjbGUnLFxuICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgfSwgLi4ubGVnZW5kfTtcbiAgICAgIG15Q2hhcnQuc2V0T3B0aW9uKHtcbiAgICAgICAgdG9vbHRpcDoge1xuICAgICAgICAgIHRyaWdnZXI6ICdpdGVtJyxcbiAgICAgICAgICB0cmFuc2l0aW9uRHVyYXRpb246IDAsXG4gICAgICAgIH0sXG4gICAgICAgIGxlZ2VuZDogX2xlZ2VuZCxcbiAgICAgICAgY29sb3I6IGNvbG9ycyxcbiAgICAgICAgc2VyaWVzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIHR5cGU6ICdwaWUnLFxuICAgICAgICAgICAgcmFkaXVzOiBzZXJpZXMucmFkaXVzID8gc2VyaWVzLnJhZGl1cyA6ICc3MCUnLFxuICAgICAgICAgICAgY2VudGVyOiBzZXJpZXMuY2VudGVyID8gc2VyaWVzLmNlbnRlciA6IFsnNTAlJywgJzUwJSddLFxuICAgICAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgICAgc2hvdzogbGFiZWwuc2hvdyxcbiAgICAgICAgICAgICAgYWxpZ25UbzogbGFiZWwuZWRnZURpc3RhbmNlID8gJ2VkZ2UnIDogJ25vbmUnLFxuICAgICAgICAgICAgICBmb250U2l6ZTogbGFiZWwuZm9udFNpemUsXG4gICAgICAgICAgICAgIGVkZ2VEaXN0YW5jZTogbGFiZWwuZWRnZURpc3RhbmNlLFxuICAgICAgICAgICAgICBtaW5NYXJnaW46IGxhYmVsLm1pbk1hcmdpbiA/IGxhYmVsLm1pbk1hcmdpbiA6IDEwLFxuICAgICAgICAgICAgICBjb2xvcjogbGFiZWwuY29sb3IsXG4gICAgICAgICAgICAgIGxpbmVIZWlnaHQ6IGxhYmVsLmxpbmVIZWlnaHQgPyBsYWJlbC5saW5lSGVpZ2h0IDogMjAsXG4gICAgICAgICAgICAgIGZvcm1hdHRlcjogbGFiZWwuZm9ybWF0dGVyID8gbGFiZWwuZm9ybWF0dGVyIDogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsYWJlbExpbmU6IHtcbiAgICAgICAgICAgICAgbGVuZ3RoOiBsYWJlbC5sZW5ndGggPyBsYWJlbC5sZW5ndGggOiAxMCxcbiAgICAgICAgICAgICAgbGVuZ3RoMjogbGFiZWwubGVuZ3RoMiA/IGxhYmVsLmxlbmd0aDIgOiAyMCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sIHRydWUpO1xuICAgIH1cbiAgfSwgW215Q2hhcnQsIGRhdGFdKVxuICBcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgZmF1bHRCeUhvdXJUaW1lOiBhbnk7XG4gICAgaWYgKG15Q2hhcnQgJiYgaXNTd2l0Y2ggJiYgIWlzSGlnaCAmJiBkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgIGZhdWx0QnlIb3VyVGltZSA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgc2V0SGlnaEluZGV4KG4gPT4ge1xuICAgICAgICAgIG15Q2hhcnQuZGlzcGF0Y2hBY3Rpb24oe1xuICAgICAgICAgICAgdHlwZTogJ3Nob3dUaXAnLFxuICAgICAgICAgICAgc2VyaWVzSW5kZXg6IDAsXG4gICAgICAgICAgICBkYXRhSW5kZXg6IG5cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAobiA+PSBkYXRhLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbiArIDFcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LCBzd2l0Y2hUaW1lKVxuICAgIH1cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYXJJbnRlcnZhbChmYXVsdEJ5SG91clRpbWUpXG4gICAgfVxuICB9LCBbbXlDaGFydCwgaXNTd2l0Y2gsIGlzSGlnaCwgZGF0YV0pXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHJlZj17Y2hhcnRSZWZ9XG4gICAgICBzdHlsZT17e1xuICAgICAgICAnd2lkdGgnOiB3aWR0aCxcbiAgICAgICAgJ2hlaWdodCc6IGhlaWdodFxuICAgICAgfX0+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRUNoYXJ0c1BpZTsiXX0=