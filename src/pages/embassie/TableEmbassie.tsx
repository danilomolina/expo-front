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

import Delete from 'mdi-material-ui/Delete'
import toast from 'react-hot-toast'
import { EmbassieModel } from 'src/models/embassie'
import { deleteEmbassie, getEmbassie } from 'src/services/embassie'

interface Column {
  id: 'description' | 'link' | 'image' | 'category' | 'name'
  label: string
  minWidth?: number
  align?: 'right' | 'left'
  format?: (value: string) => string
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Nome', minWidth: 170 },
  {
    id: 'image',
    label: 'Imagem',
    minWidth: 20,
    align: 'left',
  },
  { id: 'description', label: 'Descrição', minWidth: 170 },
  { id: 'link', label: 'Link', minWidth: 100, align: 'left' },
  { id: 'category', label: 'Categoria', minWidth: 100, align: 'left' }
]

interface TableEmbassieParams {
  event: EmbassieModel | undefined
}

const TableEmbassie = (props: TableEmbassieParams) => {
  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [embassie, setEmbassie] = useState<EmbassieModel[]>()

  useEffect(() => {
    handleGetEmbassie()
  }, [props.event])

  const handleGetEmbassie = async () => {
    const response = await getEmbassie(0, 100, 0)
    setEmbassie(response.data)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleOnClickDelete = async (id: string) => {
    const response = await deleteEmbassie(id)

    if (response.isSuccess) {
      toast.success('Embaixada excluida com sucesso')
      handleGetEmbassie()
    }
    else
      toast.error('Erro ao excluir Embaixada')
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
            {embassie && embassie.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'string' && column.id !== 'image' ?
                          column.format(value) : column.id == 'image' ?
                            <img id="imagePreviewTable" alt="Image Preview" src={value !== undefined ? value.toString() : ""} height={80} width={80} />
                            : value}
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
        count={embassie !== undefined ? embassie.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Linhas por página"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
      />
    </>
  )
}

export default TableEmbassie
