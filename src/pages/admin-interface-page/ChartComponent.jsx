import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function ChartComponent({
  data,
  xaxisKey,
  lineOneKey,
  lineTwoKey,
  strokeAColor,
  strokeBColor,
  title,
}) {
  return (
    <Paper style={{ padding: '20px', margin: '20px auto' }}>
      <Typography variant='body1'>{title == undefined ? '' : title}</Typography>

      <LineChart
        width={500}
        height={400}
        data={data}
        style={{ margin: '20px auto' }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={xaxisKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey={lineOneKey}
          stroke={strokeAColor == undefined ? '#8884d8' : strokeAColor}
          activeDot={{ r: 8 }}
        />
        <Line
          type='monotone'
          dataKey={lineTwoKey}
          stroke={strokeBColor == undefined ? '#82ca9d' : strokeBColor}
        />
      </LineChart>
    </Paper>
  );
}

export default ChartComponent;
