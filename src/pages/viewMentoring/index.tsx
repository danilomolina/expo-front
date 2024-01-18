import { Chip, Divider, Grid, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import { MentoringModel } from 'src/models/mentoring'
import { getMentoring } from 'src/services/mentoring'

const ViewMentoring = () => {

  const [mentorings, setMentorings] = useState<MentoringModel[]>()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    handleGetMentorings()
  }, [])

  const handleGetMentorings = async () => {
    const response = await getMentoring(0, 100, 0)
    setMentorings(response.data)
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }

  }, [windowWidth])

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
    <Paper style={{ width: '100%' }}>
      <div style={{ margin: 35, fontSize: 14, padding: 30 }}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={12}>
            <YouTube videoId={mentorings !== undefined ? getYoutubeId(mentorings[0].link) : ""} opts={windowWidth >= 960 ? opts : optsSmall} />
            <Typography style={{ fontSize: 23, fontWeight: 'bold' }} >
              {mentorings && mentorings[0].title} <br />
            </Typography>
            <Typography>
              Por:  {mentorings && mentorings[0].mentors} <br />
              <span style={{ fontSize: 16, fontWeight: 'bold' }}>Estreia: </span>{formattedDate(mentorings !== undefined ? mentorings[0].date : "", mentorings && mentorings[0].hour)}
            </Typography>
            <Typography>
              {mentorings && mentorings[0].caption}
            </Typography>
          </Grid>

       

          <Grid item xs={12} md={12}>
          <Divider>
            <Chip label="  Atidades anteriores" size="small" />
          </Divider> <br /><br />

            {mentorings && mentorings.map((item, key) => (
              <>
                <Grid container spacing={1} key={key}>
                  <Grid item xs={12} md={12}>
                    <YouTube videoId={item !== undefined ? getYoutubeId(item.link) : ""} opts={opts} />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography style={{ fontSize: windowWidth >= 960 ? 20 : 10, fontWeight: 'bold' }} >
                      {item.title} <br />
                    </Typography>
                    Por: {item.mentors}
                  </Grid>
                </Grid>
                <br /><br />
              </>
            ))}
          </Grid>
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
