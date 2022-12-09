import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
dayjs.extend(customParseFormat);
import currency from "currency.js";
export var UtilService = {
    parseDate: function (date, format) {
        if (format === void 0) { format = "DD/MM/YYYY HH:mm"; }
        if (!date)
            return "";
        return dayjs(date).format(format);
    },
    parseDateFormFormat: function (date, from, format) {
        if (from === void 0) { from = "DD/MM/YYYY HH:mm"; }
        if (format === void 0) { format = "DD/MM/YYYY HH:mm"; }
        if (!date)
            return "";
        return dayjs(date, from).format(format);
    },
    roundNumber: function (value, decimal) {
        if (!value)
            return value;
        var roundValue = currency(value, {
            symbol: "",
            separator: "'",
            precision: decimal || 2,
        }).format();
        return parseFloat(roundValue);
    },
    isListActive: function (activeRoute, items) {
        var result = false;
        items.forEach(function (item) {
            switch (item.type) {
                case "group": {
                    result = result || UtilService.isListActive(activeRoute, item.items);
                    break;
                }
                case "item": {
                    result = result || item.link === activeRoute;
                    break;
                }
            }
        });
        return result;
    },
    removeTags: function (str) {
        var strBr = (str || "")
            .split("<div>")
            .map(function (text) { return text.replace(/(<([^>]+)>)/gi, ""); })
            .join("<br/>");
        return strBr.startsWith("<br/>") ? strBr.replace("<br/>", "") : strBr;
    },
    isValidEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
};
//# sourceMappingURL=UtilService.js.map