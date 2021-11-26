import { ColumnUserTable, RolModel, UsersModel } from './../../models/models';
import { ITranslationUserKeys } from './TranslationsKeys';

export const idUserField: ColumnUserTable = {
  name: 'idUser',
  required: true,
  label: 'ID',
  align: 'left',
  field: (record: UsersModel) => (record.id ? record.id.toString() : ''),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 200px'
};

export const nameUserField: ColumnUserTable = {
  name: 'nameUser',
  required: true,
  label: 'Name',
  align: 'left',
  field: (record: UsersModel) => (record.name ? record.name : ''),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 200px'
};

export const lastnameUserField: ColumnUserTable = {
  name: 'lastnameUser',
  required: true,
  label: 'Lastname',
  align: 'left',
  field: (record: UsersModel) => (record.lastName ? record.lastName : ''),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 200px'
};

export const emailUserField: ColumnUserTable = {
  name: 'emailUser',
  required: true,
  label: 'Email',
  align: 'left',
  field: (record: UsersModel) => (record.email ? record.email : ''),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 200px'
};

export const usernameUserField: ColumnUserTable = {
  name: 'usernameUser',
  required: true,
  label: 'Username',
  align: 'left',
  field: (record: UsersModel) => (record.userName ? record.userName : ''),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 200px'
};

export const emailConfirmedUserField: ColumnUserTable = {
  name: 'emailConfirmedUser',
  required: true,
  label: 'Is Email Confirmed',
  align: 'left',
  field: (record: UsersModel) => (record.isEmailConfirmed ? 'TRUE' : 'FALSE'),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 200px'
};

export const rolesUserField: ColumnUserTable = {
  name: 'rolesUser',
  required: true,
  label: 'Roles',
  align: 'left',
  field: (record: UsersModel) => (record.roles ? ListRoles(record.roles) : ''),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 200px'
};

export const actionsField: ColumnUserTable = {
  name: 'actionsUser',
  required: false,
  label: 'Actions',
  align: 'left',
  sortable: false,
  classes: 'ellipsis',
  style: 'max-width: 200px'
};

function ListRoles(roles: RolModel[]) {
  let rolResult = '';
  let first = true;
  for (const role of roles) {
    if (first) {
      first = false;
      rolResult = role.name;
    } else {
      rolResult += ', ' + role.name;
    }
  }

  return rolResult;
}

export const ColumnsUsers = [
  idUserField,
  emailUserField,
  nameUserField,
  lastnameUserField,
  usernameUserField,
  emailConfirmedUserField,
  rolesUserField,
  actionsField
];

export const setColumnsLanguage = (translations: ITranslationUserKeys) => {
  idUserField.label = translations.WGO_USERS_COLUMN_ID_LABEL;
  emailUserField.label = translations.WGO_USERS_COLUMN_EMAIL_LABEL;
  nameUserField.label = translations.WGO_USERS_COLUMN_NAME_LABEL;
  lastnameUserField.label = translations.WGO_USERS_COLUMN_LASTNAME_LABEL;
  usernameUserField.label = translations.WGO_USERS_COLUMN_USERNAME_LABEL;
  rolesUserField.label = translations.WGO_USERS_COLUMN_ROLES_LABEL;
  actionsField.label = translations.WGO_USERS_COLUMN_ACTIONS_LABEL;
  emailConfirmedUserField.label = translations.WGO_USERS_COLUMN_EMAIL_LABEL;
  emailConfirmedUserField.field = (record: UsersModel) =>
    record.isEmailConfirmed
      ? translations.WGO_USERS_COLUMN_ENABLED_STATUS
      : translations.WGO_USERS_COLUMN_DISABLED_STATUS;
};
