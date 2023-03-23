import { __makeTemplateObject } from "tslib";
import gql from "graphql-tag";
import { TEMPLATE_PATH_GET_BY_TYPE, TEMPLATE_PATH_POST, } from "@wisegar-org/wgo-base-models/build/template/server";
export var Q_TEMPLATE_GET_BY_TYPE = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query ", "($type: String!) {\n    ", "(type: $type) {\n      id\n      title\n      body\n      documentType\n    }\n  }\n"], ["\n  query ", "($type: String!) {\n    ", "(type: $type) {\n      id\n      title\n      body\n      documentType\n    }\n  }\n"])), TEMPLATE_PATH_GET_BY_TYPE, TEMPLATE_PATH_GET_BY_TYPE);
export var M_TEMPLATE_SET = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  mutation ", "($data: TemplateInput!) {\n    ", "(data: $data)\n  }\n"], ["\n  mutation ", "($data: TemplateInput!) {\n    ", "(data: $data)\n  }\n"])), TEMPLATE_PATH_POST, TEMPLATE_PATH_POST);
var templateObject_1, templateObject_2;
//# sourceMappingURL=TemplateServiceQueries.js.map