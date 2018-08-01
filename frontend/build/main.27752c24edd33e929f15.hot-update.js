exports.id = "main";
exports.modules = {

/***/ "./src/components/Head/Head.tsx":
/*!**************************************!*\
  !*** ./src/components/Head/Head.tsx ***!
  \**************************************/
/*! exports provided: Head, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Head", function() { return Head; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-helmet */ "react-helmet");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_1__);


class Head extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
    render() {
        const { title, description, image, children, href } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_1___default.a, null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title", null, title),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("link", { rel: "canonical", href: href }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", { name: "description", content: description }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", { name: "og:title", content: title }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", { name: "og:description", content: description }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", { name: "twitter:title", content: title }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", { name: "twitter:description", content: description }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", { name: "twitter:image", content: image ? image : "favicon/apple-touch-icon-114x114.png" }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", { name: "og:image", content: image ? image : "favicon/apple-touch-icon-114x114.png" }),
            children));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Head);


/***/ })

};
//# sourceMappingURL=main.27752c24edd33e929f15.hot-update.js.map