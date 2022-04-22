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

export default function StageOneOfCourseCreation({
  classes,
  newCourse,
  setNewCourse,
  setIsStageSubmited,
}) {
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
    newCourse.category = data.category;
    newCourse.title = data.title;
    newCourse.description = data.description;
    newCourse.thumbnail = data.thumbnail;

    const splitLink = data.link.split('/');
    const embedId = splitLink[splitLink.length - 1];
    newCourse.link = embedId;
    setNewCourse(newCourse);
    setSaved(true);
    reset();
    setIsStageSubmited(true);
  };

  useEffect(() => {
    if (newCourse.category) {
      setValue('category', newCourse.category, {
        shouldValidate: true,
      });
    }
    if (newCourse.title)
      setValue('title', newCourse.title, { shouldValidate: true });
    if (newCourse.description)
      setValue('description', newCourse.description, { shouldValidate: true });
    if (newCourse.thumbnail)
      setValue('thumbnail', newCourse.thumbnail, { shouldValidate: true });
    if (newCourse.category)
      setValue('link', 'https://youtu.be/' + newCourse.link, {
        shouldValidate: true,
      });
  }, [newCourse, setValue]);

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} className={classes.select}>
        <InputLabel id='demo-simple-select-helper-label'>Category</InputLabel>
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
        autoComplete='on'
        {...register('title')}
        error={errors.title ? true : false}
        helperText={errors.title ? errors.title.message : ''}
        style={{ margin: '16px' }}
      />

      <TextField
        variant='filled'
        label='Course Description'
        placeholder='Provide a brief description of the goals and contents of the course'
        autoComplete='on'
        multiline
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
        autoComplete='on'
        error={errors.thumbnail ? true : false}
        helperText={errors.thumbnail ? errors.thumbnail.message : ''}
        style={{ margin: '16px' }}
      />

      <TextField
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
        Submit
      </Button>
    </>
  );
}
