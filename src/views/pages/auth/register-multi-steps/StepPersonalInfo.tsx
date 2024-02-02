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
import { Dispatch, SetStateAction, useRef } from 'react'
import { UserDataType } from 'src/context/types'

interface StepPersonalDetailsParams {
  handleNext: () => void,
  handlePrev: () => void,
  people: UserDataType,
  setPeople: Dispatch<SetStateAction<UserDataType>>
}

const StepPersonalDetails = (props: StepPersonalDetailsParams) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const states = [
    { description: 'Acre', value: 'AC' },
    { description: 'Alagoas', value: 'AL' },
    { description: 'Amapá', value: 'AP' },
    { description: 'Amazonas', value: 'AM' },
    { description: 'Bahia', value: 'BA' },
    { description: 'Ceará', value: 'CE' },
    { description: 'Distrito Federal', value: 'DF' },
    { description: 'Espírito Santo', value: 'ES' },
    { description: 'Goiás', value: 'GO' },
    { description: 'Maranhão', value: 'MA' },
    { description: 'Mato Grosso', value: 'MT' },
    { description: 'Mato Grosso do Sul', value: 'MS' },
    { description: 'Minas Gerais', value: 'MG' },
    { description: 'Pará', value: 'PA' },
    { description: 'Paraíba', value: 'PB' },
    { description: 'Paraná', value: 'PR' },
    { description: 'Pernambuco', value: 'PE' },
    { description: 'Piauí', value: 'PI' },
    { description: 'Rio de Janeiro', value: 'RJ' },
    { description: 'Rio Grande do Norte', value: 'RN' },
    { description: 'Rio Grande do Sul', value: 'RS' },
    { description: 'Rondônia', value: 'RO' },
    { description: 'Roraima', value: 'RR' },
    { description: 'Santa Catarina', value: 'SC' },
    { description: 'São Paulo', value: 'SP' },
    { description: 'Sergipe', value: 'SE' },
    { description: 'Tocantins', value: 'TO' }
  ];

  const getAddress = (cep: string) => {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        const updatedPeople = {
          ...props.people,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf
        };
        props.setPeople(updatedPeople);

        inputRef.current?.focus();
      })
      .catch(error => console.error('Erro ao buscar endereço:', error));
  }

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
            label='Data Aniversário'
            onChange={(e) => props.setPeople({ ...props.people, birtyDate: e.target.value })}
            value={props.people.birtyDate}
            type='date'
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
              onBlur={() => getAddress(props.people.cep as string)}
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
            ref={inputRef}
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
                <MenuItem key={state.value} value={state.value}>
                  {state.description}
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
