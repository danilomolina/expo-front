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
import TableCourse from './TableEmbassie'

import { EmbassieModel } from 'src/models/embassie'
import { saveEmbassie } from 'src/services/embassie'
import { VisuallyHiddenInput, previewImage, uploadFile } from 'src/utils/fileUploader'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'

let defaultValues = {
  description: "",
  link: "",
  image: ""
}

const schema = yup.object().shape({
  description: yup.string().required(),
  link: yup.string().required(),
  image: yup.string().required()
})

const FormEmbassie = () => {
  const [embassie, setEmbassie] = useState<EmbassieModel | undefined>()
  const [file, setFile] = useState<File>()
  const previewEmbassie = document.getElementById('imagePreviewEmbassie') as HTMLImageElement;

  // ** Hook
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const response = await saveEmbassie(data)
    setEmbassie(response.data)

    await uploadFile(file)

    if(response.isSuccess){
      toast.success('Embaixada salvo')
      reset(defaultValues)
      previewEmbassie.src = ""
      previewEmbassie.style.display = 'none';
    }
    else
      toast.error('Erro ao criar Embaixada')
  }

  return (
    <Card>
      <CardHeader title='Embaixada' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
          <Grid item xs={12}>
              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload Logo
                <Controller
                  name='image'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { } }) => (
                    <VisuallyHiddenInput type="file" id="uploadInput" onChange={(e) => {
                      const src = previewImage(e, setFile, previewEmbassie)
                      defaultValues = {
                        description: defaultValues.description,
                        link: defaultValues.link,
                        image: src !== undefined ? src : ""
                      }
                      reset(defaultValues)
                    }} />
                  )}
                />
              </Button>
              {errors.image && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                  {errors.image.message}
                </FormHelperText>
              )}
              <img id="imagePreviewEmbassie" alt="Image Preview" style={{ display: "none", maxWidth: "30%" }} />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name='description'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Descrição'
                      onChange={onChange}
                      error={Boolean(errors.description)}
                      aria-describedby='validation-schema-first-name'
                    />
                  )}
                />
                {errors.description && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                    {errors.description.message}
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
            <CardHeader title='Embaixadas Cadastradas' />
            <TableCourse event={embassie}/>
          </Card>
        </Grid>
      </Grid>


    </Card>
  )
}

FormEmbassie.acl = {
  action: 'read',
  subject: 'admin-page'
}

export default FormEmbassie
