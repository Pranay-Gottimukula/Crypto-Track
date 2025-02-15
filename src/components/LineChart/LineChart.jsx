import { useContext } from 'react';
import { Line } from 'react-chartjs-2'
import PropTypes from 'prop-types';
import './LineChart.css'
import { CoinContext } from "../../context/CoinContext";
import { chartDays } from '../config/btnData';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
// Using chartjs for the chart

// Taking historicalData, days, setDays as props
const LineChart = ({ historicalData, days, setDays }) => {

    const {currency} = useContext(CoinContext);

    const daysHandler = (value) => {
        setDays(value);    
    }

    // Setting data for the chart
    const chartData = {
        labels: historicalData.map(coin => {
                    let date = new Date(coin[0]);
                    let time = date.getHours() > 12 
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                return days===1 ? time : date.toLocaleDateString()
                }),
                    // Mapping data, price vs time
                    datasets: [
                        {
                            data: historicalData.map((coin) => coin[1]),
                            label: `Price ( Past ${days} Days ) in ${currency.name}`,
                            borderColor: '#00a6e8f6',
                        }
                    ],
    }

    // Setting options for chart
    const chartOptions = {
        elements: {
            point: {
                radius: 2,
            }
        }
    }

  return (
    <div className='chart'>
        {/* Here Line is line chart element */}
        <Line data={chartData} options={chartOptions}></Line>
        <div className='flex justify-around py-4'>
            {/* Mapping buttons with data imported from config folder */}
            {chartDays.map(day => (
                <button className={`chart-btn *:my-6 px-5 py-2.5 rounded-lg cursor-pointer ${days === day.value ? 'activated-btn' : 'unactive-btn'}`}
                 onClick={() => daysHandler(day.value)} key={day.label}>
                    {day.label}
                </button>
            ))}
        </div>
    </div>
  )
}

// Declearing props for Line chart
LineChart.propTypes = {
    historicalData: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number)
    ).isRequired,
    days: PropTypes.number.isRequired,
    setDays: PropTypes.func.isRequ
};
  
  LineChart.defaultProps = {
    historicalData: [],
  };


export default LineChart