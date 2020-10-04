import React, { Component } from 'react';
import {NoFeed} from '../app-style';

class NoFeedAdded extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <NoFeed> No Feed Added</NoFeed>
         );
    }
}
 
export default NoFeedAdded;