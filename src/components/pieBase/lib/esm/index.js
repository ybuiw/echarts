import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

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

      var _legend = _objectSpread(_objectSpread({}, {
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

export default EChartsPie;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmRleC50c3giXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJ1c2VTdGF0ZSIsImVjaGFydHMiLCJUb29sdGlwQ29tcG9uZW50IiwiTGVnZW5kQ29tcG9uZW50IiwiUGllQ2hhcnQiLCJDYW52YXNSZW5kZXJlciIsInVzZSIsIkVDaGFydHNQaWUiLCJwcm9wcyIsIndpZHRoIiwiaGVpZ2h0IiwiY29sb3JzIiwibGFiZWwiLCJzZXJpZXMiLCJsZWdlbmQiLCJkYXRhIiwiaXNTd2l0Y2giLCJzd2l0Y2hUaW1lIiwib25DbGljayIsImNoYXJ0UmVmIiwibXlDaGFydCIsInNldE15Q2hhcnQiLCJpc0hpZ2giLCJoaWdoSW5kZXgiLCJzZXRIaWdoSW5kZXgiLCJfbXlDaGFydCIsImluaXQiLCJjdXJyZW50Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc2l6ZSIsIm9mZiIsIm9uIiwidiIsImNvbnNvbGUiLCJsb2ciLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGlzcG9zZSIsImNsZWFyIiwiX25hbWVzIiwibGVuZ3RoIiwibWFwIiwiaXRlbSIsInB1c2giLCJuYW1lIiwiX2xlZ2VuZCIsImJvdHRvbSIsImxlZnQiLCJpY29uIiwic2hvdyIsInNldE9wdGlvbiIsInRvb2x0aXAiLCJ0cmlnZ2VyIiwidHJhbnNpdGlvbkR1cmF0aW9uIiwiY29sb3IiLCJ0eXBlIiwicmFkaXVzIiwiY2VudGVyIiwiYWxpZ25UbyIsImVkZ2VEaXN0YW5jZSIsImZvbnRTaXplIiwibWluTWFyZ2luIiwibGluZUhlaWdodCIsImZvcm1hdHRlciIsImxhYmVsTGluZSIsImxlbmd0aDIiLCJmYXVsdEJ5SG91clRpbWUiLCJzZXRJbnRlcnZhbCIsIm4iLCJkaXNwYXRjaEFjdGlvbiIsInNlcmllc0luZGV4IiwiZGF0YUluZGV4IiwiY2xlYXJJbnRlcnZhbCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPQSxLQUFQLElBQWdCQyxTQUFoQixFQUEyQkMsTUFBM0IsRUFBbUNDLFFBQW5DLFFBQW1ELE9BQW5EO0FBRUEsT0FBTyxLQUFLQyxPQUFaLE1BQXlCLGNBQXpCO0FBQ0EsU0FBU0MsZ0JBQVQsRUFBMkJDLGVBQTNCLFFBQTBFLG9CQUExRTtBQUNBLFNBQVNDLFFBQVQsUUFBeUIsZ0JBQXpCO0FBQ0EsU0FBU0MsY0FBVCxRQUErQixtQkFBL0I7QUFFQUosT0FBTyxDQUFDSyxHQUFSLENBQ0UsQ0FBQ0osZ0JBQUQsRUFBbUJDLGVBQW5CLEVBQW9DQyxRQUFwQyxFQUE4Q0MsY0FBOUMsQ0FERjs7QUFvREEsSUFBTUUsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQ0MsS0FBRCxFQUF5QjtBQUMxQyxxQkFXSUEsS0FYSixDQUNFQyxLQURGO0FBQUEsTUFDRUEsS0FERiw2QkFDVSxNQURWO0FBQUEsc0JBV0lELEtBWEosQ0FFRUUsTUFGRjtBQUFBLE1BRUVBLE1BRkYsOEJBRVcsTUFGWDtBQUFBLHNCQVdJRixLQVhKLENBR0VHLE1BSEY7QUFBQSxNQUdFQSxNQUhGLDhCQUdXLENBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsU0FBdkIsRUFBa0MsU0FBbEMsRUFBNkMsU0FBN0MsRUFBd0QsU0FBeEQsRUFBbUUsU0FBbkUsRUFBOEUsU0FBOUUsRUFBeUYsU0FBekYsQ0FIWDtBQUFBLHFCQVdJSCxLQVhKLENBSUVJLEtBSkY7QUFBQSxNQUlFQSxLQUpGLDZCQUlVLEVBSlY7QUFBQSxzQkFXSUosS0FYSixDQUtFSyxNQUxGO0FBQUEsTUFLRUEsTUFMRiw4QkFLVyxFQUxYO0FBQUEsc0JBV0lMLEtBWEosQ0FNRU0sTUFORjtBQUFBLE1BTUVBLE1BTkYsOEJBTVcsRUFOWDtBQUFBLG9CQVdJTixLQVhKLENBT0VPLElBUEY7QUFBQSxNQU9FQSxJQVBGLDRCQU9TLEVBUFQ7QUFBQSx3QkFXSVAsS0FYSixDQVFFUSxRQVJGO0FBQUEsTUFRRUEsUUFSRixnQ0FRYSxLQVJiO0FBQUEsMEJBV0lSLEtBWEosQ0FTRVMsVUFURjtBQUFBLE1BU0VBLFVBVEYsa0NBU2UsSUFUZjtBQUFBLE1BVUVDLE9BVkYsR0FXSVYsS0FYSixDQVVFVSxPQVZGO0FBYUEsTUFBTUMsUUFBUSxHQUFHcEIsTUFBTSxDQUFNLElBQU4sQ0FBdkI7O0FBQ0Esa0JBQThCQyxRQUFRLENBQU0sSUFBTixDQUF0QztBQUFBO0FBQUEsTUFBT29CLE9BQVA7QUFBQSxNQUFnQkMsVUFBaEI7O0FBQ0EsbUJBQWlCckIsUUFBUSxDQUFVLEtBQVYsQ0FBekI7QUFBQTtBQUFBLE1BQU9zQixNQUFQOztBQUNBLG1CQUFrQ3RCLFFBQVEsQ0FBUyxDQUFULENBQTFDO0FBQUE7QUFBQSxNQUFPdUIsU0FBUDtBQUFBLE1BQWtCQyxZQUFsQjs7QUFHQTFCLEVBQUFBLFNBQVMsQ0FBQyxZQUFNO0FBQ2QsUUFBSTJCLFFBQWEsR0FBR3hCLE9BQU8sQ0FBQ3lCLElBQVIsQ0FBYVAsUUFBUSxDQUFDUSxPQUF0QixDQUFwQjs7QUFDQU4sSUFBQUEsVUFBVSxDQUFDSSxRQUFELENBQVY7QUFFQUcsSUFBQUEsTUFBTSxDQUFDQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQ0osUUFBUSxDQUFDSyxNQUEzQyxFQUFtRCxLQUFuRDtBQUNBRixJQUFBQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDSixRQUFRLENBQUNLLE1BQXpDLEVBQWlELEtBQWpEOztBQUNBTCxJQUFBQSxRQUFRLENBQUNNLEdBQVQsQ0FBYSxPQUFiOztBQUNBTixJQUFBQSxRQUFRLENBQUNPLEVBQVQsQ0FBWSxPQUFaLEVBQXFCLFVBQUNDLENBQUQsRUFBWTtBQUMvQmYsTUFBQUEsT0FBTyxTQUFQLElBQUFBLE9BQU8sV0FBUCxZQUFBQSxPQUFPLENBQUdlLENBQUMsQ0FBQ2xCLElBQUwsQ0FBUDtBQUNBbUIsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlGLENBQUMsQ0FBQ2xCLElBQWQ7QUFDRCxLQUhEOztBQUlBLFdBQU8sWUFBTTtBQUNYYSxNQUFBQSxNQUFNLENBQUNRLG1CQUFQLENBQTJCLFFBQTNCLEVBQXFDWCxRQUFRLENBQUNLLE1BQTlDLEVBQXNELEtBQXREO0FBQ0FGLE1BQUFBLE1BQU0sQ0FBQ1EsbUJBQVAsQ0FBMkIsTUFBM0IsRUFBbUNYLFFBQVEsQ0FBQ0ssTUFBNUMsRUFBb0QsS0FBcEQ7O0FBQ0FMLE1BQUFBLFFBQVEsQ0FBQ1ksT0FBVDtBQUNELEtBSkQ7QUFLRCxHQWhCUSxFQWdCTixFQWhCTSxDQUFUO0FBa0JBdkMsRUFBQUEsU0FBUyxDQUFDLFlBQU07QUFDZCxRQUFJc0IsT0FBSixFQUFhO0FBQ1hBLE1BQUFBLE9BQU8sQ0FBQ2tCLEtBQVI7QUFDQSxVQUFNQyxNQUFnQixHQUFHLEVBQXpCO0FBQ0F4QixNQUFBQSxJQUFJLENBQUN5QixNQUFMLEdBQWMsQ0FBZCxJQUFtQnpCLElBQUksQ0FBQzBCLEdBQUwsQ0FBUyxVQUFDQyxJQUFELEVBQWU7QUFDekNILFFBQUFBLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZRCxJQUFJLENBQUNFLElBQWpCO0FBQ0QsT0FGa0IsQ0FBbkI7O0FBR0EsVUFBTUMsT0FBOEIsbUNBQU87QUFDekNDLFFBQUFBLE1BQU0sRUFBRSxJQURpQztBQUV6Q0MsUUFBQUEsSUFBSSxFQUFFLFFBRm1DO0FBR3pDQyxRQUFBQSxJQUFJLEVBQUUsUUFIbUM7QUFJekNDLFFBQUFBLElBQUksRUFBRTtBQUptQyxPQUFQLEdBSzlCbkMsTUFMOEIsQ0FBcEM7O0FBTUFNLE1BQUFBLE9BQU8sQ0FBQzhCLFNBQVIsQ0FBa0I7QUFDaEJDLFFBQUFBLE9BQU8sRUFBRTtBQUNQQyxVQUFBQSxPQUFPLEVBQUUsTUFERjtBQUVQQyxVQUFBQSxrQkFBa0IsRUFBRTtBQUZiLFNBRE87QUFLaEJ2QyxRQUFBQSxNQUFNLEVBQUUrQixPQUxRO0FBTWhCUyxRQUFBQSxLQUFLLEVBQUUzQyxNQU5TO0FBT2hCRSxRQUFBQSxNQUFNLEVBQUUsQ0FDTjtBQUNFRSxVQUFBQSxJQUFJLEVBQUVBLElBRFI7QUFFRXdDLFVBQUFBLElBQUksRUFBRSxLQUZSO0FBR0VDLFVBQUFBLE1BQU0sRUFBRTNDLE1BQU0sQ0FBQzJDLE1BQVAsR0FBZ0IzQyxNQUFNLENBQUMyQyxNQUF2QixHQUFnQyxLQUgxQztBQUlFQyxVQUFBQSxNQUFNLEVBQUU1QyxNQUFNLENBQUM0QyxNQUFQLEdBQWdCNUMsTUFBTSxDQUFDNEMsTUFBdkIsR0FBZ0MsQ0FBQyxLQUFELEVBQVEsS0FBUixDQUoxQztBQUtFN0MsVUFBQUEsS0FBSyxFQUFFO0FBQ0xxQyxZQUFBQSxJQUFJLEVBQUVyQyxLQUFLLENBQUNxQyxJQURQO0FBRUxTLFlBQUFBLE9BQU8sRUFBRTlDLEtBQUssQ0FBQytDLFlBQU4sR0FBcUIsTUFBckIsR0FBOEIsTUFGbEM7QUFHTEMsWUFBQUEsUUFBUSxFQUFFaEQsS0FBSyxDQUFDZ0QsUUFIWDtBQUlMRCxZQUFBQSxZQUFZLEVBQUUvQyxLQUFLLENBQUMrQyxZQUpmO0FBS0xFLFlBQUFBLFNBQVMsRUFBRWpELEtBQUssQ0FBQ2lELFNBQU4sR0FBa0JqRCxLQUFLLENBQUNpRCxTQUF4QixHQUFvQyxFQUwxQztBQU1MUCxZQUFBQSxLQUFLLEVBQUUxQyxLQUFLLENBQUMwQyxLQU5SO0FBT0xRLFlBQUFBLFVBQVUsRUFBRWxELEtBQUssQ0FBQ2tELFVBQU4sR0FBbUJsRCxLQUFLLENBQUNrRCxVQUF6QixHQUFzQyxFQVA3QztBQVFMQyxZQUFBQSxTQUFTLEVBQUVuRCxLQUFLLENBQUNtRCxTQUFOLEdBQWtCbkQsS0FBSyxDQUFDbUQsU0FBeEIsR0FBb0M7QUFSMUMsV0FMVDtBQWVFQyxVQUFBQSxTQUFTLEVBQUU7QUFDVHhCLFlBQUFBLE1BQU0sRUFBRTVCLEtBQUssQ0FBQzRCLE1BQU4sR0FBZTVCLEtBQUssQ0FBQzRCLE1BQXJCLEdBQThCLEVBRDdCO0FBRVR5QixZQUFBQSxPQUFPLEVBQUVyRCxLQUFLLENBQUNxRCxPQUFOLEdBQWdCckQsS0FBSyxDQUFDcUQsT0FBdEIsR0FBZ0M7QUFGaEM7QUFmYixTQURNO0FBUFEsT0FBbEIsRUE2QkcsSUE3Qkg7QUE4QkQ7QUFDRixHQTVDUSxFQTRDTixDQUFDN0MsT0FBRCxFQUFVTCxJQUFWLENBNUNNLENBQVQ7QUE4Q0FqQixFQUFBQSxTQUFTLENBQUMsWUFBTTtBQUNkLFFBQUlvRSxlQUFKOztBQUNBLFFBQUk5QyxPQUFPLElBQUlKLFFBQVgsSUFBdUIsQ0FBQ00sTUFBeEIsSUFBa0NQLElBQUksQ0FBQ3lCLE1BQUwsR0FBYyxDQUFwRCxFQUF1RDtBQUNyRDBCLE1BQUFBLGVBQWUsR0FBR0MsV0FBVyxDQUFDLFlBQU07QUFDbEMzQyxRQUFBQSxZQUFZLENBQUMsVUFBQTRDLENBQUMsRUFBSTtBQUNoQmhELFVBQUFBLE9BQU8sQ0FBQ2lELGNBQVIsQ0FBdUI7QUFDckJkLFlBQUFBLElBQUksRUFBRSxTQURlO0FBRXJCZSxZQUFBQSxXQUFXLEVBQUUsQ0FGUTtBQUdyQkMsWUFBQUEsU0FBUyxFQUFFSDtBQUhVLFdBQXZCOztBQUtBLGNBQUlBLENBQUMsSUFBSXJELElBQUksQ0FBQ3lCLE1BQUwsR0FBYyxDQUF2QixFQUEwQjtBQUN4QixtQkFBTyxDQUFQO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsbUJBQU80QixDQUFDLEdBQUcsQ0FBWDtBQUNEO0FBQ0YsU0FYVyxDQUFaO0FBWUQsT0FiNEIsRUFhMUJuRCxVQWIwQixDQUE3QjtBQWNEOztBQUNELFdBQU8sWUFBTTtBQUNYdUQsTUFBQUEsYUFBYSxDQUFDTixlQUFELENBQWI7QUFDRCxLQUZEO0FBR0QsR0FyQlEsRUFxQk4sQ0FBQzlDLE9BQUQsRUFBVUosUUFBVixFQUFvQk0sTUFBcEIsRUFBNEJQLElBQTVCLENBckJNLENBQVQ7QUF1QkEsc0JBQ0U7QUFBSyxJQUFBLEdBQUcsRUFBRUksUUFBVjtBQUNFLElBQUEsS0FBSyxFQUFFO0FBQ0wsZUFBU1YsS0FESjtBQUVMLGdCQUFVQztBQUZMO0FBRFQsSUFERjtBQVFELENBbkhEOztBQXFIQSxlQUFlSCxVQUFmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0ICogYXMgZWNoYXJ0cyBmcm9tICdlY2hhcnRzL2NvcmUnO1xuaW1wb3J0IHsgVG9vbHRpcENvbXBvbmVudCwgTGVnZW5kQ29tcG9uZW50LCBMZWdlbmRDb21wb25lbnRPcHRpb24gIH0gZnJvbSAnZWNoYXJ0cy9jb21wb25lbnRzJztcbmltcG9ydCB7IFBpZUNoYXJ0IH0gZnJvbSAnZWNoYXJ0cy9jaGFydHMnO1xuaW1wb3J0IHsgQ2FudmFzUmVuZGVyZXIgfSBmcm9tICdlY2hhcnRzL3JlbmRlcmVycyc7XG5cbmVjaGFydHMudXNlKFxuICBbVG9vbHRpcENvbXBvbmVudCwgTGVnZW5kQ29tcG9uZW50LCBQaWVDaGFydCwgQ2FudmFzUmVuZGVyZXJdXG4pO1xuXG5pbnRlcmZhY2UgTGFiZWxQcm9wcyB7XG4gIHNob3c/OiBib29sZWFuO1xuICAvKiog5a2X5L2T6aKc6ImyICovXG4gIGNvbG9yPzogc3RyaW5nO1xuICAvKiog5a2X5L2T5aSn5bCP77yM6buY6K6kMTTlg4/ntKAgKi9cbiAgZm9udFNpemU/OiBudW1iZXIgfCBzdHJpbmc7XG4gIC8qKiBcbiAgICog5qCH562+5YaF5a655qC85byPXG4gICAqIEB7YX3vvJrns7vliJflkI3jgIJcbiAgICogQHtife+8muaVsOaNruWQjeOAglxuICAgKiBAe2N977ya5pWw5o2u5YC844CCXG4gICAqIEB7ZH3vvJrnmb7liIbmr5TjgIJcbiAgICovXG4gIGZvcm1hdHRlcj86IHN0cmluZyB8IEZ1bmN0aW9uO1xuICBlZGdlRGlzdGFuY2U/OiBudW1iZXIgfCBzdHJpbmc7XG4gIC8qKiDooYzpq5ggKi9cbiAgbGluZUhlaWdodD86IG51bWJlcjtcbiAgLyoqIOesrOS4gOauteW8leWvvOe6v+mVv+W6piAqL1xuICBsZW5ndGg/OiBudW1iZXI7XG4gIC8qKiDnrKzkuozmrrXlvJXlr7znur/plb/luqYgKi9cbiAgbGVuZ3RoMj86IG51bWJlcjtcbiAgLyoqIOagh+etvuS5i+mXtOmXtOi3ne+8jOm7mOiupDEw5YOP57SgICovXG4gIG1pbk1hcmdpbj86IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIFNlcmllc1Byb3BzIHtcbiAgY2VudGVyPzogc3RyaW5nW10gfCBudW1iZXIgfCBzdHJpbmc7XG4gIHJhZGl1cz86IHN0cmluZ1tdIHwgbnVtYmVyW10gfCBudW1iZXIgfCBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBQaWVCYXNlUHJvcHMge1xuICBkYXRhPzogYW55W107XG4gIHdpZHRoPzogc3RyaW5nO1xuICBoZWlnaHQ/OiBzdHJpbmc7XG4gIC8qKiDppbzlm77popzoibIgKi9cbiAgY29sb3JzPzogc3RyaW5nW107XG4gIGxhYmVsPzogTGFiZWxQcm9wcztcbiAgLyoqIOmlvOWbvuWxnuaApyAqL1xuICBzZXJpZXM/OiBTZXJpZXNQcm9wcztcbiAgLyoqIOWbvuS+i+e7hOS7tiwgYXBpOiBodHRwczovL2VjaGFydHMuYXBhY2hlLm9yZy96aC9vcHRpb24uaHRtbCNsZWdlbmQgKi9cbiAgbGVnZW5kPzogTGVnZW5kQ29tcG9uZW50T3B0aW9uO1xuICAvKiog5piv5ZCm6Ieq5Yqo5YiH5o2iIFRvb2x0aXAgKi9cbiAgaXNTd2l0Y2g/OiBib29sZWFuO1xuICAvKiog6Ieq5Yqo5YiH5o2i5LqL5Lu2IOm7mOiupCAyMDAw77yIMlPvvIkgKi9cbiAgc3dpdGNoVGltZT86IG51bWJlcjtcbiAgb25DbGljaz86ICh2OiBhbnkpID0+IHZvaWQ7XG59XG5cbmNvbnN0IEVDaGFydHNQaWUgPSAocHJvcHM6IFBpZUJhc2VQcm9wcykgPT4ge1xuICBjb25zdCB7XG4gICAgd2lkdGggPSAnMTAwJScsXG4gICAgaGVpZ2h0ID0gJzEwMCUnLFxuICAgIGNvbG9ycyA9IFsnIzU0NzBjNicsICcjOTFjYzc1JywgJyNmYWM4NTgnLCAnI2VlNjY2NicsICcjNzNjMGRlJywgJyMzYmEyNzInLCAnI2ZjODQ1MicsICcjOWE2MGI0JywgJyNlYTdjY2MnXSxcbiAgICBsYWJlbCA9IHt9LFxuICAgIHNlcmllcyA9IHt9LFxuICAgIGxlZ2VuZCA9IHt9LFxuICAgIGRhdGEgPSBbXSxcbiAgICBpc1N3aXRjaCA9IGZhbHNlLFxuICAgIHN3aXRjaFRpbWUgPSAyMDAwLFxuICAgIG9uQ2xpY2tcbiAgfSA9IHByb3BzO1xuXG4gIGNvbnN0IGNoYXJ0UmVmID0gdXNlUmVmPGFueT4obnVsbClcbiAgY29uc3QgW215Q2hhcnQsIHNldE15Q2hhcnRdID0gdXNlU3RhdGU8YW55PihudWxsKTtcbiAgY29uc3QgW2lzSGlnaF0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFtoaWdoSW5kZXgsIHNldEhpZ2hJbmRleF0gPSB1c2VTdGF0ZTxudW1iZXI+KDApO1xuICBcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBfbXlDaGFydDogYW55ID0gZWNoYXJ0cy5pbml0KGNoYXJ0UmVmLmN1cnJlbnQpO1xuICAgIHNldE15Q2hhcnQoX215Q2hhcnQpXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBfbXlDaGFydC5yZXNpemUsIGZhbHNlKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIF9teUNoYXJ0LnJlc2l6ZSwgZmFsc2UpO1xuICAgIF9teUNoYXJ0Lm9mZignY2xpY2snKTtcbiAgICBfbXlDaGFydC5vbignY2xpY2snLCAodjogYW55KSA9PiB7XG4gICAgICBvbkNsaWNrPy4odi5kYXRhKTtcbiAgICAgIGNvbnNvbGUubG9nKHYuZGF0YSlcbiAgICB9KVxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgX215Q2hhcnQucmVzaXplLCBmYWxzZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIF9teUNoYXJ0LnJlc2l6ZSwgZmFsc2UpO1xuICAgICAgX215Q2hhcnQuZGlzcG9zZSgpO1xuICAgIH1cbiAgfSwgW10pXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAobXlDaGFydCkge1xuICAgICAgbXlDaGFydC5jbGVhcigpO1xuICAgICAgY29uc3QgX25hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgZGF0YS5sZW5ndGggPiAwICYmIGRhdGEubWFwKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgX25hbWVzLnB1c2goaXRlbS5uYW1lKTtcbiAgICAgIH0pXG4gICAgICBjb25zdCBfbGVnZW5kOiBMZWdlbmRDb21wb25lbnRPcHRpb24gPSB7Li4ue1xuICAgICAgICBib3R0b206ICc1JScsXG4gICAgICAgIGxlZnQ6ICdjZW50ZXInLFxuICAgICAgICBpY29uOiAnY2lyY2xlJyxcbiAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgIH0sIC4uLmxlZ2VuZH07XG4gICAgICBteUNoYXJ0LnNldE9wdGlvbih7XG4gICAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgICB0cmlnZ2VyOiAnaXRlbScsXG4gICAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiAwLFxuICAgICAgICB9LFxuICAgICAgICBsZWdlbmQ6IF9sZWdlbmQsXG4gICAgICAgIGNvbG9yOiBjb2xvcnMsXG4gICAgICAgIHNlcmllczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICB0eXBlOiAncGllJyxcbiAgICAgICAgICAgIHJhZGl1czogc2VyaWVzLnJhZGl1cyA/IHNlcmllcy5yYWRpdXMgOiAnNzAlJyxcbiAgICAgICAgICAgIGNlbnRlcjogc2VyaWVzLmNlbnRlciA/IHNlcmllcy5jZW50ZXIgOiBbJzUwJScsICc1MCUnXSxcbiAgICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAgIHNob3c6IGxhYmVsLnNob3csXG4gICAgICAgICAgICAgIGFsaWduVG86IGxhYmVsLmVkZ2VEaXN0YW5jZSA/ICdlZGdlJyA6ICdub25lJyxcbiAgICAgICAgICAgICAgZm9udFNpemU6IGxhYmVsLmZvbnRTaXplLFxuICAgICAgICAgICAgICBlZGdlRGlzdGFuY2U6IGxhYmVsLmVkZ2VEaXN0YW5jZSxcbiAgICAgICAgICAgICAgbWluTWFyZ2luOiBsYWJlbC5taW5NYXJnaW4gPyBsYWJlbC5taW5NYXJnaW4gOiAxMCxcbiAgICAgICAgICAgICAgY29sb3I6IGxhYmVsLmNvbG9yLFxuICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiBsYWJlbC5saW5lSGVpZ2h0ID8gbGFiZWwubGluZUhlaWdodCA6IDIwLFxuICAgICAgICAgICAgICBmb3JtYXR0ZXI6IGxhYmVsLmZvcm1hdHRlciA/IGxhYmVsLmZvcm1hdHRlciA6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGFiZWxMaW5lOiB7XG4gICAgICAgICAgICAgIGxlbmd0aDogbGFiZWwubGVuZ3RoID8gbGFiZWwubGVuZ3RoIDogMTAsXG4gICAgICAgICAgICAgIGxlbmd0aDI6IGxhYmVsLmxlbmd0aDIgPyBsYWJlbC5sZW5ndGgyIDogMjAsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LCB0cnVlKTtcbiAgICB9XG4gIH0sIFtteUNoYXJ0LCBkYXRhXSlcbiAgXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGZhdWx0QnlIb3VyVGltZTogYW55O1xuICAgIGlmIChteUNoYXJ0ICYmIGlzU3dpdGNoICYmICFpc0hpZ2ggJiYgZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICBmYXVsdEJ5SG91clRpbWUgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHNldEhpZ2hJbmRleChuID0+IHtcbiAgICAgICAgICBteUNoYXJ0LmRpc3BhdGNoQWN0aW9uKHtcbiAgICAgICAgICAgIHR5cGU6ICdzaG93VGlwJyxcbiAgICAgICAgICAgIHNlcmllc0luZGV4OiAwLFxuICAgICAgICAgICAgZGF0YUluZGV4OiBuXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKG4gPj0gZGF0YS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG4gKyAxXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSwgc3dpdGNoVGltZSlcbiAgICB9XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoZmF1bHRCeUhvdXJUaW1lKVxuICAgIH1cbiAgfSwgW215Q2hhcnQsIGlzU3dpdGNoLCBpc0hpZ2gsIGRhdGFdKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiByZWY9e2NoYXJ0UmVmfVxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgJ3dpZHRoJzogd2lkdGgsXG4gICAgICAgICdoZWlnaHQnOiBoZWlnaHRcbiAgICAgIH19PlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEVDaGFydHNQaWU7Il19