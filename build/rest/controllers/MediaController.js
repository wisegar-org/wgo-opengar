"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaController = void 0;
const index_1 = require("../../database/index");
const index_2 = require("../../models/index");
const lodash_1 = __importDefault(require("lodash"));
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const MediaRepository_1 = require("../../database/repositories/MediaRepository");
const mimeTypes = require("mime-types");
let MediaController = class MediaController {
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
        this.imagePath = __dirname + "\\..\\..\\public\\img\\";
    }
    async saveImage(req, res) {
        const file = req.files.file;
        const { md5, mimetype, name } = file;
        let media = await this.mediaRepository.findOne({
            checkSum: md5,
        });
        if (lodash_1.default.isEmpty(media)) {
            const path = md5 + "." + mimeTypes.extension(mimetype);
            await file.mv(this.imagePath + path);
            media = new index_1.MediaEntity(name, new Date(), index_2.MediaEntityTypeEnum.image, md5, "img/" + path);
            media = await this.mediaRepository.save(media);
        }
        res.send(new index_2.SaveImageResponse(media.id, media.path));
    }
};
MediaController = __decorate([
    typedi_1.Service(),
    __param(0, typeorm_typedi_extensions_1.InjectRepository(index_1.MediaEntity, "development")),
    __metadata("design:paramtypes", [MediaRepository_1.MediaRepository])
], MediaController);
exports.MediaController = MediaController;
//# sourceMappingURL=MediaController.js.map