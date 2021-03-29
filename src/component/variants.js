import React,{ useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import VariantsModal from './variantsModal';
import { connect } from 'react-redux';
import {addProduct} from '../actions/productAction'
function mapStateToProps(state, ownProps){
    const { todos } = state.todosReducer
   return {todo:todos}
  }
  const mapDispatchToProps = dispatch => {
      return {
    
        addProduct: product => {
  
          dispatch(addProduct (product));
        }
      };
    };
  
function Variants(props) {
    const location = useLocation();
    const [checked, setChecked] = React.useState(false);
    const [radioNumber, setradioNumber] = React.useState(2);
    const [question, setquestion] = React.useState(null);
    const [showAlert, setshowAlert] = React.useState(false);
    const [AlertContent, setAlertContent] = React.useState(null);
    const [questions, setquestions] = React.useState([]);
    const [choices, setchoices] = React.useState([]);
    const [init, setinit] = React.useState(false);
    const [modalOpen, setmodalOpen] = React.useState(true);
    const { loginWithRedirect,isAuthenticated,user } = useAuth0();
    const toggleModal=()=>{
        setmodalOpen(!modalOpen)
    }
    const toggleChecked = () => {
      setChecked((prev) => !prev);
    };
    const [value, setValue] = React.useState('fill');

    const handleChange = (event) => {
        console.log(event.target.value)
      setValue(event.target.value);
      if(event.target.value=='fill'){
          setchoices([])
          console.log('here')
      }
    };
    const handleModal=()=>{
        setshowAlert(!showAlert)

    }
    const sendVariants=(list)=>{
        setquestions(list)
    }
    const iterate= () => {
        var list = []
       
         for(var i =0;i<radioNumber;i++){
            console.log(i)
            list.push(<TextField label={i} />)
         }
         return list
      };
    const ifDisable=()=>{
       if(value!='fill')
        {console.log('here111111111111111111')
        var ifChoice=true;
        for(const ele of choices){
            console.log(ele)

           if(ele.value==null||ele.price==null||ele.value==""||ele.price==""){
             ifChoice= false;
           }
        }
        if((question!=null&&question!="")&&(radioNumber>0&&radioNumber<=5)&&ifChoice){
           return false
        }
        else{
            return true}}
        else{
            if(question==null||question=="")
             {return true} 
             else{return false}
        }
    }
    useEffect(() => {
        console.log(props.todo)
        if(init)
        {console.log(location); // result: '/secondpage'
        var list =[]
        
        for(var i =0;i<2;i++){
      
            list.push({
                choiceLabel:'选择'+(i+1),
                priceLabel:'价格'+(i+1),
                price:'',
                value:'',
                id:i,
            })
        

        }
        setchoices([...list])
        setinit(false)
        }

     }, [location]);



  return (
    <div style={{marginTop:50}}>
        
       <Container>
          
                <Grid container spacing={1}>
                    <Grid container item xs={12} spacing={3}>
                        <React.Fragment>
                           
                            <Grid item xs={12}>
                            
                                 {  questions.map((ele,i)=>{
                                     
                                      
                                     return <div>
                                                
                                                <Card variant="outlined"> 
                                                    <CardContent>
                                                        <div style={{display:'flex'}}>
                                                        <TextField value={ele.title} disabled={ele.disabled} onChange={(e)=>{
                                                            var list =[...questions];
                                                            list[i].title = e.target.value;
                                                            setquestions(list)

                                                        }} /> <br/>
                                                        </div>   
                                                                {
                                                                    ele.choices.map((subEle,j)=>{
                                                                        return <div style={{marginTop:10,display:'flex',width:'100%'}}>
                                                                            <TextField label="选项" style={{width:'70%'}} onChange={(e)=>{
                                                                                var list =[...questions]
                                                                                list[i].choices[j].value = e.target.value;
                                                                                setquestions(list);
                                                                            }} disabled = {ele.disabled}  variant="outlined" value={subEle.value} /> 
                                                                            <TextField label="价格 $"  onChange={(e)=>{
                                                                                var list =[...questions]
                                                                                list[i].choices[j].price = e.target.value;
                                                                                setquestions(list);

                                                                            }}disabled = {ele.disabled} variant="outlined" style={{width:'30%',marginLeft:10}} value={subEle.price} /></div>
                                                                    })
                                                                }
                                                     </CardContent>  
                                                     <CardActions>
                                                        <Button onClick={()=>{
                                                               var list =[...questions]
                                                               if(!list[i].disabled)
                                                               {list[i].disabled = true}
                                                               else{
                                                                list[i].disabled = false  
                                                               }
                                                               setquestions(list)

                                                        }} style={{width:80}} variant='contained' color="secondary" >{ele.disabled?'修改':'确认'}</Button>
                                                        <Button onClick={()=>{
                                                               var list =[...questions]
                                                               list.splice(i,1)
                                                               setquestions(list)

                                                        }} variant='contained'  style={{width:80,background:'red'}}  >删除</Button>
                                                     </CardActions>  
                                                </Card>
                                                <br/>
                                            </div>

                                 })
 

                                 }
                                  <br/><br/>
                             <Button style={{display:'fixed',left:0,bottom:20}} onClick={()=>{
                               
                               toggleModal()
                             }}color='secondary' variant='contained'>添加问题</Button> 
                             <Button style={{display:'fixed',left:0,bottom:20}} onClick={()=>{
                               console.log(user)
                               let formData = new FormData();
                               formData.append('uid',user.sub)
                               formData.append('title', location.state.productName);
                               formData.append('price', location.state.productPrice);
                               formData.append('des', location.state.productDes);
                               formData.append('storage', location.state.storage);
                               formData.append('unit', location.state.productUnit);
                               formData.append('category', location.state.productCategory);
                               for(var i = 0;i<location.state.imgList.length;i++)
                                {
                                    console.log(location.state.imgList[i])
                                formData.append('file', location.state.imgList[i]);
                               };
                               formData.append('optionList', JSON.stringify(questions));
                               console.log(questions)
                               props.addProduct(formData )
                                
                              }}color='secondary' variant='primary'>提交</Button>
                            </Grid>
                        </React.Fragment>
                    </Grid>
                </Grid>
               < VariantsModal  open={modalOpen}  sendVariants={sendVariants} handleClose={toggleModal}/>
       </Container>
    </div>
  );
}

export default  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Variants);