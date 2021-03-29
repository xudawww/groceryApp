import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Input } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import CustomizedSnackbars from './alert';

import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import {ColorAlerts} from "./alert"
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function ProductUpload(props) {
    const [productname, setproductname] = React.useState(null);
    const [productPrice, setproductPrice] = React.useState(null);
    const [productUnit, setproductUnit] = React.useState(null);
    const [productDes, setproductDes] = React.useState(null);
    const [productCategory, setproductCategory] = React.useState(null);
    const [imgList, setimgList] = React.useState([]);
    const [showAlert, setshowAlert] = React.useState(false);
    const [AlertContent, setAlertContent] = React.useState(null);
    const { onClose, selectedValue, open } = props;
    const [submit, setsubmit] = React.useState(false);
    const [storage, setstorage] = React.useState(0);
    const [openSelector, setopenSelector] = React.useState(false);

    const { user } = useAuth0();
    let history = useHistory();
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
    const handleClose = () => {
      onClose(selectedValue);
    };
    const handleModal=()=>{
        setshowAlert(!showAlert)

    }
    

    const handleListItemClick = (value) => {
      onClose(value);
    };
    const handleCloseCategory= () => {
        setopenSelector(false);
      };
    
    const handleOpen = () => {
        setopenSelector(true);
      };
    const handleChange = (event) => {
        setproductCategory(event.target.value);
      };
    return (
      <ThemeProvider theme={theme}>
          <Container style={{marginTop:10,position:'relative'}} maxWidth="md">
                <TextField value={productname} error={submit&&(productname==null||productname=="")} helperText={submit&&(productname==null||productname=="")?'请输入产品名':null} onChange={(e)=>{setproductname(e.target.value)}} fullWidth id="standard-basic" label="商品名称" /><br/><br/>
                <TextField value={productPrice} error={submit&&(productPrice==null||productPrice=='')}  helperText={submit&&(productPrice==null||productPrice=='')?'请输入产品价格':null}  style={{width:'40%',marginLeft:0}} onChange={(e)=>{setproductPrice(e.target.value)}}  id="standard-basic" label="价格"   />
                <TextField value={productUnit} error={submit&&(productUnit==null||productUnit=='')}  helperText={submit&&(productUnit==null||productUnit=='')?'请输入产品单位':null}  style={{width:'45%',marginLeft:'15%'}} onChange={(e)=>{setproductUnit(e.target.value)}}  id="standard-basic" label="单位"  /><br/><br/>
                <TextField value={productDes} error={submit&&(productDes==null||productDes=="")}  helperText={submit&&(productDes==null||productDes=="")?'请输入产品描述':null} onChange={(e)=>{setproductDes(e.target.value)}}  multiplemultiline={true} rows={3} fullWidth id="standard-basic" label="商品描述" /><br/><br/>
                <TextField type='number' value={storage} error={submit&&(storage==null||storage=="")}  helperText={submit&&(storage==null||storage=="")?'请输入产品描述':null} onChange={(e)=>{setstorage(e.target.value)}}  multiplemultiline={true}  fullWidth id="standard-basic" label="商品库存" /><br/><br/>
                <FormControl style={{width:150}}>
                    <InputLabel htmlFor="grouped-select">种类</InputLabel>
                    <Select  onClose={handleCloseCategory} onOpen={handleOpen} value={productCategory}  onChange={handleChange} defaultValue="" id="grouped-select">
                        <MenuItem value={'meat'}>肉类</MenuItem>
                        <MenuItem value={'vege'}>蔬菜</MenuItem>
                        <MenuItem value={'fruit'}>水果</MenuItem>
                        <MenuItem value={'seafood'}>海鲜</MenuItem>
                        <MenuItem value={'hotpot'}>火锅料</MenuItem>
                        <MenuItem value={'snack'}>零食</MenuItem>
                        <MenuItem value={'drink'}>饮料</MenuItem>
                        <MenuItem value={'cig&alco'}>烟酒</MenuItem>
                    </Select>
                </FormControl><br/><br/>
                上传产品图片<br/>

                <TextField type='file' error={submit&&imgList.length==0} helperText={submit&&imgList.length==0?'请插入图片':null} onChange={(e)=>{
                    if(imgList.length<4)
                    {setimgList([...imgList, e.target.files[0]])}
                    else{
                        setshowAlert(true);
                        setAlertContent('最多只能四张图片');
                    }

                }} id="standard-basic" />
                <br/><br/>
                <div style={{display:'flex',width:'100%'}}>
                   {   
                       imgList.map((ele)=>{
                          console.log(ele)
                          return <img src={URL.createObjectURL(ele)} style={imgList.indexOf(ele)>0?{marginLeft:20}:{marginLeft:0}} width='18%'/>
                           


                       })

                   }
                </div>
                <br/>
                <br/>
                
                <Button onClick={
                    ()=>{
                        setsubmit(true)
                        if(storage!="" && storage!=null && productname!=""&&productPrice!=""&&productUnit!=""&&productDes!=""&&productname!=""&&productPrice!=null&&productUnit!=null&&productDes!=null&&imgList.length>0)
                        {history.push({
                            pathname: '/setVariants',
                            
                            state: { productCategory:productCategory,storage:storage,productName:productname,productPrice:productPrice,productUnit:productUnit,productDes:productDes,imgList:imgList }
                        })}
                    }
                }id='nextStep' variant="contained" color='secondary'>下一步</Button>
                <CustomizedSnackbars content={AlertContent} open={showAlert} handleClose={handleModal}/>
               
          </Container>
       
      </ThemeProvider>
    );
  }
  