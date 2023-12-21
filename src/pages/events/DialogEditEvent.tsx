// ** React Imports
import { Ref, useState, forwardRef, ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { EventModel } from 'src/models/event'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface DialogEditEventParams {
  showDialogEdit: boolean
  setShowDialogEdit: (value: boolean) => void
}

const DialogEditEvent = (props: DialogEditEventParams) => {
  // ** States
  //const [show, setShow] = useState<boolean>(false)
  const [languages, setLanguages] = useState<string[]>([])
  const [event, setEvent] = useState<EventModel>()

  const handleChange = (event: SelectChangeEvent<typeof languages>) => {
    const {
      target: { value }
    } = event
    setLanguages(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <Card>

      <Dialog
        fullWidth
        open={props.showDialogEdit}
        maxWidth='md'
        scroll='body'
        onClose={() => props.setShowDialogEdit(false)}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={() => props.setShowDialogEdit(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Editar informações do Evento
            </Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <TextField
                value={event?.title}
                label='Título'
                onChange={(e) => setEvent({ ...event, title: e.target.value })}
                aria-describedby='validation-schema-first-name'
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                value={value}
                label='Sub Título'
                onChange={onChange}
                error={Boolean(errors.caption)}
                aria-describedby='validation-schema-last-name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth defaultValue='oliverQueen' label='Username' placeholder='johnDoe' />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                label='Billing Email'
                placeholder='johnDoe@email.com'
                defaultValue='oliverQueen@email.com'
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id='status-select'>Status</InputLabel>
                <Select defaultValue='Status' fullWidth labelId='status-select' label='Status'>
                  <MenuItem value='Status'>Status</MenuItem>
                  <MenuItem value='Active'>Active</MenuItem>
                  <MenuItem value='Inactive'>Inactive</MenuItem>
                  <MenuItem value='Suspended'>Suspended</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth label='Tax ID' placeholder='Tax-7490' defaultValue='Tax-8894' />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth label='Contact' placeholder='+ 123 456 7890' defaultValue='+1 609 933 4422' />
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id='language-select'>Language</InputLabel>
                <Select
                  multiple
                  fullWidth
                  label='Language'
                  value={languages}
                  onChange={handleChange}
                  labelId='language-select'
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value='English'>English</MenuItem>
                  <MenuItem value='Spanish'>Spanish</MenuItem>
                  <MenuItem value='French'>French</MenuItem>
                  <MenuItem value='German'>German</MenuItem>
                  <MenuItem value='Hindi'>Hindi</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id='country-select'>Country</InputLabel>
                <Select
                  fullWidth
                  label='Country'
                  placeholder='UK'
                  labelId='country-select'
                  defaultValue='Select Country'
                >
                  <MenuItem value='Select Country'>Select Country</MenuItem>
                  <MenuItem value='France'>France</MenuItem>
                  <MenuItem value='Russia'>Russia</MenuItem>
                  <MenuItem value='China'>China</MenuItem>
                  <MenuItem value='UK'>UK</MenuItem>
                  <MenuItem value='US'>US</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label='Make this default shipping address'
                sx={{
                  '& .MuiFormControlLabel-label': {
                    color: 'text.secondary'
                  }
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} onClick={() => props.setShowDialogEdit(false)}>
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => props.setShowDialogEdit(false)}>
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default DialogEditEvent
