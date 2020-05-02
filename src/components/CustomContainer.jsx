import React from 'react'
import { Grid, Container, makeStyles } from '@material-ui/core';

function CustomContainer({ children }) {
    return (
        <Container maxWidth="sm" style={{ marginTop: 20 }}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center">
                {children}
            </Grid>

        </Container>
    )
}

export default CustomContainer