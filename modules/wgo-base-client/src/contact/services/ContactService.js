import { __awaiter, __generator } from "tslib";
import { Q_CONTACT_DATA, M_CONTACT_DATA } from "./ContactServiceQueries";
import { ApiService } from "../../core/services/ApiService";
import { CONTACT_ME_PATH_GET_CONTACT_ME, CONTACT_ME_PATH_SET_CONTACT_ME, } from "@wisegar-org/wgo-base-models/build/contact/server";
var ContactService = /** @class */ (function () {
    function ContactService() {
        this.apiService = ApiService.GetInstance();
    }
    ContactService.prototype.getContactData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiService.query({
                                query: Q_CONTACT_DATA,
                                variables: {},
                                fetchPolicy: "no-cache",
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response.data && response.data[CONTACT_ME_PATH_GET_CONTACT_ME]) {
                            data = response.data;
                            return [2 /*return*/, data[CONTACT_ME_PATH_GET_CONTACT_ME]];
                        }
                        return [2 /*return*/, {}];
                    case 2:
                        error_1 = _a.sent();
                        throw "ContactService getContactData: ".concat(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContactService.prototype.setContactData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.apiService.mutate({
                                mutation: M_CONTACT_DATA,
                                variables: {
                                    data: data,
                                },
                                fetchPolicy: "no-cache",
                            })];
                    case 1:
                        response = (_a.sent());
                        if (response.data && response.data[CONTACT_ME_PATH_SET_CONTACT_ME]) {
                            data_1 = response.data;
                            return [2 /*return*/, data_1[CONTACT_ME_PATH_SET_CONTACT_ME]];
                        }
                        return [2 /*return*/, false];
                    case 2:
                        error_2 = _a.sent();
                        throw "ContactService setContactData: ".concat(error_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ContactService;
}());
export { ContactService };
//# sourceMappingURL=ContactService.js.map