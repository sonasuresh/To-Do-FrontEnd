import React, { useState, useCallback } from 'react';
import { TextField, Button, Box } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { Fab, Grid } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { DESCRIPTION } from '../../actions/types';

const CreateToDoPanel = (props) => {
  const { onSubmit } = props;
  const descriptionFromStore = useSelector(state => state.form.description);
  const [description, setDescription] = useState(descriptionFromStore)
  const dispatch = useDispatch()
  const [warning, setWarning] = useState('')
  const handleDescriptionChange = useCallback((e) => setDescription(e.currentTarget.value), [])
  const handleSubmit = useCallback(() => {
    if (description !== '') {
      dispatch({ type: DESCRIPTION, payload: description });
      onSubmit();
    } else {
      setWarning('Please Fill Out the Field *')
    }

  }, [dispatch, description, onSubmit])

  return (
    <Box mt={7}>
      <Grid container direction="column" spacing={1}>
        <Grid item xs>


          <TextField
            required
            id="outlined-required"
            label="Description"
            variant="outlined"
            value={description}
            fullWidth
            onChange={handleDescriptionChange}
          /></Grid>
        <span style={{ color: "red" }}>{warning}</span>
        <br />
        <Grid container item direction="row-reverse" spacing={1} xs >
          <Grid item>
            <Fab color="primary" className="btn-pill pull-right" onClick={handleSubmit}>
              <Check></Check>
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateToDoPanel