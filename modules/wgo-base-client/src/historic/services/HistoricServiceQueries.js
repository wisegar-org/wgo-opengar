import { __makeTemplateObject } from "tslib";
import gql from "graphql-tag";
import { HISTORIC_PATH_GET_FILTERS, HISTORIC_PATH_GET_PAGE, } from "@wisegar-org/wgo-base-models/build/historic/server";
export var Q_HISTORIC_PAGE = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query ", "($data: HistoryPageInputGQL!) {\n    ", "(data: $data) {\n      count\n      histories {\n        id\n        action\n        message\n        username\n        creatoIl\n        entity\n      }\n    }\n  }\n"], ["\n  query ", "($data: HistoryPageInputGQL!) {\n    ", "(data: $data) {\n      count\n      histories {\n        id\n        action\n        message\n        username\n        creatoIl\n        entity\n      }\n    }\n  }\n"])), HISTORIC_PATH_GET_PAGE, HISTORIC_PATH_GET_PAGE);
export var Q_HISTORIC_FILTER = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  query ", " {\n    ", " {\n      entities\n      actions\n      usernames\n    }\n  }\n"], ["\n  query ", " {\n    ", " {\n      entities\n      actions\n      usernames\n    }\n  }\n"])), HISTORIC_PATH_GET_FILTERS, HISTORIC_PATH_GET_FILTERS);
var templateObject_1, templateObject_2;
//# sourceMappingURL=HistoricServiceQueries.js.map