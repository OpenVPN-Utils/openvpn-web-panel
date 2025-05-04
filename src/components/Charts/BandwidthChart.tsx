import React from 'react';
import Chart from 'react-apexcharts';
import {BandwidthData} from '../../types';
import {formatBytes} from '../../utils/formatters';
import {selectTheme} from '../../store/slices/themeSlice';
import * as styles from './BandwidthChart.module.css';
import {useAppSelector} from "../../store/store";

interface BandwidthChartProps {
  data: BandwidthData[];
}

const BandwidthChart: React.FC<BandwidthChartProps> = ({data}) => {
  const theme = useAppSelector(selectTheme);

  if (!data || data.length === 0) {
    return <div className={styles.loading}>Loading chart data...</div>;
  }

  const series = [
    {
      name: 'Download',
      data: data.map(item => item.download),
    },
    {
      name: 'Upload',
      data: data.map(item => item.upload),
    }
  ];

  const categories = data.map(item => {
    const date = new Date(item.time);
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  });

  const options = {
    chart: {
      type: 'area' as const,
      height: 350,
      toolbar: {
        show: false,
      },
      background: 'transparent',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth' as const,
      width: 2,
    },
    colors: ['#1E88E5', '#43A047'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: categories,
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
        formatter: function (value: number) {
          return formatBytes(value) + '/s';
        },
        style: {
          colors: theme === 'dark' ? '#E0E0E0' : '#616161',
        },
      },
    },
    tooltip: {
      theme: theme,
      y: {
        formatter: function (value: number) {
          return formatBytes(value) + '/s';
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
      yaxis: {
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
            type="area"
            height={350}
        />
      </div>
  );
};

export default BandwidthChart;