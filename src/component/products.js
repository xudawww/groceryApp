import React, { useState,useEffect} from 'react';
import { connect } from 'react-redux';
import {addTodo } from '../actions/action'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Tab from '@material-ui/core/Tab';
function mapStateToProps(state, ownProps){
    const { todos } = state.todosReducer
   return {todo:todos}
}
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
  
      onAddTodo: todo => {

        dispatch(addTodo(todo));
      }
    };
  };

 function Products(props){
  const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [index, setIndex] = React.useState(3);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  


  
 

    useEffect(()=>{
      function handleResize() {
        if(window.innerWidth<=1000&&window.innerWidth>800){
          setIndex(4)
        }
        else if(window.innerWidth<=800&&window.innerWidth>523){
          setIndex(6)
        }
        else if(window.innerWidth<=800&&window.innerWidth>523){
          setIndex(6)
        }
        else if(window.innerWidth<=523){
          setIndex(12)
        }
        else{
          setIndex(3)
        }
      
      }
      // handleResize()
      // window.addEventListener('resize', handleResize)
    

    },[props])
  return (<div >
              <br/>
              <Container maxWidth="lg">
              <div className={classes.root}>
                
                    <Grid container spacing={3}>
              
                        <Grid item xs>
                        <Card >
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              alt="Contemplative Reptile"
                              height="240"
                              image="https://www.fishvish.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/h/whole-chicken-with-skin.jpg"
                              title="Contemplative Reptile"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                Lizard
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
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
                        </Grid>
                        <Grid item xs>
                        <Card >
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              alt="Contemplative Reptile"
                              height="240"
                              image="https://www.pork.org/wp-content/uploads/2017/10/raw-bacon-cured-TOPIC.jpg"
                              title="Contemplative Reptile"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                Lizard
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
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
                        </Grid>
                        <Grid item xs>
                          <Card >
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="240"
                                image="https://www.askchefdennis.com/wp-content/uploads/2020/11/rack-of-pork-23-500x375.jpg"
                                title="Contemplative Reptile"
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  Lizard
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                  across all continents except Antarctica
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
                        
                        </Grid>
                      <Grid item xs>
                        <Card >
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="240"
                                image="https://cdn.britannica.com/68/143268-050-917048EA/Beef-loin.jpg"
                                title="Contemplative Reptile"
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  Lizard
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                  across all continents except Antarctica
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
                        </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                        <Grid item xs>  
                          <Card >
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="240"
                                image="https://www.sweetandsavorybyshinee.com/wp-content/uploads/2014/01/Roasted-Rack-of-Lamb-1-500x500.jpg"
                                title="Contemplative Reptile"
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  Lizard
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                  across all continents except Antarctica
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
                        </Grid>
                        <Grid item xs>
                       
                        <Card >
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="240"
                                image="https://www.specialtyproduce.com/sppics/6719.png"
                                title="Contemplative Reptile"
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  Lizard
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                  across all continents except Antarctica
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
                        </Grid>
                  
                        <Grid item xs>
                        <Card >
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="240"
                                image=" https://www.burpee.com/dw/image/v2/ABAQ_PRD/on/demandware.static/-/Sites-masterCatalog_Burpee/default/dw4dd5c8b4/Images/Product%20Images/prod000626/prod000626.jpg?sw=320&sh=378&sm=fit"
                                title="Contemplative Reptile"
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  Lizard
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                  across all continents except Antarctica
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
                        </Grid>
                        <Grid item xs> 
                        <Card >
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="240"
                                image="https://www.culinaemundi.com/wp-content/uploads/2018/03/IMG_1113-575x431.jpg"
                                title="Contemplative Reptile"
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  Lizard
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                  across all continents except Antarctica
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
                        </Grid> 
                      </Grid> 
                    
                   
                </div>
              </Container>
   </div>)

}

export default  connect(
    mapStateToProps,
    mapDispatchToProps
  )( Products);