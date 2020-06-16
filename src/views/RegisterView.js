import React, { Component } from 'react';
import callAPI from '../lib/axios'
import { Link } from 'react-router-dom'

import Alert from '../components/common/Alert'

class RegisterView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            password: '',
            confirmPassword: '',
            name: '',
            alertFlag: '',
            message: '',
            showAlertFlag: false
        }
    }
    handleRegisterClick = async () => {
        const { name, mobile, password, confirmPassword } = this.state
        if (name === '' && mobile === '' && password === '') {
            this.setState({ alertFlag: false })
            this.setState({ showAlertFlag: true })
            this.setState({ message: 'Fill all fields' })
        } else {
            if (password === confirmPassword) {
                try {
                    const response = await callAPI('post', '/user/', {
                        data: {
                            name,
                            mobile,
                            password
                        }
                    })
                    if (response.status === 200) {
                        localStorage.setItem('token', response.data.jwttoken)
                        localStorage.setItem('email', response.data.email)
                        localStorage.setItem('id', response.data.id)
                        this.setState({ alertFlag: true })
                        this.setState({ showAlertFlag: true })
                        this.setState({ message: 'Registration Successful!' })
                        window.location = '/login'
                    } else {
                        this.setState({ alertFlag: false })
                        this.setState({ showAlertFlag: true })
                        this.setState({ message: 'An Error Occurred!Try Again!' })
                    }

                } catch (error) {
                    this.setState({ alertFlag: false })
                    this.setState({ showAlertFlag: true })
                    this.setState({ message: 'An Error Occurred!Try Again!' })
                }
            } else {
                this.setState({ alertFlag: false })
                this.setState({ showAlertFlag: true })
                this.setState({ message: 'Password and Confirm Password mismatch' })
            }

        }
    }
    render() {
        return (
            <div className="container" style={{ marginTop: "10%" }}>
                {this.state.showAlertFlag ? <Alert flag={this.state.alertFlag} message={this.state.message} /> : ''}
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="card">
                        <div className="card-body">
                            <div className="pt-5 login-bg h-100">
                                <div className="text-center">
                                    <h3>Register Here..!</h3>
                                    <div style={{ fontSize: 20 }} className="mt-5">
                                        <div
                                            className="mt-3"
                                            style={{ marginLeft: 100, marginRight: 100 }}
                                        >
                                            <input
                                                type="name"
                                                className="form-control text-center placeholder-colored"
                                                placeholder="Name"
                                                onChange={(e) => {
                                                    const { state: currentState } = this
                                                    currentState.name = e.target.value
                                                    this.setState(currentState)
                                                }}></input>
                                        </div>
                                        <div
                                            className="mt-3"
                                            style={{ marginLeft: 100, marginRight: 100 }}>
                                            <input
                                                className="form-control text-center placeholder-colored "
                                                placeholder="Enter mobile Number"
                                                onChange={(e) => {
                                                    const { state: currentState } = this
                                                    currentState.mobile = e.target.value
                                                    this.setState(currentState)
                                                }}></input>
                                        </div>
                                        <div
                                            className="mt-3"
                                            style={{ marginLeft: 100, marginRight: 100 }}
                                        >
                                            <input
                                                type="password"
                                                className="form-control text-center placeholder-colored"
                                                placeholder="Password"
                                                onChange={(e) => {
                                                    const { state: currentState } = this
                                                    currentState.password = e.target.value
                                                    this.setState(currentState)
                                                }}></input>
                                        </div>
                                        <div
                                            className="mt-3"
                                            style={{ marginLeft: 100, marginRight: 100 }}
                                        >
                                            <input
                                                type="password"
                                                className="form-control text-center placeholder-colored"
                                                placeholder="Confirm Password"
                                                onChange={(e) => {
                                                    const { state: currentState } = this
                                                    currentState.confirmPassword = e.target.value
                                                    this.setState(currentState)
                                                }}></input>
                                        </div>
                                        <div
                                            className="mt-3 rounded"
                                        >
                                            <button
                                                className="btn btn-dark w-25"
                                                style={{ marginLeft: 120, marginRight: 100 }}
                                                onClick={this.handleRegisterClick}>
                                                Register
                                        </button><br /><br />
                                            <Link to="/login" className="link">
                                                Registered?Click Here to Login!
            				                </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterView;