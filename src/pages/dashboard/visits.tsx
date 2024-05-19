// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { ChangeEvent, forwardRef, useEffect, useState } from 'react'
import { getMetrics } from 'src/services/metrics'
import { MetricsModel } from 'src/models/metrics'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { Button, Grid, TextField } from '@mui/material'

import CardHeader from '@mui/material/CardHeader'

import ptBR from 'date-fns/locale/pt-BR'

interface MetricsSummary {
    totalAccesses: number;
    desktopAccesses: number;
    mobileAccesses: number;
    roundDesktopPercentage: number;
    roundMobilePercentage: number;
}

interface CustomInputProps {
    value: DateType
    label: string
    error: boolean
    onChange: (event: ChangeEvent) => void
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
    return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const CardStatsTotalVisits = () => {

    const [metrics, setMetrics] = useState<MetricsModel[]>([])
    const [desktopAccesses, setDesktopAccesses] = useState(0)
    const [desktopPercentage, setDesktopPercentage] = useState(0)
    const [mobileAccesses, setMobileAccesses] = useState(0)
    const [mobilePercentage, setMobilePercentage] = useState(0)
    const [initialDate, setInitialDate] = useState<Date>(new Date())
    const [FinalDate, setFinalDate] = useState<Date>(new Date())

    useEffect(() => {
        handleGetMetrics()
    }, [])

    const handleGetMetrics = async (initialDate?: Date, finalDate?: Date) => {
        const responseMetrics = await getMetrics(undefined, initialDate === undefined ? new Date() : initialDate, finalDate === undefined ? new Date() : finalDate)
        setMetrics(responseMetrics.data)
        const { desktopAccesses, roundDesktopPercentage, mobileAccesses, roundMobilePercentage } = calculateMetricsSummary(responseMetrics.data)

        setDesktopAccesses(desktopAccesses)
        setDesktopPercentage(roundDesktopPercentage)
        setMobileAccesses(mobileAccesses)
        setMobilePercentage(roundMobilePercentage)
    }

    const roundTwoPlacesDecimals = (_number: number) => {
        const housesDecimals = 2;
        const fator = Math.pow(10, housesDecimals);
        return Math.round(_number * fator) / fator;
    };


    const calculateMetricsSummary = (metrics: MetricsModel[]): MetricsSummary => {
        let totalAccesses = 0;
        let desktopAccesses = 0;
        let mobileAccesses = 0;
        let desktopPercentage = 0;
        let mobilePercentage = 0;

        // Conta o número de acessos desktop e mobile
        metrics.forEach(metric => {
            totalAccesses++;
            if (metric.isMobile === "true") {
                mobileAccesses++;
            } else {
                desktopAccesses++;
            }
        });

        // Calcula as porcentagens
        if (totalAccesses > 0) {
            desktopPercentage = (desktopAccesses / totalAccesses) * 100;
            mobilePercentage = (mobileAccesses / totalAccesses) * 100;
        }

        const roundDesktopPercentage = roundTwoPlacesDecimals(desktopPercentage)
        const roundMobilePercentage = roundTwoPlacesDecimals(mobilePercentage)

        return {
            totalAccesses,
            desktopAccesses,
            mobileAccesses,
            roundDesktopPercentage,
            roundMobilePercentage
        };
    };

    const onChangeInitialDate = (e: any) => {
        setInitialDate(e)
    }

    const onChangeFinalDate = (e: any) => {
        setFinalDate(e)
    }

    return (
        <Card>
            <CardHeader
                title='Visitas feitas ao APP'
                subheader='Todas as visitas feitas pelos clientes'
                subheaderTypographyProps={{ sx: { color: theme => `${theme.palette.text.disabled} !important` } }}
            />
            <CardContent>
                <Box sx={{ mb: 6.5, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Box>
                        <Grid container spacing={5}>
                            <Grid item xs={5}>
                                <DatePicker
                                    selected={initialDate}
                                    showYearDropdown
                                    showMonthDropdown
                                    onChange={e => onChangeInitialDate(e)}
                                    dateFormat="P"
                                    locale={ptBR}
                                    customInput={
                                        <CustomInput
                                            value={initialDate}
                                            onChange={onChangeInitialDate}
                                            error={false}
                                            aria-describedby='validation-basic-dob'
                                            label='Data Inicial'
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <DatePicker
                                    selected={FinalDate}
                                    showYearDropdown
                                    showMonthDropdown
                                    onChange={e => onChangeFinalDate(e)}
                                    dateFormat="P"
                                    locale={ptBR}
                                    customInput={
                                        <CustomInput
                                            value={FinalDate}
                                            onChange={onChangeFinalDate}
                                            error={false}
                                            aria-describedby='validation-basic-dob'
                                            label='Data Final'
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button size='large' type='button' onClick={() => handleGetMetrics(initialDate, FinalDate)} variant='contained'>
                                    Buscar
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box sx={{ mb: 6.5, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant='body2'>Total de Visitas</Typography>
                        <Typography variant='h6'>{metrics.length}</Typography>
                    </Box>
                </Box>
                <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}>
                            <CustomAvatar
                                skin='light'
                                color='warning'
                                variant='rounded'
                                sx={{ mr: 1.5, height: 24, width: 24, borderRadius: '6px' }}
                            >
                                <Icon icon='mdi:cellphone' fontSize='0.875rem' />
                            </CustomAvatar>
                            <Typography variant='body2'>Mobile</Typography>
                        </Box>
                        <Typography variant='h6'>{`${mobilePercentage} %`}</Typography>
                        <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                            {mobileAccesses}
                        </Typography>
                    </Box>
                    <Divider flexItem sx={{ m: 0 }} orientation='vertical'>
                        <CustomAvatar
                            skin='light'
                            color='secondary'
                            sx={{ height: 24, width: 24, fontSize: '0.6875rem', color: 'text.secondary' }}
                        >
                            VS
                        </CustomAvatar>
                    </Divider>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
                        <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ mr: 1.5 }} variant='body2'>
                                Desktop
                            </Typography>
                            <CustomAvatar skin='light' variant='rounded' sx={{ height: 24, width: 24, borderRadius: '6px' }}>
                                <Icon icon='mdi:monitor' fontSize='0.875rem' />
                            </CustomAvatar>
                        </Box>
                        <Typography variant='h6'>{`${desktopPercentage} %`}</Typography>
                        <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                            {desktopAccesses}
                        </Typography>
                    </Box>
                </Box>
                <LinearProgress
                    value={mobilePercentage}
                    variant='determinate'
                    sx={{
                        height: 10,
                        '&.MuiLinearProgress-colorPrimary': { backgroundColor: 'primary.main' },
                        '& .MuiLinearProgress-bar': {
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            backgroundColor: 'warning.main'
                        }
                    }}
                />
            </CardContent>
        </Card>
    )
}

export default CardStatsTotalVisits
