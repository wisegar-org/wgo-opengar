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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const wgo_opengar_core_1 = require("@wisegar-org/wgo-opengar-core");
const index_1 = require("../../models/index");
const lodash_1 = __importDefault(require("lodash"));
const BasicResponse_1 = require("../../models/responseModels/BasicResponse");
const wgo_opengar_core_2 = require("@wisegar-org/wgo-opengar-core");
const settings_1 = require("../../settings");
const EmailService_1 = require("../../services/EmailService");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
// import { UserRepository } from "../../database/repositories/UserRepository";
// import { RoleRepository } from "../../database/repositories/RoleRepository";
// import { MediaRepository } from "../../database/repositories/MediaRepository";
// const connection: Connection = getConnection()
// const UserRepository: Repository<UserEntity> = connection.getRepository(UserEntity)
// const RolRepository: Repository<RolEntity> = connection.getRepository(RolEntity)
// const MediaRepository: Repository<MediaEntity> = connection.getRepository(MediaEntity)
////////-----------OLD CONTROLLER --------------------///////
let AuthController = class AuthController {
    constructor(conn) {
        this.connection = conn;
        this.UserRepository = this.connection.getRepository(wgo_opengar_core_1.UserEntity);
        this.RolRepository = this.connection.getRepository(wgo_opengar_core_1.RolEntity);
        this.MediaRepository = this.connection.getRepository(wgo_opengar_core_1.MediaEntity);
    }
    async loginUser(req, res) {
        const { user, password } = req.body;
        const userEntity = await this.UserRepository.findOne({
            relations: ["roles", "profileImage"],
            where: {
                userName: user,
            },
        });
        if (lodash_1.default.isEmpty(userEntity) ||
            lodash_1.default.isUndefined(userEntity) ||
            lodash_1.default.isNull(userEntity) ||
            !lodash_1.default.isEqual(userEntity.password, password)) {
            const resp = new index_1.UserLoginErrorResponse("Invalid user or invalid password");
            res.send(resp);
            return;
        }
        if (!userEntity.isEmailConfirmed) {
            res.send(new index_1.UserLoginErrorResponse("User email not confirmed", true));
            return;
        }
        const JWTObj = new wgo_opengar_core_2.JwtService({
            privateKey: settings_1.privateKey,
            publicKey: settings_1.publicKey,
        });
        const userObj = userEntity.getJWTUser();
        const tokenResult = JWTObj.generateToken(userObj);
        if (lodash_1.default.isUndefined(tokenResult) || lodash_1.default.isEmpty(tokenResult.token)) {
            return res.send(new index_1.UserLoginErrorResponse("Token generation error." + tokenResult.error));
        }
        const resp = new index_1.UserLoginSuccessResponse(userEntity.id, userEntity.name, userEntity.lastName, userEntity.userName, userEntity.email, tokenResult.token, userEntity.profileImage?.path, userEntity.roles.map((rol) => rol.name));
        return res.send(resp);
    }
    async checkPasswordStrength(req, res) {
        //TODO hacer el chequeo de la fortaleza del password
        res.send(new index_1.SuccessRequest());
    }
    async registerCustomer(req, res) {
        const { name, lastName, userName, email, password, profileImage, } = req.body;
        //checking if all parameters have a value
        if (lodash_1.default.isEmpty(name) ||
            lodash_1.default.isEmpty(lastName) ||
            lodash_1.default.isEmpty(userName) ||
            lodash_1.default.isEmpty(email) ||
            lodash_1.default.isEmpty(password)) {
            res.send(new BasicResponse_1.ErrorResponse("At least one of the basic params is empty"));
            return;
        }
        let usersCount = await this.UserRepository.count({
            userName: userName,
        });
        //checking if user name already exist
        if (usersCount > 0) {
            res.send(new index_1.UserRegisterErrorResponse("userName", "Error in register user: user name already exist"));
            return;
        }
        usersCount = await this.UserRepository.count({
            email: email,
        });
        //checking if email already exist
        if (usersCount > 0) {
            res.send(new index_1.UserRegisterErrorResponse("email", "Error in register user: email already exist"));
            return;
        }
        const rol = await this.RolRepository.findOne({
            id: index_1.RolEntityEnum.customer,
        });
        let profileImg = null;
        if (lodash_1.default.isEmpty(profileImage)) {
            profileImg = await this.MediaRepository.findOne({
                id: profileImage,
            });
        }
        const user = new wgo_opengar_core_1.UserEntity(name, lastName, userName, email, password, [rol], false, profileImg);
        await this.UserRepository.save(user);
        const JWTObj = new wgo_opengar_core_2.JwtService({
            privateKey: settings_1.privateKey,
            publicKey: settings_1.publicKey,
        });
        const userObj = user.getJWTUser();
        const tokenResult = JWTObj.generateToken(userObj);
        if (lodash_1.default.isUndefined(tokenResult) || lodash_1.default.isEmpty(tokenResult.token)) {
            return res.send(new BasicResponse_1.ErrorResponse("Token generation error." + tokenResult.error));
        }
        EmailService_1.EmailServer.sendEmail({
            from: process.env.EMAIL_SENDER_ADDRESS,
            to: user.email,
            subject: "Confrim Email",
            html: `
                   <h2>ConfirmEmail</h2>
                   <p>${process.env.CLIENT_URL}/checkEmailConfirmation/${tokenResult.token}</p>
                   `,
        })
            .then((ok) => {
            return res.send(ok);
        }, (error) => {
            return res.send(error);
        })
            .catch(() => {
            return res.send(new BasicResponse_1.ErrorResponse("Error sending email after user register"));
        });
    }
    async checkEmailConfirmation(req, res) {
        const { token } = req.body;
        if (token) {
            const JWTObj = new wgo_opengar_core_2.JwtService({
                privateKey: settings_1.privateKey,
                publicKey: settings_1.publicKey,
            });
            const tokenResult = JWTObj.verifyToken(token);
            if (lodash_1.default.isUndefined(tokenResult) || !lodash_1.default.isEmpty(tokenResult.error)) {
                return res.send(new BasicResponse_1.ErrorResponse(tokenResult.error));
            }
            const userEntity = await this.UserRepository.findOne({
                relations: ["roles", "profileImage"],
                where: {
                    userName: tokenResult.username,
                },
            });
            if (lodash_1.default.isEmpty(userEntity) ||
                lodash_1.default.isUndefined(userEntity) ||
                lodash_1.default.isNull(userEntity)) {
                const resp = new index_1.ErrorRequest("User not found.");
                return res.send(resp);
            }
            if (!userEntity.isEmailConfirmed) {
                userEntity.isEmailConfirmed = true;
                await this.UserRepository.save(userEntity)
                    .then(() => {
                    return res.send(new index_1.SuccessRequest());
                }, () => {
                    return res.send(new BasicResponse_1.ErrorResponse("Error trying to update isEmailConfirmed in user entity"));
                })
                    .catch(() => {
                    return res.send(new BasicResponse_1.ErrorResponse("Error trying to update isEmailConfirmed in user entity"));
                });
            }
            else {
                return res.send(new index_1.SuccessRequest()); //el correo ya fue confirmado antes
            }
        }
    }
    async resendEmailConfirmation(req, res) {
        const { email } = req.body;
        if (lodash_1.default.isUndefined(email) || lodash_1.default.isEmpty(email)) {
            return res.send(new BasicResponse_1.ErrorResponse("Email is empty"));
        }
        const user = await this.UserRepository.findOne({
            where: {
                email: email,
            },
        });
        if (lodash_1.default.isUndefined(user) || lodash_1.default.isNull(user) || lodash_1.default.isEmpty(user)) {
            return res.send(`Not found any user with this email address ${email}`);
        }
        const JWTObj = new wgo_opengar_core_2.JwtService({
            privateKey: settings_1.privateKey,
            publicKey: settings_1.publicKey,
        });
        const userObj = user.getJWTUser();
        const tokenResult = JWTObj.generateToken(userObj);
        if (lodash_1.default.isUndefined(tokenResult) || lodash_1.default.isEmpty(tokenResult.token)) {
            return res.send(new BasicResponse_1.ErrorResponse("Token generation error." + tokenResult.error));
        }
        EmailService_1.EmailServer.sendEmail({
            from: process.env.EMAIL_SENDER_ADDRESS,
            to: user.email,
            subject: "Confrim Email",
            html: `
                   <h2>ConfirmEmail</h2>
                   <p>${process.env.CLIENT_URL}/checkEmailConfirmation/${tokenResult.token}</p>
                   `,
        })
            .then((ok) => {
            return res.send(ok);
        }, (error) => {
            return res.send(error);
        })
            .catch(() => {
            return res.send(new BasicResponse_1.ErrorResponse("Error sending email for resend verification account"));
        });
    }
    async updateCustomerProfile(req, res) {
        const { name, lastName, password, profileImage, id } = req.body;
        console.log("inicio");
        const userEntity = await this.UserRepository.findOne({
            relations: ["roles", "profileImage"],
            where: {
                id: id,
            },
        });
        console.log("user", userEntity);
        if (lodash_1.default.isUndefined(userEntity) ||
            lodash_1.default.isNull(userEntity) ||
            lodash_1.default.isEmpty(userEntity)) {
            res.send(new index_1.ErrorRequest("error, user not found"));
        }
        const image = await this.MediaRepository.findOne({
            where: {
                id: profileImage,
            },
        });
        console.log("image", image);
        userEntity.name = name ? name : userEntity.name;
        userEntity.lastName = lastName ? lastName : userEntity.lastName;
        userEntity.profileImage = image ? image : userEntity.profileImage;
        //TODO Falta codificar el password
        userEntity.password = password ? password : userEntity.password;
        await this.UserRepository.save(userEntity);
        const resp = new index_1.UserLoginSuccessResponse(userEntity.id, userEntity.name, userEntity.lastName, userEntity.userName, userEntity.email, "token", userEntity.profileImage?.path, userEntity.roles.map((rol) => rol.name));
        return res.send(resp);
    }
};
AuthController = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map