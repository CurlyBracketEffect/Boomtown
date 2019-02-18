import React from 'react';
import { Link } from "react-router-dom"
import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



const styles = {
  card: {
    width: 250,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    background: 'black',
    color: 'white',
  },
  myItems: {
    display: 'flex',
    justifyContent: 'center',
  },
};

const Dashboard = (props)=> (
  <Query
    query={gql`
    query {
      viewer{
        items{
          id
          title
          description
        }
      }
    }
    `}
    >
    {({ loading, error, data }) => {
      if (loading) return <option>Loading...</option>;
      if (error) {
        console.log(error)
        return <option>Error </option>;
      }  
        const { classes } = props;
 
      return(
        
        <div >
          <h1>My Items</h1>
          <Grid container spacing={16} className={classes.myItems}>
          {data.viewer.items.map(item =>(
            <Grid item>
              <Card className={classes.card}>
              <CardContent style={{width : '250px !important'}}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="h2">
                  be
                  {/* {bull} */}
                  nev
                  {/* {bull}o{bull} */}
                  lent
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  adjective
                </Typography>
                <Typography component="p">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button className={classes.button} size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>

      ))}
        </Grid>
          <Link to="/items/create"><button>Add Item</button></Link>
        </div>
      )
      }}
  </Query>
)

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard)


{/* <div key = {item.id}>
<p>{item.title} </p>
<p>{item.description} </p>
</div> */}

