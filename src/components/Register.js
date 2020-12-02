import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {registerUser} from '../ducks/reducer';


class Register extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            useremail: '',
            password: '',
           
        }
        this.changeHandler = this.changeHandler.bind(this)
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



   register = async (e) => {
        e.preventDefault();
        const {username, useremail, password} = this.state
        try {
            const user = await axios.post('/api/register', {username, useremail, password})
        
         
            this.props.registerUser(user.data)
            this.props.history.push('/trips/search')
        } 
        catch(err){ 
                console.log(err)
        }
    }

   

    render(){
        const {username, useremail, password} = this.state;
        return(
            <div className="formBox">
            <input name="username" 
                        type="username"
                        value={ username }
                        placeholder="username" 
                        onChange={ e => this.changeHandler(e)}/>

<input name="useremail" 
                        type="useremail"
                        value={ useremail }
                        placeholder="useremail" 
                        onChange={ e => this.changeHandler(e)}/>       
            <input    name="password" 
                        type="password"
                        value={password} 
                        placeholder="password" 
                        onChange={ e => this.changeHandler(e)}/>
            <button onClick={e => this.register(e)}>Register</button>
            
            <button><Link to="/" style={{ textDecoration: 'none' }}> Cancel</Link></button>
            </div>
        )
    }
}




const mapStateToProps = state => state

export default connect(mapStateToProps, { registerUser})(Register)
