// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import UserSuspendDialog from 'src/views/apps/user/view/UserSuspendDialog'
import UserSubscriptionDialog from 'src/views/apps/user/view/UserSubscriptionDialog'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { UserDataType } from 'src/context/types'

interface ColorsType {
  [key: string]: ThemeColor
}

const statusColors: ColorsType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 300,
  fontSize: '1rem',
  alignSelf: 'flex-end'
})

const data: UsersType = {
  id: 1,
  role: 'admin',
  status: 'ativo',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: "teste",
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/4.png'
}

const UserViewLeft = () => {
  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openPlans, setOpenPlans] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)
  const [user, setUser] = useState<UserDataType>()

  useEffect(() => {
    const userDataString = window.localStorage.getItem('userData');

    if (userDataString !== null) {
      const userData = JSON.parse(userDataString) as UserDataType;

      console.log(userData.name);
      setUser(userData);
    }
  }, []);


  // Handle Edit dialog
  const handleEditClose = () => setOpenEdit(false)

  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            {user && user.image ? (
              <CustomAvatar
                src={user && user.image}
                variant='rounded'
                alt={user && user.name}
                sx={{ width: 120, height: 120, fontWeight: 600, mb: 4 }}
              />
            ) : (
              <CustomAvatar
                skin='light'
                variant='rounded'
                color={data.avatarColor as ThemeColor}
                sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
              >
                {getInitials(user && user.name)}
              </CustomAvatar>
            )}
            <Typography variant='h6' sx={{ mb: 2 }}>
              {user && user.name}
            </Typography>
          </CardContent>

          <CardContent>
            <Typography variant='h6'>Informações</Typography>
            <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
            <Box sx={{ pt: 2, pb: 1 }}>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                  Status do Plano:
                </Typography>
                <CustomChip
                  skin='light'
                  size='small'
                  label={data.status}
                  color={statusColors[data.status]}
                  sx={{
                    height: 20,
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    borderRadius: '5px',
                    textTransform: 'capitalize'
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', mb: 2.7 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Endereço:</Typography>
                <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                  {user && user.street} - {user && user.number } / { user && user.neighborhood}
                </Typography>
              </Box>
            </Box>
          </CardContent>

          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            {/* <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
              Editar
            </Button> */}
            {/* <Button color='error' variant='outlined' onClick={() => setSuspendDialogOpen(true)}>
              Cancelar
            </Button> */}
          </CardActions>

          <Dialog
            open={openEdit}
            onClose={handleEditClose}
            aria-labelledby='user-view-edit'
            aria-describedby='user-view-edit-description'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
          >
            <DialogTitle
              id='user-view-edit'
              sx={{
                textAlign: 'center',
                fontSize: '1.5rem !important',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              Edit User Information
            </DialogTitle>
            <DialogContent
              sx={{
                pb: theme => `${theme.spacing(8)} !important`,
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
              }}
            >
              <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                Updating user details will receive a privacy audit.
              </DialogContentText>
              <form>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Full Name' defaultValue={data.fullName} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Username'
                      defaultValue={data.username}
                      InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth type='email' label='Billing Email' defaultValue={data.email} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='user-view-status-label'>Status</InputLabel>
                      <Select
                        label='Status'
                        defaultValue={data.status}
                        id='user-view-status'
                        labelId='user-view-status-label'
                      >
                        <MenuItem value='pending'>Pending</MenuItem>
                        <MenuItem value='active'>Active</MenuItem>
                        <MenuItem value='inactive'>Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='TAX ID' defaultValue='Tax-8894' />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label='Contact' defaultValue={`+1 ${data.contact}`} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='user-view-language-label'>Language</InputLabel>
                      <Select
                        label='Language'
                        defaultValue='English'
                        id='user-view-language'
                        labelId='user-view-language-label'
                      >
                        <MenuItem value='English'>English</MenuItem>
                        <MenuItem value='Spanish'>Spanish</MenuItem>
                        <MenuItem value='Portuguese'>Portuguese</MenuItem>
                        <MenuItem value='Russian'>Russian</MenuItem>
                        <MenuItem value='French'>French</MenuItem>
                        <MenuItem value='German'>German</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id='user-view-country-label'>Country</InputLabel>
                      <Select
                        label='Country'
                        defaultValue='USA'
                        id='user-view-country'
                        labelId='user-view-country-label'
                      >
                        <MenuItem value='USA'>USA</MenuItem>
                        <MenuItem value='UK'>UK</MenuItem>
                        <MenuItem value='Spain'>Spain</MenuItem>
                        <MenuItem value='Russia'>Russia</MenuItem>
                        <MenuItem value='France'>France</MenuItem>
                        <MenuItem value='Germany'>Germany</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      label='Use as a billing address?'
                      control={<Switch defaultChecked />}
                      sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                    />
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions
              sx={{
                justifyContent: 'center',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClose}>
                Submit
              </Button>
              <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
          <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card sx={{ boxShadow: 'none', border: theme => `2px solid ${theme.palette.primary.main}` }}>
          <CardContent
            sx={{ display: 'flex', flexWrap: 'wrap', pb: '0 !important', justifyContent: 'space-between' }}
          >
            <CustomChip
              skin='light'
              size='small'
              color='primary'
              label='Free'
              sx={{ fontSize: '0.75rem', borderRadius: '4px' }}
            />
            <Box sx={{ display: 'flex', position: 'relative' }}>
              <Sup>R$</Sup>
              <Typography
                variant='h3'
                sx={{
                  mb: -1.2,
                  lineHeight: 1,
                  color: 'primary.main'
                }}
              >
                0
              </Typography>
              <Sub>/ mês</Sub>
            </Box>
          </CardContent>

          <CardContent>
            <Box sx={{ mt: 4, mb: 5 }}>
              <Box
                sx={{ display: 'flex', mb: 2.5, alignItems: 'center', '& svg': { mr: 2, color: 'text.secondary' } }}
              >
                <Icon icon='mdi:circle' fontSize='0.625rem' />
                <Typography component='span' sx={{ fontSize: '0.875rem' }}>
                Um começo simples para startups e estudantes com Agenda e Mentoria
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: 2.5,
                  display: 'flex',
                  mb: 2.5,
                  alignItems: 'center',
                  '& svg': { mr: 2, color: 'text.secondary' }
                }}
              >
                <Icon icon='mdi:circle' fontSize='0.625rem' />
                <Typography component='span' sx={{ fontSize: '0.875rem' }}>
                  Suporte Básico
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', mb: 1.5, justifyContent: 'space-between' }}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                Dias
              </Typography>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                26 de 30 Dias
              </Typography>
            </Box>
            <LinearProgress value={86.66} variant='determinate' sx={{ height: 8, borderRadius: '5px' }} />
            <Typography variant='caption' sx={{ mt: 1.5, mb: 6 }}>
              4 dias restantes
            </Typography>
            <Button variant='contained' sx={{ width: '100%' }} onClick={handlePlansClickOpen}>
              Alterar Plano
            </Button>
          </CardContent>

          <Dialog
            open={openPlans}
            onClose={handlePlansClose}
            aria-labelledby='user-view-plans'
            aria-describedby='user-view-plans-description'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
          >
            <DialogTitle
              id='user-view-plans'
              sx={{
                textAlign: 'center',
                fontSize: '1.5rem !important',
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              Alterar Plano
            </DialogTitle>

            <DialogContent
              sx={{ px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`] }}
            >
              <DialogContentText variant='body2' sx={{ textAlign: 'center' }} id='user-view-plans-description'>
                Escolha outro plano
              </DialogContentText>
            </DialogContent>

            <DialogContent
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: ['wrap', 'nowrap'],
                pt: theme => `${theme.spacing(2)} !important`,
                pb: theme => `${theme.spacing(8)} !important`,
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
              }}
            >
              <FormControl fullWidth size='small' sx={{ mr: [0, 3], mb: [3, 0] }}>
                <InputLabel id='user-view-plans-select-label'>Choose Plan</InputLabel>
                <Select
                  label='Escolha um plano'
                  defaultValue='gold'
                  id='user-view-plans-select'
                  labelId='user-view-plans-select-label'
                >
                  <MenuItem value='gold'>Gold - R$99/mês</MenuItem>
                </Select>
              </FormControl>
              <Button variant='contained' sx={{ minWidth: ['100%', 0] }}>
                Alterar
              </Button>
            </DialogContent>

            <Divider sx={{ m: '0 !important' }} />

            <DialogContent
              sx={{
                pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(8)} !important`],
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
              }}
            >
              <Typography sx={{ fontWeight: 500, mb: 2, fontSize: '0.875rem' }}>
                O seu plano contratato é 
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: ['wrap', 'nowrap'],
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ mr: 3, display: 'flex', ml: 2.4, position: 'relative' }}>
                  <Sup>R$</Sup>
                  <Typography
                    variant='h3'
                    sx={{
                      mb: -1.2,
                      lineHeight: 1,
                      color: 'primary.main',
                      fontSize: '3rem !important'
                    }}
                  >
                    0
                  </Typography>
                  <Sub>/ mês</Sub>
                </Box>
                <Button
                  color='error'
                  sx={{ mt: 2 }}
                  variant='outlined'
                  onClick={() => setSubscriptionDialogOpen(true)}
                >
                  Cancelar assinatura
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        </Card>
      </Grid>
    </Grid>
  )
}

UserViewLeft.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default UserViewLeft
