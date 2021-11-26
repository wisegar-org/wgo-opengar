import { AgvEventResponseModel } from '../../../models/GraphqlModels';
import { ColumnAgvEventTable } from '../../../models/Columns';

export const titleAgvEventField: ColumnAgvEventTable = {
  name: 'titleAgvEvent',
  required: true,
  label: 'Titolo',
  align: 'left',
  field: (record: AgvEventResponseModel) => (record.title ? record.title : ''),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 200px'
};

export const typeAgvEventField: ColumnAgvEventTable = {
  name: 'typeAgvEvent',
  required: true,
  label: 'Tipo di Evento',
  align: 'left',
  field: (record: AgvEventResponseModel) => (record.type ? record.type : '-'),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 80px'
};

export const stateAgvEventField: ColumnAgvEventTable = {
  name: 'stateAgvEvent',
  required: true,
  label: 'Stato',
  align: 'left',
  field: (record: AgvEventResponseModel) => (record.state ? record.state : '-'),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 80px'
};

export const visibleAgvEventField: ColumnAgvEventTable = {
  name: 'visibleAgvEvent',
  required: true,
  label: 'Visibile',
  align: 'left',
  field: (record: AgvEventResponseModel) =>
    record.visible ? 'Visibile' : 'Non Visibile',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 80px'
};

export const iscrizioniAgvEventField: ColumnAgvEventTable = {
  name: 'iscrizioniAgvEvent',
  required: true,
  label: 'Iscrizioni',
  align: 'left',
  field: (record: AgvEventResponseModel) =>
    record.enrollment ? 'Abilitato' : 'Non Abilitato',
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 80px'
};

export const classAgvEventField: ColumnAgvEventTable = {
  name: 'classAgvEvent',
  required: true,
  label: 'Corso Scolastico',
  align: 'left',
  field: (record: AgvEventResponseModel) => (record.class ? record.class : '-'),
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 80px'
};

export const inscriptionsAgvEventField: ColumnAgvEventTable = {
  name: 'insccriptionsAgvEvent',
  required: true,
  label: 'Iscrizioni',
  align: 'left',
  field: (record: AgvEventResponseModel) => `${record.inscriptions}`,
  sortable: true,
  classes: 'ellipsis',
  style: 'max-width: 80px'
};

export const buttonAgvEventField: ColumnAgvEventTable = {
  name: 'buttonsAgvEvents',
  label: '',
  align: '',
  style: ''
};

export const ColumnsEventAdmin = [
  titleAgvEventField,
  typeAgvEventField,
  classAgvEventField,
  inscriptionsAgvEventField,
  stateAgvEventField,
  iscrizioniAgvEventField,
  visibleAgvEventField,
  buttonAgvEventField
];
