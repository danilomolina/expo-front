// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import Icon from 'src/@core/components/icon'


// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>(({ theme }) => ({
  margin: 0,
  padding: 0,
  marginLeft: theme.spacing(0.75),
  '& .MuiTimelineItem-root': {
    '&:before': {
      display: 'none'
    },
    '&:last-child': {
      minHeight: 60
    }
  }
}))

const UserViewOverview = () => {
  const [value, setValue] = useState<string>('')
  const [name, setName] = useState<string>('')

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string)
  }

  const handleSearch = () => {

  }

  return (
    <Grid container spacing={6}>

      <Grid item xs={12}>
        <Card>
          <CardHeader title='Próximas atividades' />
          <CardContent>

            <div className='demo-space-x'>
              <Grid container spacing={6}>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel id='controlled-select-label'>Ordernado por</InputLabel>
                    <Select
                      value={value}
                      label='Ordernado por'
                      id='controlled-select'
                      onChange={handleChange}
                      labelId='controlled-select-label'
                    >
                      <MenuItem value=''>
                        <em>Nada</em>
                      </MenuItem>
                      <MenuItem value={10}>Data</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel id='controlled-select-label'>Categorias</InputLabel>
                    <Select
                      value={value}
                      label='Categorias'
                      id='controlled-select'
                      onChange={handleChange}
                      labelId='controlled-select-label'
                    >
                      <MenuItem value=''>
                        <em>Nada</em>
                      </MenuItem>
                      <MenuItem value={10}>Categoria 1</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='auth-login-v2-password'>
                      Buscar por Nome
                    </InputLabel>

                    <OutlinedInput
                      value={value}
                      label='Senha'
                      onChange={(e) => setName(e.target.value)}
                      id='auth-login-v2-password'
                      type={'text'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => handleSearch()}
                          >
                            <Icon icon={'mdi:text-box-search'} fontSize={20} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />

                  </FormControl>
                </Grid>
              </Grid>
            </div>

            <br /><br />
            <Timeline>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color='primary' />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Box
                    sx={{
                      mb: 2,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
                      Mentoria: A importancia de um bom desing
                    </Typography>
                    {/* <Typography variant='caption'>12 min ago</Typography> */}
                  </Box>
                  <Typography variant='body2'>Mentores: Mago do ecommerce</Typography>
                  <Typography variant='body2'>Data: 20/10/2023  as 19:00</Typography>
                  <Typography variant='body2'>Local: Aplicativo</Typography>
                </TimelineContent>
              </TimelineItem>

            </Timeline>

            <Timeline>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color='primary' />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Box
                    sx={{
                      mb: 2,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
                      Mentoria: A importancia de um bom desing 2
                    </Typography>
                    {/* <Typography variant='caption'>12 min ago</Typography> */}
                  </Box>
                  <Typography variant='body2'>Mentores: Mago do ecommerce</Typography>
                  <Typography variant='body2'>Data: 20/10/2023  as 19:00</Typography>
                  <Typography variant='body2'>Local: Aplicativo</Typography>
                </TimelineContent>
              </TimelineItem>

            </Timeline>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

UserViewOverview.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default UserViewOverview
