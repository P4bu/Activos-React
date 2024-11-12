import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export const ExportExcel = (data, fileName = 'datos_exportados') => {
    const ws = XLSX.utils.json_to_sheet(data)

    const wb = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(wb, ws, 'Datos')

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })

    const file = new Blob([excelBuffer], { bookType: 'xlsx', type: 'application/octet-stream'})

    saveAs(file, `${fileName}.xlsx`)
}