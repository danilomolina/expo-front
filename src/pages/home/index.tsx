// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

const Home = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Bem vindo a área administrativa do app expoecomm 🔒'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>
             Aqui é possível fazer os cadastros e manutenções.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

Home.acl = {
  action: 'read',
  subject: 'admin-page'
}

export default Home
