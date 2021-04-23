"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  BarBaseEcharts: true,
  LineBaseEcharts: true
};
Object.defineProperty(exports, "BarBaseEcharts", {
  enumerable: true,
  get: function get() {
    return _barBase.default;
  }
});
Object.defineProperty(exports, "LineBaseEcharts", {
  enumerable: true,
  get: function get() {
    return _lineBase.default;
  }
});

var _barBase = _interopRequireWildcard(require("@ahwecharts/bar-base"));

Object.keys(_barBase).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _barBase[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _barBase[key];
    }
  });
});

var _lineBase = _interopRequireWildcard(require("@ahwecharts/line-base"));

Object.keys(_lineBase).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _lineBase[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _lineBase[key];
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tICdAYWh3ZWNoYXJ0cy9iYXItYmFzZSc7XHJcbmV4cG9ydCAqIGZyb20gJ0BhaHdlY2hhcnRzL2xpbmUtYmFzZSc7XHJcblxyXG5leHBvcnQgeyBkZWZhdWx0IGFzIEJhckJhc2VFY2hhcnRzIH0gZnJvbSAnQGFod2VjaGFydHMvYmFyLWJhc2UnO1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIExpbmVCYXNlRWNoYXJ0cyB9IGZyb20gJ0BhaHdlY2hhcnRzL2xpbmUtYmFzZSc7Il19