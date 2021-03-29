import React, { useState,useEffect} from 'react';
import { connect } from 'react-redux';
import {addTodo } from '../actions/action'
import {ChangeProductCategory} from '../actions/productCategoryChange'
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import header from '../img/header.jpg'; 
import AccountCircle from "@material-ui/icons/AccountCircle";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Products from './products';
import ProductDetail from './productDetail'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import SellerSignupModal from "./sellerSignupModal"
import ReactDOM from "react-dom";
import SellerProducts from "./sellerProducts"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  Link
} from "react-router-dom";
import { Button } from '@material-ui/core';
import { useAuth0 } from "@auth0/auth0-react";
import ProductUpload from './productUpload';
import Variants from './variants'
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

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}
const mapStateToProps = state => ({ todos: state.todosReducer })

const mapDispatchToProps = dispatch => {
    return {
      changeProductCategory:category=>{
        dispatch(ChangeProductCategory(category));
      },
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
    const { loginWithRedirect,isAuthenticated,user } = useAuth0();
    const open = Boolean(anchorEl);
    let history = useHistory();
    const [openModal, setOpenModal] = React.useState(false);
    const [currentURL, setcurrentURL] = React.useState('meat');
    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
    const handleModalClose = (value) => {
    setOpenModal(false);

  };
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const setURL=(val)=>{
      setcurrentURL(val)
    }
    const handleClose = () => {
      setAnchorEl(null);
    };
    const onclick=()=>{
      
     }

    
    useEffect(()=>{
    console.log(currentURL)
     if(user){
        console.log(user)

     }
     console.log(props)

      
      // handleResize()
      // window.addEventListener('resize', handleResize)
    },[user])
  return (
    <ThemeProvider theme={theme}>
  <Router>
  <div className={classes.root}>

    <AppBar position="static" color='secondary'>
      
      <div className='MenuWhole' >
     { currentURL!='/ProductDetail'&&currentURL!='/uploadProduct'?
        <div className='MenuMain'>
          <Tabs
            value={val}
            variant="scrollable"
            scrollButtons="on">

            <Tab  className='tab' style={{minWidth:100,color:'#7f7f7f',background:currentURL=='meat'?'wheat':null}}  className='menuLink'  onClick={()=>{setcurrentURL('meat');props.changeProductCategory('meat')}} icon={
              <Link to='/' href="#"  id={0}>
                肉类
              </Link>} {...a11yProps(0)} />
            <Tab className='tab'  style={{minWidth:100,color:'#7f7f7f',background:currentURL=='vege'?'wheat':null}}  className='menuLink'  onClick={()=>{setcurrentURL('vege');props.changeProductCategory('vege')}}  icon={
              <Link to='/' href="#" id={1} >
                 蔬菜
              </Link>} {...a11yProps(1)} />
            <Tab className='tab'  style={{minWidth:100,color:'#7f7f7f',background:currentURL=='fruit'?'wheat':null}} className='menuLink' onClick={()=>{setcurrentURL('fruit');props.changeProductCategory('fruit')}} icon={
              <Link to='/' href="#" id={2}  >
                 水果
              </Link>} {...a11yProps(2)} />
            <Tab className='tab'   style={{minWidth:100,color:'#7f7f7f',background:currentURL=='seafood'?'wheat':null}} className='menuLink' onClick={()=>{setcurrentURL('seafood');props.changeProductCategory('seafood')}} icon={
              <Link to='/' href="#" id={3}  >
                 海鲜
              </Link>} {...a11yProps(3)} /> 
            <Tab className='tab'  style={{minWidth:100,color:'#7f7f7f',background:currentURL=='hotpot'?'wheat':null}}    className='menuLink'  onClick={()=>{setcurrentURL('hotpot');props.changeProductCategory('hotpot')}} icon={
              <Link to='/' href="#" id={4}>
                 火锅料
              </Link>} {...a11yProps(4)} />   
            <Tab className='tab'  style={{minWidth:100,color:'#7f7f7f',background:currentURL=='snack'?'wheat':null}}  className='menuLink' onClick={()=>{setcurrentURL('snack');props.changeProductCategory('snack')}} icon={
              <Link to='/' href="#" id={5}>
                  零食
              </Link>} {...a11yProps(5)} />   
            <Tab className='tab'  style={{minWidth:100,color:'#7f7f7f',background:currentURL=='drink'?'wheat':null}} className='menuLink' onClick={()=>{setcurrentURL('drink');props.changeProductCategory('drink')}} icon={
              <Link to='/' href="#" id={6} >
                 饮料
              </Link>} {...a11yProps(6)} />    
            <Tab className='tab'  style={{minWidth:100,color:'#7f7f7f',background:currentURL=='cig&alcohol'?'wheat':null}} className='menuLink' onClick={()=>{setcurrentURL('cig&alcohol');props.changeProductCategory('cig&alcohol')}}  icon={
              <Link to='/' href="#" id={7}>
                 烟酒
              </Link>} {...a11yProps(7)} />    
        </Tabs>   
      </div>:<div className='MenuBack'> 
              <Link to='/' href="#" id={7}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"

                  color="inherit"
                >
                  <ArrowBackIcon/>
              
                </IconButton>
                </Link>
            </div> }
    
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
            {isAuthenticated?
            <div className="profile">
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                  <AccountCircle />
            
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>个人资料</MenuItem>
                <MenuItem>
                  <Link to='/uploadProduct' href="#" className='menuLinkUpload' 
                  onClick={()=>{
                    setcurrentURL('/uploadProduct')
                    handleClose()
  
                  }}>
                    上传商品
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to='/sellerProduct' href="#" className='menuLinkUpload' 
                  onClick={()=>{
                    setcurrentURL('/sellerProduct')
                    handleClose()
  
                  }}>
                    我的产品
                  </Link>
                </MenuItem>
                <MenuItem onClick={()=>{
                 
                  setOpenModal(true)
                  handleClose()
                }}>成为卖家</MenuItem>
              </Menu>
              <SellerSignupModal open={openModal} onClose={handleModalClose} />
            </div>:<Button onClick={()=>{
              loginWithRedirect()
        


            }}>Login</Button>}
     
        </div>
    
    </div>
  </AppBar>
  <div className='mobileSearch'>
    <TextField fullWidth placeholder='search' id="standard-full-width" size="medium" /> 
  </div>  
  <Switch>
      <Route path="/ProductDetail">
         <ProductDetail url={currentURL} setURL={setURL}/>
      </Route>
      <Route path="/uploadProduct">
         <ProductUpload />
      </Route>
      <Route path="/setVariants">
         <Variants/>
     </Route> 
     <Route path="/sellerProduct">
         <SellerProducts url={currentURL}/>
     </Route>
      <Route path="/">
        <img style={{marginLeft:0,objectFit:'cover'}} src={header} width='100%' height='400px'/>
        <Products url={currentURL} setURL={setURL}/>
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