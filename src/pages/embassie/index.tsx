// ** React Imports
import { useEffect, useState } from 'react'

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
import TableCourse from './TableEmbassie'

import { EmbassieModel } from 'src/models/embassie'
import { saveEmbassie } from 'src/services/embassie'
import { VisuallyHiddenInput, previewImage, uploadFile } from 'src/utils/fileUploader'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { getCategory } from 'src/services/category'
import { CategoryModel } from 'src/models/category'

let defaultValues = {
  description: "",
  link: "",
  image: "",
  name: "",
  category: ""
}

const schema = yup.object().shape({
  description: yup.string().required('Descrição é Obrigatório'),
  link: yup.string().required('Link é Obrigatório'),
  image: yup.string().required('Imagem é Obrigatório'),
  name: yup.string().required('Nome é Obrigatório'),
  category: yup.string().required('Categoria é Obrigatório'),
})

const FormEmbassie = () => {
  const [embassie, setEmbassie] = useState<EmbassieModel | undefined>()
  const [file, setFile] = useState<File>()
  const previewEmbassie = document.getElementById('imagePreviewEmbassie') as HTMLImageElement

  const [categories, setCategories] = useState<CategoryModel[]>()

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
  })

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
                      const result = previewImage(e, previewEmbassie)
                      defaultValues = {
                        description: defaultValues.description,
                        link: defaultValues.link,
                        image: result && result.url !== undefined ? result.url : "",
                        name: defaultValues.name,
                        category: defaultValues.category
                      }
                      reset(defaultValues)
                      setFile(result?.selectedFile)
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

            <Grid item xs={5}>
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
