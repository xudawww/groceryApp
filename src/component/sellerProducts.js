
import {SellerProduct} from '../actions/querySellerProduct'
import React, { useState,useEffect} from 'react';
import { connect } from 'react-redux';
import {queryProduct} from '../actions/productAction2'
import {ChangeProductCategory} from '../actions/productCategoryChange'
import {queryProductMore} from '../actions/productionPagination'
import {sellerProductMore} from '../actions/sellerProductsPagniation'
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
import Select from '@material-ui/core/Select';
import { useAuth0 } from "@auth0/auth0-react";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InfiniteScroll from 'react-infinite-scroller';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  Link
} from "react-router-dom";
const mapStateToProps = state => ({ products: state.sellerReducer})
const mapDispatchToProps = dispatch => {
    return {sellerProduct: uid => {dispatch(SellerProduct(uid))}, paginateSellerProduct:obj=>{dispatch(sellerProductMore(obj))}
   };
};
function SellerProducts(props) {
  const { loginWithRedirect,isAuthenticated,user } = useAuth0();
  const [init, setinit] = React.useState(true);
  const [list, setList] = React.useState([]); 
  const [initScroll, setinitScroll] = React.useState(true); 
  const [category, setcategory] = React.useState('all'); 
  const [lock, setlock] = React.useState(false); 
  const myStateRefList = React.useRef(list);

  const scrollEvent=()=>{
    setlock(true) 
    if(!lock&&list.length>1&&!props.products.products[category].ifFinishLoad) 
     { 
       
       let formData = new FormData();
       formData.append('category', category);
       formData.append('lastID', list[list.length-1].product.productId);
       formData.append('uid', user.sub);
      
 
       props.paginateSellerProduct(formData)
       console.log("you're at the bottom of the page");
       setinitScroll(false)
     }
  }
   useEffect(()=>{
     console.log(props)
     if(user)
      {if(init){
        setinit(false);
        let formData = new FormData();
        formData.append('uid',user.sub);
        props.sellerProduct(formData);

       }
      else{
        if(props.products.products[category])
         {setList(props.products.products[category].list);
          setlock(false);
          console.log(props.products.products[category].ifFinishLoad)
       }


       } 
      }



   },[props.products,category])
   return(<Container  maxWidth="lg">
            <InfiniteScroll
              pageStart={0}
              loadMore={scrollEvent}
              hasMore={props.products.products[category]?!props.products.products[category].ifFinishLoad&&!lock:false}
              loader={<div className="loader" key={0}>Loading ...</div>}
            >
            <br/>
            <div className='sellerProductFilter'>
            <FormControl variant="filled" >
              <InputLabel id="demo-simple-select-filled-label">种类</InputLabel>
              <Select  
                   onChange={(val)=>{setcategory(val.target.value)}}
                   style={{minWidth:100}}
                   value={category}
                   labelId="demo-simple-select-label"
                   id="demo-simple-select">
                       <MenuItem value='all'>所有产品</MenuItem>
                       <MenuItem value='meat'>肉类</MenuItem>
                       <MenuItem value = 'vege'>蔬菜类</MenuItem>
                       <MenuItem value='fruit'>水果类</MenuItem>
                       <MenuItem value='seafood' >海鲜</MenuItem>
                       <MenuItem value='hotpot'>火锅料</MenuItem>
                       <MenuItem value='snack' >零食</MenuItem>
                       <MenuItem value='drink' >饮料</MenuItem>
                       <MenuItem value='cig&alcohol' >烟酒</MenuItem>
                </Select>
            </FormControl>
  
             </div>
              {!props.products.loading?
                  <div className="grid">
                    {list.length>0 ? list.map((ele,i)=>(    
                    <div>
                      <Card variant="outlined">
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
                              
                            </Button>
                            <Button size="small" color="primary">
                              Learn More
                            </Button>
                          </CardActions>
                        </Card>
                    </div>)) 
                    :null}
                      {list.length==3?<div></div>:null}
                        {list.length==2?<div></div>:null}
                        {list.length==2?<div></div>:null}
                        {list.length==1?<div></div>:null}
                        {list.length==1?<div></div>:null}
                        {list.length==1?<div></div>:null}
                  </div>
                :<div className="grid"> 
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
              </InfiniteScroll>     
          </Container>)
}

export default  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SellerProducts);

