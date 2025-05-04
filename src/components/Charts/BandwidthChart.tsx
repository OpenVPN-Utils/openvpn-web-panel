import React from 'react';
import Chart from 'react-apexcharts';
import {BandwidthData} from '../../types';
import {formatBytes} from '../../utils/formatters';
import {useAppSelector} from "../../store/store";
import {selectTheme} from '../../store/slices/themeSlice';
import * as styles from './BandwidthChart.module.css';
import {ApexOptions} from "apexcharts";

interface BandwidthChartProps {
  data: BandwidthData[];
}

const BandwidthChart: React.FC<BandwidthChartProps> = ({data}) => {
  const theme = useAppSelector(selectTheme);

  if (!data?.length) {
    return <div className={styles.loading}>Loading chart data...</div>;
  }

  const series = [
    {name: 'Download', data: data.map(item => item.download)},
    {name: 'Upload', data: data.map(item => item.upload)}
  ];

  const categories = data.map(item =>
      new Date(item.time).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
  );

  const chartOptions: ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {show: false},
      background: 'transparent'
    },
    dataLabels: {enabled: false},
    stroke: {curve: 'smooth', width: 2},
    colors: ['#1E88E5', '#43A047'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories,
      labels: {style: {colors: theme === 'dark' ? '#E0E0E0' : '#616161'}},
      axisBorder: {show: false},
      axisTicks: {show: false}
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `${formatBytes(value)}/s`,
        style: {colors: theme === 'dark' ? '#E0E0E0' : '#616161'}
      }
    },
    tooltip: {
      theme,
      y: {formatter: (value: number) => `${formatBytes(value)}/s`}
    },
    grid: {
      borderColor: theme === 'dark' ? '#424242' : '#E0E0E0',
      strokeDashArray: 4,
      xaxis: {lines: {show: true}},
      yaxis: {lines: {show: true}}
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {colors: theme === 'dark' ? '#E0E0E0' : '#616161'}
    }
  };

  return (
      <div className={styles.chartContainer}>
        <Chart
            options={chartOptions}
            series={series}
            type="area"
            height={350}
        />
      </div>
  );
};

export default React.memo(BandwidthChart);