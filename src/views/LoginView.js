import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import callAPI from '../lib/axios'
import Alert from '../components/common/Alert'
import { isUserAuthenticated, isAdminAuthenticated } from '../auth'
class LoginView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mobile: '',
            password: '',
            alertFlag: '',
            message: '',
            showAlertFlag: false
        }
    }
    componentDidMount() {
        localStorage.clear()
    }
    handleLoginClick = async () => {
        const { mobile, password } = this.state
        if (mobile === '' && password === '') {
            this.setState({ alertFlag: false })
            this.setState({ showAlertFlag: true })
            this.setState({ message: 'Cannot proceed without username and/or password' })
        } else {
            let response = null
            try {
                response = await callAPI('post', '/user/login', {
                    data: {
                        mobile,
                        password
                    }
                })
                if (parseInt(response.status) === 200) {

                    localStorage.setItem('token', response.data.jwttoken)
                    localStorage.setItem('role', response.data.role)
                    localStorage.setItem('id', response.data.id)

                    if (response.data.role === 'ADMIN') {
                        if (isAdminAuthenticated) {
                            this.setState({ alertFlag: true })
                            this.setState({ showAlertFlag: true })
                            this.setState({ message: 'Login Successful!' })
                            window.location = '/home'
                        } else {
                            window.location = '/login'
                        }

                    } else if (response.data.role === 'USER') {
                        if (isUserAuthenticated) {
                            this.setState({ alertFlag: true })
                            this.setState({ showAlertFlag: true })
                            this.setState({ message: 'Login Successful!' })
                            window.location = '/user/todos'
                        } else {
                            window.location = '/login'
                        }
                    }
                }

            } catch (error) {
                console.log(error.response.data.message)
                if (error.response.data.message == 'Not Active') {
                    this.setState({ alertFlag: false })
                    this.setState({ showAlertFlag: true })
                    this.setState({ message: 'You are an Inactive User!Contact Admin to get Activated!' })
                }
                else if (error.response.data.message == 'Wrong Password') {
                    this.setState({ message: 'Wrong Password' })
                    this.setState({ showAlertFlag: true })
                    this.setState({ alertFlag: false })
                }
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
                                    <h3>Login Here..!</h3>
                                    <div style={{ fontSize: 20 }} className="mt-5">
                                        <div
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
                                            className="mt-3 rounded"
                                        >
                                            <button
                                                className="btn btn-dark w-25"
                                                style={{ marginLeft: 120, marginRight: 100 }}
                                                onClick={this.handleLoginClick}>
                                                Login
            				                </button><br />
                                            <Link to="/register" className="link">
                                                Dont Have an Account? Sign Up
            				                </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default LoginView;