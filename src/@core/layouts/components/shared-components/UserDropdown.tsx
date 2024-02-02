// ** React Imports
import { useState, SyntheticEvent, Fragment, useEffect, useContext } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'
import { MyAccountContext } from 'src/context/MyAccountContext'
import { UserDataType } from 'src/context/types'

interface Props {
  settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = (props: Props) => {
  const [user, setUser] = useState<UserDataType>()
  const { userPhoto, updateUserPhoto } = useContext(MyAccountContext);

  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()
  const { logout } = useAuth()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  useEffect(() => {
    const userDataString = window.localStorage.getItem('userData')

    if (userDataString !== null) {
      const userData = JSON.parse(userDataString) as UserDataType

      setUser(userData)
      updateUserPhoto(userData.image)
    }

  }, []);

  const handleRedirectAccount = () => {
    const redirectURL = '/viewAcount'
    router.replace(redirectURL as string)
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt='Perfil'
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src={userPhoto ? userPhoto : user && user.image}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user && user.name}
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: '0 !important' }} />
        <Divider />
        <MenuItem
          onClick={handleRedirectAccount}
          sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } }}
        >
          <Icon icon='mdi:account-circle' />
          Minha Conta
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } }}
        >
          <Icon icon='mdi:logout-variant' />
          Sair
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
