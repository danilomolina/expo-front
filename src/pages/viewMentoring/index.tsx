import { Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import { MentoringModel } from 'src/models/mentoring'
import { getMentoring } from 'src/services/mentoring'

const ViewMentoring = () => {

    const [mentorings, setMentorings] = useState<MentoringModel[]>()

    useEffect(() => {
        handleGetMentorings()
    }, [])

    const handleGetMentorings = async () => {
        const response = await getMentoring(0, 100, 0)
        setMentorings(response.data)
    }

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0,
        },
    }

    const optsSmall = {
        height: '140',
        width: '180',
        playerVars: {
            autoplay: 0,
        },
    }

    const formattedDate = (date: string, hour: number | undefined) => {
        const dataObj = new Date(date)
        const formattedDate = `${dataObj.getDate()}/${dataObj.getMonth() + 1}/${dataObj.getFullYear()} as ${hour}`

        return formattedDate
    }

    function getYoutubeId(url: string) {
        const regex = /[?&]v=([^?&]+)/i;
        const match = url.match(regex);

        return match && match[1] ? match[1] : undefined;
    }

    return (
        <Paper>
            <div style={{ margin: 35, fontSize: 14, padding: 30 }}>
                <Typography variant="h5" >
                    {mentorings && mentorings[0].title} <br />
                </Typography>
                <Typography>
                    Mentores:  {mentorings && mentorings[0].mentors} <br />
                    Data: {formattedDate(mentorings !== undefined ? mentorings[0].date : "", mentorings && mentorings[0].hour)}
                </Typography>
                <YouTube videoId={mentorings !== undefined ? getYoutubeId(mentorings[0].link) : ""} opts={opts} />

                <Typography>
                    Descrição: {mentorings && mentorings[0].description}
                </Typography>
                <br />
                <Typography variant="h5" >
                    Mentorias anteriores <br />
                </Typography>
                <Grid container spacing={1}>
                    {mentorings && mentorings.map((item, key) => (
                        <Grid item xs={2} key={key}>
                            <YouTube videoId={item !== undefined ? getYoutubeId(item.link) : ""} opts={optsSmall} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Paper>
    )
}

ViewMentoring.acl = {
    action: 'read',
    subject: 'acl-page'
}

export default ViewMentoring