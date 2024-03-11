// ** React Imports
import { Button, Card, CardContent, CardHeader, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Fragment } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { awsSes } from 'src/configs/aws-exports'

const defaultValues = {
  name: "",
  company: "",
  phone: "",
  category: "",
  message: ""
}

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  company: yup.string().required("Empresa é obrigatório"),
  phone: yup.string().required("Telefone é obrigatório"),
  category: yup.string().required("Categoria é obrigatório"),
  message: yup.string().required("Mensagem é obrigatório")
})

const FAQ = () => {
  // ** Hook
  const { handleSubmit, formState: { errors }, reset, control } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const userEmailData = window.localStorage.getItem('email')
    const htmlBody = `
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Contato pelo aplicativo x-ecomm</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                    }
                    h1 {
                        color: #333;
                    }
                    p {
                        margin-bottom: 10px;
                    }
                    strong {
                        color: #666;
                    }
                </style>
            </head>
            <body>
                <h1>Contato pelo aplicativo x-ecomm</h1>
                <p>Prezado(a),</p>
                <p>Você recebeu uma nova mensagem de contato através do aplicativo x-ecomm.</p>
                <p><strong>Nome:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${userEmailData}</p>
                <p><strong>Telefone:</strong> ${data.phone}</p>
                <p><strong>Empresa:</strong> ${data.company}</p>
                <p><strong>Categoria:</strong> ${data.category}</p>
                <p><strong>Mensagem:</strong></p>
                <p>${data.message}</p>
                <hr>
                <p>Esta mensagem foi enviada através do aplicativo x-ecomm.</p>
                <p>Atenciosamente,<br>Equipe de Suporte</p>
                <p><img src="https://expoecomm.s3.sa-east-1.amazonaws.com/logo2.png" alt="Logo da Empresa" width="150"></p>
            </body>
            </html>
                `

    const params = {
      Destination: {
        ToAddresses: ['falecom@expoecomm.com.br'] // Altere para o endereço de email do destinatário
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: htmlBody
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Email suporte app x-ecomm'
        }
      },
      Source: 'falecom@expoecomm.com.br' // Altere para o endereço de email remetente verificado no SES
    };

    awsSes.sendEmail(params, (err: any) => {
      if (err) {
        toast.error('Error:', err);
      } else {
        toast.success('Mensagem enviada com sucesso')
        reset(defaultValues)
      }
    });


  }

  return (
    <Fragment>
      <Card>
        <CardHeader title='Olá, precisa de ajuda?' />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Controller
                    name='name'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Seu nome'
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

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Controller
                    name='company'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Empresa'
                        onChange={onChange}
                        error={Boolean(errors.company)}
                        aria-describedby='validation-schema-first-name'
                      />
                    )}
                  />
                  {errors.company && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                      {errors.company.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Controller
                    name='phone'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Seu Telefone'
                        onChange={onChange}
                        error={Boolean(errors.phone)}
                        aria-describedby='validation-schema-first-name'
                      />
                    )}
                  />
                  {errors.phone && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                      {errors.phone.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={5}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="active">Como podemos ajudar?</InputLabel>
                  <Controller
                    name='category'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        name="category"
                        label="Como podemos ajudar?"
                        onChange={onChange}
                      >
                        <MenuItem value="Solicitar selo de membro">Solicitar selo de membro</MenuItem>
                        <MenuItem value="Solicitar ingresso ExpoEcomm">Solicitar ingresso ExpoEcomm</MenuItem>
                        <MenuItem value="Dúvidas Gerais">Dúvidas Gerais</MenuItem>
                        <MenuItem value="Outros">Outros</MenuItem>
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

              <Grid item xs={12} md={12}>
                <FormControl fullWidth>
                  <Controller
                    name='message'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Mensagem'
                        onChange={onChange}
                        error={Boolean(errors.message)}
                        aria-describedby='validation-schema-first-name'
                        type=''
                      />
                    )}
                  />
                  {errors.message && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                      {errors.message.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={12}>
                <Button size='large' type='submit' variant='contained'>
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Fragment >
  )
}

FAQ.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default FAQ
