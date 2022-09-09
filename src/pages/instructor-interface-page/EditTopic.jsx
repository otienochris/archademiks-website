import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, TextField, Typography } from '@material-ui/core';
import draftToHtml from 'draftjs-to-html';
import {
  ContentState,
  // CompositeDecorator,
  convertFromHTML,
} from 'draft-js';
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

function EditTopic({ topic }) {
  const classes = useStyles();
  // const decorator = new CompositeDecorator([
  //   {
  //     strategy: findLinkEntities,
  //     component: Link,
  //   },
  //   {
  //     strategy: findImageEntities,
  //     component: Image,
  //   },
  // ]);
  const blocksFromHTML = convertFromHTML(topic.content);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(state, null)
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    criteriaMode: 'all',
  });

  useEffect(() => {
    setValue('title', topic.title, { shouldValidate: true });
    setValue('description', topic.description, { shouldValidate: true });
    if (topic.link) {
      setValue('link', 'https://youtu.be/' + topic.link, {
        shouldValidate: true,
      });
    }
  }, [topic]);

  const onSubmit = (data) => {};

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
        multiline
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

      <div className={classes.editor}>
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
        fullWidth
      >
        save
      </Button>
    </form>
  );
}

export default EditTopic;
