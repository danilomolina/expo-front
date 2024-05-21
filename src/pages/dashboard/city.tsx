// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { useEffect, useState } from 'react'
import { getPeopleByTopCities } from 'src/services/people'
import { CardContent } from '@mui/material'
import dynamic from 'next/dynamic'

const ReactApexcharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const CardTopCity = () => {
  // ** Hook
  const theme = useTheme()

  const [categories, setCategories] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    getAllPeopleByCity(false)
  }, [])

  const getAllPeopleByCity = async (all: boolean) => {
    const responseTop = await getPeopleByTopCities(all)

    const _categories: any = []
    const _data: any = []

    if (responseTop.data !== undefined) {
      responseTop.data.map((category: any) => {
        _categories.push(category.city)
        _data.push(category.count)
      })
    }

    setCategories(_categories)
    setData(_data)
  }

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: [
      hexToRGBA('#FDB528', 2),
      hexToRGBA(theme.palette.primary.main, 1),
      hexToRGBA('#FDB528', 2),  
      hexToRGBA(theme.palette.primary.main, 1)
    ],
    grid: {
      show: false,
      padding: {
        top: -15,
        left: -7,
        right: -4
      }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        distributed: true,
        columnWidth: '55%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: categories,
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    yaxis: { show: false }
  }

  return (
    <Card>
      <CardHeader
        title='Top 4 Cidades'
        subheader=''
        subheaderTypographyProps={{ sx: { lineHeight: 1.429 } }}
        titleTypographyProps={{ sx: { letterSpacing: '0.15px' } }}
      />
      <CardContent>
        <ReactApexcharts type='bar' height={222} options={options} series={[{ data: data }]} />
        <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <CustomAvatar skin='light' variant='rounded' onClick={() => getAllPeopleByCity(false)} style={{ cursor: 'pointer' }}>
            <Icon icon='mdi:chevron-left' />
          </CustomAvatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          </Box>
          <CustomAvatar skin='light' variant='rounded' onClick={() => getAllPeopleByCity(true)} style={{ cursor: 'pointer' }}>
            <Icon icon='mdi:chevron-right' />
          </CustomAvatar>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardTopCity
