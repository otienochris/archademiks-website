import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { courseCategories } from '../../data/courses';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

const schema = yup.object({
  category: yup
    .string()
    .oneOf([courseCategories])
    .required('Course Category is required'),
  title: yup
    .string()
    .min(10)
    .max(50)
    .required('Course Title is required.'),
  description: yup
    .string()
    .min(100)
    .max(200)
    .required('Description is required.'),
  thumbnail: yup
    .string()
    .matches(
      /^(http[s]?:\/{2})|(^www\.).*$/,
      'Provid a link that start with either https://, http:// or www.'
    )
    .required("Link to your course's thumbnail is required"),
  link: yup
    .string()
    .matches(
      /^(http[s]?:\/{2})|(^www\.).*$/,
      'Provid a link that start with either https://, http:// or www.'
    ),
});

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems: 'center',
    width: '100%',
  },
  textField: {
    margin: theme.spacing(2),
  },
  select: {
    margin: theme.spacing(2),
  },
}));

export default function CreateCourse({
  setCreateNewCourse,
  setNewCourse,
  newCourse,
}) {
  const classes = useStyles();
  const [step, setStep] = useState(0);

  const onSubmit = (data) => {
    const splitLink = data.link.split('/');
    const embedId = splitLink[splitLink.length - 1];
    data.link = embedId;
    setNewCourse({ ...data });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    criteriaMode: 'all',
  });
  return (
    <Container>
      <Button
        variant='contained'
        color='primary'
        onClick={() => setCreateNewCourse(false)}
      >
        Save and Exit
      </Button>
      {step === 0 ? (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <Typography variant='h4'>New Course</Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }} className={classes.select}>
            <InputLabel id='demo-simple-select-helper-label'>
              Category
            </InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              label='Category'
              variant='filled'
              {...register('category')}
              error={errors.category ? true : false}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {courseCategories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors.category ? errors.category.message : ''}
            </FormHelperText>
          </FormControl>

          <TextField
            variant='filled'
            label='Course Title'
            placeholder='Provide a brief yet descriptive title'
            autoComplete='off'
            {...register('title')}
            error={errors.title ? true : false}
            helperText={errors.title ? errors.title.message : ''}
            style={{ margin: '16px' }}
          />

          <TextField
            variant='filled'
            label='Course Description'
            placeholder='Provide a brief description of the goals and contents of the course'
            autoComplete='off'
            {...register('description')}
            error={errors.description ? true : false}
            helperText={errors.description ? errors.description.message : ''}
            style={{ margin: '16px' }}
          />

          <TextField
            {...register('thumbnail')}
            variant='filled'
            label='Link to thumbnail'
            placeholder='Select a free image from the net and copy its url'
            autoComplete='off'
            error={errors.thumbnail ? true : false}
            helperText={errors.thumbnail ? errors.thumbnail.message : ''}
            style={{ margin: '16px' }}
          />

          <TextField
            {...register('link')}
            variant='filled'
            label='Introduction Video'
            placeholder='Add link to your introduction video'
            autoComplete='off'
            error={errors.link ? true : false}
            helperText={errors.link ? errors.link.message : ''}
            style={{ margin: '16px' }}
          />

          <Button type='submit' variant='contained' color='primary'>
            Next
          </Button>
        </form>
      ) : (
        ''
      )}
    </Container>
  );
}
