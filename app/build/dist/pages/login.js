'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _style = require('styled-jsx\\style.js');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _link = require('next\\dist\\lib\\link.js');

var _link2 = _interopRequireDefault(_link);

var _reactBootstrap = require('react-bootstrap');

var _Theme = require('../components/Theme');

var _Theme2 = _interopRequireDefault(_Theme);

var _NavMenu = require('../components/NavMenu');

var _NavMenu2 = _interopRequireDefault(_NavMenu);

var _index = require('../styles/index.scss');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = 'C:\\Users\\dfire\\Documents\\GitHub\\hack-points\\app\\pages\\login.js?entry';

// Straight away require/import scss/css just like in react.


var Login = function Login() {
    return (
        // Wrap your page inside <Theme> HOC to get bootstrap styling.
        // Theme can also be omitted if react-bootstrap components are not used.
        _react2.default.createElement(_Theme2.default, {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 13
            }
        }, _react2.default.createElement('div', {
            className: 'jsx-3143760007' + ' ' + 'container',
            __source: {
                fileName: _jsxFileName,
                lineNumber: 14
            }
        }, _react2.default.createElement('div', {
            className: 'jsx-3143760007' + ' ' + 'jumbotron login',
            __source: {
                fileName: _jsxFileName,
                lineNumber: 15
            }
        }, _react2.default.createElement('img', { src: '/Hackrobot.jpg', className: 'jsx-3143760007',
            __source: {
                fileName: _jsxFileName,
                lineNumber: 16
            }
        }), _react2.default.createElement('br', {
            className: 'jsx-3143760007',
            __source: {
                fileName: _jsxFileName,
                lineNumber: 17
            }
        }), _react2.default.createElement('a', { href: '/auth/slack', className: 'jsx-3143760007',
            __source: {
                fileName: _jsxFileName,
                lineNumber: 18
            }
        }, _react2.default.createElement('div', { id: 'login-btn', className: 'jsx-3143760007' + ' ' + 'btn',
            __source: {
                fileName: _jsxFileName,
                lineNumber: 19
            }
        }, _react2.default.createElement('img', { src: '/slack-btn.png', alt: 'slack logo', className: 'jsx-3143760007',
            __source: {
                fileName: _jsxFileName,
                lineNumber: 20
            }
        }), _react2.default.createElement('p', {
            className: 'jsx-3143760007',
            __source: {
                fileName: _jsxFileName,
                lineNumber: 21
            }
        }, 'LOGIN WITH Slack'))))), _react2.default.createElement(_style2.default, {
            styleId: '3143760007',
            css: '.btn.jsx-3143760007{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}.login.jsx-3143760007{margin:86px auto 0 auto;text-align:center;}#login-btn.jsx-3143760007{width:225px;padding:7px 5px;}.btn.jsx-3143760007 p.jsx-3143760007{margin:8px 0 0 0;padding:0;}.btn.jsx-3143760007>img.jsx-3143760007{float:left;margin-left:10px;}img.jsx-3143760007{margin:0 auto;display:block;}.clementine-text.jsx-3143760007{padding:0;margin:-25px 0 0 0;font-weight:500;font-size:60px;color:#FFA000;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcFxccGFnZXNcXGxvZ2luLmpzP2VudHJ5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJCb0IsQUFHOEIsQUFJVyxBQUtaLEFBS0ssQUFLTixBQU1HLEFBS0osVUFDUyxDQVZ4QixDQVhxQixFQWdCRixHQVhKLE9BVlEsR0FXdEIsQ0FMQSxBQVVBLEFBTUEsQ0FLb0IsYUExQnBCLEdBMkJtQixlQUNELGNBakNTLEFBa0MzQixtR0FqQ0UiLCJmaWxlIjoiYXBwXFxwYWdlc1xcbG9naW4uanM/ZW50cnkiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvZGZpcmUvRG9jdW1lbnRzL0dpdEh1Yi9oYWNrLXBvaW50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCBUaGVtZSBmcm9tICcuLi9jb21wb25lbnRzL1RoZW1lJztcclxuXHJcbmltcG9ydCBOYXZNZW51IGZyb20gJy4uL2NvbXBvbmVudHMvTmF2TWVudSc7XHJcblxyXG4vLyBTdHJhaWdodCBhd2F5IHJlcXVpcmUvaW1wb3J0IHNjc3MvY3NzIGp1c3QgbGlrZSBpbiByZWFjdC5cclxuaW1wb3J0IGluZGV4U3R5bGUgZnJvbSAnLi4vc3R5bGVzL2luZGV4LnNjc3MnO1xyXG5cclxuY29uc3QgTG9naW4gPSAoKSA9PiAoXHJcbiAgICAvLyBXcmFwIHlvdXIgcGFnZSBpbnNpZGUgPFRoZW1lPiBIT0MgdG8gZ2V0IGJvb3RzdHJhcCBzdHlsaW5nLlxyXG4gICAgLy8gVGhlbWUgY2FuIGFsc28gYmUgb21pdHRlZCBpZiByZWFjdC1ib290c3RyYXAgY29tcG9uZW50cyBhcmUgbm90IHVzZWQuXHJcbiAgICA8VGhlbWU+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJqdW1ib3Ryb24gbG9naW5cIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL0hhY2tyb2JvdC5qcGdcIiAvPlxyXG4gICAgICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL2F1dGgvc2xhY2tcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ0blwiIGlkPVwibG9naW4tYnRuXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL3NsYWNrLWJ0bi5wbmdcIiBhbHQ9XCJzbGFjayBsb2dvXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+TE9HSU4gV0lUSCBTbGFjazwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHsvKiBTdHlsaW5nIHVzaW5nIHN0eWxlZC1qc3guICovfVxyXG4gICAgICAgIDxzdHlsZSBqc3g+e2BcclxuICAgICAgICAgICAgICAuYnRuIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLmxvZ2luIHtcclxuICAgICAgICAgICAgICAgIG1hcmdpbjogODZweCBhdXRvIDAgYXV0bztcclxuICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgI2xvZ2luLWJ0biB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMjI1cHg7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiA3cHggNXB4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAuYnRuIHAge1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luOiA4cHggMCAwIDA7XHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAuYnRuID4gaW1nIHtcclxuICAgICAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDEwcHhcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKioqKioqIExvZ28gRGl2IFN0eWxpbmcgKioqKioqL1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaW1nIHtcclxuICAgICAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC5jbGVtZW50aW5lLXRleHQgeyAvKiBTdHlsaW5nIGZvciB0aGUgQ2xlbWVudGluZS5qcyB0ZXh0ICovXHJcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAtMjVweCAwIDAgMDtcclxuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDYwcHg7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogI0ZGQTAwMDtcclxuICAgICAgICAgICAgfWBcclxuICAgICAgICB9XHJcbiAgICAgICAgPC9zdHlsZT5cclxuICAgIDwvVGhlbWU+XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMb2dpbjtcclxuIl19 */\n/*@ sourceURL=app\\pages\\login.js?entry */'
        }))
    );
};

exports.default = Login;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcFxccGFnZXNcXGxvZ2luLmpzIl0sIm5hbWVzIjpbIkxpbmsiLCJCdXR0b24iLCJUaGVtZSIsIk5hdk1lbnUiLCJpbmRleFN0eWxlIiwiTG9naW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQVM7O0FBQ1QsQUFBTyxBQUFXOzs7O0FBRWxCLEFBQU8sQUFBYTs7OztBQUdwQixBQUFPLEFBQWdCOzs7Ozs7OztBQUR2Qjs7O0FBR0EsSUFBTSxRQUFRLFNBQVIsQUFBUSxRQUFBO0FBQ1Y7QUFDQTtBQUNBO3dCQUFBLEFBQUM7OzBCQUFEOzRCQUFBLEFBQ0k7QUFESjtBQUFBLDJCQUNJLGNBQUE7Z0RBQUEsQUFBZTs7MEJBQWY7NEJBQUEsQUFDSTtBQURKO0FBQUEsMkJBQ0ksY0FBQTtnREFBQSxBQUFlOzswQkFBZjs0QkFBQSxBQUNJO0FBREo7QUFBQSxrREFDUyxLQUFMLEFBQVMsNkJBQVQ7OzBCQUFBOzRCQURKLEFBQ0ksQUFDQTtBQURBOzt1QkFDQTs7MEJBQUE7NEJBRkosQUFFSSxBQUNBO0FBREE7QUFBQSw0QkFDQSxjQUFBLE9BQUcsTUFBSCxBQUFRLDBCQUFSOzswQkFBQTs0QkFBQSxBQUNJO0FBREo7MkJBQ0ksY0FBQSxTQUFxQixJQUFyQixBQUF3QixpREFBeEIsQUFBZTs7MEJBQWY7NEJBQUEsQUFDSTtBQURKO2tEQUNTLEtBQUwsQUFBUyxrQkFBaUIsS0FBMUIsQUFBOEIseUJBQTlCOzswQkFBQTs0QkFESixBQUNJLEFBQ0E7QUFEQTs0QkFDQSxjQUFBO3VCQUFBOzswQkFBQTs0QkFBQTtBQUFBO0FBQUEsV0FScEIsQUFDSSxBQUNJLEFBR0ksQUFDSSxBQUVJO3FCQVJwQjtpQkFIVSxBQUdWO0FBQUE7O0FBSEosQUE2REE7O2tCQUFBLEFBQWUiLCJmaWxlIjoibG9naW4uanM/ZW50cnkiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvZGZpcmUvRG9jdW1lbnRzL0dpdEh1Yi9oYWNrLXBvaW50cyJ9