import React, { Component, useState } from 'react';
import Card from '@material-ui/core/Card';
import { Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import moment from 'moment'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Event from '@material-ui/icons/Event';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';

import {
    MuiPickersUtilsProvider,
    DatePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const TaskCard = (props) => {
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="down" ref={ref} {...props} />;
    });
    const classes = useStyles();
    const [role] = useState(localStorage.getItem('role'))
    const [dueDate, setDueDate] = React.useState(new Date());
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleConfirm = (id) => {
        setOpen(false);

        props.handleScheduleDeliveryDate(id, deliveryDate)
    }
    const [deliveryDate, setDeliveryDate] = React.useState(new Date());

    return (
        <Box
            bgcolor="background.paper"
            boxShadow={3}>
            <Card className={classes.root}>
                <CardContent>
                    <div className="row">
                        <div className="col-2"><b>Task:</b></div>
                        <div className="col-4">
                            {props.taskDetails.description}

                        </div>
                        <div className="col-6" style={{ float: "right" }}>

                            {role === 'USER' ?
                                props.taskDetails.deliveryStatus.toString() == 'true' ? '' :
                                    <div style={{ float: "right" }}>
                                        <IconButton size="small" onClick={() => handleClickOpen()} title="Choose a delivery Date">
                                            <Event
                                                fontSize="small"
                                                variant="outlined"
                                                className="icon-pointer"
                                            />
                                        </IconButton>
                                        <Dialog
                                            open={open}
                                            keepMounted
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-slide-title"
                                            aria-describedby="alert-dialog-slide-description"
                                        >
                                            <DialogTitle id="alert-dialog-slide-title">{"Pick a Delivery Date"}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-slide-description">
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <br />
                                                        <Grid container>

                                                            <KeyboardDatePicker
                                                                disableToolbar
                                                                autoOk
                                                                variant="inline"
                                                                format="MM/dd/yyyy"
                                                                margin="normal"
                                                                id="date-picker-inline"
                                                                label="Select Date"
                                                                value={deliveryDate}
                                                                onChange={(e) => {
                                                                    setDeliveryDate(e)
                                                                }}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                            />
                                                        </Grid>
                                                    </MuiPickersUtilsProvider>
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose} color="primary" variant="outlined">
                                                    Cancel
                                             </Button>
                                                <Button onClick={() => { handleConfirm(props.taskDetails._id) }} color="primary" variant="contained">
                                                    Confirm
                                          </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                : ''}
                        </div>


                    </div>
                    {role === 'ADMIN' &&
                        <div><br />
                            <div className="row">
                                <div className="col-2"><b>Assigned To:</b></div>
                                <div className="col-10">
                                    {props.taskDetails.user.name}

                                </div><br />
                            </div>
                        </div>
                    }

                    <br />
                    <div className="row">
                        <div className="col-2"><b>Due Date</b></div>
                        <div className="col-10">
                            {moment(props.taskDetails.dueDate).format("MMM Do YY")}

                        </div>

                    </div><br />
                    <div className="row">
                        <div className="col-2"><b>Delivery Status</b></div>
                        <div className="col-10">
                            {props.taskDetails.deliveryStatus.toString() == 'true' ? <p> <b style={{ color: "lightgreen" }}>Delivered</b></p> : <p>Not yet Delivered</p>}

                        </div>

                    </div>
                    {!props.taskDetails.deliveryDate ? <p></p> :
                        <div className="row">

                            <div className="col-2"><b>Delivery Date</b></div>
                            <div className="col-10">
                                {props.taskDetails.deliveryDate}
                            </div>

                        </div>
                    }


                </CardContent>
            </Card>
        </Box>
    );
}

export default TaskCard;