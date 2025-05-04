import React from 'react';
import Chart from 'react-apexcharts';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../store/slices/themeSlice';
import * as styles from './LoadAverageChart.module.css';

interface LoadAverageChartProps {
  loadAverage: number[];
}

const LoadAverageChart: React.FC<LoadAverageChartProps> = ({loadAverage}) => {
  const theme = useSelector(selectTheme);

  if (!loadAverage || loadAverage.length === 0) {
    return <div className={styles.loading}>Loading load average data...</div>;
  }

  const series = [
    {
      name: '1 min',
      data: [loadAverage[0]],
    },
    {
      name: '5 min',
      data: [loadAverage[1]],
    },
    {
      name: '15 min',
      data: [loadAverage[2]],
    }
  ];

  const options = {
    chart: {
      type: 'bar' as const,
      toolbar: {
        show: false,
      },
      background: 'transparent',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
        borderRadius: 6,
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: [theme === 'dark' ? '#E0E0E0' : '#616161'],
      },
    },
    colors: ['#64B5F6', '#1E88E5', '#1565C0'],
    xaxis: {
      categories: ['Load Average'],
      labels: {
        style: {
          colors: theme === 'dark' ? '#E0E0E0' : '#616161',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme === 'dark' ? '#E0E0E0' : '#616161',
        },
      },
    },
    tooltip: {
      theme: theme,
      y: {
        formatter: function (value: number) {
          return value.toFixed(2);
        }
      }
    },
    grid: {
      borderColor: theme === 'dark' ? '#424242' : '#E0E0E0',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true
        }
      },
    },
    legend: {
      position: 'top' as const,
      horizontalAlign: 'right' as const,
      labels: {
        colors: theme === 'dark' ? '#E0E0E0' : '#616161',
      },
    },
  };

  return (
      <div className={styles.chartContainer}>
        <Chart
            options={options}
            series={series}
            type="bar"
            height={300}
        />
      </div>
  );
};

export default LoadAverageChart;