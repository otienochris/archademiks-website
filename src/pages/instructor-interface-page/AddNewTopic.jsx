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

const schema = yup.object({
  title: yup.string().min(10).max(50).required('Course Title is required.'),
  description: yup
    .string()
    .min(100)
    .max(200)
    .required('Description is required.'),
  link: yup
    .string()
    .matches(
      /^(http[s]?:\/{2})|(^www\.).*$/,
      'Provid a link that start with either https://, http:// or www.'
    ),
});

function AddNewTopic() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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

    const topic = {
      title: data.title,
      description: data.description,
      content: contentInHtml,
      link: embedId,
      subTopics: [],
    };

    console.log(topic);

    //   newCourse.topics.push(topic);
    //   setNewCourse(newCourse);

    //   setIsStageSubmited(true);

    // resetting the fields
    //   reset();
    //   setEditorState(EditorState.createEmpty());
    //   var title = document.getElementById('title');
    //   var description = document.getElementById('description');
    //   var link = document.getElementById('link');
    //   title.value = '';
    //   description.value = '';
    //   link.value = '';
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
        style={{ margin: '16px' }}
        variant='contained'
        color='secondary'
        onClick={handleSubmit(onSubmit)}
      >
        save
      </Button>
    </form>
  );
}

export default AddNewTopic;
