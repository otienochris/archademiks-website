import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, TextField, Typography } from '@material-ui/core';
import draftToHtml from 'draftjs-to-html';
import {
  ContentState,
  // CompositeDecorator,
  convertFromHTML,
} from 'draft-js';
import { useStyles } from './newCourseUseStyles';
import { LMS_TOPICS } from '../../commons/urls';
import { useSelector } from 'react-redux';

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

function EditTopic({ setOpenEditPage, setIsLoading, topic }) {
  const classes = useStyles();
  const blocksFromHTML = convertFromHTML(topic.content);
  const [currentTopic, setCurrentTopic] = useState(topic);
  const token = useSelector((state) => state.login.value.token);
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




  const saveChanges = async (title, description, link, content) => {
    setIsLoading(true);
    const body = {
      title,
      description,
      link,
      content,
      version: currentTopic.version
    }
    console.log(body)
    await fetch(LMS_TOPICS + "/" + currentTopic.topicId, {
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

        if (response.status >= 200 && response.status < 300) {
          alert("Topic saved successfully");
          setIsLoading(false)
          setOpenEditPage(false)
        } else {
          alert("Error saving topic");
        }
        return response.json();
      })
      .then((data) => {

        setCurrentTopic(data);
        console.log(data)
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error)
      });

  }

  const onSubmit = (data) => {
    // extract embedid
    const splitLink = data.link.split('/');
    const embedId = splitLink[splitLink.length - 1];

    // extract content from editor
    const contentInHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );

    saveChanges(data.title, data.description, embedId, contentInHtml);
  };

  useEffect(() => {
    setValue('title', currentTopic.title, { shouldValidate: true });
    setValue('description', currentTopic.description, { shouldValidate: true });
    if (topic.link) {
      setValue('link', 'https://youtu.be/' + currentTopic.link, {
        shouldValidate: true,
      });
    }
  }, [currentTopic]);

  return (
    <form className={classes.form}>
      <TextField
        id='title'
        variant='filled'
        label='Topic Title'
        placeholder='Provide a brief yet descriptive title'
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
        fullWidth
      >
        save
      </Button>
    </form>
  );
}

export default EditTopic;
