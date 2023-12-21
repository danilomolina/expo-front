// ** React Imports
import { useState, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { deleteEvent, getEvents } from 'src/services/event'
import { EventModel } from 'src/models/event'

import Delete from 'mdi-material-ui/Delete'
import toast from 'react-hot-toast'
import { MentoringModel } from 'src/models/mentoring'
import { deleteMentoring, getMentoring } from 'src/services/mentoring'

interface Column {
  id: 'title' | 'caption' | 'date' | 'hour'
  label: string
  minWidth?: number
  align?: 'right' | 'left'
  format?: (value: string) => string
}

const columns: readonly Column[] = [
  { id: 'title', label: 'Título', minWidth: 170 },
  { id: 'caption', label: 'Sub Título', minWidth: 100, align: 'left' },
  {
    id: 'date',
    label: 'Data',
    minWidth: 30,
    align: 'left',
    format: (value: string) => {
      const data = new Date(value);
      const dia = data.getUTCDate();
      const mes = data.getUTCMonth() + 1;
      const ano = data.getUTCFullYear();

      const diaFormatado = dia < 10 ? `0${dia}` : dia;
      const mesFormatado = mes < 10 ? `0${mes}` : mes;

      return `${diaFormatado}/${mesFormatado}/${ano}`;
    }
  },
  {
    id: 'hour',
    label: 'Hora',
    minWidth: 20,
    align: 'left',
  }
]

interface TableEventsParams {
  event: MentoringModel | undefined
}

const TableMentoring = (props: TableEventsParams) => {
  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [events, setEvents] = useState<MentoringModel[]>()

  useEffect(() => {
    handleGetEvents()
  }, [props.event])

  const handleGetEvents = async () => {
    const response = await getMentoring(0, 100, 0)
    setEvents(response.data)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleOnClickDelete = async (id: string) => {
    const response = await deleteMentoring(id)

    if (response.isSuccess) {
      toast.success('Mentoria excluido com sucess')
      handleGetEvents()
    }
    else
      toast.error('Erro ao excluir Mentoria')
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell>
                Apagar
              </TableCell>
              {/* <TableCell>
                Editar
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {events && events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.hour}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'string' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                  <TableCell>
                    <div onClick={() => handleOnClickDelete(row.id !== undefined ? row.id : "")} style={{ cursor: 'pointer' }}>
                      <Delete />
                    </div>
                  </TableCell>
                  {/* <TableCell>
                    <div onClick={() => handleOnClickEdit(row.id !== undefined ? row.id : "")} style={{ cursor: 'pointer' }}>
                      <Edit />
                    </div>
                  </TableCell> */}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[1, 10, 25, 100]}
        component='div'
        count={events !== undefined ? events.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default TableMentoring
