import React, {Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {loginUser} from '../ducks/reducer';
import {Link} from 'react-router-dom';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
           
        }
        this.changeHandler = this.changeHandler.bind(this)
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = async (e) => {
        e.preventDefault();
        const {username, password} = this.state
        try {
            const user = await axios.post('/api/login', {username, password})
      
            this.props.loginUser(user.data)
            this.props.history.push('/trips/search')
        } 
        catch(err){ 
                alert(err)
        }
    }



render(){


    
        
        const {username, password} = this.state;
        return(
            <div className="formBox">
            <input name="username" 
                        type="username"
                        value={ username }
                        placeholder="username" 
                        onChange={ e => this.changeHandler(e)}/>
            <input    name="password" 
                        type="password"
                        value={password} 
                        placeholder="password" 
                        onChange={ e => this.changeHandler(e)}/>
            <button onClick={e => this.login(e)}>Login</button>
            
            <button><Link to="/register" style={{ textDecoration: 'none' }}> Register</Link></button>
            </div>
        )
    

}





}







const mapStateToProps = state => state

export default connect(mapStateToProps, {loginUser})(Login)


   
 


  
     
      
