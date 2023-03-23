import { IsStringEmpty } from "@wisegar-org/wgo-object-extensions";
import { translations } from "@wisegar-org/wgo-base-models/build/settings/translations";
export var getSettingsListSchema = function (tranStore, leftButtons, rowButtons) {
    // id: number;
    // code: string;
    // enabled: boolean;
    // default boolean;
    return {
        schema: {
            type_settings: {
                name: "type_settings",
                label: translations.COLUMN_TYPE_SETTINGS,
                field: function (row) { return "WGO_SETTINGS_".concat(row.type_settings); },
                sortable: true,
                visible: true,
                filterable: true,
                align: "left",
                width: 200,
            },
            setting: {
                name: "setting",
                label: translations.COLUMN_SETTING,
                field: function (row) { return "WGO_SETTINGS_".concat(row.key); },
                sortable: true,
                visible: true,
                filterable: true,
                align: "left",
                width: 200,
            },
            key: {
                name: "key",
                label: translations.COLUMN_KEY,
                field: "key",
                sortable: true,
                visible: true,
                filterable: true,
                align: "left",
                width: 200,
            },
            value: {
                name: "value",
                label: translations.COLUMN_VALUE,
                field: "value",
                sortable: true,
                visible: true,
                filterable: true,
                align: "left",
                width: 200,
                format: function (val, row) {
                    if (val.type === "password") {
                        return IsStringEmpty(val.value) ? "••••••••" : "";
                    }
                    else if (val.type === "boolean") {
                        return "".concat(val.value) === "true"
                            ? translations.TRUE
                            : translations.FALSE;
                    }
                    return val.value;
                },
            },
            commands: {
                name: "commands",
                label: "",
                field: "commands",
                sortable: false,
                visible: true,
                filterable: false,
                required: true,
                align: "right",
                type: "iconCommands",
                extra: rowButtons,
            },
        },
        code: "key",
        text: ["key"],
        description: [],
        title: translations.TITLE,
        leftButtons: leftButtons,
        translationStore: tranStore,
        searchStrategy: {
            type: "header",
        },
    };
};
//# sourceMappingURL=SettingsListSchema.js.map