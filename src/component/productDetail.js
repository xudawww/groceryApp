import React,{ useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { useLocation } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {querySindleProduct} from '../actions/productDetail'
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';

import "react-image-gallery/styles/css/image-gallery.css";

const mapStateToProps = state => ({ product: state.todosReducer.product,category:state.todosReducer.product })
const mapDispatchToProps = dispatch => {
  return {
    querySingleProduct: id => {
      dispatch(querySindleProduct(id));
    }
  };
};
 function ProductDetail(props) {
  let history = useHistory();
  const location = useLocation();
  const [variants, setVariants] = React.useState([]);
  const [product, setProduct] = React.useState('');
  const [init, setInit] = React.useState(true);
  const [loading, setloading] = React.useState(true);
  const [imgs, setImgs] = React.useState([]);
  const [age, setAge] = React.useState('');
  const [price, setprice] = React.useState(0);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  useEffect(()=>{
    console.log(props.url)
    props.setURL('/ProductDetail')
    console.log(props)
    var variantList=[]
    if(init)
    {console.log(location)
      let formData = new FormData();
      formData.append('id', location.state.id);
      props.querySingleProduct(formData);
      setInit(false)
     
    }
    else{
      console.log(props.product.product.price)
      if(props.product.product.price)
      {setprice(parseFloat(props.product.product.price))}
      for(let imgEle of props.product.imgs){
        setImgs([...imgs,{height:400,original:imgEle.url,thumbnail:imgEle.url}])
      }
      let addPrice=0;
      console.log(props.product.variants)
      if(props.product.variants.length>0)
      {for(let variantEle of props.product.variants){
        if(variantEle.options.length>0)
        {variantList.push({price:parseFloat(variantEle.options[0].price),val:variantEle.options[0].value,variant:variantEle.variant,option:variantEle.options})
        addPrice+=parseFloat(variantEle.options[0].price);}
      }}
      console.log(price)
      setprice(parseFloat(props.product.product.price)+addPrice)
      setVariants([...variants,...variantList])
      setloading(false);

    }
  },[props.product])
  return (
    
    !loading?<Container style={{marginTop:10,position:'relative'}} maxWidth="md">
            <Grid container spacing={3}>
                <Grid item xs>
                   <div style={{height:'fit-content'}}>
                   <ImageGallery  items={imgs} />
                   </div>
                </Grid>
                <Grid item xs>
                    <div style={{minWidth:200}}>
                        <h1>{props.product.product.title}</h1>
                        <h3>${price}</h3>
                        <div className='variantWrap' >
                        { 
                          variants.map((ele,i)=>(
                            <FormControl style={{margin:10}}>
                           
                              <InputLabel id="demo-controlled-open-select-label">{ele.variant.title}</InputLabel>
                              <Select
                                style={{minWidth:100}}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                price={ele.price}
                                value={ele.val}
                                onChange={(val,child)=>{
                                  var list = [...variants];
                                
                                  list[i].val = val.target.value;
                                  setVariants(list)
                                }}
                            >
                              { ele.option.map((optionEle,ii)=>( 
                                <MenuItem 
                                  onClick={()=>{
                                    var list = [...variants];
                                    setprice(price- parseFloat(ele.price)+parseFloat(optionEle.price))
                                    list[i].price =optionEle.price;
                                    setVariants(list)

                                }} value={optionEle.value}>{optionEle.value}</MenuItem>
                              ))}
                              
                              </Select>
                          </FormControl>
                          )
                        )

                        }
                        </div>
                        <div>{props.product.product.des}</div>
                    </div>
                </Grid>
            </Grid>
    </Container>:null)
  
}
export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail)