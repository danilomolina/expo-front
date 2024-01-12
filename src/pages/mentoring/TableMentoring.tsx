// ** React Imports
import { useState, ChangeEvent, useEffect, forwardRef } from 'react'

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
import { MentoringModel } from 'src/models/mentoring'
import { deleteMentoring, getMentoring, updateMentoring } from 'src/services/mentoring'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Edit from 'mdi-material-ui/FileEdit'
import DatePicker from 'react-datepicker'
import { ptBR } from 'date-fns/locale'
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { CategoryModel } from 'src/models/category'
import { getCategory } from 'src/services/category'

interface Column {
  id: 'title' | 'caption' | 'date' | 'hour' | 'category' | 'mentors'
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
  },
  { id: 'category', label: 'Categoria', minWidth: 100, align: 'left' },
  { id: 'mentors', label: 'Mentores', minWidth: 100, align: 'left' },
]

interface TableMentoringParams {
  event: MentoringModel | undefined
}

interface CustomInputProps {
  value: DateType
  label: string
  error: boolean
  onChange: (event: ChangeEvent) => void
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

let defaultValues = {
  id: "",
  title: "",
  caption: "",
  date: new Date(),
  hour: "08:00",
  local: "",
  observation: "",
  link: "",
  category: "",
  mentors: ""
}

const schema = yup.object().shape({
  title: yup.string().required("Título é obrigatório"),
  caption: yup.string().required("Sub Título é obrigatório"),
  date: yup.string().required("Data é obrigatório"),
  hour: yup.string().required("Hora é obrigatório"),
  observation: yup.string().required("Observação é obrigatório"),
  link: yup.string().required("Link é obrigatório"),
  category: yup.string().required("Categoria é obrigatório"),
  mentors: yup.string().required("Mentores é obrigatório"),
})

const TableMentoring = (props: TableMentoringParams) => {
  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [mentorings, setMentorings] = useState<MentoringModel[]>()
  const [categories, setCategories] = useState<CategoryModel[]>()


  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const handleEditClose = () => {
    setOpenEdit(false)
  }
  useEffect(() => {
    handleGetCategories()
  }, [])

  const handleGetCategories = async () => {
    const response = await getCategory(0, 100, 0, undefined, true)
    setCategories(response.data)
  }

  // ** Hook
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const newDate = new Date(data.date);
    data.date = newDate.toISOString();

    const response = await updateMentoring(data)

    if (response.isSuccess) {
      toast.success('Mentoria salva')
      handleEditClose()
      handleGetMentorings()
    }
    else
      toast.error('Erro ao editar Mentoria')
  }

  useEffect(() => {
    handleGetMentorings()
  }, [props.event])

  const handleGetMentorings = async () => {
    const response = await getMentoring(0, 100, 0)
    setMentorings(response.data)
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
      handleGetMentorings()
    }
    else
      toast.error('Erro ao excluir Mentoria')
  }

  const handleOnClickEdit = async (id: string) => {
    const response = await getMentoring(0, 100, 0, id)
    setOpenEdit(true)

    defaultValues = {
      id: response.data[0] && response.data[0].id !== undefined ? response.data[0].id : "",
      title: response.data[0] && response.data[0].title,
      caption: response.data[0] && response.data[0].caption,
      date: response.data[0] && new Date(response.data[0].date),
      hour: response.data[0] && response.data[0].hour.toString(),
      local: response.data[0] && response.data[0].local,
      observation: response.data[0] && response.data[0].observation,
      link: response.data[0] && response.data[0].link,
      category: response.data[0] && response.data[0].category,
      mentors: response.data[0] && response.data[0].mentors
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
            {mentorings && mentorings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
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
        count={mentorings !== undefined ? mentorings.length : 0}
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
          Editar informações do Evento
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
                    name='caption'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Sub Título'
                        onChange={onChange}
                        error={Boolean(errors.caption)}
                        aria-describedby='validation-schema-last-name'
                      />
                    )}
                  />
                  {errors.caption && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-last-name'>
                      {errors.caption.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Controller
                    name='date'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        selected={value}
                        showYearDropdown
                        showMonthDropdown
                        onChange={e => onChange(e)}
                        dateFormat="P"
                        locale={ptBR}
                        customInput={
                          <CustomInput
                            value={new Date(value)}
                            onChange={onChange}
                            error={Boolean(errors.date)}
                            aria-describedby='validation-basic-dob'
                            label='Data'
                          />
                        }
                      />
                    )}
                  />
                  {errors.date && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-email'>
                      {errors.date.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>


              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Controller
                    name='hour'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Hora'
                        onChange={onChange}
                        error={Boolean(errors.hour)}
                        aria-describedby='validation-schema-last-name'
                      />
                    )}
                  />
                  {errors.hour && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-last-name'>
                      {errors.hour.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='observation'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Observação'
                        onChange={onChange}
                        error={Boolean(errors.observation)}
                        aria-describedby='validation-schema-last-name'
                      />
                    )}
                  />
                  {errors.observation && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-last-name'>
                      {errors.observation.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6}>
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

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="active">Categoria</InputLabel>
                  <Controller
                    name='category'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        name="category"
                        label="Categoria"
                        onChange={onChange}
                      >
                        {categories && categories.map((category, index) => (
                          <MenuItem value={category.name} key={index}>{category.name}</MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-last-name'>
                      {errors.category.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Controller
                    name='mentors'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Mentores'
                        onChange={onChange}
                        error={Boolean(errors.mentors)}
                        aria-describedby='validation-schema-last-name'
                      />
                    )}
                  />
                  {errors.mentors && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-last-name'>
                      {errors.mentors.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button size='large' type='submit' variant='contained'>
                  Salvar
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

    </>
  )
}

export default TableMentoring
