import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';

export default function KeyValueDisplay({ keyData, value }) {
    return (
        <Box ml={10}>
            <Grid container direction="row" spacing={3}>
                <Grid item >
                    <Typography variant="body1" style={{ fontFamily: 'PT Serif' }}>
                        {keyData}
                    </Typography>
                </Grid>
                <Grid item >
                    <Typography paragram style={{ fontFamily: 'PT Serif' }}>{value}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
}