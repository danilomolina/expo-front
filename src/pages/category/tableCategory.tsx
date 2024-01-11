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
import Edit from 'mdi-material-ui/FileEdit'
import toast from 'react-hot-toast'
import { CategoryModel } from 'src/models/category'
import { deleteCategory, getCategory, updateCategory } from 'src/services/category'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'

interface Column {
  id: 'name' | 'active'
  label: string
  minWidth?: number
  align?: 'right' | 'left'
  format?: (value: string) => string
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Nome', minWidth: 170 },
  { id: 'active', label: 'Ativo', minWidth: 100, align: 'left' }
]

interface TableCategoryParams {
  event: CategoryModel | undefined
}

const TableCategory = (props: TableCategoryParams) => {
  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [categories, setCategories] = useState<CategoryModel[]>()
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const handleEditClose = () => {
    setCategoryActive(undefined)
    setCategoryName(undefined)
    setOpenEdit(false)
  }
  const [category, setCategory] = useState<CategoryModel>()

  const [categoryName, setCategoryName] = useState<string | undefined>()
  const [categoryActive, setCategoryActive] = useState<boolean | undefined>()

  useEffect(() => {
    handleGetCategories()
  }, [props.event])

  const handleGetCategories = async () => {
    const response = await getCategory(0, 100, 0)
    setCategories(response.data)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleOnClickDelete = async (id: string) => {
    const response = await deleteCategory(id)

    if (response.isSuccess) {
      toast.success('Categoria excluida com sucesso')
      handleGetCategories()
    }
    else
      toast.error('Erro ao excluir Categoria')
  }

  const handleOnClickEdit = async (id: string) => {
    const response = await getCategory(0, 100, 0, id)
    setOpenEdit(true)
    setCategory(response.data[0])
  }

  const handleEdit = async () => {
    console.log("categoryActive", categoryActive)
    const id = category !== undefined ? category.id : ""
    const newCategory: CategoryModel = {
      id: id,
      name: categoryName !== undefined ? categoryName : category !== undefined ? category.name : "",
      active: categoryActive !== undefined ? categoryActive : category !== undefined ? category?.active : false
    }

    const response = await updateCategory(newCategory)
    if (response.isSuccess) {
      toast.success('Categoria alterada com sucesso')
      handleGetCategories()
      handleEditClose()
      setCategoryActive(undefined)
      setCategoryName(undefined)
    }
    else
      toast.error('Erro ao alterar Categoria')
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
              <TableCell>
                Editar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories && categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id]

                    const newValue = typeof value === 'boolean' ? value ? "Sim" : "Não" : value

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof newValue === 'string' ? column.format(newValue) : newValue}
                      </TableCell>
                    )
                  })}
                  <TableCell>
                    <div onClick={() => handleOnClickDelete(row.id !== undefined ? row.id : "")} style={{ cursor: 'pointer' }}>
                      <Delete />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div onClick={() => handleOnClickEdit(row.id !== undefined ? row.id : "")} style={{ cursor: 'pointer' }}>
                      <Edit />
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[1, 10, 25, 100]}
        component='div'
        count={categories !== undefined ? categories.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* dialogo de edicao */}
      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby='user-view-edit'
        aria-describedby='user-view-edit-description'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
      >
        <DialogTitle
          id='user-view-edit'
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          Editar informações da Categoria
        </DialogTitle>
        <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>

        </DialogContentText>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <form>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={8}>
                <TextField fullWidth label='Nome' defaultValue={category?.name} onChange={(e) => setCategoryName(e.target.value)} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel id='user-view-status-label'>Ativo</InputLabel>
                  <Select
                    label='Ativo'
                    defaultValue={category?.active}
                    id='user-view-status'
                    labelId='user-view-status-label'
                    onChange={(e) => {
                      if (e.target.value === 'false')
                        setCategoryActive(false)
                      else
                        setCategoryActive(true)
                    }}
                  >
                    <MenuItem value='true'>Sim</MenuItem>
                    <MenuItem value='false'>Não</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

            </Grid>
          </form>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} onClick={handleEdit}>
            Alterar
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleEditClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TableCategory
