// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FooterContent = () => {

  const isMobileDevice = () => {
    return typeof window !== 'undefined' && window.innerWidth <= 960;
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between'  }}>
      <Typography sx={{ mr: 2 }}>
        {`© ${new Date().getFullYear()}, Criado com carinho `}
        <Box component='span' sx={{ color: 'error.main', fontSize: isMobileDevice() ? '0.5rem !important' :  '1rem !important'}}>
          ❤️
        </Box>
        {` por `}
        <LinkStyled target='_blank' href='https://www.expoecomm.com.br'>
          ExpoEcomm
        </LinkStyled>
      </Typography>
    </Box>
  )
}

export default FooterContent
