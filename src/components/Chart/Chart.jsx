import React, { useState, useEffect} from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
  } from "chart.js";

import styles from './Chart.module.css'

ChartJS.register(CategoryScale, BarElement,LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ data: {confirmed, deaths}, country }) => {
    const [dailyData, setDailyData ] = useState([])

    useEffect(() => {
        const fetchAPI = async () =>{
            setDailyData(await fetchDailyData())
        }
        fetchAPI()
    },[])

    const lineChart = (
        dailyData[0] ? (
          <Line
            data={{
              labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
              datasets: [{
                data: dailyData.map((data) => data.confirmed),
                label: 'Infected',
                borderColor: 'rgba(38, 125, 217, 0.8)',
                fill: true,
              }, {
                data: dailyData.map((data) => data.deaths),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(250, 85, 85, 0.8)',
                fill: true,
              }
              ],
            }}
          />
        ) : null
      );

    const barChart = (
        confirmed
        ? (
            <Bar 
            data= {{
                labels: ['Infected' , 'Deaths'],
                datasets: [{
                    label:'people',
                    backgroundColor: [
                        'rgba(0, 0, 255, 0.5)', 
                        'rgba(255, 0, 0, 0.5)'
                    ],
                    data: [confirmed.value,  deaths.value]
                }]
            }}
            options={{
                legend: {display: false},
                title: { display: true, text: `Current state in ${country}`}
            }}
            />
        ) : null
    )


    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart