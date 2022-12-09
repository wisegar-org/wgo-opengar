import { __makeTemplateObject } from "tslib";
import gql from "graphql-tag";
import { CONTACT_ME_PATH_GET_CONTACT_ME, CONTACT_ME_PATH_SET_CONTACT_ME, } from "@wisegar-org/wgo-base-models/build/contact/server";
export var Q_CONTACT_DATA = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query ", " {\n    ", " {\n      contactName\n      address\n      email\n      phoneNumber\n      mapPath\n    }\n  }\n"], ["\n  query ", " {\n    ", " {\n      contactName\n      address\n      email\n      phoneNumber\n      mapPath\n    }\n  }\n"])), CONTACT_ME_PATH_GET_CONTACT_ME, CONTACT_ME_PATH_GET_CONTACT_ME);
export var M_CONTACT_DATA = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  mutation ", "($data: ContactMeInput!) {\n    ", "(data: $data)\n  }\n"], ["\n  mutation ", "($data: ContactMeInput!) {\n    ", "(data: $data)\n  }\n"])), CONTACT_ME_PATH_SET_CONTACT_ME, CONTACT_ME_PATH_SET_CONTACT_ME);
var templateObject_1, templateObject_2;
//# sourceMappingURL=ContactServiceQueries.js.map