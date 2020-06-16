import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PeopleIcon from '@material-ui/icons/People';
import ListIcon from '@material-ui/icons/List';
import ScheduleIcon from '@material-ui/icons/Schedule';

const SideBar = () => {
    const [role, setRole] = useState('')
    useEffect(() => {
        setRole(localStorage.getItem('role'))
    }, [])
    return (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link" href="/login">

                        </a>
                    </li>
                    {role === 'ADMIN' &&
                        <React.Fragment>
                            <li className="nav-item">
                                <a className="nav-link" href="/users">
                                    <PeopleIcon /> Users
                    </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="/home">
                                    <ListIcon /> ToDos
                    </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="/newtodo">
                                    <AddCircleIcon /> Add New ToDo

                    </a>

                            </li>
                        </React.Fragment>
                    }
                    {role === 'USER' &&
                        <React.Fragment>
                            <li className="nav-item">
                                <a className="nav-link" href="/user/todos">
                                    <ListIcon />To Dos
                                 </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="/home">
                                    <ScheduleIcon /> Schedule ToDos
                                </a>
                            </li>
                        </React.Fragment>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default SideBar;