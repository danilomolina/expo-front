// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Button, CardMedia, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { CouponModel } from 'src/models/coupon'
import { getCoupon } from 'src/services/coupon'

const ViewCoupon = () => {
    const [orderBy, setOrderBy] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [coupons, setCoupons] = useState<CouponModel[]>()

    useEffect(() => {
        handleGetCoupons()
    }, [])

    const handleGetCoupons = async (name? : string, category?: string, orderBy? : string) => {
        const response = await getCoupon(0, 100, 0, name, category, orderBy)
        setCoupons(response.data)
    }

    const handleSearch = () => {
        handleGetCoupons(category, name, orderBy)
    }

    return (
        <Grid container spacing={6}>

            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Cupons' />
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
                        <Grid container spacing={2}>
                            {coupons && coupons.map((item, key) => (
                                <Grid item xs={2} key={key}>
                                    <Card>
                                        <CardMedia sx={{ height: 90 }} image='https://firebasestorage.googleapis.com/v0/b/blun-app.appspot.com/o/notfound.jpeg?alt=media&token=8fec25e6-d05c-4b13-8255-04fdc152145a' />
                                        <CardContent sx={{ pt: 4 }}>
                                            <Typography variant='h6' sx={{ mb: 2 }}>
                                                <a href={item.link} style={{ textDecoration: "none", color: "inherit" }}>{item.discount} % desconto   </a>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
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
