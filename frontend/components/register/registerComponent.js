import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import classes from './registerComponent.module.css';


const RegisterComponent = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/signup', userData);
      router.replace('/homepage');
    } catch (err) {
      console.log(err.response.data);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({...userData, [name]: value });
  }

  const goToRegister = () => {
    router.push('/');
  }

  return (
    <section className={classes.auth}>
    <form onSubmit={handleSubmit}>
       <div className={classes.control}>
        <label htmlFor='username'>Username</label>
        <input type="text" name="username" onChange={e => handleChange(e)} />
      </div>
      <div className={classes.control}>
        <label htmlFor='email'>Email</label>
        <input type="text" name="email" onChange={e => handleChange(e)} />
     </div>
     <div className={classes.control}>
        <label htmlFor='password'>Password</label>
        <input type="password" name="password" onChange={e => handleChange(e)} />
     </div>
     <div className={classes.actions}>
      <button>Register</button>
      <button type='button' className={classes.toggle} onClick={goToRegister}>
      Login with existing account
            </button>
    </div>
    </form>
    </section>
  )
}

export default RegisterComponent;