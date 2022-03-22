import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import classes from './loginComponent.module.css';

const LoginComponent = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    identifier: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/signin', { ...userData });
      router.push('/homepage');
    } catch (err) {
      console.log(err.response.data);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({...userData, [name]: value })
  }

  const goToRegister = () => {
    router.push('/register');
  }

  return (
    <div>
            <form onSubmit={handleSubmit}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type="text" name="identifier" onChange={e => handleChange(e)} />
                </div>
                <div className={classes.control}>
                <label htmlFor='password'>Your Password</label>
                <input type="password" name="password" onChange={e => handleChange(e)} />
            </div>
            <div className={classes.actions}>
                <button>Login</button>
                <button type='button' className={classes.toggle} onClick={goToRegister}>
               Create new account'
            </button>
            </div>
            
            </form>
    </div>
  )
}

export default LoginComponent;