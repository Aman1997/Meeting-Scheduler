import React, { useEffect } from 'react'
import axios from 'axios'

export default function Auth(NewComponent, option) {
    function AuthenticationCheck(props) {
        useEffect(() =>{
            axios.get('/api/user/auth')
                 .then(response =>{
                    if (!response.data.isAuth) {
                        if (option) {
                            props.history.push('/login')
                        }
                    }
                    else {
                        if (option === false) {
                            props.history.push('/')
                        }
                    }    
         })
          
        }, [])

        return (<NewComponent/>  )         
    }
    return AuthenticationCheck 
}
