import { Button, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjsToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { useStyles } from './newCourseUseStyles';
import { LMS_SUB_TOPICS } from '../../commons/urls';
import { useSelector } from 'react-redux';

const schema = yup.object({
  // topicId: yup.number().required(),
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

function AddNewSubtopic({ setAddNewSubtopic, topicId }) {
  const classes = useStyles();
  const token = useSelector((state) => state.login.value.token);
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

  const saveNewSubTopic = async (topicId, title, description, link, content) => {
    const body = {
      title,
      description,
      link,
      content,
      version: 0
    }
    await fetch(LMS_SUB_TOPICS + "?topicId=" + topicId, {
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
          alert("Sub-topic saved successfully");
          setAddNewSubtopic(false);
        } else {
          alert("Error saving sub-topic");
        }
        return response.json();
      })
      .then((data) => {

        const subtopic = {
          id: data.subTopicId,
          title: data.title,
          description: data.description,
          content: data.content,
          link: data.link
        };


        // clear inputs
        reset();
        setEditorState(EditorState.createEmpty());
        // var topicId = document.getElementById('select-for-topic');
        // var title = document.getElementById('sutopicTitle');
        // var desc = document.getElementById('subtopicDescription');
        // var link = document.getElementById('subtopicLink');

        // topicId.value = '';
        // title.value = '';
        // desc.value = '';
        // link.value = '';
      })
      .catch((error) => console.log(error));
  }

  const onSubmit = (data) => {
    // extract embedid
    const splitLink = data.link.split('/');
    const embedId = splitLink[splitLink.length - 1];

    // extract content from editor
    const contentInHtml = draftjsToHtml(
      convertToRaw(editorState.getCurrentContent())
    );

    saveNewSubTopic(topicId, data.title, data.description, embedId, contentInHtml);
  };


  console.log(topicId);
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

export default AddNewSubtopic;
