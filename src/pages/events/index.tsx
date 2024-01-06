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
import TableEvents from './TableEvents'

import ptBR from 'date-fns/locale/pt-BR';
import { EventModel } from 'src/models/event'
import { saveEvent } from 'src/services/event'

const defaultValues = {
  title: "",
  caption: "",
  date: new Date(),
  hour: "08:00",
  local: "",
  observation: "",
  link: ""
}

const schema = yup.object().shape({
  title: yup.string().required(),
  caption: yup.string().required(),
  date: yup.string().required(),
  hour: yup.string().required(),
  local: yup.string().required(),
  observation: yup.string(),
  link: yup.string().required()
})

interface CustomInputProps {
  value: DateType
  label: string
  error: boolean
  onChange: (event: ChangeEvent) => void
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const FormEvent = () => {
  const [event, setEvent] = useState<EventModel | undefined>()

  // ** Hook
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const newDate = new Date(data.date);
    data.date = newDate.toISOString();

    const response = await saveEvent(data)
    setEvent(response.data)

    if(response.isSuccess){
      toast.success('Evento salvo')
    }
    else
      toast.error('Erro ao criar Evento')
  }

  return (
    <Card>
      <CardHeader title='Eventos' />
      <CardContent>
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

            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name='local'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Local'
                      onChange={onChange}
                      error={Boolean(errors.local)}
                      aria-describedby='validation-schema-last-name'
                    />
                  )}
                />
                {errors.local && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-last-name'>
                    {errors.local.message}
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
            <CardHeader title='Eventos Cadastrados' />
            <TableEvents event={event}/>
          </Card>
        </Grid>
      </Grid>


    </Card>
  )
}

FormEvent.acl = {
  action: 'read',
  subject: 'admin-page'
}

export default FormEvent
