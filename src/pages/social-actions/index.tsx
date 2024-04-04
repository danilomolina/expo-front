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
import TableSocialActions from './TableSocialActions'

import { VisuallyHiddenInput, previewImage, uploadFile } from 'src/utils/fileUploader'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { SocialActionModel } from 'src/models/socialAction'
import { saveSocialAction } from 'src/services/socialActions'

let defaultValues = {
  title: "",
  subTitle: "",
  link: "",
  photo: ""
}

const schema = yup.object().shape({
  photo: yup.string().required("Foto é obrigatório"),
  title: yup.string().required("Título é obrigatório"),
  subTitle: yup.string().required("Sub Título é obrigatório"),
  link: yup.string().required("Data é obrigatório")
})

const FormSocialAction = () => {
  const [socialAction, setSocialAction] = useState<SocialActionModel | undefined>()
  const previewSocialAction = document.getElementById('imagePreviewSocialAction') as HTMLImageElement;
  const [file, setFile] = useState<File>()

  // ** Hook
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {

    const response = await saveSocialAction(data)
    setSocialAction(response.data)

    await uploadFile(file)

    if (response.isSuccess) {
      toast.success('Ação Social salva')
      reset(defaultValues)
      previewSocialAction.src = ""
      previewSocialAction.style.display = 'none';
    }
    else
      toast.error('Erro ao criar Ação Social')
  }

  return (
    <Card>
      <CardHeader title='Ação Social' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload Imagem
                <Controller
                  name='photo'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { } }) => (
                    <VisuallyHiddenInput type="file" id="uploadInput" onChange={(e) => {
                      const result = previewImage(e, previewSocialAction)
                      defaultValues = {
                        title: defaultValues.title,
                        subTitle: defaultValues.subTitle,
                        link: defaultValues.link,
                        photo: result && result.url !== undefined ? result.url : ""
                      }
                      reset(defaultValues)
                      setFile(result?.selectedFile)
                    }} />
                  )}
                />
              </Button>
              {errors.photo && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                  {errors.photo.message}
                </FormHelperText>
              )}
              <img id="imagePreviewSocialAction" alt="Image Preview" style={{ display: "none", maxWidth: "30%" }} />
            </Grid>

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


            <Grid item xs={3}>
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
            <CardHeader title='Ações Sociais Cadastradas' />
            <TableSocialActions socialAction={socialAction} />
          </Card>
        </Grid>
      </Grid>


    </Card>
  )
}

FormSocialAction.acl = {
  action: 'read',
  subject: 'admin-page'
}

export default FormSocialAction
