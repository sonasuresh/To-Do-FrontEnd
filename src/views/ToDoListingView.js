import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { Typography, Grid, Box, Button, Paper } from '@material-ui/core';
import ToDoDisplayGrid from '../components/todo/ToDoDisplayGrid';
import moment from 'moment';
import SideBar from '../components/SideBar'
import callAPI from '../lib/axios'
import NavBar from '../components/NavBar'
import { confirmAlert } from "react-custom-confirm-alert";
import Alert from '../components/common/Alert'
import Divider from '@material-ui/core/Divider';
import {
    MuiPickersUtilsProvider, KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

class ToDoListingView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            todosBasedOnDate: [],
            date: new Date(),
            alertFlag: '',
            message: '',
            showAlertFlag: false
        }
    }
    componentDidMount() {
        this.getCurrentDayToDos()
    }
    getCurrentDayToDos = async () => {
        try {
            const today = new Date().toString().slice(0, -40).split(' ').join(' ')
            const response = await callAPI('get', `/task/${localStorage.getItem('id')}/${today}`)
            if (parseInt(response.status) === 200) {

                this.setState({ todos: response.data.message });
            } else {
                this.setState({ alertFlag: false })
                this.setState({ showAlertFlag: true })
                this.setState({ message: 'An Error Occurred while fetching ToDos!Try Again!' })
            }
        } catch (error) {
            this.setState({ alertFlag: false })
            this.setState({ showAlertFlag: true })
            this.setState({ message: 'An Error Occurred while fetching ToDos!Try Again!' })
        }
    }
    async getToDos() {
        try {
            const date = this.state.date.toString().slice(0, -40).split(' ').join(' ')
            const response = await callAPI('get', `/task/${localStorage.getItem('id')}/${date}`)
            if (parseInt(response.status) === 200) {

                this.setState({ todosBasedOnDate: response.data.message });
            } else {
                this.setState({ alertFlag: false })
                this.setState({ showAlertFlag: true })
                this.setState({ message: 'An Error Occurred while fetching ToDos!Try Again!' })
            }
        } catch (error) {
            this.setState({ alertFlag: false })
            this.setState({ showAlertFlag: true })
            this.setState({ message: 'An Error Occurred while fetching ToDos!Try Again!' })
        }
    }
    handleStatusChange(taskId, status, taskName) {
        confirmAlert({
            title: <h4>{status.toString() == 'true' ? `Delivered the ${taskName} parcel?` : `Not Yet Delivered the ${taskName} parcel?`}</h4>,
            message: "Are you sure to do this.",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        try {

                            callAPI('put', `/task/${taskId}/${status}`)
                            alert("Delivery Status Updated")
                            window.location.reload();
                        } catch (error) {
                            alert("Error in updating Delivery Status!")

                        }
                    }
                },
                {
                    label: "No",
                    onClick: () => { }
                }
            ]
        });
    }
    render() {
        return (
            <div>
                <React.Fragment>
                    <NavBar />
                    <SideBar />
                    <div className="content"><br />
                        <div className="container mt-5">
                            <Box m={5}>
                                <Grid container spacing={5}>

                                    <Grid item xs={12} sm={9}>
                                        {this.state.showAlertFlag ? <Alert flag={this.state.alertFlag} message={this.state.message} /> : ''}
                                        <Typography paragraph color="textPrimary">
                                            <Box m={2}>
                                                <Typography variant="h2" componennt="h2" align="right">
                                                    Your Great Day !
                                        </Typography>
                                                <Typography variant="h6" componennt="h6" align="right">
                                                    {moment(new Date()).format('DD MMMM')}
                                                </Typography>
                                            </Box>
                                            <Box m={5}>
                                                <ToDoDisplayGrid
                                                    todos={this.state.todos}
                                                    handleStatusChange={this.handleStatusChange}
                                                />
                                            </Box>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} >
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <Divider orientation="vertical" />
                                            </Grid>
                                            <Grid item xs>
                                                <Grid container direction="column" spacing={2}>
                                                    <Grid item xs>
                                                        <h4>Check ToDos</h4><br />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                                            <KeyboardDatePicker
                                                                disableToolbar
                                                                autoOk
                                                                variant="inline"
                                                                format="MM/dd/yyyy"
                                                                margin="normal"
                                                                id="date-picker-inline"
                                                                label="Pick a Date"
                                                                value={this.state.date}
                                                                onChange={(e) => {
                                                                    this.setState({ date: e });
                                                                }}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}
                                                            />
                                                        </MuiPickersUtilsProvider>
                                                        <Button variant="contained" color="primary"
                                                            onClick={() => {
                                                                this.getToDos()
                                                            }}
                                                        >
                                                            Check
                                                        </Button>
                                                        <div><br />
                                                            {this.state.todosBasedOnDate.map((todo, idx) => (
                                                                <div key={idx}>
                                                                    <Paper variant="outlined" elevation={3} >
                                                                        <div style={{ padding: "5px" }}>
                                                                            <div className="row">
                                                                                <div className="col-md-6">
                                                                                    <p><b>Description</b></p>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <p>{todo.description}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-md-6">
                                                                                    <p><b>Due Date</b></p>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <p>{todo.dueDate.toString()}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-md-6">
                                                                                    <p><b>Status</b></p>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    {todo.deliveryStatus.toString() == 'true' ? <p style={{ color: "green" }}><b>Delivered</b></p> : <p>Not Delivered</p>}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Paper><br />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={10}>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                    </div>
                </React.Fragment>
            </div >
        );
    }
}

export default ToDoListingView;