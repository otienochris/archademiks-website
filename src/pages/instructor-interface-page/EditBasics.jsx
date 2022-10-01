import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { courseCategories } from '../../data/courses';
import { useStyles } from './newCourseUseStyles';

const schema = yup.object({
  category: yup
    .string()
    .oneOf([courseCategories])
    .required('Course Category is required'),
  title: yup.string().min(10).max(50).required('Course Title is required.'),
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

function EditBasics({ course }) {
  const classes = useStyles();
  const [saved, setSaved] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    criteriaMode: 'all',
  });

  const onSubmit = (data) => {
    const splitLink = data.link.split('/');
    const embedId = splitLink[splitLink.length - 1];
    setSaved(true);
    reset();
  };

  useEffect(() => {
    if (course.category) {
      setValue('category', course.category, {
        shouldValidate: true,
      });
    }
    if (course.title) setValue('title', course.title, { shouldValidate: true });
    if (course.description)
      setValue('description', course.description, {
        shouldValidate: true,
      });
    if (course.thumbnail)
      setValue('thumbnail', course.thumbnail, { shouldValidate: true });
    if (course.link)
      setValue('link', 'https://youtu.be/' + course.link, {
        shouldValidate: true,
      });
  }, [course, setValue]);
  return (
    <form className={classes.form}>
      <FormControl sx={{ m: 1, minWidth: 120 }} className={classes.select}>
        <InputLabel id='demo-simple-select-helper-label'>Category</InputLabel>
        <Select
          disabled={saved}
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          label={'Category'}
          variant='filled'
          {...register('category')}
          error={errors.category ? true : false}
          defaultValue={course.category}
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
        disabled={saved}
        variant='filled'
        label='Course Title'
        placeholder='Provide a brief yet descriptive title'
        autoComplete='on'
        {...register('title')}
        error={errors.title ? true : false}
        helperText={errors.title ? errors.title.message : ''}
        style={{ margin: '16px' }}
      />

      <TextField
        disabled={saved}
        variant='filled'
        label='Course Description'
        placeholder='Provide a brief description of the goals and contents of the course'
        autoComplete='on'
        multiline
        minRows={5}
        {...register('description')}
        error={errors.description ? true : false}
        helperText={errors.description ? errors.description.message : ''}
        style={{ margin: '16px' }}
      />

      <TextField
        disabled={saved}
        {...register('thumbnail')}
        variant='filled'
        label='Link to thumbnail'
        placeholder='Select a free image from the net and copy its url'
        autoComplete='on'
        error={errors.thumbnail ? true : false}
        helperText={errors.thumbnail ? errors.thumbnail.message : ''}
        style={{ margin: '16px' }}
      />

      <TextField
        disabled={saved}
        {...register('link')}
        variant='filled'
        label='Introduction Video'
        placeholder='Add link to your introduction video'
        autoComplete='on'
        error={errors.link ? true : false}
        helperText={errors.link ? errors.link.message : ''}
        style={{ margin: '16px' }}
      />

      <Button
        style={{ margin: '16px' }}
        variant='contained'
        color='secondary'
        disabled={saved}
        onClick={handleSubmit(onSubmit)}
      >
        Save
      </Button>
    </form>
  );
}

export default EditBasics;
