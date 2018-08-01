exports.id = "main";
exports.modules = {

/***/ "./src/pages/Workshop/Workshop.tsx":
/*!*****************************************!*\
  !*** ./src/pages/Workshop/Workshop.tsx ***!
  \*****************************************/
/*! exports provided: Workshop, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Workshop", function() { return Workshop; });
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material-ui/core/Avatar */ "@material-ui/core/Avatar");
/* harmony import */ var _material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/colors/green */ "@material-ui/core/colors/green");
/* harmony import */ var _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Grid */ "@material-ui/core/Grid");
/* harmony import */ var _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Paper */ "@material-ui/core/Paper");
/* harmony import */ var _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/styles */ "@material-ui/core/styles");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Tab */ "@material-ui/core/Tab");
/* harmony import */ var _material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Tabs */ "@material-ui/core/Tabs");
/* harmony import */ var _material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_icons_Lock__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/icons/Lock */ "@material-ui/icons/Lock");
/* harmony import */ var _material_ui_icons_Lock__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Lock__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var components_BookForm__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! components/BookForm */ "./src/components/BookForm/index.tsx");
/* harmony import */ var components_Cover__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! components/Cover */ "./src/components/Cover/index.tsx");
/* harmony import */ var components_Footer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! components/Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var components_Header__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! components/Header */ "./src/components/Header/index.tsx");
/* harmony import */ var components_StarRating__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! components/StarRating */ "./src/components/StarRating/index.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_15__);
















const styles = (theme) => ({
    avatar: {
        backgroundColor: _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_2___default.a[500],
        height: 80,
        width: 80
    },
    button: {
        margin: theme.spacing.unit
    },
    grid: {
        margin: "0px auto",
        maxWidth: 1080,
        padding: 24
    },
    infoReservartion: {
        padding: theme.spacing.unit
    },
    tabs: {
        minWidth: 0
    }
});
class Workshop extends react__WEBPACK_IMPORTED_MODULE_15___default.a.Component {
    render() {
        const { classes } = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_15___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(components_Header__WEBPACK_IMPORTED_MODULE_13__["default"], { static: true }),
            react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(components_Cover__WEBPACK_IMPORTED_MODULE_11__["default"], { imageURL: this.props.image }),
            react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true, justify: "space-around", alignItems: "center", spacing: 16, className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true, xs: 2 },
                    react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true, justify: "center" },
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Avatar__WEBPACK_IMPORTED_MODULE_0___default.a, { className: classes.avatar, src: this.props.imageCook }))),
                react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true, xs: 10 },
                    react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true },
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true },
                            this.props.rating && (react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true },
                                react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(components_StarRating__WEBPACK_IMPORTED_MODULE_14__["default"], { rating: this.props.rating }),
                                this.props.ratingNumber && (react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "caption", className: classes.ratingNumber },
                                    "(",
                                    this.props.ratingNumber,
                                    ")")))),
                            react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "title", component: "p", gutterBottom: true },
                                "Recontrez ",
                                this.props.nameCook),
                            react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "headline", component: "h2", gutterBottom: true }, this.props.name))))),
            react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true, justify: "space-around", alignItems: "center", className: classes.grid },
                react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true, xs: 8 },
                    react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Tabs__WEBPACK_IMPORTED_MODULE_7___default.a, { value: 0, indicatorColor: "primary", textColor: "primary" },
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_6___default.a, { label: "Au menu", className: classes.tabs }),
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_6___default.a, { label: "Le Cuistot", className: classes.tabs }),
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_6___default.a, { label: "Commentaires", className: classes.tabs }),
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_6___default.a, { label: "Informations compl\u00E9mentaires", className: classes.tabs }),
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Tab__WEBPACK_IMPORTED_MODULE_6___default.a, { label: "^", className: classes.tabs })),
                    react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { container: true, justify: "space-around", alignItems: "center" },
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true }, this.props.eventType),
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true }, this.props.cuisineType),
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true },
                            "de ",
                            this.props.minSeat,
                            " \u00E0 ",
                            this.props.maxSeat,
                            " invit\u00E9s"),
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true }, this.props.timeEvent)),
                    react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, null,
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "headline", component: "h2", gutterBottom: true }, "Au menu"),
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "body1", component: "p" }, "Atelier + A emporter : Initiation \u00E0 la p\u00E2te \u00E0 sucre D\u00E9couvrez la p\u00E2te \u00E0 sucre et ses techniques tr\u00E8s sp\u00E9cifique avec notre nouveau cuistot: Audrey ! Venez apprendre \u00E0 sublimer vos p\u00E2tisseries et \u00E0 confectionner vos g\u00E2teaux d\u2019anniversaire. Pr\u00E9paration de la ganache au chocolat qui garnira et recouvrira le g\u00E2teau- Pr\u00E9paration des \u00E9l\u00E9ments de d\u00E9corations et de la p\u00E2te \u00E0 sucre (technique de lissage et de pose)"),
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "headline", component: "h2", gutterBottom: true }, "Photos & Videos"),
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "headline", component: "h2", gutterBottom: true }, "Le Cuistot"),
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "body1", component: "p" }, "Audrey passait son temps dans la cuisine de sa grand-m\u00E8re quand elle \u00E9tait petite. Et elle a toujours aim\u00E9 la p\u00E2tisserie et tester de nouvelles recettes, de nouvelles techniques. Jusqu'\u00E0 ce que sa passion et ses proches l'a pouss\u00E8rent \u00E0 passer son CAP. Maintenant elle souhaite le faire d\u00E9couvrir aux autres."),
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "headline", component: "h2", gutterBottom: true }, "Commentaires"),
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "headline", component: "h2", gutterBottom: true }, "Informations compl\u00E9mentaires"))),
                react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, { item: true, xs: 4 },
                    react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "headline", component: "h3" }, "Faites votre r\u00E9servation :"),
                    react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_4___default.a, { elevation: 1, className: classes.infoReservartion },
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(components_BookForm__WEBPACK_IMPORTED_MODULE_10__["default"], { price: this.props.price, availableSeat: this.props.availableSeat, dayEndBook: this.props.dayEndBook })),
                    react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_3___default.a, null,
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_icons_Lock__WEBPACK_IMPORTED_MODULE_9___default.a, null),
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "body1" }, "Paiement s\u00E9curis\u00E9 par Mangopay"),
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "body1" },
                            "Vous pouvez payer avec",
                            react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("span", null,
                                react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("img", { src: "https://static.cuistotducoin.com/img/workshop/visa.png", alt: "visa" }),
                                react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("img", { src: "https://static.cuistotducoin.com/img/workshop/masterpass.png", alt: "masterpass" }),
                                react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement("img", { src: "https://static.cuistotducoin.com/img/workshop/maestro.png", alt: "maestro" }))),
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, { variant: "body1" }, "Conditions d'annulation"),
                        react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default.a, { variant: "contained", color: "primary", className: classes.button }, "Poser une question au cuistot")))),
            react__WEBPACK_IMPORTED_MODULE_15___default.a.createElement(components_Footer__WEBPACK_IMPORTED_MODULE_12__["default"], null)));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_5__["withStyles"])(styles)(Workshop));


/***/ })

};
//# sourceMappingURL=main.af8394168763c2060b5b.hot-update.js.map