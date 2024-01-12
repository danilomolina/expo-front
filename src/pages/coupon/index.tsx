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
import { CardHeader, InputLabel, MenuItem, Select, styled } from '@mui/material'
import TableEvents from './TableCoupon'

import { CouponModel } from 'src/models/coupon'
import { saveCoupon } from 'src/services/coupon'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { CategoryModel } from 'src/models/category'
import { getCategory } from 'src/services/category'
import { s3 } from 'src/configs/aws-exports'

let defaultValues = {
  soon: "",
  discount: "",
  link: "",
  category: ""
}

const schema = yup.object().shape({
  soon: yup.string().required("Logo é obrigatório"),
  discount: yup.string().required("Desconto é obrigatório"),
  link: yup.string().required("Link é obrigatório"),
  category: yup.string().required("Categoria é obrigatório")
})

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FormCoupon = () => {
  const [coupon, setCoupon] = useState<CouponModel | undefined>()
  const [categories, setCategories] = useState<CategoryModel[]>()
  const [file, setFile] = useState<File>()
  const preview = document.getElementById('imagePreview') as HTMLImageElement;

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
    data.discount = parseFloat(data.discount.replace(",","."))
    const response = await saveCoupon(data)
    setCoupon(response.data)

    await uploadFile()

    if (response.isSuccess) {
      toast.success('Cupom salvo')
      reset(defaultValues)
      preview.src = ""
      preview.style.display = 'none';
    }
    else
      toast.error('Erro ao criar Cupom')
  }

  const uploadFile = async () => {
    const nameFile = file === undefined ? 'arquivo_inexistente' : file.name

    if (nameFile !== 'arquivo_inexistente') {
      const attachment = `https://expoecomm.s3.sa-east-1.amazonaws.com/${nameFile}`

      const params = {
        Bucket: 'expoecomm',
        Key: nameFile,
        Body: file
      }

      s3.putObject(params, async function (err, data) {
        if (err) {
          if (err.code === 'NoSuchBucket') {
            console.log('O bucket não existe. Verifique o nome do bucket.')
          } else {
            console.error('Erro durante o upload do arquivo:', err)
          }
        } else {
          console.log(`File uploaded successfully.`, data)
        }
      })

      return attachment
    } else return undefined
  }

  const previewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      const selectedFile = input.files && input.files.length > 0 ? input.files[0] : undefined
      setFile(selectedFile)

      defaultValues = {
        soon: `https://expoecomm.s3.sa-east-1.amazonaws.com/${input.files[0].name}`,
        discount: defaultValues.discount,
        link: defaultValues.link,
        category: defaultValues.category
      }

      reset(defaultValues)

      reader.onload = function (e) {
        if (e.target && e.target.result) {
          preview.src = e.target.result.toString();
          preview.style.display = 'block';
        }
      };

      reader.readAsDataURL(file);
    }
  }

  return (
    <Card>
      <CardHeader title='Cupons' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload Logo
                <Controller
                  name='soon'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { } }) => (
                    <VisuallyHiddenInput type="file" id="uploadInput" onChange={previewImage} />
                  )}
                />
              </Button>
              {errors.soon && (
                <FormHelperText sx={{ color: 'error.main' }} id='validation-schema-first-name'>
                  {errors.soon.message}
                </FormHelperText>
              )}
              <img id="imagePreview" alt="Image Preview" style={{ display: "none", maxWidth: "30%" }} />
            </Grid>

            <Grid item xs={3}>
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


            <Grid item xs={4}>
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
            <CardHeader title='Cupons Cadastradas' />
            <TableEvents event={coupon} />
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
