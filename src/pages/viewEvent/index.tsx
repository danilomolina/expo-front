// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
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
import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { EventModel } from 'src/models/event'
import { getEvents } from 'src/services/event'


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
  const [orderBy, setOrderBy] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [events, setEvents] = useState<EventModel[]>()

  useEffect(() => {
    handleGetEvents()
  }, [])

  const handleGetEvents = async (name? : string, category?: string, orderBy? : string) => {
    const response = await getEvents(0, 100, 0, name, category, orderBy)
    setEvents(response.data)
  }

  const handleSearch = () => {
    handleGetEvents(category, name, orderBy)
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
                      value={orderBy}
                      label='Ordernado por'
                      id='controlled-select'
                      onChange={(e) => setOrderBy(e.target.value)}
                      labelId='controlled-select-label'
                    >
                      <MenuItem value=''>
                        <em>Nada</em>
                      </MenuItem>
                      <MenuItem value="date">Data</MenuItem>
                      <MenuItem value="category">Categoria</MenuItem>
                      <MenuItem value="local">Local</MenuItem>
                      <MenuItem value="mentors">Mentores</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel id='controlled-select-label'>Categorias</InputLabel>
                    <Select
                      value={category}
                      label='Categorias'
                      id='controlled-select'
                      onChange={(e) => setCategory(e.target.value)}
                      labelId='controlled-select-label'
                    >
                      <MenuItem value=''>
                        <em>Nada</em>
                      </MenuItem>
                      <MenuItem value="Categoria 1">Categoria 1</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='auth-login-v2-password'>
                      Buscar por Nome
                    </InputLabel>

                    <OutlinedInput
                      value={name}
                      label='Nome'
                      onChange={(e) => setName(e.target.value)}
                      id='auth-login-v2-password'
                      type={'text'}
                    />

                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl fullWidth>
                    <Button
                      fullWidth
                      color='primary'
                      variant='contained'
                      onClick={handleSearch}
                    >
                       <Icon icon={'mdi:text-box-search'} fontSize={20} /> Buscar
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>
            </div>

            <br /><br />
            {events && events.map((item, key) => {
              const dataObj = new Date(item.date)
              const formattedDate = `${dataObj.getDate()}/${dataObj.getMonth() + 1}/${dataObj.getFullYear()} as ${item.hour}`

              return (
                <Timeline key={key}>
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
                          {item.title}
                        </Typography>
                      </Box>
                      <Typography variant='body2'>Mentores: {item.mentors} </Typography>
                      <Typography variant='body2'>Data: {formattedDate}</Typography>
                      <Typography variant='body2'>Local: {item.local}</Typography>
                      <Typography variant='body2'>Categoria: {item.category}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>)
            })}


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
