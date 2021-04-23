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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiZWNoYXJ0cyIsInVzZSIsIlRvb2x0aXBDb21wb25lbnQiLCJMZWdlbmRDb21wb25lbnQiLCJQaWVDaGFydCIsIkNhbnZhc1JlbmRlcmVyIiwiRUNoYXJ0c1BpZSIsInByb3BzIiwid2lkdGgiLCJoZWlnaHQiLCJjb2xvcnMiLCJsYWJlbCIsInNlcmllcyIsImxlZ2VuZCIsImRhdGEiLCJpc1N3aXRjaCIsInN3aXRjaFRpbWUiLCJvbkNsaWNrIiwiY2hhcnRSZWYiLCJteUNoYXJ0Iiwic2V0TXlDaGFydCIsImlzSGlnaCIsImhpZ2hJbmRleCIsInNldEhpZ2hJbmRleCIsIl9teUNoYXJ0IiwiaW5pdCIsImN1cnJlbnQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVzaXplIiwib2ZmIiwib24iLCJ2IiwiY29uc29sZSIsImxvZyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkaXNwb3NlIiwiY2xlYXIiLCJfbmFtZXMiLCJsZW5ndGgiLCJtYXAiLCJpdGVtIiwicHVzaCIsIm5hbWUiLCJfbGVnZW5kIiwiYm90dG9tIiwibGVmdCIsImljb24iLCJzaG93Iiwic2V0T3B0aW9uIiwidG9vbHRpcCIsInRyaWdnZXIiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJjb2xvciIsInR5cGUiLCJyYWRpdXMiLCJjZW50ZXIiLCJhbGlnblRvIiwiZWRnZURpc3RhbmNlIiwiZm9udFNpemUiLCJtaW5NYXJnaW4iLCJsaW5lSGVpZ2h0IiwiZm9ybWF0dGVyIiwibGFiZWxMaW5lIiwibGVuZ3RoMiIsImZhdWx0QnlIb3VyVGltZSIsInNldEludGVydmFsIiwibiIsImRpc3BhdGNoQWN0aW9uIiwic2VyaWVzSW5kZXgiLCJkYXRhSW5kZXgiLCJjbGVhckludGVydmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQUEsT0FBTyxDQUFDQyxHQUFSLENB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QU07QUFDbEMzQyxRQUFBQSxZQUFZLENBQUMsVUFBQTRDLENBQUMsRUFBSTtBQUNoQmhELFVBQUFBLE9BQU8sQ0FBQ2lELGNBQVIsQ0FBdUI7QUFDckJkLFlBQUFBLElBQUksRUFBRSxTQURlO0FBRXJCZSxZQUFBQSxXQUFXLEVBQUUsQ0FGUTtBQUdyQkMsWUFBQUEsU0FBUyxFQUFFSDtBQUhVLFdBQXZCOztBQUtBLGNBQUlBLENBQUMsSUFBSXJELElBQUksQ0FBQ3lCLE1BQUwsR0FBYyxDQUF2QixFQUEwQjtBQUN4QixtQkFBTyxDQUFQO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsbUJBQU80QixDQUFDLEdBQUcsQ0FBWDtBQUNEO0FBQ0YsU0FYVyxDQUFaO0FBWUQsT0FiNEIsRUFhMUJuRCxVQWIwQixDQUE3QjtBQWNEOztBQUNELFdBQU8sWUFBTTtBQUNYdUQsTUFBQUEsYUFBYSxDQUFDTixlQUFELENBQWI7QUFDRCxLQUZEO0FBR0QsR0FyQkQsRUFxQkcsQ0FBQzlDLE9BQUQsRUFBVUosUUFBVixFQUFvQk0sTUFBcEIsRUFBNEJQLElBQTVCLENBckJIO0FBdUJBLHNCQUNFO0FBQUssSUFBQSxHQUFHLEVBQUVJLFFBQVY7QUFDRSxJQUFBLEtBQUssRUFBRTtBQUNMLGVBQVNWLEtBREo7QUFFTCxnQkFBVUM7QUFGTDtBQURULElBREY7QUFRRCxDQW5IRDs7ZUFxSGVILFUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgKiBhcyBlY2hhcnRzIGZyb20gJ2VjaGFydHMvY29yZSc7XG5pbXBvcnQgeyBUb29sdGlwQ29tcG9uZW50LCBMZWdlbmRDb21wb25lbnQsIExlZ2VuZENvbXBvbmVudE9wdGlvbiAgfSBmcm9tICdlY2hhcnRzL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgUGllQ2hhcnQgfSBmcm9tICdlY2hhcnRzL2NoYXJ0cyc7XG5pbXBvcnQgeyBDYW52YXNSZW5kZXJlciB9IGZyb20gJ2VjaGFydHMvcmVuZGVyZXJzJztcblxuZWNoYXJ0cy51c2UoXG4gIFtUb29sdGlwQ29tcG9uZW50LCBMZWdlbmRDb21wb25lbnQsIFBpZUNoYXJ0LCBDYW52YXNSZW5kZXJlcl1cbik7XG5cbmludGVyZmFjZSBMYWJlbFByb3BzIHtcbiAgc2hvdz86IGJvb2xlYW47XG4gIC8qKiDlrZfkvZPpopzoibIgKi9cbiAgY29sb3I/OiBzdHJpbmc7XG4gIC8qKiDlrZfkvZPlpKflsI/vvIzpu5jorqQxNOWDj+e0oCAqL1xuICBmb250U2l6ZT86IG51bWJlciB8IHN0cmluZztcbiAgLyoqIFxuICAgKiDmoIfnrb7lhoXlrrnmoLzlvI9cbiAgICogQHthfe+8muezu+WIl+WQjeOAglxuICAgKiBAe2J977ya5pWw5o2u5ZCN44CCXG4gICAqIEB7Y33vvJrmlbDmja7lgLzjgIJcbiAgICogQHtkfe+8mueZvuWIhuavlOOAglxuICAgKi9cbiAgZm9ybWF0dGVyPzogc3RyaW5nIHwgRnVuY3Rpb247XG4gIGVkZ2VEaXN0YW5jZT86IG51bWJlciB8IHN0cmluZztcbiAgLyoqIOihjOmrmCAqL1xuICBsaW5lSGVpZ2h0PzogbnVtYmVyO1xuICAvKiog56ys5LiA5q615byV5a+857q/6ZW/5bqmICovXG4gIGxlbmd0aD86IG51bWJlcjtcbiAgLyoqIOesrOS6jOauteW8leWvvOe6v+mVv+W6piAqL1xuICBsZW5ndGgyPzogbnVtYmVyO1xuICAvKiog5qCH562+5LmL6Ze06Ze06Led77yM6buY6K6kMTDlg4/ntKAgKi9cbiAgbWluTWFyZ2luPzogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgU2VyaWVzUHJvcHMge1xuICBjZW50ZXI/OiBzdHJpbmdbXSB8IG51bWJlciB8IHN0cmluZztcbiAgcmFkaXVzPzogc3RyaW5nW10gfCBudW1iZXJbXSB8IG51bWJlciB8IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIFBpZUJhc2VQcm9wcyB7XG4gIGRhdGE/OiBhbnlbXTtcbiAgd2lkdGg/OiBzdHJpbmc7XG4gIGhlaWdodD86IHN0cmluZztcbiAgLyoqIOmlvOWbvuminOiJsiAqL1xuICBjb2xvcnM/OiBzdHJpbmdbXTtcbiAgbGFiZWw/OiBMYWJlbFByb3BzO1xuICAvKiog6aW85Zu+5bGe5oCnICovXG4gIHNlcmllcz86IFNlcmllc1Byb3BzO1xuICAvKiog5Zu+5L6L57uE5Lu2LCBhcGk6IGh0dHBzOi8vZWNoYXJ0cy5hcGFjaGUub3JnL3poL29wdGlvbi5odG1sI2xlZ2VuZCAqL1xuICBsZWdlbmQ/OiBMZWdlbmRDb21wb25lbnRPcHRpb247XG4gIC8qKiDmmK/lkKboh6rliqjliIfmjaIgVG9vbHRpcCAqL1xuICBpc1N3aXRjaD86IGJvb2xlYW47XG4gIC8qKiDoh6rliqjliIfmjaLkuovku7Yg6buY6K6kIDIwMDDvvIgyU++8iSAqL1xuICBzd2l0Y2hUaW1lPzogbnVtYmVyO1xuICBvbkNsaWNrPzogKHY6IGFueSkgPT4gdm9pZDtcbn1cblxuY29uc3QgRUNoYXJ0c1BpZSA9IChwcm9wczogUGllQmFzZVByb3BzKSA9PiB7XG4gIGNvbnN0IHtcbiAgICB3aWR0aCA9ICcxMDAlJyxcbiAgICBoZWlnaHQgPSAnMTAwJScsXG4gICAgY29sb3JzID0gWycjNTQ3MGM2JywgJyM5MWNjNzUnLCAnI2ZhYzg1OCcsICcjZWU2NjY2JywgJyM3M2MwZGUnLCAnIzNiYTI3MicsICcjZmM4NDUyJywgJyM5YTYwYjQnLCAnI2VhN2NjYyddLFxuICAgIGxhYmVsID0ge30sXG4gICAgc2VyaWVzID0ge30sXG4gICAgbGVnZW5kID0ge30sXG4gICAgZGF0YSA9IFtdLFxuICAgIGlzU3dpdGNoID0gZmFsc2UsXG4gICAgc3dpdGNoVGltZSA9IDIwMDAsXG4gICAgb25DbGlja1xuICB9ID0gcHJvcHM7XG5cbiAgY29uc3QgY2hhcnRSZWYgPSB1c2VSZWY8YW55PihudWxsKVxuICBjb25zdCBbbXlDaGFydCwgc2V0TXlDaGFydF0gPSB1c2VTdGF0ZTxhbnk+KG51bGwpO1xuICBjb25zdCBbaXNIaWdoXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW2hpZ2hJbmRleCwgc2V0SGlnaEluZGV4XSA9IHVzZVN0YXRlPG51bWJlcj4oMCk7XG4gIFxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IF9teUNoYXJ0OiBhbnkgPSBlY2hhcnRzLmluaXQoY2hhcnRSZWYuY3VycmVudCk7XG4gICAgc2V0TXlDaGFydChfbXlDaGFydClcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIF9teUNoYXJ0LnJlc2l6ZSwgZmFsc2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgX215Q2hhcnQucmVzaXplLCBmYWxzZSk7XG4gICAgX215Q2hhcnQub2ZmKCdjbGljaycpO1xuICAgIF9teUNoYXJ0Lm9uKCdjbGljaycsICh2OiBhbnkpID0+IHtcbiAgICAgIG9uQ2xpY2s/Lih2LmRhdGEpO1xuICAgICAgY29uc29sZS5sb2codi5kYXRhKVxuICAgIH0pXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBfbXlDaGFydC5yZXNpemUsIGZhbHNlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgX215Q2hhcnQucmVzaXplLCBmYWxzZSk7XG4gICAgICBfbXlDaGFydC5kaXNwb3NlKCk7XG4gICAgfVxuICB9LCBbXSlcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChteUNoYXJ0KSB7XG4gICAgICBteUNoYXJ0LmNsZWFyKCk7XG4gICAgICBjb25zdCBfbmFtZXM6IHN0cmluZ1tdID0gW107XG4gICAgICBkYXRhLmxlbmd0aCA+IDAgJiYgZGF0YS5tYXAoKGl0ZW06IGFueSkgPT4ge1xuICAgICAgICBfbmFtZXMucHVzaChpdGVtLm5hbWUpO1xuICAgICAgfSlcbiAgICAgIGNvbnN0IF9sZWdlbmQ6IExlZ2VuZENvbXBvbmVudE9wdGlvbiA9IHsuLi57XG4gICAgICAgIGJvdHRvbTogJzUlJyxcbiAgICAgICAgbGVmdDogJ2NlbnRlcicsXG4gICAgICAgIGljb246ICdjaXJjbGUnLFxuICAgICAgICBzaG93OiB0cnVlXG4gICAgICB9LCAuLi5sZWdlbmR9O1xuICAgICAgbXlDaGFydC5zZXRPcHRpb24oe1xuICAgICAgICB0b29sdGlwOiB7XG4gICAgICAgICAgdHJpZ2dlcjogJ2l0ZW0nLFxuICAgICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogMCxcbiAgICAgICAgfSxcbiAgICAgICAgbGVnZW5kOiBfbGVnZW5kLFxuICAgICAgICBjb2xvcjogY29sb3JzLFxuICAgICAgICBzZXJpZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgdHlwZTogJ3BpZScsXG4gICAgICAgICAgICByYWRpdXM6IHNlcmllcy5yYWRpdXMgPyBzZXJpZXMucmFkaXVzIDogJzcwJScsXG4gICAgICAgICAgICBjZW50ZXI6IHNlcmllcy5jZW50ZXIgPyBzZXJpZXMuY2VudGVyIDogWyc1MCUnLCAnNTAlJ10sXG4gICAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgICBzaG93OiBsYWJlbC5zaG93LFxuICAgICAgICAgICAgICBhbGlnblRvOiBsYWJlbC5lZGdlRGlzdGFuY2UgPyAnZWRnZScgOiAnbm9uZScsXG4gICAgICAgICAgICAgIGZvbnRTaXplOiBsYWJlbC5mb250U2l6ZSxcbiAgICAgICAgICAgICAgZWRnZURpc3RhbmNlOiBsYWJlbC5lZGdlRGlzdGFuY2UsXG4gICAgICAgICAgICAgIG1pbk1hcmdpbjogbGFiZWwubWluTWFyZ2luID8gbGFiZWwubWluTWFyZ2luIDogMTAsXG4gICAgICAgICAgICAgIGNvbG9yOiBsYWJlbC5jb2xvcixcbiAgICAgICAgICAgICAgbGluZUhlaWdodDogbGFiZWwubGluZUhlaWdodCA/IGxhYmVsLmxpbmVIZWlnaHQgOiAyMCxcbiAgICAgICAgICAgICAgZm9ybWF0dGVyOiBsYWJlbC5mb3JtYXR0ZXIgPyBsYWJlbC5mb3JtYXR0ZXIgOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxhYmVsTGluZToge1xuICAgICAgICAgICAgICBsZW5ndGg6IGxhYmVsLmxlbmd0aCA/IGxhYmVsLmxlbmd0aCA6IDEwLFxuICAgICAgICAgICAgICBsZW5ndGgyOiBsYWJlbC5sZW5ndGgyID8gbGFiZWwubGVuZ3RoMiA6IDIwLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuICB9LCBbbXlDaGFydCwgZGF0YV0pXG4gIFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBmYXVsdEJ5SG91clRpbWU6IGFueTtcbiAgICBpZiAobXlDaGFydCAmJiBpc1N3aXRjaCAmJiAhaXNIaWdoICYmIGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgZmF1bHRCeUhvdXJUaW1lID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBzZXRIaWdoSW5kZXgobiA9PiB7XG4gICAgICAgICAgbXlDaGFydC5kaXNwYXRjaEFjdGlvbih7XG4gICAgICAgICAgICB0eXBlOiAnc2hvd1RpcCcsXG4gICAgICAgICAgICBzZXJpZXNJbmRleDogMCxcbiAgICAgICAgICAgIGRhdGFJbmRleDogblxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChuID49IGRhdGEubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuICsgMVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sIHN3aXRjaFRpbWUpXG4gICAgfVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhckludGVydmFsKGZhdWx0QnlIb3VyVGltZSlcbiAgICB9XG4gIH0sIFtteUNoYXJ0LCBpc1N3aXRjaCwgaXNIaWdoLCBkYXRhXSlcblxuICByZXR1cm4gKFxuICAgIDxkaXYgcmVmPXtjaGFydFJlZn1cbiAgICAgIHN0eWxlPXt7XG4gICAgICAgICd3aWR0aCc6IHdpZHRoLFxuICAgICAgICAnaGVpZ2h0JzogaGVpZ2h0XG4gICAgICB9fT5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBFQ2hhcnRzUGllOyJdfQ==