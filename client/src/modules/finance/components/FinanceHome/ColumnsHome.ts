import {
  dateAccountingField,
  hoursAccountingField,
  issuesAccountingField,
  payAccountingField,
  statusAccountingField,
} from '../Accounting/ColumnsAccounting'
import { costExpenseField, dateExpenseField, nameExpenseField } from '../Expenses/ColumnsExpenses'
import { clientIncomeField, costIncomeField, dateIncomeField } from '../Incomes/ColumnsIncomes'
import { SimpleColumnsIssues } from '../Issues/ColumnsIssues'

export const ColumnExpenseHome = [nameExpenseField, dateExpenseField, costExpenseField]

export const ColumnIncomeHome = [clientIncomeField, dateIncomeField, costIncomeField]

export const ColumnIssuesHome = SimpleColumnsIssues

export const ColumnAccountHome = [
  dateAccountingField,
  issuesAccountingField,
  hoursAccountingField,
  payAccountingField,
  statusAccountingField,
]
