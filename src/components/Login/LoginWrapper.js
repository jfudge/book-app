
import './LoginWrapper.css';

import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
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
  margin: {
    margin: theme.spacing(1),
  },
}));

const LoginWrapper = ({hideLogin, setUser}) => {

  const [type, setType] = useState('login');
  const classes = useStyles();

  return (
    <div className="login-modal">
    <div className="login-wrapper">
    <Grid container component="main" className="classes.root">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className="login-img" />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

        <div className="login-body">
          {type === 'login' && <Login hideLogin={hideLogin} setUser={setUser} />} 
          {type === 'signup' && <Signup hideLogin={hideLogin} setUser={setUser}  />}
        </div>

        <div className="login-footer">

          Need an account?

          <Button onClick={() => setType('login')} variant="outlined" size="small" color="primary"
            className={type === 'login' ? 'active' : undefined}> 
            Login
          </Button>

          <Button onClick={() => setType('signup')} variant="outlined" size="small" color="primary"
            className={type === 'signup' ? 'active' : undefined}> 
              Signup
          </Button>

         </div>
         
      </Grid>
    </Grid>
    
    </div>
    </div>
  );
}

export default LoginWrapper;
