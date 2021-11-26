import { IColumn } from 'src/modules/wgo/models/IColumn';
import {
  AgvEventResponseModel,
  AgvInscriptionResponseModel
} from './GraphqlModels';

export interface ColumnAgvEventTable extends IColumn {
  field?: (row: AgvEventResponseModel) => string | string;
}
export interface ColumnAgvInscriptionTable extends IColumn {
  field?: (row: AgvInscriptionResponseModel) => string | string;
}
