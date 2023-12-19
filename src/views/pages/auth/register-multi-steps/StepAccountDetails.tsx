// ** React Imports
import { Dispatch, SetStateAction, useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { User } from '.'

interface State {
  showPassword: boolean
  showConfirmPassword: boolean
}

interface StepAccountDetailsParams {
  handleNext : () => void,
  user: User,
  setUser: Dispatch<SetStateAction<User>>
}

const StepAccountDetails = (props: StepAccountDetailsParams) => {
  // ** States
  const [values, setValues] = useState<State>({
    showPassword: false,
    showConfirmPassword: false
  })



  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword })
  }

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5'>Informações da conta</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Insira os detalhes da sua conta</Typography>
      </Box>

      <Grid container spacing={5}>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <TextField
              type='email'
              label='Email'
              onChange={(e) => props.setUser({ ...props.user, email: e.target.value })}
              value={props.user.email}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor='input-password'>Senha</InputLabel>
            <OutlinedInput
              label='Senha'
              id='input-password'
              type={values.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                    <Icon icon={values.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                  </IconButton>
                </InputAdornment>
              }
              onChange={(e) => props.setUser({ ...props.user, password: e.target.value })}
              value={props.user.password}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor='input-confirm-password'>Confirme a Senha</InputLabel>
            <OutlinedInput
              label='Confirm Password'
              id='input-confirm-password'
              type={values.showConfirmPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton edge='end' onMouseDown={e => e.preventDefault()} onClick={handleClickShowConfirmPassword}>
                    <Icon icon={values.showConfirmPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button disabled variant='contained' startIcon={<Icon icon='mdi:chevron-left' fontSize={20} />}>
              Anterior
            </Button>
            <Button variant='contained' onClick={props.handleNext} endIcon={<Icon icon='mdi:chevron-right' fontSize={20} />}>
              Próximo
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default StepAccountDetails
