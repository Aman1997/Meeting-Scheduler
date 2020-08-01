import React from 'react';
import './LandingComponent.css';
import {Link} from 'react-router-dom';


function LandingPage() { 
        return(
            <div className='landingArea'>
                <div className='content'>
                    <h1>Book meetings with a click!!</h1>
                    <h3>Get notified with appointment confirmation</h3>
                    <Link to='/signin'><button className='signup'>Sign Up</button></Link>
                    <Link to='/login'><button className='login'>Login</button></Link>
                </div>
            </div>
        );
}

export default LandingPage;