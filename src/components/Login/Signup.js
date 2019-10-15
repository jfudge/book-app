import React, { useState } from 'react';
import axios from 'axios';
import { setToken } from '../../services/tokenService';

import './Login.css';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(img/books.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = ({ hideLogin, setUser }) => {

  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleChange = e => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    } else if (e.target.name === 'firstName') {
      setFirstName(e.target.value)
    } else if (e.target.name === 'lastName') {
      setLastName(e.target.value)
    }
  }
  
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/users/signup`, {
        data: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName
        }
      });
      const token = res.data.data.token;
      setToken(token);
      setUser(token, res.data.data.user._id, res.data.data.user.firstName);
      hideLogin();
    } catch (e) {
      setMessage(e);
      console.log(message);
    }
  }

  const classes = useStyles();

  return (

<div className={classes.paper}>
<Avatar className={classes.avatar}>
  <LockOutlinedIcon />
</Avatar>
<Typography component="h1" variant="h5">
  Sign Up
</Typography>

<form className={classes.form} autoComplete='off' onSubmit={handleSubmit}>
  <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    type="email"
    id="email"
    label="Email Address"
    name="email"
    autoComplete="email"
    autoFocus
    onChange={handleChange} required
  />
  <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    name="password"
    label="Password"
    type="password"
    id="password"
    onChange={handleChange} required
    autoComplete="current-password"
  />
    <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    name="firstname"
    label="First Name"
    type='text'
    id="firstname"
    onChange={handleChange} required

  />

<TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    name='lastName'
    label="Last Name"
    type='text'
    id="lastName"
    onChange={handleChange} required

  />
  <Button className='submit' onClick={handleSubmit}
    type="submit"
    fullWidth
    variant="contained"
    color="primary">
    Sign up
  </Button>

  <Grid container>

</Grid>
{message && <p>Success!</p>}
</form>
</div> 

  )
}

export default Signup;