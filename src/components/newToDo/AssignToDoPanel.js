import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Box, Grid, Fab } from '@material-ui/core';
import { Check, ArrowBack } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux'
import { ASSIGNEDTO } from '../../actions/types';



const AssignToDoPanel = (props) => {
  const stateValues = useSelector(state => state);
  const [assignTo, setAssignTo] = useState('');
  const [warning, setWarning] = useState('')
  const [assignedUserName, setassignedUserName] = React.useState('');


  const { onSubmit, previousPage } = props;
  const dispatch = useDispatch()

  return (
    <Box mt={7}>
      <Grid container direction="column" spacing={1}>
        <Grid item xs>
          <FormControl variant="outlined" style={{
            width: "100%", maxHeight: 'unset',
            maxWidth: 'unset',
          }} >

            Assign To
        <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={assignTo}
              onChange={(e) => {
                setAssignTo(e.target.value)
              }}
              label="Select User"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {props.users.map((user, index) => {
                return (
                  <MenuItem key={index} value={user._id} onClick={(e) => {
                    setassignedUserName(user.name)
                  }}>{user.name}</MenuItem>
                )
              })}

            </Select>
            <span style={{ color: "red" }}>{warning}</span>

          </FormControl>
        </Grid>
        <Grid container item direction="row-reverse" spacing={1} xs >
          <Grid item>
            <Fab color="primary" className="btn-pill pull-right" onClick={() => {
              if (assignTo !== '') {
                dispatch({ type: ASSIGNEDTO, payload: { assignedto: assignTo, assignedUserName } });
                onSubmit();
              } else {
                setWarning('Please Assign a User*')

              }
            }}>
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


export default AssignToDoPanel