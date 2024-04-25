// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useEffect, useState } from 'react'
import { getPeopleCount } from 'src/services/people'

interface LabelProp {
  cx: number
  cy: number
  percent: number
  midAngle: number
  innerRadius: number
  outerRadius: number
}



const RADIAN = Math.PI / 180
const renderCustomizedLabel = (props: LabelProp) => {
  // ** Props
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill='#fff' textAnchor='middle' dominantBaseline='central'>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

interface dataInteface{
  name: string
  value: number
  color: string
}

const RechartsPieChart = () => {
  const [data, setData] = useState<dataInteface[]>([])

  const handleGetValues = async (id: string) => {
    const response = await getPeopleCount(id)
    const qnt = response.data.count;

    return qnt
  }

  useEffect(() => {
    const fetchData = async () => {
      const freeCount = await handleGetValues('free')
      const goldCount = await handleGetValues('gold')

      const newData: dataInteface[] = [
        { name: 'Plano Free', value: freeCount, color: '#826bf8' },
        { name: 'Plano Gold', value: goldCount, color: '#FDB528' },
      ];

      setData(newData)
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader
        title='Visão de Planos'
        subheader='Todos os planos adquiridos pelos clientes'
        subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
      />
      <CardContent>
        <Box sx={{ height: 350 }}>
          <ResponsiveContainer>
            <PieChart height={350} style={{ direction: 'ltr' }}>
              <Pie data={data} innerRadius={80} dataKey='value' label={renderCustomizedLabel} labelLine={false}>
                {data.map((entry: any, index: any) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 4, justifyContent: 'center' }}>
          <Box
            sx={{
              mr: 6,
              display: 'flex',
              alignItems: 'center',
              '& svg': { mr: 1.5, color: '#826bf8' }
            }}
          >
            <Icon icon='mdi:circle' fontSize='0.75rem' />
            <Typography variant='body2'>Plano Free</Typography>
          </Box>
          <Box
            sx={{
              mr: 6,
              display: 'flex',
              alignItems: 'center',
              '& svg': { mr: 1.5, color: '#FDB528' }
            }}
          >
            <Icon icon='mdi:circle' fontSize='0.75rem' />
            <Typography variant='body2'>Plano Gold</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RechartsPieChart


