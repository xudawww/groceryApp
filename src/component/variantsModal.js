import React,{ useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import {createMuiTheme, ThemeProvider} from "@material-ui/core";    
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CustomizedSnackbars from './alert';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import cloneDeep from 'lodash/cloneDeep';

export default function VariantsModal(props) {
    const [value, setValue] = React.useState('fill');
    const [question, setquestion] = React.useState(null);
    const [questions, setquestions] = React.useState([]);
    const [radioNumber, setradioNumber] = React.useState(2);
    const [choices, setchoices] = React.useState([]);
    const [AlertContent, setAlertContent] = React.useState(null);
    const [showAlert, setshowAlert] = React.useState(false);
    const handleChange = (event) => {
        console.log(event.target.value)
      setValue(event.target.value);
      if(event.target.value=='fill'){
          setchoices([])
          console.log('here')
      }
      else{
        var list = [];
        for(var i =0;i<2;i++){
            list.push({
                    choiceLabel:'选择'+(i+1),
                    priceLabel:'价格'+(i+1),
                    price:'',
                    value:'',
                    id:i,
                    disabled:true
                })
            

            }
        setchoices([...list])
      }
    };
    useEffect(()=>{


      setchoices([]);




    },[props.open])
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
  
   const handleModal=()=>{
    setshowAlert(!showAlert)

}
  
    return (
      <ThemeProvider theme={theme}>
      
        <Dialog onClose={props.handleClose}  fullWidth={true}
maxWidth = {'lg'}aria-labelledby="simple-dialog-title" open={props.open}>
            <div style={{padding:20}}>
           <FormControl component="fieldset">
                <FormLabel component="legend">设置产品选项</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        <FormControlLabel value="fill" control={<Radio />} label="填空" />
                        <FormControlLabel value="choice" control={<Radio />} label="选择" />
                    </RadioGroup>
            </FormControl>
            <br/><br/>
            <FormControl component="fieldset" style={{width:'100%'}}>
                <TextField fullWidth label='选项问题' value={question} onChange={(e)=>{setquestion (e.target.value)}}/><br/>
                    {value=='choice'?
                        <div>
                            <TextField fullWidth  type='number' error={radioNumber>5||radioNumber<1} helperText={radioNumber>5||radioNumber<1?"最少1个选项,最多五个选项。":null} label='选项个数' value={radioNumber} onChange={(e)=>{
                                setradioNumber(e.target.value)
                                var list =[]
                                if(e.target.value<=5&&e.target.value>=1)
                                    {for(var i =0;i<e.target.value;i++){
                                        list.push({
                                                choiceLabel:'选择'+(i+1),
                                                priceLabel:'价格'+(i+1),
                                                price:'',
                                                value:'',
                                                id:i,
                                                disabled:true
                                            })
                                        

                                        }
                                    }
                                    setchoices([...list])
                                        
                                        console.log(choices)
                                }}/>
                                <br/> <br/>
                                <form>
                                    {/* <TextField  label={'Choice'}    /> <TextField style={{marginLeft:10}} type='number' label={'价格 $'} /> */}
                                        {
                                            choices.map((ele,i)=>{

                                               return <div style={{display:'flex'}}><TextField onChange={(e)=>{
                                                  var list = [...choices]
                                                  list[i].value= e.target.value;
                                                  setchoices(list)



                                               }} value={ele.value} label={ele.choiceLabel} /> <TextField style={{marginLeft:15}} onChange={(e)=>{
                                                var list = [...choices]
                                                list[i].price= e.target.value;
                                                setchoices(list)


                                               }}value={ele.price}  type='number' label={ele.priceLabel} /></div>;



                                            })


                                        }
                                    </form>
                            </div>:null}
                                
                                    </FormControl>
                                    <CustomizedSnackbars content={AlertContent} open={showAlert} handleClose={handleModal}/>
                                    
         
          <DialogActions>
            <Button  color="primary">
              Disagree
            </Button>
            <Button onClick={()=>{
                                       var list =[...questions]
                                       var choiceCopy = cloneDeep(choices);
                                       list.push({
                                           type:value,
                                           title:question,
                                           choices:choiceCopy,
                                           disabled:true

                                       })
                                       setquestions(list)
                                       console.log(list)
                                       setValue('fill')
                                       props.sendVariants(list)
                                       props.handleClose()

                                    }} disabled={ifDisable()}  variant="contained" color='secondary'>添加问题</Button>
          </DialogActions>
          </div>
        </Dialog>

      </ThemeProvider>
    );
  }
  