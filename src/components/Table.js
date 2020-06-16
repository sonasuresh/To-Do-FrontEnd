import MUIDataTable from "mui-datatables";
import React, { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



const Table = (props) => {
    const [user, setUser] = useState('')
    function setRating(value) {
        return (
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating
                    name="simple-controlled"
                    value={value}

                    onChange={(event, newValue) => {
                        props.hanleUpdateRating(event.target.value, user)
                    }}
                />
            </Box>
        )
    }


    const columns = [
        {
            name: "_id",
            options: {
                display: false,
            }
        },
        {
            name: "name",
            label: "Name",
            options: {
                selectableRowsOnClick: true,
                filter: true,
                sort: true,
            }
        },
        {
            name: "mobile",
            label: "Mobile",
            options: {
                selectableRowsOnClick: true,
                filter: true,
                sort: false,
            }
        },
        {
            name: "rating",
            label: "Rating",
            options: {
                selectableRowsOnClick: true,
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta) => (
                    <FormControlLabel
                        control={<div
                            onClick={() => {
                                setUser(tableMeta.rowData[0])

                            }

                            }
                        >
                            {
                                setRating(value)
                            }
                        </div>}
                    />


                )

            }
        },
        {
            name: "activeStatus",
            label: "ActiveStatus",
            options: {
                selectableRowsOnClick: true,
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta) => (
                    <FormControlLabel
                        control={<div
                            onClick={() => {
                                props.handleUpdateStatus(tableMeta.rowData[0], !value)
                            }

                            }>
                            {value.toString() === 'true' ? <p style={{ color: 'lightGreen' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Active</p> : <p style={{ color: 'red' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Inactive</p>}
                        </div>}

                    />
                )
            },

        },

    ];


    const options = {
        filterType: false,
        filter: false,
        download: false,
        print: false,
        viewColumns: false,
        onRowsDelete: (rowsDeleted, dataRows) => {
            console.log(rowsDeleted)
            const idsToDelete = rowsDeleted.data.map((d, index) => props.data[rowsDeleted.data[index].dataIndex]._id); // array of all ids to to be deleted
            props.handleDeleteUsers(idsToDelete)
        },
        textLabels: {
            body: {
                noMatch: 'No data to display',
            },
        },

    };
    return (
        <div>
            <MUIDataTable
                title={"Users List"}
                data={props.data}
                columns={columns}
                options={options}

            />
        </div>
    );
}

export default Table;

