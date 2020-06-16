import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { useSelector } from 'react-redux'
import { Box, Grid, Fab, Typography } from '@material-ui/core';
import { ArrowBack, Check } from '@material-ui/icons';
import KeyValueDisplay from '../common/KeyValueDisplay';

const ConfirmToDoPanel = (props) => {
  const { onSubmit, previousPage } = props;
  const store = useSelector(state => state);
  return (

    <Box width="100%" padding="16px" >
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography variant="h5" style={{ fontFamily: 'PT Serif', marginLeft: "8%" }}>
            Here's what you need to do..,
          </Typography>
        </Grid>
        <Grid item>
          <KeyValueDisplay keyData="Description" value={store.form.description.toString()} />
          <KeyValueDisplay keyData="Due Date " value={store.form.duedate.toString().slice(0, -40)} />
          <KeyValueDisplay keyData="Assign To " value={store.form.assignedUserName.toString()} />
        </Grid>
      </Grid>
      <Grid container direction="row-reverse" spacing={1}>
        <Grid item>
          <Fab color="primary" className="btn-pill pull-right" type="submit" onClick={onSubmit} title="Confirm" >
            <Check />
          </Fab>
        </Grid>
        <Grid item>
          <Fab color="primary" onClick={previousPage} title="Go Back">
            <ArrowBack />
          </Fab>
        </Grid>
      </Grid>
    </Box>
  );
};


export default ConfirmToDoPanel;