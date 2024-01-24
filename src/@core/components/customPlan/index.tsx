import { styled } from "@mui/material/styles"
import CustomChip from 'src/@core/components/mui/chip'
import Icon from 'src/@core/components/icon'
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material"

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

const CustomPlan = () => {

  const handleRedirect = () => {
    window.open('https://chk.eduzz.com/2186000', '_blank')
  }

  return (
    <>
      <Grid item xs={12} md={6}>
        <Card sx={{ boxShadow: 'none', border: theme => `2px solid ${theme.palette.primary.main}`, textAlign: 'center' }}>
          <CardContent
            sx={{ display: 'flex', flexWrap: 'wrap', pb: '0 !important', justifyContent: 'space-between' }}
          >
            <CustomChip
              skin='light'
              size='small'
              color='info'
              label='Member Blue'
              sx={{ fontSize: '0.75rem', borderRadius: '4px' }}
            />
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
              <br />  <br />  <br />  <br />  <br />
            </Box>
            <Button variant='contained' sx={{ width: '50%' }} disabled>
              Plano Atual
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card sx={{ boxShadow: 'none', border: theme => `2px solid ${theme.palette.primary.main}`, textAlign: 'center' }}>
          <CardContent
            sx={{ display: 'flex', flexWrap: 'wrap', pb: '0 !important', justifyContent: 'space-between' }}
          >
            <CustomChip
              skin='light'
              size='small'
              color='primary'
              label='Member Dark Blue'
              sx={{ fontSize: '0.75rem', borderRadius: '4px' }}
            />
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
                197
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
            <Button variant='contained' sx={{ width: '50%' }} onClick={handleRedirect}>
              Alterar Plano
            </Button>
          </CardContent>

        </Card>
      </Grid>
    </>
  )
}


export default CustomPlan
