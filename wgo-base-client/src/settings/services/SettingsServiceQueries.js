import { __makeTemplateObject } from "tslib";
import gql from "graphql-tag";
import { SETTINGS_PATH_GET_ALL_SETTINGS, SETTINGS_PATH_SET_SETTING, } from "@wisegar-org/wgo-base-models/build/settings/server";
export var Q_SETTINGS_GETALL = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery ", " {\n    ", " {\n        type_settings\n        key\n        value {\n          type\n          value\n        }\n  }\n}\n"], ["\nquery ", " {\n    ", " {\n        type_settings\n        key\n        value {\n          type\n          value\n        }\n  }\n}\n"])), SETTINGS_PATH_GET_ALL_SETTINGS, SETTINGS_PATH_GET_ALL_SETTINGS);
export var M_SETTING_POST = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\nmutation ", "($data: PostSettingInput!) {\n    ", "(data: $data)\n}\n"], ["\nmutation ", "($data: PostSettingInput!) {\n    ", "(data: $data)\n}\n"])), SETTINGS_PATH_SET_SETTING, SETTINGS_PATH_SET_SETTING);
var templateObject_1, templateObject_2;
//# sourceMappingURL=SettingsServiceQueries.js.map