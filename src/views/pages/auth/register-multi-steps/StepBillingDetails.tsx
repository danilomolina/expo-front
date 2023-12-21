// ** React Imports
import { useState, ChangeEvent } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'


// ** Type Import
import { CustomRadioIconsData } from 'src/@core/components/custom-radio/types'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomRadioIcons from 'src/@core/components/custom-radio/icons'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import { User } from '.'
import { UserDataType } from 'src/context/types'
import { signup } from 'src/services/login'
import { savePeople } from 'src/services/people'
import router from 'next/router'

const data: CustomRadioIconsData[] = [
  {
    value: 'free',
    title: <Typography variant='h5'>Member Free</Typography>,
    content: (
      <Box sx={{ my: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
          Um começo simples para startups e estudantes com Agenda e Mentoria
        </Typography>
        <Box sx={{ mt: 2, display: 'flex' }}>
          <Typography component='sup' sx={{ mt: 1.5, color: 'primary.main', alignSelf: 'flex-start' }}>
            R$
          </Typography>
          <Typography component='span' sx={{ fontSize: '2rem', color: 'primary.main' }}>
            0
          </Typography>
          <Typography component='sub' sx={{ mb: 1.5, alignSelf: 'flex-end', color: 'text.disabled' }}>
            /mês
          </Typography>
        </Box>
      </Box>
    )
  },
  {
    isSelected: true,
    value: 'gold',
    title: <Typography variant='h5'>Member Gold</Typography>,
    content: (
      <Box sx={{ my: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
          Para pequenas e médias empresas com Agenda, Mentoria, Cursos, Cupons e Embaixadas</Typography>
        <Box sx={{ mt: 2, display: 'flex' }}>
          <Typography component='sup' sx={{ mt: 1.5, color: 'primary.main', alignSelf: 'flex-start' }}>
            R$
          </Typography>
          <Typography component='span' sx={{ fontSize: '2rem', fontWeight: 500, color: 'primary.main' }}>
            99
          </Typography>
          <Typography component='sub' sx={{ mb: 1.5, alignSelf: 'flex-end', color: 'text.disabled' }}>
            /mês
          </Typography>
        </Box>
      </Box>
    )
  },
]

interface StepBillingDetailsParams {
  handlePrev : () => void,
  user: User,
  people: UserDataType
}


const StepBillingDetails = (props: StepBillingDetailsParams) => {
  const initialSelected: string = data.filter(item => item.isSelected)[data.filter(item => item.isSelected).length - 1]
    .value

  // ** State
  const [selectedRadio, setSelectedRadio] = useState<string>(initialSelected)

  const handleRadioChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
    if (typeof prop === 'string') {
      setSelectedRadio(prop)
    } else {
      setSelectedRadio((prop.target as HTMLInputElement).value)
    }
  }

  const handleSaveUser = async () => {
    signup(props.user.email, props.user.password)
    .then(async response => {
      await handleSavePeople(response.data.id)
      alert("Usuário criado com sucesso!")

      const redirectURL = '/login'
      router.replace(redirectURL as string)
    })

  }

  const handleSavePeople = async (userId: string | undefined) => {
    props.people.userId = userId
    props.people.planId = selectedRadio
    const date = new Date(props.people.birtyDate === undefined ? 0 : props.people.birtyDate)
    props.people.birtyDate = date.toISOString()

    await savePeople(props.people)
  }

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5'>Selecione um Plano</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Selecione o plano de acordo com sua necessidade</Typography>
      </Box>

      <Grid container spacing={5}>
        {data.map((item, index) => (
          <CustomRadioIcons
            key={index}
            data={data[index]}
            selected={selectedRadio}
            name='custom-radios-plan'
            gridProps={{ sm: 4, xs: 12 }}
            handleChange={handleRadioChange}
          />
        ))}
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
            <Button color='success' variant='contained' onClick={handleSaveUser}>
              Salvar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default StepBillingDetails
