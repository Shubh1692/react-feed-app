import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { AppHeader, Title, TitleH3 } from '../app-style';
import AddEditFeed from '../Components/AddEditFeed';


function Header() {
    const [open, openAdd] = useState(false);
    return (
        <Fragment>
            <AppHeader >
                <Title><TitleH3>Feeds</TitleH3></Title>
                <button onClick={() => openAdd(true)} className="ui primary basic button">Add</button>
            </AppHeader>
            <AddEditFeed open={open} handleClose={() => openAdd(false)} />
        </Fragment>
    )
}

// get reducer state
const mapStateToProps = (state) => {
    return {
        feedList: state.feedReducer
    }
}
export default connect(mapStateToProps)(Header);