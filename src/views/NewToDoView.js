import React, { Component, useState, useEffect } from 'react';
import Stepper from 'react-stepper-horizontal';
import { Card } from 'reactstrap';
import CreateToDoPanel from '../components/newToDo/CreateToDoPanel';
import AssignToDoPanel from '../components/newToDo/AssignToDoPanel';
import CreateWhenToDoPanel from '../components/newToDo/CreateWhenToDoPanel'
import ConfirmToDoPanel from '../components/newToDo/ConfirmToDoPanel'
import callAPI from '../lib/axios'
import { useSelector } from 'react-redux'

import Alert from '../components/common/Alert'
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'

const NewToDoView = () => {
    const store = useSelector(state => state);
    const steps = [
        { title: 'What' },
        { title: 'When' },
        { title: 'Who' },
        { title: 'Confirm' }
    ]
    const [page, setPage] = useState(0)
    const [users, setUsers] = useState([])
    const [alertFlag, setAlertFlag] = useState()
    const [message, setMessage] = useState()
    const [showAlertFlag, setShowAlertFlag] = useState(false)

    useEffect(() => {
        getActiveUsers()
    }, [])

    const getActiveUsers = async () => {
        try {
            const response = await callAPI('get', '/user/active')
            if (parseInt(response.status) === 200) {
                setUsers(response.data.message);

            } else {

                setAlertFlag(false)
                setShowAlertFlag(true)
                setMessage('An Error Occurred in Fetching Users!Try Again!')
            }
        } catch (error) {
            setAlertFlag(false)
            setShowAlertFlag(true)
            setMessage('An Error Occurred in Fetching Users!Try Again!')
        }
    }
    const nextPage = () => {
        setPage(page + 1);
    }

    const previousPage = () => {
        setPage(page - 1);
    }
    const addToDo = async () => {
        const { description, assignedto, duedate } = store.form
        try {
            const response = await callAPI('post', '/task/', {
                data: {
                    description,
                    assignedTo: assignedto,
                    dueDate: duedate.toString().slice(0, -40)
                }
            })
            if (parseInt(response.status) === 200) {
                setAlertFlag(true)
                setShowAlertFlag(true)
                setMessage('Task Created and Assigned Successfully')
                window.location.reload()
            } else {
                setAlertFlag(false)
                setShowAlertFlag(true)
                setMessage('An Error Occurred!Try Again!')
            }

        } catch (error) {
            setAlertFlag(false)
            setShowAlertFlag(true)
            setMessage('An Error Occurred!Try Again!')
        }
    }


    return (
        <React.Fragment>
            <NavBar />
            <SideBar />
            <div className="content"><br />
                <div className="container mt-5" >
                    <h1 style={{ fontFamily: 'PT Serif' }}>New To Do</h1><br /><br />
                    {showAlertFlag ? <Alert flag={alertFlag} message={message} /> : ''}

                    <Card style={{ padding: "3%" }}>
                        <Stepper steps={steps} activeStep={page} />
                        {page === 0 && <CreateToDoPanel onSubmit={nextPage} />}

                        {page === 1 && (
                            <CreateWhenToDoPanel
                                previousPage={previousPage}
                                onSubmit={nextPage}
                            />
                        )}
                        {page === 2 && (
                            <AssignToDoPanel
                                previousPage={previousPage}
                                onSubmit={nextPage}
                                users={users}
                            />
                        )}
                        {page === 3 && (
                            <ConfirmToDoPanel
                                previousPage={previousPage}
                                onSubmit={nextPage}
                            />
                        )}
                        {page === 4 && (
                            <ConfirmToDoPanel
                                previousPage={previousPage}
                                onSubmit={addToDo}
                            />
                        )}
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );


}

export default NewToDoView;