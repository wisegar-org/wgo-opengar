import { ColumnAgvInscriptionTable } from 'src/modules/agv/models/Columns';
import { AgvInscriptionResponseModel } from '../../../models/GraphqlModels';

export const nameAgvInscriptionField: ColumnAgvInscriptionTable = {
  name: 'nameAgvInscription',
  required: true,
  label: 'Nome',
  align: 'left',
  field: (record: AgvInscriptionResponseModel) =>
    `${record.nome} ${record.cognome}`,
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 200px'
};

export const classAgvInscriptionField: ColumnAgvInscriptionTable = {
  name: 'classAgvInscription',
  required: true,
  label: 'Classe frequentata',
  align: 'left',
  field: (record: AgvInscriptionResponseModel) => record.class,
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const emailAgvInscriptionField: ColumnAgvInscriptionTable = {
  name: 'emailAgvInscription',
  required: true,
  label: 'Email',
  align: 'left',
  field: (record: AgvInscriptionResponseModel) => record.email,
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const phoneAgvInscriptionField: ColumnAgvInscriptionTable = {
  name: 'phoneAgvInscription',
  required: true,
  label: 'Telefono',
  align: 'left',
  field: (record: AgvInscriptionResponseModel) => record.phone,
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 100px'
};

export const eventTitleAgvInscriptionField: ColumnAgvInscriptionTable = {
  name: 'eventTitleAgvInscription',
  required: true,
  label: "Titolo dell'evento",
  align: 'left',
  field: (record: AgvInscriptionResponseModel) => record.eventTitle || '',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 200px'
};

export const buttonAgvInscriptionField: ColumnAgvInscriptionTable = {
  name: 'buttonsAgvInscription',
  label: '',
  align: '',
  style: ''
};

export const ColumnsInscriptionAdmin = [
  nameAgvInscriptionField,
  classAgvInscriptionField,
  emailAgvInscriptionField,
  phoneAgvInscriptionField,
  eventTitleAgvInscriptionField,
  buttonAgvInscriptionField
];
