"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
require("./index.css");
var useTours_1 = require("./hooks/useTours");
var Card_1 = require("./components/Card");
var Modal_1 = require("./components/Modal");
var SeatInput_1 = require("./components/SeatInput");
var TourDetail_1 = require("./components/TourDetail");
var Preview_1 = require("./components/Preview");
function App() {
    var filtered = (0, useTours_1.useTours)().filtered;
    var _a = (0, react_1.useState)(null), activeTour = _a[0], setActiveTour = _a[1];
    var _b = (0, react_1.useState)(null), previewTour = _b[0], setPreviewTour = _b[1];
    var _c = (0, react_1.useState)(function () { return localStorage.getItem('seat') || ''; }), seat = _c[0], setSeat = _c[1];
    return ((0, jsx_runtime_1.jsxs)("main", { className: "p-4 max-w-xl mx-auto select-none", children: [(0, jsx_runtime_1.jsx)(SeatInput_1.SeatInput, { seat: seat, onChange: setSeat }), (0, jsx_runtime_1.jsx)("ul", { className: "grid gap-3", children: filtered.map(function (tour) { return ((0, jsx_runtime_1.jsx)(Card_1.default, { tour: tour, onClick: setActiveTour }, tour.id)); }) }), activeTour && ((0, jsx_runtime_1.jsx)(Modal_1.Modal, { onClose: function () { return setActiveTour(null); }, children: (0, jsx_runtime_1.jsx)(TourDetail_1.TourDetail, { tour: activeTour, onOpenPreview: function (tour) {
                        setPreviewTour(tour);
                        setActiveTour(null);
                    } }) })), previewTour && ((0, jsx_runtime_1.jsx)(Modal_1.Modal, { onClose: function () { return setPreviewTour(null); }, children: (0, jsx_runtime_1.jsx)(Preview_1.Preview, { tour: previewTour, seat: seat, onClose: function () { return setPreviewTour(null); } }) }))] }));
}
