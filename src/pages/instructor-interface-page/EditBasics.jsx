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
import { useSelector } from 'react-redux';
import { LMS_COURSES } from '../../commons/urls';

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
  console.log(course);
  const classes = useStyles();
  const [saved, setSaved] = useState(false);
  const token = useSelector((state) => state.login.value.token);
  const [courseState, setCourseState] = useState(course);
  const [isLoading, setIsLoading] = useState(false);
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

  const saveChanges = async (category, title, description, thumbnailLink, introductionVideoLink) => {
    setIsLoading(true);
    const body = {
      description,
      title,
      thumbnailLink,
      price: 0,
      category,
      introductionVideoLink,
      version: course.version
    }
    await fetch(LMS_COURSES + "/" + course.courseId, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(body),
      headers: {
        Authorization: "Bearer " + token,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        setIsLoading(false);
        if (response.status >= 200 && response.status < 300) {
          setSaved(true);
          alert("changes saved successfully");
        }
        return response.json();
      })
      .then((data) => {
        setCourseState(data);
      })
      .catch((error) => {
        alert("Error saving changes");
        setIsLoading(false);
        console.log(error)
      });
  }

  const onSubmit = (data) => {
    const splitLink = data.link.split('/');
    const embedId = splitLink[splitLink.length - 1];

    saveChanges(data.category, data.title, data.description, data.thumbnail, embedId)

    reset();
  };

  useEffect(() => {
    if (courseState.category) {
      setValue('category', course.category, {
        shouldValidate: true,
      });
    }
    if (courseState.title) setValue('title', courseState.title, { shouldValidate: true });
    if (course.description)
      setValue('description', courseState.description, {
        shouldValidate: true,
      });
    if (courseState.thumbnailLink)
      setValue('thumbnail', course.thumbnailLink, { shouldValidate: true });
    if (courseState.introductionVideoLink)
      setValue('link', 'https://youtu.be/' + course.introductionVideoLink, {
        shouldValidate: true,
      });
  }, [courseState, setValue]);
  return (
    <form className={classes.form}>
      <FormControl sx={{ m: 1, minWidth: 120 }} className={classes.select}>
        <InputLabel id='demo-simple-select-helper-label'>Category</InputLabel>
        <Select
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          label={'Category'}
          variant='filled'
          {...register('category')}
          error={errors.category ? true : false}
          defaultValue={courseState.category}
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
        minRows={5}
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
        style={{
          margin: '16px',
          backgroundColor: '#ff8c00',
          color: 'black',
          fontWeight: 'bolder',
        }}
        variant='contained'
        onClick={handleSubmit(onSubmit)}
      >
        Save
      </Button>
    </form>
  );
}

export default EditBasics;
