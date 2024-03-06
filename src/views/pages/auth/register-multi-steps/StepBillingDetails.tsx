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
import { Card, CardContent } from '@mui/material'
import { styled } from "@mui/material/styles"
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 300,
  fontSize: '1rem',
  alignSelf: 'flex-end'
})

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

const data: CustomRadioIconsData[] = [
  {
    value: 'gold',
    title: <Typography variant='h5' sx={{ color: 'primary.main' }}>Member Dark Blue</Typography>,
    content: (
      <Card sx={{ boxShadow: 'none', textAlign: 'center' }}>
        <CardContent
          sx={{ display: 'flex', flexWrap: 'wrap', pb: '0 !important', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', position: 'relative' }}>
            <Sup sx={{ marginLeft: '-8px !important' }}>R$</Sup>
            <Typography
              variant='h3'
              sx={{
                mb: -1.2,
                lineHeight: 1,
                color: 'primary.main'
              }}
            >
              147
            </Typography>
            <Sub>/ mês</Sub>
          </Box>
        </CardContent>

        <CardContent>
          <Box sx={{ mt: 4, mb: 5 }}>
            <Box
              sx={{ display: 'flex', mb: 2.5, alignItems: 'center', '& svg': { mr: 2, color: 'text.secondary' } }}
            >
              {/* <Icon icon='mdi:circle' fontSize='0.625rem' /> */}
              <Typography component='span' sx={{ fontSize: '0.875rem' }}>
                ✔ Mentorias Online
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
              {/* <Icon icon='mdi:circle' fontSize='0.625rem' /> */}
              <Typography component='span' sx={{ fontSize: '0.875rem' }}>
                ✔ Cupons de Desconto
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
              {/* <Icon icon='mdi:circle' fontSize='0.625rem' /> */}
              <Typography component='span' sx={{ fontSize: '0.875rem' }}>
                ✔ Grupos de Networking
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
              {/* <Icon icon='mdi:circle' fontSize='0.625rem' /> */}
              <Typography component='span' sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                ✔ Free Pass ExpoEcomm 2024
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
              {/* <Icon icon='mdi:circle' fontSize='0.625rem' /> */}
              <Typography component='span' sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                ✔ Acesso a +30 cursos ilimitados
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
              {/* <Icon icon='mdi:circle' fontSize='0.625rem' /> */}
              <Typography component='span' sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                ✔ Embaixadas presenciais
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
              {/* <Icon icon='mdi:circle' fontSize='0.625rem' /> */}
              <Typography component='span' sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                ✔ Contribuição Ações Sociais
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
              {/*  <Icon icon='mdi:circle' fontSize='0.625rem' /> */}
              <Typography component='span' sx={{ fontSize: '0.875rem' }}>
                ✔ Selo Member <span style={{ fontWeight: 'bold' }}>Dark Blue</span>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    )
  },
  {
    isSelected: true,
    value: 'free',
    title: <Typography variant='h5' sx={{ color: 'primary.main' }}>Member Blue</Typography>,
    content: (
      <Card sx={{ boxShadow: 'none', textAlign: 'center' }}>
        <CardContent
          sx={{ display: 'flex', flexWrap: 'wrap', pb: '0 !important', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', position: 'relative' }}>
            <Sup sx={{ marginLeft: '-8px !important' }}>R$</Sup>
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
              {/* <Icon icon='mdi:circle' fontSize='0.625rem' /> */}
              <Typography component='span' sx={{ fontSize: '0.875rem' }}>
                ✔ Mentorias Online
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
              {/* <Icon icon='mdi:circle' fontSize='0.625rem' /> */}
              <Typography component='span' sx={{ fontSize: '0.875rem' }}>
                ✔ Cupons de Desconto
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
              {/* <Icon icon='mdi:circle' fontSize='0.625rem' /> */}
              <Typography component='span' sx={{ fontSize: '0.875rem' }}>
                ✔ Grupos de Networking
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
              {/* <Icon icon='mdi:circle' fontSize='0.625rem' /> */}
              <Typography component='span' sx={{ fontSize: '0.875rem' }}>
                ✔ Selo Member <span style={{ fontWeight: 'bold' }}>Blue</span>
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <br />   <br />  <br />  <br />  <br />
      </Card>

    )
  },
]

interface StepBillingDetailsParams {
  handlePrev: () => void,
  user: User,
  people: UserDataType
}


const StepBillingDetails = (props: StepBillingDetailsParams) => {
  const auth = useAuth()

  const handleCheckboxChange = (event: any) => {
    setAcceptedTerms(event.target.checked);
  }

  const pdfUrl = 'https://expoecomm.s3.sa-east-1.amazonaws.com/TERMO+DE+ADESA%CC%83O+EMBAIXADA+-+X-ECOMM.pdf'
  const [acceptedTerms, setAcceptedTerms] = useState(false)

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
    if (!acceptedTerms) {
     toast.error('Aceite os termos antes de continuar!')
    }
    else {
      signup(props.user.email, props.user.password)
        .then(async response => {
          await handleSavePeople(response.data.id)

          if (selectedRadio == 'gold') {
            window.open(`https://chk.eduzz.com/2256536?email=${encodeURIComponent(response.data.email as string)}
                      &name=${encodeURIComponent(
              response && response.data && response.data.people !== undefined && response.data.people !== null
                ? (response.data.people[0]?.name as string)
                : "")}
                        &phone=${encodeURIComponent(
                  response && response.data && response.data.people !== undefined && response.data.people !== null
                    ? (response.data.people[0]?.cellPhone as string)
                    : "")}
                        &doc=${encodeURIComponent(
                      response && response.data && response.data.people !== undefined && response.data.people !== null
                        ? (response.data.people[0]?.cpf as string)
                        : "")}`,
              '_blank')
          } else {
            const email = props.user.email as string
            const password = props.user.password as string

            auth.login({ email, password, rememberMe: true }, () => {
              const redirectURL = '/viewEvent'
              router.replace(redirectURL as string)
            })
          }
        })
    }
  }

  const handleSavePeople = async (userId: string | undefined) => {
    props.people.userId = userId
    props.people.planId = selectedRadio
    const date = new Date(props.people.birtyDate === undefined ? 0 : props.people.birtyDate)
    props.people.birtyDate = date.toISOString()

    if (props.people.complement == '')
      props.people.complement = 'Não tem'

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
            gridProps={{ md: 6, xs: 12 }}
            handleChange={handleRadioChange}
          />
        ))}
        <Grid item xs={12}>
          <label>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Ler termos de adesão</a><br /><br />
            <input type="checkbox" checked={acceptedTerms} onChange={handleCheckboxChange} />
            Eu li e concordo com os termos do documento.
          </label>

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
