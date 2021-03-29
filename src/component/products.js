import React, { useState,useEffect} from 'react';
import { connect } from 'react-redux';
import {queryProduct} from '../actions/productAction2'
import {ChangeProductCategory} from '../actions/productCategoryChange'
import {queryProductMore} from '../actions/productionPagination'
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Skeleton from 'react-loading-skeleton';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  Link
} from "react-router-dom";
const mapStateToProps = state => ({ todos: state.todosReducer})
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
const mapDispatchToProps = dispatch => {
    return {
      queryProduct: category => {
        dispatch(queryProduct(category));
      },
      queryProductMore: category => {
        dispatch(queryProductMore(category));
      },
      changeProductCategory:category=>{
        dispatch(ChangeProductCategory(category));
      }
    };
  };

function Products(props){
    let history = useHistory();
    const menuList =['meat','vege','fruit','seafood','hotpot','snack','drink','cig&alcohol']
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [index, setIndex] = React.useState(3);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [list, setList] = React.useState([]); 
    const [init, setinit] = React.useState(true); 
    const [initScroll, setinitScroll] = React.useState(true); 
    const [gap, setgap] = React.useState(-1); 
    const [dynamicWidth,setdynamicWidth] =React.useState(null); 
    const myStateRefLock = React.useRef(false);
    const myStateRefList = React.useRef(list);
    const myStateRefCategory = React.useRef(props.url);
    const scrollEvent=()=>{
      var totalPageHeight = document.body.scrollHeight; 
      var scrollPoint = window.scrollY + window.innerHeight;
      console.log(myStateRefList.current.ifFinishLoad)
      if((totalPageHeight-scrollPoint)<1 && !myStateRefLock.current&&myStateRefList.current.list.length>1&&!myStateRefList.current.ifFinishLoad) 
       { console.log(myStateRefList.current.list)
         let formData = new FormData();
         myStateRefLock.current = true
         formData.append('category',  myStateRefCategory.current);
         formData.append('lastID', myStateRefList.current.list[myStateRefList.current.list.length-1].product.productId);
          
         props.queryProductMore(formData)
         console.log("you're at the bottom of the page");
         setinitScroll(false)
       }
    }
    const handleResize=()=>{
       let width ='';
       if(window.innerWidth<562){width='100%'}
       else{width=300}
       setdynamicWidth(width)

    }
    useEffect(()=>{
   
      if(!init)
        {
         if(props.url=='/ProductDetail'||props.url=='/uploadProduct'){
           props.setURL(props.todos.category)
         }
         setList([]);
         myStateRefCategory.current = props.todos.category; 
         const index = menuList.indexOf(myStateRefCategory.current)
         console.log(props.todos.products)
         console.log(props.url)
         setList(props.todos.products[props.todos.category].list)
         myStateRefList.current = props.todos.products[props.todos.category];
         myStateRefLock.current = false;
          if(initScroll){
            setinitScroll(false)
            window.addEventListener('scroll',scrollEvent);
          }
        }
      if(init)
        {     
          let formData = new FormData();
          formData.append('category', 'drink');
          props.queryProduct(formData);
          window.addEventListener("resize", handleResize);
          setinit(false);
          handleResize();
        }
  },[props.todos.products,props.url])
  return (
              <Container maxWidth="lg">

               {!props.todos.loading ? 
               <div className="grid">
                  {list.length>0? list.map((ele,i)=>(
                  <div style={{maxWidth:dynamicWidth}}>
                    <Card variant="outlined" onClick={()=>{
                      props.setURL('/ProductDetail');
                      history.push({
                        pathname: '/ProductDetail',
                        state: {id:ele.product.productId}
                      })
                      console.log(ele.product.productId)
                    }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="240"
                            image={ele.imgs[0].url}
                            title="Contemplative Reptile"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                            {ele.product.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            {ele.product.des}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary">
                            Share
                          </Button>
                          <Button size="small" color="primary">
                            Learn More
                          </Button>
                        </CardActions>
                      </Card>
                    </div>)): null}
                    {list.length==3?<div></div>:null}
                    {list.length==2?<div></div>:null}
                    {list.length==2?<div></div>:null}
                  </div>:
                  <div className="grid"> 
                      <Card variant="outlined" >
                        <CardActionArea>
                          <CardContent>
                            <Skeleton height={200}/>
                            <br/><br/>
                            <Skeleton width={'50%'} height={30}/>
                            <br/><br/>
                            <Skeleton height={30}/>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                      <Card variant="outlined" >
                        <CardActionArea>
                          <CardContent>
                            <Skeleton height={200}/>
                            <br/><br/>
                            <Skeleton width={'50%'} height={30}/>
                            <br/><br/>
                            <Skeleton height={30}/>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                      <Card variant="outlined" >
                        <CardActionArea>
                          <CardContent>
                            <Skeleton height={200}/>
                            <br/><br/>
                            <Skeleton width={'50%'} height={30}/>
                            <br/><br/>
                            <Skeleton height={30}/>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                      <Card variant="outlined" >
                        <CardActionArea>
                          <CardContent>
                            <Skeleton height={200}/>
                            <br/><br/>
                            <Skeleton width={'50%'} height={30}/>
                            <br/><br/>
                            <Skeleton height={30}/>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                      <Card variant="outlined" >
                        <CardActionArea>
                          <CardContent>
                            <Skeleton height={200}/>
                            <br/><br/>
                            <Skeleton width={'50%'} height={30}/>
                            <br/><br/>
                            <Skeleton height={30}/>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                      <Card variant="outlined" >
                        <CardActionArea>
                          <CardContent>
                            <Skeleton height={200}/>
                            <br/><br/>
                            <Skeleton width={'50%'} height={30}/>
                            <br/><br/>
                            <Skeleton height={30}/>
                          </CardContent>
                        </CardActionArea>
                      </Card>

                    </div>}
                  
              </Container>
  )

}
export default  connect(
    mapStateToProps,
    mapDispatchToProps
  )( Products);