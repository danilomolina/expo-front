// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Button, CardMedia, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import { useEffect, useState } from 'react'

import { EmbassieModel } from 'src/models/embassie'
import { getEmbassie } from 'src/services/embassie'
import { CategoryModel } from 'src/models/category'

import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { getCategoryByGroup } from 'src/services/category'

const ViewEmbassie = () => {
  const [embassie, setEmbassie] = useState<EmbassieModel[]>()
  const [orderBy, setOrderBy] = useState<string>('')
  const [name, setName] = useState<string>('')

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [showFilters, setShowFilters] = useState(true)
  const [showClose, setShowClose] = useState(false)
  const [category, setCategory] = useState<string>('')
  const [categories, setCategories] = useState<CategoryModel[]>()

  useEffect(() => {
    handleGetCategories()
  }, [])

  const handleGetCategories = async () => {
    const response = await getCategoryByGroup(0, 100, 0, 'Embaixadas')
    setCategories(response.data)
  }

  useEffect(() => {
    handleGetEmbassie()
  }, [])

  const handleGetEmbassie = async (name?: string, orderBy?: string) => {
    const response = await getEmbassie(0, 100, 0, name, orderBy, category)
    setEmbassie(response.data)
  }

  const handleSearch = () => {
    handleGetEmbassie(name, orderBy)
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

  const EmbassieComponent: React.FC<{ item: EmbassieModel }> = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Grid item xs={12} md={3} style={{ cursor: 'pointer' }}>
        <Card
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!isHovered &&
            <>
              <CardMedia sx={{ height: 90 }} image={item.image} />
              <CardContent sx={{ pt: 4, height: 60 }}>
                <Typography sx={{ mb: 2, fontSize: 20, fontWeight: 'bold', textAlign: 'center', display: 'block', marginTop: 0 }}>
                  {item.name}
                </Typography>
              </CardContent>
            </>
          }
          {isHovered &&
            <>
              <CardMedia sx={{ height: 90 }} image={item.image} />
              <CardContent sx={{ pt: 4 }}>
                <>
                  <span style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', display: 'block', marginTop: 12 }}>{item.name}</span><br />
                  <span style={{ fontSize: 12, textAlign: 'center', display: 'block' }}>{item.description}</span>
                  <CardContent sx={{ pt: 4 }}>
                    <Typography sx={{ mb: 2, fontSize: 16 }}>

                      <a href={item.link} target='blank' style={{ textDecoration: "none", color: "inherit" }}>
                        <Button
                          fullWidth
                          color='primary'
                          variant='contained'
                        >
                          Grupo WhatsApp
                        </Button>
                      </a>
                    </Typography>
                  </CardContent>
                </>
              </CardContent>
            </>
          }
        </Card>
      </Grid>
    );
  };

  return (
    <Grid container spacing={6}>

      <Grid item xs={12}>
        <Card>
          <Grid container>
            <Grid item xs={7} sx={{ height: 10 }}>
              <CardHeader title='Embaixadas' />
            </Grid>
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
              <Grid container spacing={6} >
                <Grid item xs={9} style={{ display: showFilters && showClose ? 'block' : 'none' }}>
                  Filtros
                </Grid>
                <Grid item xs={2} style={{ display: showFilters && showClose ? 'block' : 'none', marginTop: -12 }}>
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
            <Grid container spacing={6}>
              {embassie && embassie.map((item: EmbassieModel, key) => (
                <EmbassieComponent key={key} item={item} />
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

ViewEmbassie.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default ViewEmbassie
