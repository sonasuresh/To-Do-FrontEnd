import React from 'react';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    ExpansionPanelDetails,
    Paper,
    Grid,
    Box,
    InputLabel,
} from '@material-ui/core';

import {
    ExpandMore,
    NewReleasesOutlined,
    DoneAll,
    Close
} from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';

export default function ToDoCard({
    taskId,
    title,
    duedate,
    handleStatusChange,
    status
}) {

    return (
        <Paper elevation={5}>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item>
                                    <Typography component="h5" variant="h5">
                                        {title}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item></Grid>
                        <Grid item>
                            <Typography color="textSecondary" variant="subtitle1">
                                Due Date : {duedate}
                            </Typography>
                        </Grid>
                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ float: "right" }}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >   {status}
                        {status.toString() == 'true' ? <h3 style={{ color: "green" }}>Delivered</h3> :
                            <Grid item>
                                <Box mb={2}>
                                    <InputLabel >
                                        <Typography container="h6" variant="h6" >
                                            Delivered ? <Fab style={{ backgroundColor: "green" }} onClick={() => {
                                                handleStatusChange(taskId, 'true', title)
                                            }}>
                                                <DoneAll style={{ color: "white" }} />

                                            </Fab>&nbsp;
                                        <Fab color="secondary" onClick={() => {
                                                handleStatusChange(taskId, 'false', title)
                                            }}>
                                                <Close />

                                            </Fab>
                                        </Typography>
                                    </InputLabel>
                                </Box>
                            </Grid>}
                        <Grid item></Grid>
                    </Grid>

                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Paper>
    );
}