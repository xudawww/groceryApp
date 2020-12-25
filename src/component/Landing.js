import React, { useState,useEffect} from 'react';
import { connect } from 'react-redux';
import {addTodo } from '../actions/action'
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import header from '../img/header.jpg'; 
import AccountCircle from "@material-ui/icons/AccountCircle";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import TextField from '@material-ui/core/TextField';
import { fade} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Products from './products';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button } from '@material-ui/core';
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    
  
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
   
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },

  }));
function mapStateToProps(state, ownProps){
    const { todos } = state.todosReducer
   return {todo:todos}
}
function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}
const mapDispatchToProps = dispatch => {
    return {
  
      onAddTodo: todo => {

        dispatch(addTodo(todo));
      }
    };
  };

 function Landing(props){
  const theme = createMuiTheme({
    palette: {
       primary:{
        main:'#b2b2b2',
     
       
       
       },
       secondary: {
          main: "#ffea00" //Another orange-ish color
                  }
             },

 });
    const classes = useStyles();
    const [auth, setAuth] = React.useState(false);
    const [ifMobile, setifMobile] = React.useState(false);
    const [showSearch, setshowSearch] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [val, setVal] = React.useState(0);
    const { loginWithRedirect,isAuthenticated } = useAuth0();
    const open = Boolean(anchorEl);
    
    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const onclick=()=>{
        props.onAddTodo('22','22')
     }
    useEffect(()=>{
      console.log('here')
      function handleResize() {
        if(window.innerWidth<=1000 ){
          setifMobile(true)
          if(window.innerWidth<=800){
            setshowSearch(true)

          }
          else{

            setshowSearch(false)
          }

        }
       
        else{
          setifMobile(false);setshowSearch(false);
        }
      
      }
      // handleResize()
      // window.addEventListener('resize', handleResize)
    },[props.state2])
  return (
    <ThemeProvider theme={theme}>
  <Router>
  <div className={classes.root}>

    <AppBar position="static" color='secondary'>
      
      <div className='MenuWhole' >
        <div className='MenuMain'>
          <Tabs
            value={val}
            variant="scrollable"
            scrollButtons="on">

            <Tab  className='tab' style={{color:'#7f7f7f'}} icon={
              <Link to='/' href="#" className='menuLink'  >
                肉类
              </Link>} {...a11yProps(0)} />
            <Tab className='tab'  style={{color:'#7f7f7f'}}  icon={
              <Link to='/' href="#" className='menuLink' >
                 蔬菜
              </Link>} {...a11yProps(1)} />
            <Tab className='tab'  style={{color:'#7f7f7f'}}  icon={
              <Link to='/' href="#" className='menuLink' >
                 水果
              </Link>} {...a11yProps(2)} />
            <Tab className='tab'   style={{color:'#7f7f7f'}}  icon={
              <Link to='/' href="#" className='menuLink' >
                 海鲜
              </Link>} {...a11yProps(3)} /> 
            <Tab className='tab'  style={{color:'#7f7f7f'}}  icon={
              <Link to='/' href="#" className='menuLink'  >
                 火锅料
              </Link>} {...a11yProps(4)} />   
            <Tab className='tab'  style={{color:'#7f7f7f'}}  icon={
              <Link to='/' href="#" className='menuLink' >
                  零食
              </Link>} {...a11yProps(5)} />   
            <Tab className='tab'  style={{color:'#7f7f7f'}}  icon={
              <Link to='/' href="#" className='menuLink'  >
                 饮料
              </Link>} {...a11yProps(6)} />    
            <Tab className='tab'  style={{color:'#7f7f7f'}}  icon={
              <Link to='/' href="#" className='menuLink' style={{padding:20}} >
                 烟酒
              </Link>} {...a11yProps(7)} />    
        </Tabs>   
      </div> 
    
         <div className='menuSearch'>
            
            <InputBase
              placeholder="搜索…"
              color='primary'
              fullWidth={true}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
    
        </div>
        <div className='menuLogin' >
            {isAuthenticated?<IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>:<Button onClick={()=>{
              loginWithRedirect()
  


            }}>Login</Button>}
     
        </div>
    
    </div>
 
  
 
       
      

    
     
    </AppBar>

   
    
     
           <div className='mobileSearch'>
              <TextField fullWidth placeholder='search' id="standard-full-width" size="medium" /> 
            </div>  
        
        
             
   
      
  
  
    <img style={{marginLeft:0,objectFit:'cover'}} src={header} width='100%' height='400px'/>
    <Switch>
      <Route path="/">
      
          <Products/>
      </Route>
    </Switch>

  </div>
  </Router>
  </ThemeProvider>)

}

export default  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Landing);