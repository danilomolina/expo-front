import { Button, Card, CardContent, CardHeader, CardMedia, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { CourseModel } from "src/models/course"
import { getCouser } from "src/services/course"
import { getToken } from "src/services/ecommerce"

/*icons*/
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { UserDataType } from "src/context/types"
import { CategoryModel } from "src/models/category"
import { getCategoryByGroup } from "src/services/category"

const ViewCourse = () => {

  const [courses, setCourses] = useState<CourseModel[]>()
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
    const response = await getCategoryByGroup(0, 100, 0, 'Cursos')
    setCategories(response.data)
  }

  const handleSearch = async () => {

    const userDataString = window.localStorage.getItem('userData');

    if (userDataString !== null) {
      const userData = JSON.parse(userDataString) as UserDataType;

      const token = await getToken(userData.email, userData.name)
      window.open(`https://escola.ecommercenapratica.com/?token=${token}`, "_blank");
    }
  }

  useEffect(() => {
    handleGetCourses()
  }, [])

  const handleGetCourses = async (name?: string, category?: string, orderBy?: string) => {
    const response = await getCouser(0, 100, 0, name, category, orderBy)
    setCourses(response.data)
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

  const CourseComponent: React.FC<{ item: CourseModel }> = ({ item }) => {
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
              <CardContent sx={{ pt: 4, height: 60  }}>
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
                      <Button
                        fullWidth
                        color='primary'
                        variant='contained'
                        onClick={handleSearch}
                      >
                        Assistir
                      </Button>
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <Grid container>
            <Grid item xs={7} sx={{ height: 10 }}>
              <CardHeader title='Cursos' />
            </Grid>
            <Grid item xs={3} style={{ display: !showFilters ? 'block' : 'none', marginTop: 6, height: 2, marginLeft: windowWidth >= 430 ? 335 : 300  }}>
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
            <Grid container spacing={6} >
              {courses && courses.map((item: CourseModel, key) => (
                <CourseComponent key={key} item={item} />
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid >
  )
}


ViewCourse.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default ViewCourse
