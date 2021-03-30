"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailServer = void 0;
const BasicResponse_1 = require("../models/responseModels/BasicResponse");
const nodemailer_1 = __importDefault(require("nodemailer"));
const BasicResponse_2 = require("../models/responseModels/BasicResponse");
class EmailServer {
    static async sendEmail(emailOpts) {
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.EMAIL_HOST,
            logger: true,
            debug: true,
            secure: false,
            auth: {
                user: process.env.EMAIL_SENDER_ADDRESS,
                pass: process.env.EMAIL_SENDER_PASSWORD,
            },
        });
        return new Promise((resolve, reject) => {
            transporter.sendMail(emailOpts, (err, info) => {
                if (err) {
                    reject(new BasicResponse_2.ErrorResponse("Error sending email: " + err.stack));
                }
                else {
                    resolve(new BasicResponse_1.SuccessResponse("Email sent: " + info.response));
                }
            });
        });
    }
}
exports.EmailServer = EmailServer;
//# sourceMappingURL=EmailService.js.map