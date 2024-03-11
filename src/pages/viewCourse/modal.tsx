import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Grid, Typography } from '@mui/material';
import CustomPlan from 'src/@core/components/customPlan';

export type Prosp = {
    open: boolean
    handleClose: () => void
}

export default function AlertDialog(props: Prosp) {

    return (
        <React.Fragment>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <Grid container spacing={6} >
                        <Grid item xs={12} md={12}>
                            <Typography sx={{ mb: 2, fontSize: 20, fontWeight: 'bold', textAlign: 'left', display: 'block', marginTop: 0 }}>
                                Você é Member Blue! Vire Member Dark Blue e tenha acesso a todos os cursos.
                            </Typography>
                        </Grid>

                        <CustomPlan />

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} autoFocus>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}