// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Button, CardMedia, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { EmbassieModel } from 'src/models/embassie'
import { getEmbassie } from 'src/services/embassie'

const ViewEmbassie = () => {
    const [orderBy, setOrderBy] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [embassie, setEmbassie] = useState<EmbassieModel[]>()

    useEffect(() => {
      handleGetEmbassie()
    }, [])
  
    const handleGetEmbassie = async (name? : string, orderBy? : string) => {
      const response = await getEmbassie(0, 100, 0, name, orderBy)
      setEmbassie(response.data)
    }

    const handleSearch = () => {
        handleGetEmbassie(name, orderBy)
    }

    return (
        <Grid container spacing={6}>

            <Grid item xs={12}>
                <Card>
                    <CardHeader title='Embaixadas' />
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
                                            <MenuItem value="date">Descrição</MenuItem>
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
                        {embassie && embassie.map((item, key) => (
                            <Grid item xs={3} key={key}>
                                <Card>
                                    <CardMedia sx={{ height: 90 }} image='https://firebasestorage.googleapis.com/v0/b/blun-app.appspot.com/o/notfound.jpeg?alt=media&token=8fec25e6-d05c-4b13-8255-04fdc152145a' />
                                    <CardContent sx={{ pt: 4 }}>
                                        <Typography variant='h6' sx={{ mb: 2 }}>
                                            {item.description}
                                        </Typography>
                                        <Typography variant='body2'>
                                        <a href={item.link} style={{ textDecoration: "none", color: "inherit" }}> Ver noticias relacionadas </a>
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

ViewEmbassie.acl = {
    action: 'read',
    subject: 'acl-page'
}

export default ViewEmbassie
