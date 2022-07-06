import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// white,whitesmoke, #FFFFFF,
function ChartComponent({
  data,
  xaxisKey,
  lineOneKey,
  lineTwoKey,
  strokeAColor,
  strokeBColor,
  title,
}) {
  const [listYears] = useState(data.flatMap((item) => item.year));
  const [value, setValue] = useState(listYears[0]);
  const [dataToDisplay, setDataToDisplay] = useState(data[0].data);

  const handleSelectionChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const filteredData = data.filter((item) => item.year == value)[0];
    if (filteredData != undefined) {
      setDataToDisplay(filteredData.data);
    }
  }, [value]);

  return (
    <Paper
      style={{
        padding: '20px',
        margin: '20px auto',
        backgroundColor: 'lightgrey',
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='body1' align='center'>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl style={{ margin: '10px auto' }} fullWidth>
            <Select
              value={value}
              onChange={handleSelectionChange}
              style={{ margin: '10px auto' }}
            >
              {listYears.map((year, index) => (
                <MenuItem key={index} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <LineChart
          width={500}
          height={400}
          data={dataToDisplay}
          style={{ margin: '20px auto', color: '#FFF8F0' }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey={xaxisKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey={lineOneKey}
            stroke={strokeAColor == undefined ? '#1E1E24' : strokeAColor}
            activeDot={{ r: 8 }}
          />
          <Line
            type='monotone'
            dataKey={lineTwoKey}
            stroke={strokeBColor == undefined ? '#EA1744' : strokeBColor}
          />
        </LineChart>
      </Grid>
    </Paper>
  );
}

export default ChartComponent;
