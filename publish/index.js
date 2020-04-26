"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _arrayMove = _interopRequireDefault(require("array-move"));

var _reactVirtualized = require("react-virtualized");

var _reactSortableHoc = require("react-sortable-hoc");

require("react-virtualized/styles.css");

var _styleModule = _interopRequireDefault(require("./style.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SortableHeader = (0, _reactSortableHoc.sortableElement)(function (_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  return _react.default.cloneElement(children, props);
});
var filterDict = {}; // 目前搜尋狀態

var SortableHeaderRowRenderer = (0, _reactSortableHoc.sortableContainer)(function (_ref2) {
  var className = _ref2.className,
      columns = _ref2.columns,
      style = _ref2.style;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className,
    role: "row",
    style: style
  }, _react.default.Children.map(columns, function (column, index) {
    return /*#__PURE__*/_react.default.createElement(SortableHeader, {
      index: index
    }, column);
  }));
});

var ReactVirtualizedSearchTable = function ReactVirtualizedSearchTable(props) {
  var _React$useState = _react.default.useState(props.columns),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      columns = _React$useState2[0],
      columnsSet = _React$useState2[1];

  var _React$useState3 = _react.default.useState(props.data),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      data = _React$useState4[0],
      dataSet = _React$useState4[1];

  var _React$useState5 = _react.default.useState(props.data),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      filteredData = _React$useState6[0],
      filteredDataSet = _React$useState6[1];

  var _React$useState7 = _react.default.useState({}),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      orderDict = _React$useState8[0],
      orderDictSet = _React$useState8[1];

  _react.default.useEffect(function () {
    columnsSet(props.columns);
    dataSet(props.data);
    filteredDataSet(props.data);
  }, [props.data, props.columns]);

  var onSortEnd = function onSortEnd(_ref3) {
    var oldIndex = _ref3.oldIndex,
        newIndex = _ref3.newIndex;
    columnsSet((0, _arrayMove.default)(columns, oldIndex, newIndex));
  };

  var filterData = function filterData() {
    var newData = data.slice();

    _lodash.default.forIn(filterDict, function (value, key) {
      newData = _lodash.default.filter(newData, function (d) {
        var searchString = d[key].searchKey;

        if (value === '') {
          return true;
        } else {
          if (searchString === true) {
            return true;
          } else if (searchString === false) {
            return false;
          } else {
            if (String(searchString).toLowerCase().indexOf(value.toLowerCase()) > -1) {
              return true;
            } else {
              return false;
            }
          }
        }
      });
    });

    filteredDataSet(newData);
  };

  var onChangeSearchFilter = function onChangeSearchFilter(key) {
    return function (e) {
      var value = e.target.value;
      filterDict[key] = value;
      filterData();
    };
  };

  var orderData = function orderData(key) {
    return function () {
      var newData = filteredData.slice();
      var newOreder = Object.assign({}, orderDict);

      if (!newOreder[key]) {
        newOreder[key] = 'desc';
      } else {
        if (newOreder[key] === 'desc') {
          newOreder[key] = 'asc';
        } else {
          newOreder[key] = 'desc';
        }
      } // else if( newOreder[ key ] === 'asc' ) {
      //     delete newOreder[ key ]
      // } else {
      //     delete newOreder[ key ]
      // }


      newData = _lodash.default.orderBy(newData, [function (d) {
        return d[key].orderKey;
      }], [newOreder[key]]);
      orderDictSet(newOreder);
      filteredDataSet(newData);
    };
  }; // 加工 header 以增加搜尋功能


  var headerColumnMaker = function headerColumnMaker(param) {
    return param.columns.map(function (d, idx) {
      var column = columns[idx];
      var newProps = Object.assign({}, d.props);
      newProps.className = 'header-column';
      delete newProps.title;
      delete newProps.children;
      var order = '';

      if (orderDict[column.dataKey] === 'asc') {
        order = '▾';
      }

      if (orderDict[column.dataKey] === 'desc') {
        order = '▴';
      }

      return /*#__PURE__*/_react.default.createElement("div", _extends({}, newProps, {
        key: idx,
        className: _styleModule.default.headerTd + ' header-td'
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "input-parent"
      }, /*#__PURE__*/_react.default.createElement("input", {
        onChange: onChangeSearchFilter(column.dataKey)
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "label",
        onClick: orderData(column.dataKey)
      }, column.label + order));
    });
  };

  var renderHeaderRow = function renderHeaderRow(params) {
    var newColumns = headerColumnMaker(params);
    params.columns = newColumns;
    delete params.style.paddingRight;
    delete params.style.height;
    delete params.className;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(SortableHeaderRowRenderer, _extends({}, params, {
      className: _styleModule.default.headerRow + (props.headerClassName ? ' ' + props.headerClassName : ''),
      axis: "x",
      lockAxis: "x",
      onSortEnd: onSortEnd,
      distance: 1
    })));
  };

  var rowColumnMaker = function rowColumnMaker(props) {
    var data = props.rowData;
    return props.columns.map(function (d, idx) {
      var column = columns[idx];
      var newProps = Object.assign({}, d.props);
      delete newProps.title;
      delete newProps.children;
      return /*#__PURE__*/_react.default.createElement("div", _extends({}, newProps, {
        key: idx
      }), data[column.dataKey].element);
    });
  };

  var rowRenderer = function rowRenderer(props) {
    var columns = rowColumnMaker(props);
    props.columns = columns;
    props.className += ' ' + _styleModule.default.tableRow;

    if (props.rowClassName) {
      props.className += ' ' + props.rowClassName;
    }

    return (0, _reactVirtualized.defaultTableRowRenderer)(props);
  };

  var widthAverage = false;
  columns.forEach(function (d) {
    if (!d.width) {
      widthAverage = true;
    }
  });
  var minWidth = columns.length * 80;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _styleModule.default.main,
    style: {
      minWidth: minWidth
    }
  }, /*#__PURE__*/_react.default.createElement(_reactVirtualized.AutoSizer, {
    className: _styleModule.default.autoSizer,
    style: {
      height: '100%',
      width: '100%'
    }
  }, function (_ref4) {
    var height = _ref4.height,
        width = _ref4.width;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.title && /*#__PURE__*/_react.default.createElement("div", {
      className: _typeof(props.title) === 'object' ? '' : _styleModule.default.tableTitle
    }, props.title), /*#__PURE__*/_react.default.createElement(_reactVirtualized.Table, {
      width: width - 2,
      height: height - 100,
      headerHeight: 70,
      rowHeight: props.rowHeight || 60,
      rowCount: filteredData.length,
      rowRenderer: rowRenderer,
      rowGetter: function rowGetter(_ref5) {
        var index = _ref5.index;
        return filteredData[index];
      },
      headerRowRenderer: renderHeaderRow,
      className: _styleModule.default.table + (props.tableClassName ? " ".concat(props.tableClassName) : ''),
      style: {
        borderRadius: '5px'
      },
      onRowClick: props.onRowClick
    }, columns.map(function (d, idx) {
      return /*#__PURE__*/_react.default.createElement(_reactVirtualized.Column, _extends({}, d, {
        key: idx,
        flexGrow: 1,
        width: widthAverage ? 100 : d.width
      }));
    })));
  }));
};

ReactVirtualizedSearchTable.propTypes = {
  title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  columns: _propTypes.default.arrayOf(_propTypes.default.shape({
    dataKey: _propTypes.default.string.isRequired,
    label: _propTypes.default.string.isRequired
  })).isRequired,
  data: _propTypes.default.arrayOf(_propTypes.default.objectOf(_propTypes.default.shape({
    element: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]).isRequired,
    searchKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]).isRequired,
    orderKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.bool]).isRequired
  }))).isRequired,
  rowHeight: _propTypes.default.number,
  onRowClick: _propTypes.default.func,
  rowClassName: _propTypes.default.string,
  headerClassName: _propTypes.default.string,
  tableClassName: _propTypes.default.string
};
var _default = ReactVirtualizedSearchTable;
exports.default = _default;