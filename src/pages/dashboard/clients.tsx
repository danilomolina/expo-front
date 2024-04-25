// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types Imports
import { CardStatsVerticalProps } from 'src/@core/components/card-statistics/types'
import { getPeopleCount } from 'src/services/people'
import { useEffect, useState } from 'react'

const CardTotalClients = (props: CardStatsVerticalProps) => {

    const { color, icon } = props
    const [totalClients, setTotalClients] = useState(0)

    const handleGetValues = async () => {
        const response = await getPeopleCount()
        const qnt = response.data.count;
        
        return qnt
    }

    useEffect(() => {
        const fetchData = async () => {
            const countClients = await handleGetValues()
            setTotalClients(countClients)
        };

        fetchData();
    }, []);

    return (
        <Card>
            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 6, width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <CustomAvatar skin='light' variant='rounded' color={color}>
                        {icon}
                    </CustomAvatar>
                </Box>
                <Typography variant='h6' sx={{ mb: 1 }}>
                    {String(totalClients)}
                </Typography>
                <Typography variant='body2' sx={{ mb: 5 }}>
                    Total de Clientes cadastrados
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardTotalClients
