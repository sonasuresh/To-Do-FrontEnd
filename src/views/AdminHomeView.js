import React, { Component } from 'react';
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'

class AdminHomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <SideBar />
                <h1>Admin Home View</h1>
            </React.Fragment>
        );
    }
}

export default AdminHomeView;