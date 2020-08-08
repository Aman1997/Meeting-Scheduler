import React, { Component } from 'react';
import './SignInComponent.css';
import axios from 'axios';

class Signin extends Component{
    constructor(props){
        super(props);

        this.state ={
            email : '',
            username : '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event){
        event.preventDefault();

        let data ={
            name : this.state.username,
            email : this.state.email,
            password: this.state.password
        }   
        axios.post('/api/user/register', data)
            .then(response =>  {
                if(response.data.success){
                    let userData = {
                        name: response.data.name,
                        email: response.data.email
                    }
                    this.props.history.replace({ pathname: '/home', state: {userData: userData}})
                }
                else{
                    console.log(response.data.err.message)
                }
            })
            .catch(error => console.error(error.message))  
    }
    render(){
        return(
            <div>
                <div className='signinDiv'>
                    <div className='signinCard'>
                        <div className='image'>
                            <div className='imageOverlay'>
                                <h1>Tryforfree</h1>
                            </div>
                        </div>
                        <div className='signinContent'>
                            <h4>Meeting Scheduler</h4>
                            <h5>Create Account</h5>
                            <form onSubmit = {this.handleSubmit}>
                                <label>Name</label>
                                <input type='text' id="username" name="username" placeholder="Name"
                                value={this.state.name}
                                onChange={this.handleChange}/>
                                <label>Email Address</label>
                                <input type='text' id="email" name="email" placeholder="Email address"
                                value={this.state.email}
                                onChange={this.handleChange}/>
                                <label>Password</label>
                                <input type='password' id="password" name="password" placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleChange}/>
                                <button type="submit" className='signinButton'>Sign up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Signin;