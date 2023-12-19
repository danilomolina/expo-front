// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Dispatch, SetStateAction } from 'react'
import { UserDataType } from 'src/context/types'

interface StepPersonalDetailsParams {
  handleNext: () => void,
  handlePrev: () => void,
  people: UserDataType,
  setPeople: Dispatch<SetStateAction<UserDataType>>
}

const StepPersonalDetails = (props: StepPersonalDetailsParams) => {
  const states = [
    'Acre',
    'Alagoas',
    'Amapá',
    'Amazonas',
    'Bahia',
    'Ceará',
    'Distrito Federal',
    'Espírito Santo',
    'Goiás',
    'Maranhão',
    'Mato Grosso',
    'Mato Grosso do Sul',
    'Minas Gerais',
    'Pará',
    'Paraíba',
    'Paraná',
    'Pernambuco',
    'Piauí',
    'Rio de Janeiro',
    'Rio Grande do Norte',
    'Rio Grande do Sul',
    'Rondônia',
    'Roraima',
    'Santa Catarina',
    'São Paulo',
    'Sergipe',
    'Tocantins',
  ];

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5'>Informações Pessoais</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Insira suas informações pessoais</Typography>
      </Box>

      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Nome'
            onChange={(e) => props.setPeople({ ...props.people, name: e.target.value })}
            value={props.people.name}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField 
          fullWidth 
          label='Data Anversario' 
          onChange={(e) => props.setPeople({ ...props.people, birtyDate: e.target.value })}
          value={props.people.birtyDate}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Celular'
            InputProps={{
              startAdornment: <InputAdornment position='start'>(55)</InputAdornment>
            }}
            onChange={(e) => props.setPeople({ ...props.people, cellPhone: e.target.value })}
            value={props.people.cellPhone}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
          fullWidth 
          label='Cpf' 
          onChange={(e) => props.setPeople({ ...props.people, cpf: e.target.value })}
          value={props.people.cpf}
        />
        </Grid>
        <Grid item xs={8}>
          <FormControl fullWidth>
            <TextField 
            label='Cep' 
            onChange={(e) => props.setPeople({ ...props.people, cep: e.target.value })}
            value={props.people.cep}
            />
          </FormControl>
        </Grid>
        <Grid item xs={8}>
          <FormControl fullWidth>
            <TextField 
            label='Rua' 
            onChange={(e) => props.setPeople({ ...props.people, street: e.target.value })}
            value={props.people.street}
            />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <TextField 
          fullWidth 
          label='Número' 
          onChange={(e) => props.setPeople({ ...props.people, number: e.target.value })}
          value={props.people.number}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
          fullWidth 
          label='Bairro' 
          onChange={(e) => props.setPeople({ ...props.people, neighborhood: e.target.value })}
          value={props.people.neighborhood}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
          fullWidth 
          label='Cidade' 
          onChange={(e) => props.setPeople({ ...props.people, city: e.target.value })}
          value={props.people.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
          fullWidth 
          label='Complemento'
          onChange={(e) => props.setPeople({ ...props.people, complement: e.target.value })}
          value={props.people.complement}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id='state-select'>Estado</InputLabel>
            <Select 
            labelId='state-select' 
            defaultValue='São Paulo'
            onChange={(e) => props.setPeople({ ...props.people, state: e.target.value })}
            value={props.people.state}
            >
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              color='secondary'
              variant='contained'
              onClick={props.handlePrev}
              startIcon={<Icon icon='mdi:chevron-left' fontSize={20} />}
            >
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

export default StepPersonalDetails
