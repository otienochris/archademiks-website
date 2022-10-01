import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjsToHtml from 'draftjs-to-html';
import { convertToRaw, ContentState, convertFromHTML } from 'draft-js';
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

const onSubmit = (data) => {};

function EditSubtopic({ subtopic }) {
  const classes = useStyles();
  const blocksFromHTML = convertFromHTML(subtopic.content);
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
    setValue('title', subtopic.title, { shouldValidate: true });
    setValue('description', subtopic.description, { shouldValidate: true });
    if (subtopic.link) {
      setValue('link', 'https://youtu.be/' + subtopic.link, {
        shouldValidate: true,
      });
    }
  }, [subtopic]);

  return (
    <form className={classes.form}>
      <TextField
        id='sutopicTitle'
        variant='filled'
        label='Sub-topic Title'
        placeholder='Provide a brief yet descriptive title'
        autoComplete='on'
        {...register('title')}
        error={errors.title ? true : false}
        helperText={errors.title ? errors.title.message : ''}
        style={{ margin: '16px' }}
      />

      <TextField
        id='subtopicDescription'
        variant='filled'
        label='Sub-topic Description'
        placeholder='Provide a brief description of the goals and contents of the sub-topic'
        autoComplete='on'
        {...register('description')}
        error={errors.description ? true : false}
        helperText={errors.description ? errors.description.message : ''}
        style={{ margin: '16px' }}
      />
      <TextField
        id='subtopicLink'
        variant='filled'
        label='Introduction Video'
        placeholder="Add link to a video of your sub-topic's introduction video"
        autoComplete='on'
        {...register('link')}
        error={errors.link ? true : false}
        helperText={errors.link ? errors.link.message : ''}
        style={{ margin: '16px' }}
      />

      <Typography variant='h6' style={{ margin: '16px' }}>
        Content
      </Typography>

      <div
        className={classes.editor}
        style={{ border: '1px solid black', padding: '5px' }}
      >
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

export default EditSubtopic;
