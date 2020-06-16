import React, { Component } from 'react';
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'
import Table from '../components/Table';
import callAPI from '../lib/axios'
import { confirmAlert } from "react-custom-confirm-alert";
import "react-custom-confirm-alert/src/react-confirm-alert.css";
import Alert from '../components/common/Alert'


class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            rating: 1,
            alertFlag: '',
            message: '',
            showAlertFlag: false
        }
    }
    componentDidMount() {
        this.getUserDetails()
    }
    handleDeleteUsers(userId) {
        console.log(userId)
        confirmAlert({
            title: <h4>Confirm to Delete the User</h4>,
            message: "Are you sure to do this.",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        try {

                            callAPI('delete', `/user/`, {
                                data: {
                                    userId
                                }
                            })

                            window.location.reload();
                        } catch (error) {
                            alert("Error in Deleting User!")

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
    handleUpdateStatus(userId, status) {
        confirmAlert({
            title: <h4>Confirm to {status === true ? 'Activate' : 'Deactivate'} the User</h4>,
            message: "Are you sure to do this.",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        try {

                            callAPI('put', `/user/${userId}/${status}`)

                            window.location.reload();
                        } catch (error) {
                            alert("Error in updating status!")

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
    getUserDetails = async () => {
        try {
            const response = await callAPI('get', '/user/')
            if (parseInt(response.status) === 200) {

                this.setState({ users: response.data.message });
            } else {

                this.setState({ alertFlag: false })
                this.setState({ showAlertFlag: true })
                this.setState({ message: 'An Error Occurred while fetching Users!Try Again!' })

            }
        } catch (error) {
            this.setState({ alertFlag: false })
            this.setState({ showAlertFlag: true })
            this.setState({ message: 'An Error Occurred while fetching Users!Try Again!' })

        }
    }

    hanleUpdateRating = async (rating, userId) => {
        try {
            const response = await callAPI('put', `/user/rating/${userId}/${rating}`)
            if (parseInt(response.status) !== 200) {
                this.setState({ alertFlag: false })
                this.setState({ showAlertFlag: true })
                this.setState({ message: 'An Error Occurred while Rating Users!Try Again!' })

            } else {
                window.location.reload()
            }
        } catch (error) {
            this.setState({ alertFlag: false })
            this.setState({ showAlertFlag: true })
            this.setState({ message: 'An Error Occurred while Rating Users!Try Again!' })

        }
    }

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <SideBar />
                <div className="content"><br />
                    <div className="container mt-5">
                        <h1 style={{ fontFamily: 'PT Serif' }}>List of Users</h1><br />
                        <Table data={this.state.users}
                            handleUpdateStatus={this.handleUpdateStatus}
                            handleDeleteUsers={this.handleDeleteUsers}
                            hanleUpdateRating={this.hanleUpdateRating}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Users;