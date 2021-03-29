import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Input } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
export default function SellerSignupModal(props) {
    const [name, setname] = React.useState(null);
    const [location, setlocation] = React.useState(null);
    const [file, setfile] = React.useState(null);
    const { onClose, selectedValue, open } = props;
    const { user } = useAuth0();
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
    const sendApplication=()=>{
      let formData = new FormData();
      formData.append('ID', user.sub);
      formData.append('name', name);
      formData.append('location', location);
      console.log(file)
      formData.append('file', file);
      console.log(file)
      axios.post('http://localhost:3001/addSeller', 
        formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    }
    const handleListItemClick = (value) => {
      onClose(value);
    };
  
    return (
      <ThemeProvider theme={theme}>
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
          <div style={{padding:20}}>
          <DialogTitle  id="simple-dialog-title">申请为卖家</DialogTitle>
          <TextField error={name==null} value={name} onChange={(event)=>{
              setname(event.target.value)
             
          }}fullWidth id="standard-basic" label="姓名" /><br/><br/>
          <TextField error={location==null} value={location} onChange={(event)=>{
              setlocation(event.target.value)

          }} value={location} fullWidth id="standard-basic" label="地址" /><br/><br/>
          商业执照<br/>
          <TextField onChange={(event)=>{
            setfile(event.target.files[0])
           

          }} type='file' id="standard-basic" />
          </div>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button color='secondary' variant="contained" onClick={()=>{handleClose();
            sendApplication();
            
            }} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
  }
  