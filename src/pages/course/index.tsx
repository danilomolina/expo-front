// ** React Imports
import { ChangeEvent, forwardRef, useState } from 'react'

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

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { CardHeader } from '@mui/material'
import TableCourse from './TableCourse'

import ptBR from 'date-fns/locale/pt-BR';
import { MentoringModel } from 'src/models/mentoring'
import { saveEvent } from 'src/services/event'
import { saveMentoring } from 'src/services/mentoring'
import { CouponModel } from 'src/models/coupon'
import { saveCoupon } from 'src/services/coupon'
import { CourseModel } from 'src/models/course'
import { saveCourse } from 'src/services/course'

const defaultValues = {
  name: "",
  category: "",
  image: ""
}

const schema = yup.object().shape({
  name: yup.string().required(),
  category: yup.string().required(),
  image: yup.string().required()
})

const FormCourse = () => {
  const [course, setCourse] = useState<CourseModel | undefined>()

  // ** Hook
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const response = await saveCourse(data)
    setCourse(response.data)

    if(response.isSuccess){
      toast.success('Curso salvo')
    }
    else
      toast.error('Erro ao criar Curso')
  }

  return (
    <Card>
      <CardHeader title='Cursos' />
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
                <Controller
                  name='category'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Categoria'
                      onChange={onChange}
                      error={Boolean(errors.category)}
                      aria-describedby='validation-schema-last-name'
                    />
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
                  name='image'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Imagem'
                      onChange={onChange}
                      error={Boolean(errors.image)}
                      aria-describedby='validation-schema-last-name'
                    />
                  )}
                />
                {errors.image && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-last-name'>
                    {errors.image.message}
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
            <CardHeader title='Cupons Cadastradas' />
            <TableCourse event={course}/>
          </Card>
        </Grid>
      </Grid>


    </Card>
  )
}

export default FormCourse
