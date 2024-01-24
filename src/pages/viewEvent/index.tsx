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
import { EventModel } from 'src/models/event'
import { getEvents } from 'src/services/event'

/*icons*/
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { CategoryModel } from 'src/models/category'
import { getCategoryByGroup } from 'src/services/category'
import { getImageDimensions } from 'src/utils/imageDimensions'


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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [showFilters, setShowFilters] = useState(true)
  const [showClose, setShowClose] = useState(false)

  const imageWidth = getImageDimensions(windowWidth)
  const imageHeight = windowWidth >= 960 ? 100 : 200

  const [categories, setCategories] = useState<CategoryModel[]>()

  useEffect(() => {
    handleGetCategories()
  }, [])

  const handleGetCategories = async () => {
    const response = await getCategoryByGroup(0, 100, 0, 'Agenda')
    setCategories(response.data)
  }


  useEffect(() => {
    handleGetEvents()
  }, [])

  const handleGetEvents = async (name?: string, category?: string, orderBy?: string) => {
    const response = await getEvents(0, 100, 0, name, category, orderBy)
    setEvents(response.data)
  }

  const handleSearch = () => {
    handleGetEvents(category, name, orderBy)
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    setShowFilters(windowWidth >= 960 ? true : false)
    setShowClose(windowWidth >= 960 ? false : true)

    return () => {
      window.removeEventListener('resize', handleResize);
    }

  }, [windowWidth])

  return (
    <Grid container spacing={1}>

      <Grid item xs={12} md={12}>
        <Card>
          <Grid container>
            <Grid item xs={7} sx={{ height: 10 }}>
              <CardHeader title='Próximas atividades' />
            </Grid>
            {/* Ícone de busca para telas de celular */}
            <Grid item xs={3} style={{ display: !showFilters ? 'block' : 'none', marginTop: 6, height: 2, marginLeft: windowWidth >= 430 ? 335 : 300 }}>
              <Button onClick={() => {
                setShowFilters(!showFilters)
                setShowClose(true)
              }}>
                <SearchIcon />
              </Button>
            </Grid>
          </Grid>

          <CardContent>
            <div className='demo-space-x'>
              <Grid container spacing={1} >
                <Grid item xs={9} style={{ display: showFilters && showClose ? 'block' : 'none' }}>
                  Filtros
                </Grid>
                <Grid item xs={2} style={{ display: showFilters && showClose ? 'block' : 'none', marginTop: -12, marginLeft: 29 }}>
                  <Button onClick={() => setShowFilters(!showFilters)}>
                    <CloseIcon />
                  </Button>
                </Grid>
                <Grid item xs={12} md={3} style={{ display: showFilters ? 'block' : 'none' }}>
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
                <Grid item xs={12} md={3} style={{ display: showFilters ? 'block' : 'none' }}>
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
                      {categories && categories.map((category, index) => (
                        <MenuItem value={category.name} key={index}>{category.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3} style={{ display: showFilters ? 'block' : 'none' }}>
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
                <Grid item xs={12} md={3} style={{ display: showFilters ? 'block' : 'none' }}>
                  <FormControl fullWidth>
                    <Button
                      fullWidth
                      color='primary'
                      variant='contained'
                      onClick={handleSearch}
                    >
                      filtrar
                    </Button>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
            {showFilters &&
              <>
                <br /> <br />
              </>
            }
            {events && events.map((item, key) => {
              const dataObj = new Date(item.date)
              const formattedDate = `${dataObj.getDate()}/${dataObj.getMonth() + 1}/${dataObj.getFullYear()} as ${item.hour}`

              return (
                <Grid container spacing={6} key={key}>
                  <Grid item xs={12} md={2}>
                    <img
                      src={item.image}
                      width={imageWidth}
                      height={imageHeight}
                      alt="Image Preview"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
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
                    </Timeline>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <a href={item.link} target='blank'>
                      <Button
                        fullWidth
                        color='primary'
                        variant='contained'
                      >
                        Inscreva-se
                      </Button>
                    </a>
                    <br /><br />
                  </Grid>
                </Grid>

              )
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
