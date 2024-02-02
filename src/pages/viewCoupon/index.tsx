// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Button, CardMedia, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import { useEffect, useState } from 'react'

import { CouponModel } from 'src/models/coupon'
import { getCoupon } from 'src/services/coupon'

/*icons*/
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { CategoryModel } from 'src/models/category'
import { getCategoryByGroup } from 'src/services/category'

const ViewCoupon = () => {
  const [orderBy, setOrderBy] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [coupons, setCoupons] = useState<CouponModel[]>()

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [showFilters, setShowFilters] = useState(true);
  const [showClose, setShowClose] = useState(false);
  const [categories, setCategories] = useState<CategoryModel[]>()

  useEffect(() => {
    handleGetCategories()
  }, [])

  const handleGetCategories = async () => {
    const response = await getCategoryByGroup(0, 100, 0, 'Cupons')
    setCategories(response.data)
  }

  useEffect(() => {
    handleGetCoupons()
  }, [])

  const handleGetCoupons = async (name?: string, category?: string, orderBy?: string) => {
    const response = await getCoupon(0, 100, 0, name, category, orderBy)
    setCoupons(response.data)
  }

  const handleSearch = () => {
    handleGetCoupons(category, name, orderBy)
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

  const CouponComponent: React.FC<{ item: CouponModel }> = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Grid item xs={12} md={2} style={{ cursor: 'pointer' }}>
        <Card
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!isHovered &&
            <>
              <CardMedia sx={{ height: 90 }} image={item.soon} />
              <CardContent sx={{ pt: 4 }}>
                <Typography sx={{ mb: 2, fontSize: 16 , textAlign: 'center', fontWeight: 'bold'  }}>

                   {item.discount} % desconto
                </Typography>
              </CardContent>
            </>
          }
          {isHovered &&
            <>
              <span style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', display: 'block', marginTop: 12 }}>{item.title}</span><br />
              <span style={{ fontSize: 12, textAlign: 'center', display: 'block' }}>{item.description}</span>
              <CardContent sx={{ pt: 4 }}>
                <Typography sx={{ mb: 2, fontSize: 16 }}>

                  <a href={`https://${item.link}`} target='blank' style={{ textDecoration: "none", color: "inherit" }}>
                    <Button
                      fullWidth
                      color='primary'
                      variant='contained'
                    >
                      Pegar Cupom
                    </Button>

                  </a>
                </Typography>
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
            <Grid item xs={9} sx={{ height: 10 }}>
              <CardHeader title='Cupons e benefícios' />
            </Grid>
            <Grid item xs={2} style={{ display: !showFilters ? 'block' : 'none', marginTop: 6, height: 2, marginLeft: windowWidth >= 430 ? 335 : 300  }}>
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
            <Grid container spacing={2}>
              {coupons && coupons.map((item: CouponModel, key) => (
                <CouponComponent key={key} item={item} />
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

ViewCoupon.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default ViewCoupon
