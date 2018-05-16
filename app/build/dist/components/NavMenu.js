'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = require('styled-jsx\\style.js');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'C:\\Users\\dfire\\Documents\\GitHub\\hack-points\\app\\components\\NavMenu.js';

// import {Link} from 'react-router-dom';


var NavMenu = function (_Component) {
  (0, _inherits3.default)(NavMenu, _Component);

  function NavMenu() {
    (0, _classCallCheck3.default)(this, NavMenu);

    return (0, _possibleConstructorReturn3.default)(this, (NavMenu.__proto__ || (0, _getPrototypeOf2.default)(NavMenu)).apply(this, arguments));
  }

  (0, _createClass3.default)(NavMenu, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', {
        className: 'jsx-107322371' + ' ' + 'menu-container',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      }, _react2.default.createElement('a', { href: '/', className: 'jsx-107322371' + ' ' + 'menu',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        }
      }, 'Home'), '|', _react2.default.createElement('a', { href: '/browse', className: 'jsx-107322371' + ' ' + 'menu',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      }, 'Browse'), '|', _react2.default.createElement('a', { href: '/add', className: 'jsx-107322371' + ' ' + 'menu',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      }, 'Add'), '|', _react2.default.createElement('a', { href: '/profile', className: 'jsx-107322371' + ' ' + 'menu',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }, 'Profile'), '|', _react2.default.createElement('a', { href: '/logout', className: 'jsx-107322371' + ' ' + 'menu',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      }, 'Logout'), _react2.default.createElement(_style2.default, {
        styleId: '107322371',
        css: '.menu-container.jsx-107322371{background:black;color:grey;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;padding:15px;}.menu.jsx-107322371{color:grey;padding:15px;font-size:20pt;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcFxcY29tcG9uZW50c1xcTmF2TWVudS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtQm9CLEFBR2tDLEFBTVAsV0FDRyxNQU5GLE9BT0csSUFOUyxXQU96Qix3RkFOZSxhQUNmIiwiZmlsZSI6ImFwcFxcY29tcG9uZW50c1xcTmF2TWVudS5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9kZmlyZS9Eb2N1bWVudHMvR2l0SHViL2hhY2stcG9pbnRzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0Jztcbi8vIGltcG9ydCB7TGlua30gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cblxuY2xhc3MgTmF2TWVudSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J21lbnUtY29udGFpbmVyJyA+XG4gICAgICAgIHsvKiBXZWxjb21lIHRvIEhhY2sgUG9pbnRzPHNwYW4gaWQ9XCJkaXNwbGF5LW5hbWVcIj48L3NwYW4+ISAqL31cbiAgICAgICAgPGEgY2xhc3NOYW1lPVwibWVudVwiIGhyZWY9XCIvXCI+SG9tZTwvYT5cbiAgICAgICAgfFxuICAgICAgPGEgY2xhc3NOYW1lPVwibWVudVwiIGhyZWY9XCIvYnJvd3NlXCI+QnJvd3NlPC9hPlxuICAgICAgICB8XG4gICAgICA8YSBjbGFzc05hbWU9XCJtZW51XCIgaHJlZj1cIi9hZGRcIj5BZGQ8L2E+XG4gICAgICAgIHxcbiAgICAgIDxhIGNsYXNzTmFtZT1cIm1lbnVcIiBocmVmPVwiL3Byb2ZpbGVcIj5Qcm9maWxlPC9hPlxuICAgICAgICB8XG4gICAgICA8YSBjbGFzc05hbWU9XCJtZW51XCIgaHJlZj0nL2xvZ291dCc+TG9nb3V0PC9hPlxuXG4gICAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgICAgICAgLm1lbnUtY29udGFpbmVyIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBibGFjaztcbiAgICAgICAgICAgICAgICBjb2xvcjogZ3JleTtcbiAgICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAxNXB4O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC5tZW51e1xuICAgICAgICAgICAgICAgIGNvbG9yOmdyZXk7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMTVweDtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6MjBwdDtcbiAgICAgICAgICAgICAgfWBcbiAgICAgICAgfVxuICAgICAgICA8L3N0eWxlPlxuXG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5hdk1lbnU7XG4iXX0= */\n/*@ sourceURL=app\\components\\NavMenu.js */'
      }));
    }
  }]);

  return NavMenu;
}(_react.Component);

exports.default = NavMenu;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcFxcY29tcG9uZW50c1xcTmF2TWVudS5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIk5hdk1lbnUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7Ozs7Ozs7QUFDaEI7OztJLEFBR007Ozs7Ozs7Ozs7OzZCQUNLLEFBQ1A7NkJBQ0UsY0FBQTsyQ0FBQSxBQUFlOztvQkFBZjtzQkFBQSxBQUVFO0FBRkY7QUFBQSxPQUFBLGtCQUVFLGNBQUEsT0FBb0IsTUFBcEIsQUFBeUIsd0NBQXpCLEFBQWE7O29CQUFiO3NCQUFBO0FBQUE7U0FGRixBQUVFLFNBRUYscUJBQUEsY0FBQSxPQUFvQixNQUFwQixBQUF5Qiw4Q0FBekIsQUFBYTs7b0JBQWI7c0JBQUE7QUFBQTtTQUpBLEFBSUEsV0FFQSxxQkFBQSxjQUFBLE9BQW9CLE1BQXBCLEFBQXlCLDJDQUF6QixBQUFhOztvQkFBYjtzQkFBQTtBQUFBO1NBTkEsQUFNQSxRQUVBLHFCQUFBLGNBQUEsT0FBb0IsTUFBcEIsQUFBeUIsK0NBQXpCLEFBQWE7O29CQUFiO3NCQUFBO0FBQUE7U0FSQSxBQVFBLFlBRUEscUJBQUEsY0FBQSxPQUFvQixNQUFwQixBQUF5Qiw4Q0FBekIsQUFBYTs7b0JBQWI7c0JBQUE7QUFBQTtTQVZBLEFBVUE7aUJBVkE7YUFERixBQUNFLEFBNkJIO0FBN0JHOzs7OztBQUhnQixBLEFBbUN0Qjs7a0JBQUEsQUFBZSIsImZpbGUiOiJOYXZNZW51LmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL2RmaXJlL0RvY3VtZW50cy9HaXRIdWIvaGFjay1wb2ludHMifQ==