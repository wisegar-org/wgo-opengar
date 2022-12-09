import { translations } from "@wisegar-org/wgo-base-models/build/language/translations";
export var getLanguageListSchema = function (tranStore, leftButtons, rowButtons) {
    // id: number;
    // code: string;
    // enabled: boolean;
    // default boolean;
    return {
        schema: {
            id: {
                name: "id",
                label: translations.COLUMN_ID,
                field: "id",
                sortable: true,
                visible: false,
                filterable: true,
                align: "left",
                width: 100,
            },
            code: {
                name: "code",
                label: translations.COLUMN_CODE,
                field: "code",
                sortable: true,
                visible: true,
                filterable: true,
                align: "left",
                width: 200,
            },
            enabled: {
                name: "enabled",
                label: translations.COLUMN_ENABLED,
                field: function (row) {
                    return row.enabled ? "check_box" : "check_box_outline_blank";
                },
                sortable: true,
                visible: true,
                filterable: true,
                align: "left",
                width: 200,
                type: "icon",
                extra: {
                    tooltip: "Language enabled",
                    color: "primary",
                },
            },
            default: {
                name: "default",
                label: translations.COLUMN_DEFAULT,
                field: function (row) {
                    return row.default ? "check_box" : "check_box_outline_blank";
                },
                sortable: true,
                visible: true,
                filterable: true,
                align: "left",
                width: 200,
                type: "icon",
                extra: {
                    tooltip: "Language default",
                    color: "primary",
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
        code: "id",
        text: ["nome"],
        description: [],
        title: translations.TITLE,
        leftButtons: leftButtons,
        translationStore: tranStore,
        searchStrategy: {
            type: "header",
        },
    };
};
//# sourceMappingURL=LanguageListSchema.js.map