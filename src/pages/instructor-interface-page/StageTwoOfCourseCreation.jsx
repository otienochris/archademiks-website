import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, Typography } from '@material-ui/core';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';

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

export default function StageTwoOfCourseCreation({
  classes,
  newCourse,
  setNewCourse,
}) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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
    newCourse.link = embedId;

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

    newCourse.topics.push(topic);
    setNewCourse(newCourse);

    console.log(newCourse);

    reset();
  };

  return (
    <>
      <TextField
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

      <div className={classes.editor}>
        <Editor
          editorState={editorState}
          toolbarClassName='toolbarClassName'
          wrapperClassName='wrapperClassName'
          editorClassName='editorClassName'
          onEditorStateChange={(state) => setEditorState(state)}
        />
      </div>
      <Button onClick={handleSubmit(onSubmit)}>save</Button>
    </>
  );
}
