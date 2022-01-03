import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core"
import CountUp from 'react-countup';
import cx from 'classnames'

import styles from './Cards.module.css'

const Cards = ({ data: {confirmed, deaths, lastUpdate}}) => {
    
   if(!confirmed) {
        return 'Loading...'
   }
    return (
       <div className="styles.container">
           <Grid container spacing={2} justifyContent="center">
               <Grid item component={Card} xs={12} md={5} className={cx(styles.card, styles.infected)}>
                   <CardContent>
                       <Typography color= 'error' gutterBottom> Infected</Typography>
                       <Typography variant="h5">
                           <CountUp
                            start= {0}
                            end= {confirmed.value}
                            duration={2.5}
                            separator=","
                            />
                       </Typography>
                       <Typography color='primary'>{new Date(lastUpdate).toDateString()}</Typography>
                       <Typography variant="body2">Number of active cases of COVID-19</Typography>
                   </CardContent>
               </Grid>
               <Grid item component={Card} xs={12} md={5} className={cx(styles.card, styles.deaths)}>
                   <CardContent>
                       <Typography color= 'error' gutterBottom> Deaths</Typography>
                       <Typography variant="h5">
                           <CountUp
                            start= {0}
                            end= {deaths.value}
                            duration={2.5}
                            separator=","
                            />
                       </Typography>
                       <Typography color='primary'>{new Date(lastUpdate).toDateString()}</Typography>
                       <Typography variant="body2">Number of deaths caused by COVID-19</Typography>
                   </CardContent>
               </Grid>
               
           </Grid>
       </div>
    )
}

export default Cards