/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wrap = function (_React$Component) {
    _inherits(Wrap, _React$Component);

    function Wrap() {
        _classCallCheck(this, Wrap);

        return _possibleConstructorReturn(this, (Wrap.__proto__ || Object.getPrototypeOf(Wrap)).apply(this, arguments));
    }

    _createClass(Wrap, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "wrap" },
                React.createElement(Head, null),
                React.createElement(Middle, null),
                React.createElement(Picture, null)
            );
        }
    }]);

    return Wrap;
}(React.Component);

;

// 头部

var Head = function (_React$Component2) {
    _inherits(Head, _React$Component2);

    function Head() {
        _classCallCheck(this, Head);

        return _possibleConstructorReturn(this, (Head.__proto__ || Object.getPrototypeOf(Head)).apply(this, arguments));
    }

    _createClass(Head, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "head" },
                "\u4ECA\u65E5\u9500\u552E"
            );
        }
    }]);

    return Head;
}(React.Component);

;

// 中间

var Middle = function (_React$Component3) {
    _inherits(Middle, _React$Component3);

    function Middle(props) {
        _classCallCheck(this, Middle);

        // 初始化一个空对象
        var _this3 = _possibleConstructorReturn(this, (Middle.__proto__ || Object.getPrototypeOf(Middle)).call(this, props));

        _this3.state = { items: {}, ways: [], pay_map: {} };
        return _this3;
    }

    _createClass(Middle, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            $.ajax({
                url: "/get_orders_byDate",
                dataType: 'json',
                type: 'GET',
                success: function (data) {
                    this.setState({ items: data, ways: data.pay_ways, pay_map: data.pay_map });
                }.bind(this),
                error: function (xhr, status, err) {}.bind(this)
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            return React.createElement(
                "div",
                { className: "middle" },
                React.createElement(
                    "div",
                    { className: "middle_one overflow" },
                    React.createElement(
                        "p",
                        { className: "back" },
                        "\u7EDF\u8BA1\u65F6\u95F4:",
                        this.state.items.time
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-6 col-sm-6 number number1" },
                        React.createElement(
                            "p",
                            null,
                            "\uFFE5",
                            this.state.items.total_sales
                        ),
                        React.createElement(
                            "p",
                            null,
                            "\u8425\u4E1A\u989D"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-6 col-sm-6 number number2" },
                        React.createElement(
                            "p",
                            null,
                            this.state.items.order_num
                        ),
                        React.createElement(
                            "p",
                            null,
                            "\u8BA2\u5355\u6570"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-6 col-sm-6 number number3" },
                        React.createElement(
                            "p",
                            null,
                            this.state.items.total_products
                        ),
                        React.createElement(
                            "p",
                            null,
                            "\u4EF6\u6570"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-6 col-sm-6 number number4" },
                        React.createElement(
                            "p",
                            null,
                            "\u6682\u65E0"
                        )
                    )
                ),
                React.createElement("hr", null),
                React.createElement(
                    "div",
                    { className: "middle_two overflow" },
                    this.state.ways.map(function (item) {
                        return React.createElement(
                            "div",
                            { className: "col-xs-6 col-sm-6 number number1" },
                            React.createElement(
                                "p",
                                null,
                                "\uFFE5",
                                _this4.state.pay_map[item]
                            ),
                            React.createElement(
                                "p",
                                null,
                                item
                            )
                        );
                    })
                )
            );
        }
    }]);

    return Middle;
}(React.Component);

;
// 图片

var Picture = function (_React$Component4) {
    _inherits(Picture, _React$Component4);

    function Picture() {
        _classCallCheck(this, Picture);

        return _possibleConstructorReturn(this, (Picture.__proto__ || Object.getPrototypeOf(Picture)).apply(this, arguments));
    }

    _createClass(Picture, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "picture" },
                React.createElement("img", { src: "http://static.buy42.com/dong.gif", alt: "" })
            );
        }
    }]);

    return Picture;
}(React.Component);

;

// 返回到页面
ReactDOM.render(React.createElement(Wrap, null), document.getElementById("statistics"));

/***/ })
/******/ ]);