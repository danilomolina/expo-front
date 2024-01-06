// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// Styled Box component
const StyledBox1 = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  borderRadius: '10px',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(6.5, 6),
  backgroundColor: `rgba(${theme.palette.customColors.main}, 0.04)`
}))

// Styled Box component
const StyledBox2 = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  borderRadius: '10px',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(6.5, 6),
  backgroundColor: `rgba(${theme.palette.customColors.main}, 0.04)`
}))

const FaqFooter = () => {
  return (
    <Box sx={{ mt: 13, textAlign: 'center' }}>
      <CustomChip size='small' skin='light' color='primary' label='Pergunta' />
      <Typography variant='h5' sx={{ mt: 1.5, mb: 2 }}>
        Você ainda tem alguma dúvida?
      </Typography>
      <Typography sx={{ mb: 10, color: 'text.secondary' }}>
        Se não conseguir encontrar uma pergunta nas nossas FAQ, pode sempre contactar-nos. Responderemos em breve!
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <StyledBox1>
            <CustomAvatar skin='light' variant='rounded' sx={{ mt: 1.5, height: 38, width: 38 }}>
              <Icon icon='mdi:phone-outline' />
            </CustomAvatar>
            <Typography
              href='/'
              variant='h6'
              component={Link}
              onClick={e => e.preventDefault()}
              sx={{ mt: 4, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              (16) 99178-8900
            </Typography>
            <Typography sx={{ mt: 2, color: 'text.secondary' }}>Nós estamos sempre felizes em ajudar!</Typography>
          </StyledBox1>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledBox2>
            <CustomAvatar skin='light' variant='rounded' sx={{ mt: 1.5, height: 38, width: 38 }}>
              <Icon icon='mdi:email-outline' />
            </CustomAvatar>
            <Typography
              href='/'
              variant='h6'
              component={Link}
              onClick={e => e.preventDefault()}
              sx={{ mt: 4, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              ajuda@expocomm.com.br
            </Typography>
            <Typography sx={{ mt: 2, color: 'text.secondary' }}>A melhor maneira de obter uma resposta mais rápida!</Typography>
          </StyledBox2>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FaqFooter
