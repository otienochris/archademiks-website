import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, TextField, Typography } from '@material-ui/core';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { useStyles } from './newCourseUseStyles';
import { LMS_TOPICS } from '../../commons/urls';
import { useSelector } from 'react-redux';

const schema = yup.object({
  title: yup.string().min(10).max(50).required('Course Title is required.'),
  description: yup
    .string()
    .min(100)
    .max(1000)
    .required('Description is required.'),
  link: yup
    .string()
    .matches(
      /^(http[s]?:\/{2})|(^www\.).*$/,
      'Provid a link that start with either https://, http:// or www.'
    ),
});

function AddNewTopic({ setAddNewTopic, courseId }) {
  const token = useSelector((state) => state.login.value.token);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );


  const saveNewTopic = async (title, description, link, content) => {
    const body = {
      title,
      description,
      link,
      content,
      version: 0
    }
    console.log(body)
    await fetch(LMS_TOPICS + "?courseId=" + courseId, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(body),
      headers: {
        Authorization: "Bearer " + token,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {

        if (response.status >= 200 && response.status < 300) {
          alert("Topic saved successfully");
          setAddNewTopic(state => !state);
        } else {
          alert("Error saving topic");
        }
        return response.json();
      })
      .then((data) => {

        console.log(data)
      })
      .catch((error) => console.log(error));
  }

  const classes = useStyles();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    criteriaMode: 'all',
  });

  const onSubmit = (data) => {
    // extract embedid
    const splitLink = data.link.split('/');
    const embedId = splitLink[splitLink.length - 1];
    // newCourse.link = embedId;

    // extract content from editor
    const contentInHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );


    saveNewTopic(data.title, data.description, embedId, contentInHtml);
  };

  return (
    <form className={classes.form}>
      <TextField
        id='title'
        variant='filled'
        label='Topic Title'
        placeholder='Provide a brief yet descriptive title'
        autoComplete='off'
        {...register('title')}
        error={errors.title ? true : false}
        helperText={errors.title ? errors.title.message : ''}
        style={{ margin: '16px' }}
      />

      <TextField
        id='description'
        variant='filled'
        label='Topic Description'
        placeholder='Provide a brief description of the goals and contents of the topic'
        autoComplete='off'
        multiline
        minRows={5}
        {...register('description')}
        error={errors.description ? true : false}
        helperText={errors.description ? errors.description.message : ''}
        style={{ margin: '16px' }}
      />
      <TextField
        id='link'
        {...register('link')}
        variant='filled'
        label='Introduction Video'
        placeholder='Add link to a video of your topics introduction video'
        autoComplete='off'
        error={errors.link ? true : false}
        helperText={errors.link ? errors.link.message : ''}
        style={{ margin: '16px' }}
      />

      <Typography variant='h6' style={{ margin: '16px' }}>
        Content
      </Typography>

      <div
        className={classes.editor}
        style={{ border: '1px solid black', padding: '2px' }}
      >
        {/* <div> */}
        <Editor
          editorState={editorState}
          toolbarClassName='toolbarClassName'
          wrapperClassName='wrapperClassName'
          editorClassName='editorClassName'
          onEditorStateChange={(state) => setEditorState(state)}
        />
      </div>
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
        save
      </Button>
    </form>
  );
}

export default AddNewTopic;
