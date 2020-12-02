import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Planning from './components/Planning'
import Upcoming from './components/Upcoming'
import Completed from './components/Completed'
import Nav from './components/Nav';
import AddTrip from './components/AddTrip';
import Trip from './components/Trip';
import Register from './components/Register';
import Note from './components/Note';
import Picture from './components/Picture';


export default (
<Switch>

    <Route exact path="/" component={ Login } />
    <Route path="/register" component={Register} />
    <Route path="/trips/search" component={Planning} />
    <Route path="/trips/upcoming" component={Upcoming} />
    <Route path="/trips/completed" component={Completed} />
    <Route path="/trips/addtrip" component={AddTrip} />
    <Route path="/trips/:tripid" component={Trip} />
    <Route path="/notes/:noteid" component={Note} />
    <Route path="/picture/:pictureid" component={Picture} />
 


</Switch>

)

