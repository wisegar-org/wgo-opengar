import { UtilService } from "../services/UtilService";
var BaseResizeComponent = /** @class */ (function () {
    function BaseResizeComponent() {
        this.componentHeight = 300;
    }
    BaseResizeComponent.prototype.addResize = function (onResizeFn) {
        window.addEventListener("resize", onResizeFn);
        onResizeFn();
    };
    BaseResizeComponent.prototype.removeResize = function (onResizeFn) {
        window.removeEventListener("resize", onResizeFn);
    };
    BaseResizeComponent.prototype.resizeTable = function (placeholder, defaultBottomPx, defaultPlaceholderPx) {
        if (defaultBottomPx === void 0) { defaultBottomPx = 0; }
        if (defaultPlaceholderPx === void 0) { defaultPlaceholderPx = 157; }
        if (placeholder) {
            var h = placeholder.getBoundingClientRect().bottom || defaultPlaceholderPx;
            var height = window.innerHeight - h - defaultBottomPx;
            this.componentHeight = Math.max(400, height - 1);
        }
        else {
            this.componentHeight = 500;
        }
    };
    return BaseResizeComponent;
}());
export { BaseResizeComponent };
var BaseTranslateComponent = /** @class */ (function () {
    function BaseTranslateComponent() {
    }
    BaseTranslateComponent.prototype.getLabel = function (tranStore, name) {
        if (tranStore && name)
            return tranStore.getTranslation(name);
        return name;
    };
    BaseTranslateComponent.prototype.getTrimLabel = function (tranStore, name) {
        if (tranStore && name) {
            return UtilService.removeTags(tranStore.getTranslation(name));
        }
        return name;
    };
    return BaseTranslateComponent;
}());
export { BaseTranslateComponent };
var BaseSeoDataComponent = /** @class */ (function () {
    function BaseSeoDataComponent() {
        var _this = this;
        this.webSite = "My Website";
        this.seoData = {
            title: "Title default",
            titleTemplate: function (title) { return "".concat(title, " - ").concat(_this.webSite); },
            meta: {
                description: { name: "description", content: "Page 1" },
                keywords: { name: "keywords", content: "Quasar website" },
                equiv: {
                    "http-equiv": "Content-Type",
                    content: "text/html; charset=UTF-8",
                },
                ogTitle: {
                    property: "og:title",
                    template: function (ogTitle) {
                        return "".concat(ogTitle, " - ").concat(_this.webSite);
                    },
                },
            },
        };
    }
    BaseSeoDataComponent.prototype.setSeoData = function (seoData) {
        this.seoData.title = seoData.title;
        if (seoData.webSite)
            this.webSite = seoData.webSite;
        if (seoData.description)
            this.seoData.meta.description.content = seoData.description;
        if (seoData.keywords)
            this.seoData.meta.keywords.content = seoData.keywords;
        if (seoData.equiv)
            this.seoData.meta.equiv.content = seoData.equiv;
    };
    return BaseSeoDataComponent;
}());
export { BaseSeoDataComponent };
//# sourceMappingURL=BaseComponents.js.map