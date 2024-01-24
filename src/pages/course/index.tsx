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
import TableCourse from './TableCourse'

import { CourseModel } from 'src/models/course'
import { saveCourse } from 'src/services/course'
import { VisuallyHiddenInput, previewImage, uploadFile } from 'src/utils/fileUploader'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { CategoryModel } from 'src/models/category'
import { getCategory } from 'src/services/category'

let defaultValues = {
  name: "",
  category: "",
  image: "",
  description: "",
  link: ""
}

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  category: yup.string().required("Categoria é obrigatório"),
  image: yup.string().required("Imagem é obrigatório"),
  description: yup.string().required("Descrição é obrigatório"),
  link: yup.string().required("Link é obrigatório")
})

const FormCourse = () => {
  const [course, setCourse] = useState<CourseModel | undefined>()
  const [file, setFile] = useState<File>()
  const previewCurse = document.getElementById('imagePreviewCourse') as HTMLImageElement;
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
  });

  const onSubmit = async (data: any) => {
    const response = await saveCourse(data)
    setCourse(response.data)

    await uploadFile(file)

    if(response.isSuccess){
      toast.success('Curso salvo')
      reset(defaultValues)
      previewCurse.src = ""
      previewCurse.style.display = 'none';
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
          <Grid item xs={12}>
              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload Logo
                <Controller
                  name='image'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { } }) => (
                    <VisuallyHiddenInput type="file" id="uploadInput" onChange={(e) => {
                      const result = previewImage(e, previewCurse)
                      defaultValues = {
                        name: defaultValues.name,
                        category: defaultValues.category,
                        image: result && result?.url !== undefined ? result?.url : "",
                        description: defaultValues.description,
                        link: defaultValues.link
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
              <img id="imagePreviewCourse" alt="Image Preview" style={{ display: "none", maxWidth: "30%" }} />
            </Grid>

            <Grid item xs={12}>
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
                      aria-describedby='validation-schema-first-name'
                    />
                  )}
                />
                {errors.link && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
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
            <CardHeader title='Cupons Cadastradas' />
            <TableCourse event={course}/>
          </Card>
        </Grid>
      </Grid>


    </Card>
  )
}

FormCourse.acl = {
  action: 'read',
  subject: 'admin-page'
}

export default FormCourse
