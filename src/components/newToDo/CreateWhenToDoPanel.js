import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { Box, Grid, Fab } from '@material-ui/core';
import {
  MuiPickersUtilsProvider, KeyboardDatePicker
} from '@material-ui/pickers';
import { useSelector, useDispatch } from 'react-redux'
import { Check, ArrowBack } from '@material-ui/icons';

import { DUEDATE } from '../../actions/types';


const CreateWhenToDoPanel = (props) => {
  const [dueDate, setDueDate] = useState(new Date());
  const stateValues = useSelector(state => state);


  const { onSubmit, previousPage } = props;
  const dispatch = useDispatch()
  return (
    <Box ml={15} mt={7}>
      <Grid container direction="column" spacing={1}>
        <Grid item xs>
          <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              autoOk
              margin="normal"
              id="date-picker-inline"
              label="Pick a Date"
              value={dueDate}
              onChange={(e) => {
                setDueDate(e)
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid container item direction="row-reverse" spacing={1} xs >
          <Grid item>
            <Fab color="primary" className="btn-pill pull-right" onClick={() => {
              dispatch({ type: DUEDATE, payload: dueDate });
              onSubmit();
            }
            }>
              <Check></Check>
            </Fab>
          </Grid>
          <Grid item>
            <Fab color="primary" onClick={previousPage}>
              <ArrowBack></ArrowBack>
            </Fab>
          </Grid>

        </Grid>
      </Grid>
    </Box>
  );
};


export default CreateWhenToDoPanel;