// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import "react-datepicker/dist/react-datepicker.css"
import { CardHeader, InputLabel, MenuItem, Select } from '@mui/material'

import TableCategory from './tableCategory'
import { CategoryModel } from 'src/models/category'
import { saveCategory } from 'src/services/category'

const defaultValues = {
  name: "",
  active: true,
  group: ""
}

const schema = yup.object().shape({
  name: yup.string().required("Campo nome é obrigatório"),
  active: yup.bool().required("Campo ativo é obrigatório"),
  group: yup.string().required("Campo grupo é obrigatório"),
})

const FormCoupon = () => {
  const [category, setCategory] = useState<CategoryModel | undefined>()

  // ** Hook
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const response = await saveCategory(data)
    setCategory(response.data)

    if (response.isSuccess) {
      toast.success('Categoria salva')
      reset(defaultValues)
    }
    else
      toast.error('Erro ao criar Categoria')
  }

  return (
    <Card>
      <CardHeader title='Categorias' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Nome'
                      onChange={onChange}
                      error={Boolean(errors.name)}
                      aria-describedby='validation-schema-first-name'
                    />
                  )}
                />
                {errors.name && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                    {errors.name.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>

                <InputLabel htmlFor="active">Ativo</InputLabel>
                <Controller
                  name='active'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                    value={value}
                      name="active"
                      label="Ativo"
                      onChange={onChange}
                    >
                      <MenuItem value="true">Sim</MenuItem>
                      <MenuItem value="false">Não</MenuItem>
                    </Select>
                  )}
                />
                {errors.active && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-last-name'>
                    {errors.active.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>

                <InputLabel htmlFor="active">Grupo</InputLabel>
                <Controller
                  name='group'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                    value={value}
                      name="group"
                      label="Grupo"
                      onChange={onChange}
                    >
                      <MenuItem value="Agenda">Agenda</MenuItem>
                      <MenuItem value="Mentorias">Mentorias</MenuItem>
                      <MenuItem value="Cupons">Cupons</MenuItem>
                      <MenuItem value="Cursos">Cursos</MenuItem>
                      <MenuItem value="Embaixadas">Embaixadas</MenuItem>
                    </Select>
                  )}
                />
                {errors.group && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-last-name'>
                    {errors.group.message}
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
      </CardContent>

      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Categorias Cadastradas' />
            <TableCategory event={category} />
          </Card>
        </Grid>
      </Grid>


    </Card>
  )
}

FormCoupon.acl = {
  action: 'read',
  subject: 'admin-page'
}

export default FormCoupon
