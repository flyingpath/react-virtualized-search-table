"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _arrayMove = _interopRequireDefault(require("array-move"));

var _reactVirtualized = require("react-virtualized");

var _reactSortableHoc = require("react-sortable-hoc");

require("react-virtualized/styles.css");

var _styleModule = _interopRequireDefault(require("./style.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SortableHeader = (0, _reactSortableHoc.sortableElement)(function (_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  return _react.default.cloneElement(children, props);
});
var SortableHeaderRowRenderer = (0, _reactSortableHoc.sortableContainer)(function (_ref2) {
  var className = _ref2.className,
      columns = _ref2.columns,
      style = _ref2.style;
  return _react.default.createElement("div", {
    className: className,
    role: "row",
    style: style
  }, _react.default.Children.map(columns, function (column, index) {
    return _react.default.createElement(SortableHeader, {
      index: index
    }, column);
  }));
});

var VirtulizeTableSearch =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VirtulizeTableSearch, _React$Component);

  function VirtulizeTableSearch(_props) {
    var _this;

    _classCallCheck(this, VirtulizeTableSearch);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VirtulizeTableSearch).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "onSortEnd", function (_ref3) {
      var oldIndex = _ref3.oldIndex,
          newIndex = _ref3.newIndex;

      _this.setState(function (_ref4) {
        var columns = _ref4.columns;
        return {
          columns: (0, _arrayMove.default)(columns, oldIndex, newIndex)
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "filterData", function () {
      var newData = _this.state.data;

      _lodash.default.forIn(_this.filterDict, function (value, key) {
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

      _this.setState({
        filterdData: newData
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeSearchFilter", function (key) {
      return function (e) {
        var value = e.target.value;
        _this.filterDict[key] = value;

        _this.filterData();
      };
    });

    _defineProperty(_assertThisInitialized(_this), "orderData", function (key) {
      return function () {
        var newData = _this.state.filterdData.slice();

        if (!_this.orderDict[key]) {
          _this.orderDict[key] = 'desc';
        } else {
          if (_this.orderDict[key] === 'desc') {
            _this.orderDict[key] = 'asc';
          } else {
            _this.orderDict[key] = 'desc';
          }
        }

        newData = _lodash.default.orderBy(newData, [function (d) {
          return d[key].orderKey;
        }], [_this.orderDict[key]]);

        _this.setState({
          filterdData: newData
        });
      };
    });

    _defineProperty(_assertThisInitialized(_this), "headerColumnMaker", function (props) {
      return props.columns.map(function (d, idx) {
        var column = _this.state.columns[idx];
        var newProps = Object.assign({}, d.props);
        newProps.className = 'header-column';
        delete newProps.title;
        delete newProps.children;
        return _react.default.createElement("div", _extends({}, newProps, {
          key: idx,
          className: _styleModule.default.headerTd + ' header-td'
        }), _react.default.createElement("div", {
          className: "input-parent"
        }, _react.default.createElement("input", {
          onChange: _this.onChangeSearchFilter(column.dataKey)
        })), _react.default.createElement("div", {
          className: "label",
          onClick: _this.orderData(column.dataKey)
        }, column.label));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderHeaderRow", function (params) {
      var columns = _this.headerColumnMaker(params);

      params.columns = columns;
      delete params.style.paddingRight;
      delete params.style.height;
      delete params.className;
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(SortableHeaderRowRenderer, _extends({}, params, {
        className: _styleModule.default.headerRow + ' header-row',
        axis: "x",
        lockAxis: "x",
        onSortEnd: _this.onSortEnd,
        distance: 1
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "rowColumnMaker", function (props) {
      var data = props.rowData;
      return props.columns.map(function (d, idx) {
        var column = _this.state.columns[idx];
        var newProps = Object.assign({}, d.props);
        delete newProps.title;
        delete newProps.children;
        return _react.default.createElement("div", _extends({}, newProps, {
          key: idx
        }), data[column.dataKey].element);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "rowRenderer", function (props) {
      var columns = _this.rowColumnMaker(props);

      props.columns = columns;
      return (0, _reactVirtualized.defaultTableRowRenderer)(props);
    });

    _this.state = {
      columns: _this.props.columns,
      data: _this.props.data,
      filterdData: _this.props.data
    };
    _this.filterDict = {}; // 目前搜尋狀態

    _this.orderDict = {}; // 目前排序狀態

    return _this;
  }

  _createClass(VirtulizeTableSearch, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.data !== this.props.data || prevProps.columns !== this.props.columns) {
        if (this.props.data !== this.state.data || this.props.columns !== this.state.columns) {
          this.setState({
            columns: this.props.columns,
            data: this.props.data,
            filterdData: this.props.data
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var filterdData = this.state.filterdData;
      var columns = this.state.columns;
      var widthAverage = false;
      columns.forEach(function (d) {
        if (!d.width) {
          widthAverage = true;
        }
      });
      return _react.default.createElement("div", {
        className: _styleModule.default.main
      }, _react.default.createElement(_reactVirtualized.AutoSizer, {
        className: _styleModule.default.autoSizer,
        style: {
          height: '100%',
          width: '100%'
        }
      }, function (_ref5) {
        var height = _ref5.height,
            width = _ref5.width;
        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
          className: _styleModule.default.tableTitle
        }, _this2.props.title), _react.default.createElement(_reactVirtualized.Table, {
          width: width - 2,
          height: height - 100,
          headerHeight: 70,
          rowHeight: 40,
          rowCount: filterdData.length,
          rowRenderer: _this2.rowRenderer,
          rowGetter: function rowGetter(_ref6) {
            var index = _ref6.index;
            return filterdData[index];
          },
          headerRowRenderer: _this2.renderHeaderRow,
          className: _styleModule.default.table,
          style: {
            borderRadius: '5px'
          }
        }, columns.map(function (d, idx) {
          return _react.default.createElement(_reactVirtualized.Column, _extends({}, d, {
            key: idx,
            flexGrow: 1,
            width: widthAverage ? 100 : d.width
          }));
        })));
      }));
    }
  }]);

  return VirtulizeTableSearch;
}(_react.default.Component);

VirtulizeTableSearch.defaultProps = {
  title: '門診紀錄列表',
  columns: [{
    dataKey: 'name',
    label: 'name'
  }, {
    dataKey: 'description',
    label: 'description'
  }, {
    dataKey: 'danger',
    label: '危機值危機值危機值危'
  }],
  data: [{
    name: {
      element: _react.default.createElement("div", null, "1234"),
      searchKey: '12343',
      orderKey: 'Brian Vaughn1'
    },
    description: {
      element: _react.default.createElement("div", null, "1234"),
      searchKey: '12343',
      orderKey: 'Software engineer'
    },
    danger: {
      element: _react.default.createElement("div", null, "o"),
      searchKey: true,
      orderKey: 1
    }
  }, {
    name: {
      element: _react.default.createElement("div", null, "12343"),
      searchKey: '1234',
      orderKey: 'Brian Vaughn2'
    },
    description: {
      element: _react.default.createElement("div", null, "1234"),
      searchKey: '1234',
      orderKey: 'Software engineer2'
    },
    danger: {
      element: _react.default.createElement("div", null),
      searchKey: false,
      orderKey: 0
    }
  }, {
    name: {
      element: _react.default.createElement("div", null, "Brian Vaughn3"),
      searchKey: 'Brian Vaughn',
      orderKey: 'Brian Vaughn'
    },
    description: {
      element: _react.default.createElement("div", null, "xxxxx"),
      searchKey: 'Software engineer3',
      orderKey: 'Software engineer3'
    },
    danger: {
      element: _react.default.createElement("div", null),
      searchKey: false,
      orderKey: 0
    }
  }, {
    name: {
      element: _react.default.createElement("div", null, "Describe555"),
      searchKey: 'Describe555',
      orderKey: 'Brian Vaughn3'
    },
    description: {
      element: _react.default.createElement("div", null, "xxxxx"),
      searchKey: '555',
      orderKey: 'Software engineer3'
    },
    danger: {
      element: _react.default.createElement("div", null),
      searchKey: false,
      orderKey: 0
    }
  }, {
    name: {
      element: _react.default.createElement("div", null),
      searchKey: 'Brian Vaughn3',
      orderKey: 'Brian Vaughn3'
    },
    description: {
      element: _react.default.createElement("div", null, "xxxxx"),
      searchKey: 'Software engineer3',
      orderKey: 'Software engineer3'
    },
    danger: {
      element: _react.default.createElement("div", null),
      searchKey: false,
      orderKey: 0
    }
  }, {
    name: {
      element: _react.default.createElement("div", null),
      searchKey: 'Brian Vaughn3',
      orderKey: 'Brian Vaughn3'
    },
    description: {
      element: _react.default.createElement("div", null, "xxxxx"),
      searchKey: 'Software engineer3',
      orderKey: 'Software engineer3'
    },
    danger: {
      element: _react.default.createElement("div", null),
      searchKey: false,
      orderKey: 0
    }
  }, {
    name: {
      element: _react.default.createElement("div", null),
      searchKey: 'Brian Vaughn3',
      orderKey: 'Brian Vaughn3'
    },
    description: {
      element: _react.default.createElement("div", null, "xxxxx"),
      searchKey: 'Software engineer3',
      orderKey: 'Software engineer3'
    },
    danger: {
      element: _react.default.createElement("div", null),
      searchKey: false,
      orderKey: 0
    }
  }, {
    name: {
      element: _react.default.createElement("div", null),
      searchKey: 'Brian Vaughn3',
      orderKey: 'Brian Vaughn3'
    },
    description: {
      element: _react.default.createElement("div", null, "xxxxx"),
      searchKey: 'Software engineer3',
      orderKey: 'Software engineer3'
    },
    danger: {
      element: _react.default.createElement("div", null),
      searchKey: false,
      orderKey: 0
    }
  }, {
    name: {
      element: _react.default.createElement("div", null),
      searchKey: 'Brian Vaughn3',
      orderKey: 'Brian Vaughn3'
    },
    description: {
      element: _react.default.createElement("div", null, "xxxxx"),
      searchKey: 'Software engineer3',
      orderKey: 'Software engineer3'
    },
    danger: {
      element: _react.default.createElement("div", null),
      searchKey: false,
      orderKey: 0
    }
  }, {
    name: {
      element: _react.default.createElement("div", null),
      searchKey: 'Brian Vaughn3',
      orderKey: 'Brian Vaughn3'
    },
    description: {
      element: _react.default.createElement("div", null, "xxxxx"),
      searchKey: 'Software engineer3',
      orderKey: 'Software engineer3'
    },
    danger: {
      element: _react.default.createElement("div", null),
      searchKey: false,
      orderKey: 0
    }
  }]
};
var _default = VirtulizeTableSearch;
exports.default = _default;