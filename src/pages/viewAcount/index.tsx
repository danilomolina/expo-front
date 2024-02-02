// ** React Imports
import { useContext, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Utils Import
import { UserDataType } from 'src/context/types'

import { VisuallyHiddenInput, previewImage, uploadFile } from 'src/utils/fileUploader'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { getPeople, updatePeople } from 'src/services/people'
import toast from 'react-hot-toast'
import CustomPlan from 'src/@core/components/customPlan'
import { MyAccountContext } from 'src/context/MyAccountContext'

const UserViewLeft = () => {
  // ** States

  const [user, setUser] = useState<UserDataType>()
  const imagePreviewPerfil = document.getElementById('imagePreviewPerfil') as HTMLImageElement
  const [name, setName] = useState<string | undefined>('')
  const [people, setPeople] = useState<UserDataType>()
  const { updateUserPhoto } = useContext(MyAccountContext)

  useEffect(() => {
    handleGetPeople()
  }, [])

  const handleGetPeople = async () => {
    const userDataString = window.localStorage.getItem('userData')
    if (userDataString !== null) {
      const userData = JSON.parse(userDataString) as UserDataType
      const response = await getPeople(0, 100, 0, userData?.id)
      setPeople(response.data[0])
    }
  }

  useEffect(() => {
    const userDataString = window.localStorage.getItem('userData')

    if (userDataString !== null) {
      const userData = JSON.parse(userDataString) as UserDataType

      setUser(userData);
      setName(userData.name)
    }
  }, []);


  const handleEdit = async (url?: string, fileSelected?: File | undefined) => {

    await uploadFile(fileSelected)

    if (people) {
      if (url)
        people.image = url

      people.name = name
      await updatePeople(people)
      window.localStorage.setItem('userData', JSON.stringify(people))
      updateUserPhoto(url);
      
      toast.success('Dados salvo com sucesso')
    }

  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <>

                  <img
                    id="imagePreviewPerfil"
                    src={people && people.image ? people.image : '/images/avatars/1.png'}
                    alt="Perfil"
                    style={{ width: 60, height: 60, borderRadius: "50%" }}
                  />
                  <br />

              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Carregar Foto
                <VisuallyHiddenInput type="file" id="uploadInput" onChange={(e) => {
                  const result = previewImage(e, imagePreviewPerfil)
                  handleEdit(result?.url, result?.selectedFile)
                }} />
              </Button>
            </>
          </CardContent>
          <CardContent>
            <Typography variant='h6'>Dados</Typography>
            <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
            <Box sx={{ pt: 2, pb: 1 }}>
              <Box sx={{ display: 'flex', mb: 2.7, width: 600 }}>
                <Grid item xs={12}>
                  <TextField
                    value={name}
                    label='Nome'
                    onChange={(e) => setName(e.target.value)}
                    aria-describedby='validation-schema-first-name'
                  />
                </Grid>
              </Box>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
              </Box>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Endereço:</Typography>
                <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                  {user && user.street} - {user && user.number} / {user && user.neighborhood}
                </Typography>
              </Box>
            </Box>
          </CardContent>

          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' sx={{ mr: 2 }} onClick={() => handleEdit()}>
              Salvar Alterações
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <CustomPlan />
    </Grid>
  )
}

UserViewLeft.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default UserViewLeft
