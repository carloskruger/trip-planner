import React, {Component} from 'react';
import UpdateTrip from './UpdateTrip';
import Picture from './Note';
import Note from './Note';

class Trip extends Component {

    render(){
        return(<div>
            Trip Component
            I think I have to get all picture and all notes 
            should load
            <UpdateTrip />
            <Picture/>
            <Note/>
        </div>)
    }
}

export default Trip;