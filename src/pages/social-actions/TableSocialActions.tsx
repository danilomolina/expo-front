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
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Grid, TextField } from '@mui/material'

import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SocialActionModel } from 'src/models/socialAction'
import { deleteSocialAction, getSocialAction, updateSocialAction } from 'src/services/socialActions'

interface Column {
  id: 'title' | 'subTitle' | 'link' | 'photo'
  label: string
  minWidth?: number
  align?: 'right' | 'left'
  format?: (value: string) => string
}

const columns: readonly Column[] = [
  {
    id: 'photo',
    label: 'Imagem',
    minWidth: 20,
    align: 'left',
  },
  { id: 'title', label: 'Título', minWidth: 170 },
  { id: 'subTitle', label: 'Sub Título', minWidth: 100, align: 'left' },
  { id: 'link', label: 'Link', minWidth: 100, align: 'left' },
]

interface TableSocialActionsParams {
  socialAction: SocialActionModel | undefined
}

const schema = yup.object().shape({
  photo: yup.string().required("Foto é obrigatório"),
  title: yup.string().required("Título é obrigatório"),
  subTitle: yup.string().required("Sub Título é obrigatório"),
  link: yup.string().required("Data é obrigatório")
})

let defaultValues = {
  id: "",
  title: "",
  subTitle: "",
  link: "",
  photo: ""
}

const TableSocialActions = (props: TableSocialActionsParams) => {
  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [socialActions, setSocialActions] = useState<SocialActionModel[]>()

  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const handleEditClose = () => {
    setOpenEdit(false)
  }

  // ** Hook
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const response = await updateSocialAction(data)

    if (response.isSuccess) {
      toast.success('Ação Social salva')
      handleEditClose()
      handleGetSocialActions()
    }
    else
      toast.error('Erro ao editar Ação Social')
  }

  useEffect(() => {
    handleGetSocialActions()
  }, [props.socialAction])

  const handleGetSocialActions = async () => {
    const response = await getSocialAction(0, 100, 0)
    setSocialActions(response.data)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleOnClickDelete = async (id: string) => {
    const response = await deleteSocialAction(id)

    if (response.isSuccess) {
      toast.success('Ação Social excluido com sucesso')
      handleGetSocialActions()
    }
    else
      toast.error('Erro ao excluir Ação Social')
  }

  const handleOnClickEdit = async (id: string) => {
    const response = await getSocialAction(0, 100, 0, undefined, undefined, id)
    setOpenEdit(true)

    defaultValues = {
      id: response.data[0] && response.data[0].id !== undefined ? response.data[0].id : "",
      title: response.data[0] && response.data[0].title,
      subTitle: response.data[0] && response.data[0].subTitle,
      link: response.data[0] && response.data[0].link,
      photo: response.data[0] && response.data[0].photo
    }

    reset(defaultValues);
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
            {socialActions && socialActions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'string' && column.id !== 'photo' ?
                          column.format(value) : column.id == 'photo' ?
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
        count={socialActions !== undefined ? socialActions.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Linhas por página"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
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
          Editar informações da Ação Social
        </DialogTitle>
        <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>

        </DialogContentText>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Título'
                        onChange={onChange}
                        error={Boolean(errors.title)}
                        aria-describedby='validation-schema-first-name'
                      />
                    )}
                  />
                  {errors.title && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                      {errors.title.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Controller
                    name='subTitle'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Sub Título'
                        onChange={onChange}
                        error={Boolean(errors.subTitle)}
                        aria-describedby='validation-schema-last-name'
                      />
                    )}
                  />
                  {errors.subTitle && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-last-name'>
                      {errors.subTitle.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='link'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Link'
                        onChange={onChange}
                        error={Boolean(errors.link)}
                        aria-describedby='validation-schema-last-name'
                      />
                    )}
                  />
                  {errors.link && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-last-name'>
                      {errors.link.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

            </Grid>

            <DialogActions
              sx={{
                justifyContent: 'center',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              <Button variant='contained' sx={{ mr: 2 }} type="submit">
                Alterar
              </Button>
              <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                Cancelar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog >
    </>
  )
}

export default TableSocialActions
