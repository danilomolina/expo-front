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
import { CardHeader } from '@mui/material'
import TableEvents from './TableCoupon'

import { CouponModel } from 'src/models/coupon'
import { saveCoupon } from 'src/services/coupon'

const defaultValues = {
  soon: "",
  discount: 0,
  link: ""
}

const schema = yup.object().shape({
  soon: yup.string().required(),
  discount: yup.number().required(),
  link: yup.string().required()
})

const FormCoupon = () => {
  const [coupon, setCoupon] = useState<CouponModel | undefined>()

  // ** Hook
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const response = await saveCoupon(data)
    setCoupon(response.data)

    if(response.isSuccess){
      toast.success('Cupom salvo')
    }
    else
      toast.error('Erro ao criar Cupom')
  }

  return (
    <Card>
      <CardHeader title='Cupons' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name='soon'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Logo'
                      onChange={onChange}
                      error={Boolean(errors.soon)}
                      aria-describedby='validation-schema-first-name'
                    />
                  )}
                />
                {errors.soon && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                    {errors.soon.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name='discount'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Desconto'
                      onChange={onChange}
                      error={Boolean(errors.discount)}
                      aria-describedby='validation-schema-last-name'
                    />
                  )}
                />
                {errors.discount && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-last-name'>
                    {errors.discount.message}
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
            <CardHeader title='Cupons Cadastradas' />
            <TableEvents event={coupon}/>
          </Card>
        </Grid>
      </Grid>


    </Card>
  )
}

export default FormCoupon
