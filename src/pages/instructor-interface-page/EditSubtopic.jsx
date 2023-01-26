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
import { LMS_SUB_TOPICS } from '../../commons/urls';
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

const onSubmit = (data) => { };

function EditSubtopic({ setRefresh, setOpenEditPage, subtopic }) {
  const classes = useStyles();
  const blocksFromHTML = convertFromHTML(subtopic.content);
  const [currentSubTopic, setCurrentSubTopi] = useState(subtopic);
  const token = useSelector((state) => state.login.value.token);
  const [saved, setSaved] = useState(false);
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
    setValue('title', currentSubTopic.title, { shouldValidate: true });
    setValue('description', currentSubTopic.description, { shouldValidate: true });
    if (subtopic.link) {
      setValue('link', 'https://youtu.be/' + currentSubTopic.link, {
        shouldValidate: true,
      });
    }
  }, [subtopic, saved]);

  const saveChanges = async (title, description, link, content) => {

    const body = {
      title,
      description,
      link,
      content,
      version: subtopic.version
    }
    await fetch(LMS_SUB_TOPICS + "/" + subtopic.subTopicId, {
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
          alert("Sub-topic saved successfully");
          setOpenEditPage(false);
          setSaved(true);
          setRefresh(state => !state);
        } else {
          alert("Error saving sub-topic");
        }
        return response.json();
      })
      .then((data) => {
        setCurrentSubTopi(data);
      })
      .catch((error) => {

        console.log(error)
      });
  }

  const onSubmit = (data) => {
    console.log(data)
    // extract embedid
    const splitLink = data.link.split('/');
    const embedId = splitLink[splitLink.length - 1];

    // extract content from editor
    const contentInHtml = draftjsToHtml(
      convertToRaw(editorState.getCurrentContent())
    );

    saveChanges(data.title, data.description, embedId, contentInHtml);
  };


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
