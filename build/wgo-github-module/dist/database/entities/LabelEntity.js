"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelEntity = void 0;
var typeorm_1 = require("typeorm");
var LabelEntity = /** @class */ (function (_super) {
    __extends(LabelEntity, _super);
    function LabelEntity(numberId, title) {
        var _this = _super.call(this) || this;
        _this.id = numberId;
        _this.title = title;
        return _this;
    }
    __decorate([
        typeorm_1.PrimaryColumn({ type: 'bigint' }),
        __metadata("design:type", Number)
    ], LabelEntity.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], LabelEntity.prototype, "title", void 0);
    LabelEntity = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Number, String])
    ], LabelEntity);
    return LabelEntity;
}(typeorm_1.BaseEntity));
exports.LabelEntity = LabelEntity;
