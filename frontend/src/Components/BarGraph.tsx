import React from 'react'
import { Bar } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

interface IBar {
    data: ChartData<'bar'>,
    options?: ChartOptions<'bar'>
}

function BarGraph({ data, options }: IBar) {
  return (
    <Bar 
      data={data}
      options={options}
    />
  )
}

export default BarGraph