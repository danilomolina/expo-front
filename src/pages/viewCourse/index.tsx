import { Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import { getToken } from "src/services/ecommerce"

const ViewCourse = () => {

    const handleSearch = async () => {
        const token = await getToken("danilomolina@gmail.com", "Danilo")
        window.location.href = `https://escola.ecommercenapratica.com/?token=${token}`
    } 

    return (
        <Grid container spacing={2}>

            <Grid item xs={3}>
                <Card>
                    <CardMedia sx={{ height: 90 }} image='https://firebasestorage.googleapis.com/v0/b/blun-app.appspot.com/o/notfound.jpeg?alt=media&token=8fec25e6-d05c-4b13-8255-04fdc152145a' />
                    <CardContent sx={{ pt: 4 }}>
                        <Typography variant='h6' sx={{ mb: 2 }}>
                            Cursos Ecommerce na pratica
                        </Typography>
                        <Button
                            fullWidth
                            color='primary'
                            variant='contained'
                            onClick={handleSearch}
                        >
                            Buscar
                        </Button>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    )
}


ViewCourse.acl = {
    action: 'read',
    subject: 'acl-page'
}

export default ViewCourse