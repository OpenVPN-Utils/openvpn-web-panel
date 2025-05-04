import React from 'react';
import Chart from 'react-apexcharts';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../store/slices/themeSlice';
import {selectAllClients} from '../../store/slices/clientsSlice';
import {formatBytes} from '../../utils/formatters';
import * as styles from './TrafficChart.module.css';

const TrafficChart: React.FC = () => {
  const theme = useSelector(selectTheme);
  const clients = useSelector(selectAllClients);

  // Process data for the chart
  const processData = () => {
    if (!clients || clients.length === 0) {
      return {
        labels: [],
        downloadSeries: [],
        uploadSeries: []
      };
    }

    // Sort clients by total traffic (download + upload)
    const sortedClients = [...clients]
        .sort((a, b) =>
            (b.bytesReceived + b.bytesSent) - (a.bytesReceived + a.bytesSent)
        )
        .slice(0, 5); // Get top 5 clients by traffic

    return {
      labels: sortedClients.map(client => client.name),
      downloadSeries: sortedClients.map(client => client.bytesReceived),
      uploadSeries: sortedClients.map(client => client.bytesSent)
    };
  };

  const {labels, downloadSeries, uploadSeries} = processData();

  if (!clients || clients.length === 0) {
    return <div className={styles.loading}>No client data available</div>;
  }

  const series = [
    {
      name: 'Download',
      data: downloadSeries,
    },
    {
      name: 'Upload',
      data: uploadSeries,
    }
  ];

  const options = {
    chart: {
      type: 'bar' as const,
      stacked: false,
      toolbar: {
        show: false,
      },
      background: 'transparent',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#1E88E5', '#43A047'],
    xaxis: {
      categories: labels,
      labels: {
        style: {
          colors: theme === 'dark' ? '#E0E0E0' : '#616161',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (value: number) {
          return formatBytes(value);
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
          return formatBytes(value);
        }
      }
    },
    legend: {
      position: 'top' as const,
      horizontalAlign: 'right' as const,
      labels: {
        colors: theme === 'dark' ? '#E0E0E0' : '#616161',
      },
    },
    grid: {
      borderColor: theme === 'dark' ? '#424242' : '#E0E0E0',
      strokeDashArray: 4,
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

export default TrafficChart;