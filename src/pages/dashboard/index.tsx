import { Grid } from "@mui/material"
import CardStatsTotalVisits from "./visits"
import CardTopCity from "./city"
import CardTotalClients from "./clients"
import Icon from 'src/@core/components/icon'
import dynamic from "next/dynamic"

const RechartsPieChart = dynamic(() => import('src/views/charts/recharts/RechartsPieChart'), { ssr: false })


const Dashboard = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <RechartsPieChart />
            </Grid>
            <Grid item xs={6} md={2}>
                <CardTotalClients
                    stats='1.200'
                    color='primary'
                    trendNumber='+22%'
                    title='Total de Clientes'
                    chipText=''
                    icon={<Icon icon='mdi:account-group' />}
                />
            </Grid>
            <Grid item xs={12}>
                <CardStatsTotalVisits />
            </Grid>
            <Grid item xs={12}>
                <CardTopCity />
            </Grid>
        </Grid>
    )
}

Dashboard.acl = {
    action: 'read',
    subject: 'admin-page'
}

export default Dashboard