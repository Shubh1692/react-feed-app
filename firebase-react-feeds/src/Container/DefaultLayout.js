import React, { Fragment } from 'react';
import Header from './Header';
import ListContainer from './ListContainer';

function DefaultLayout() {
    return (
        <Fragment>
            <Header />
            <ListContainer />
        </Fragment>
    )
}

export default DefaultLayout;