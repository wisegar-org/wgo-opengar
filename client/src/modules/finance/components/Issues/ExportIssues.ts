import { exportFile } from 'quasar'
import { ColumnTable, IssuesRecord } from '../../models/models'

export function wrapCsvValue(
  val: string,
  formatFn?: (value: string) => string
) {
  let formatted: string = formatFn !== undefined ? formatFn(val) : val

  formatted =
    formatted === undefined || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

export function exportTable(columns: ColumnTable[], data: IssuesRecord[]) {
  // naive encoding to csv format
  const content = [columns.map(col => wrapCsvValue(col.label))]
    .concat(
      data.map(row =>
        columns
          .map(col =>
            wrapCsvValue(
              typeof col.field === 'function'
                ? col.field(row)
                : (row[col.field] as string)
            )
          )
          .join(',')
      )
    )
    .join('\r\n')

  exportFile('table-export.csv', content, 'text/csv')

  // if (status !== true) {
  //   this.$q.notify({
  //     message: 'Browser denied file download...',
  //     color: 'negative',
  //     icon: 'warning'
  //   })
  // }
}
