import React, { Component } from 'react';

import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'
import TaskCard from '../components/TaskCard'
import callAPI from '../lib/axios'
import { confirmAlert } from "react-custom-confirm-alert";

class TaskView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            userTasks: [],
            role: localStorage.getItem('role'),
            alertFlag: '',
            message: '',
            showAlertFlag: false
        }
    }
    componentDidMount() {

        if (this.state.role === 'ADMIN') {
            this.getAllTasks()
        } else if (this.state.role === 'USER') {

            this.getUserTasks()

        }
    }
    getUserTasks = async () => {
        try {
            const response = await callAPI('get', `/task/${localStorage.getItem('id')}`)
            if (parseInt(response.status) === 200) {

                this.setState({ userTasks: response.data.message });
            } else {
                this.setState({ alertFlag: false })
                this.setState({ showAlertFlag: true })
                this.setState({ message: 'Error in fetching Tasks' })
            }
        } catch (error) {
            this.setState({ alertFlag: false })
            this.setState({ showAlertFlag: true })
            this.setState({ message: 'Error in fetching Tasks' })
        }
    }
    getAllTasks = async () => {
        try {
            const response = await callAPI('get', '/task/')
            if (parseInt(response.status) === 200) {

                this.setState({ tasks: response.data.message });
                console.log(response.data.message)
            } else {
                this.setState({ alertFlag: false })
                this.setState({ showAlertFlag: true })
                this.setState({ message: 'Error in fetching Tasks' })
            }
        } catch (error) {
            this.setState({ alertFlag: false })
            this.setState({ showAlertFlag: true })
            this.setState({ message: 'Error in fetching Tasks' })
        }
    }
    _renderTaskCards = () => {

        return (
            <div>
                {this.state.tasks.map((task, index) => (
                    <div key={index}>
                        <br />
                        <TaskCard
                            taskDetails={task}
                        />
                    </div>
                ))}
            </div>
        )
    }
    handleScheduleDeliveryDate(taskId, deliveryDate) {
        console.log(taskId, deliveryDate)
        confirmAlert({
            title: <h4>Confirm to Schedule the delivery Date On {deliveryDate.toString().slice(0, -40)} </h4>,
            message: "Are you sure to do this.",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {

                        try {

                            callAPI('put', `/task/deliverydate/${taskId}/${deliveryDate.toString().slice(0, -40)}`)

                            alert('Delivery Date Scheduled!')
                            window.location.reload();
                        } catch (error) {
                            alert('Error in Scheduling Delivery Date!Try Again!')


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
    _renderUserTaskCards = () => {
        return (
            <div>
                {this.state.userTasks.map((task, index) => (
                    <div key={index}>
                        <br />
                        <TaskCard
                            taskDetails={task}
                            handleScheduleDeliveryDate={this.handleScheduleDeliveryDate}
                        />
                    </div>
                ))}
            </div>
        )
    }

    render() {

        return (

            <React.Fragment>
                <NavBar />
                <SideBar />
                {this.state.role === 'ADMIN' &&
                    <div className="content"><br />

                        <div className="container mt-5">
                            <h1 style={{ fontFamily: 'PT Serif' }}>All Tasks</h1>
                            <br />
                            {this.state.showAlertFlag ? <Alert flag={this.state.alertFlag} message={this.state.message} /> : ''}
                            {this._renderTaskCards()}

                        </div>
                    </div>
                }
                {this.state.role === 'USER' &&
                    <div className="content"><br />

                        <div className="container mt-5">
                            <h1 style={{ fontFamily: 'PT Serif' }}>My Tasks</h1>
                            {this.state.showAlertFlag ? <Alert flag={this.state.alertFlag} message={this.state.message} /> : ''}
                            <br />
                            {this._renderUserTaskCards()}

                        </div>
                    </div>
                }


            </React.Fragment>
        );
    }
}

export default TaskView;