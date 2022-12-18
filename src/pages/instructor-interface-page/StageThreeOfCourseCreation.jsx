import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjsToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import { LMS_SUB_TOPICS } from '../../commons/urls';
import { useSelector } from 'react-redux';

const schema = yup.object({
  topicId: yup.number().required(),
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

export default function StageThreeOfCourseCreation({
  classes,
  newCourse,
  setNewCourse,
  setIsStageSubmited,
}) {
  const token = useSelector((state) => state.login.value.token);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [chosenTopicId, setChosenTopicId] = useState();


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

        // console.log(newCourse);
        console.log(chosenTopicId);
        newCourse.topics.map(topic => console.log("[" + topic.id + " : " + chosenTopicId + "]"));
        var topics = newCourse.topics.filter(topic => (parseInt(topic.id) === parseInt(chosenTopicId)));
        console.log(topics);
        topics[0].subTopics.push(subtopic);

        setNewCourse(newCourse);
        setIsStageSubmited(true);

        // clear inputs
        reset();
        setEditorState(EditorState.createEmpty());
        var topicId = document.getElementById('select-for-topic');
        var title = document.getElementById('sutopicTitle');
        var desc = document.getElementById('subtopicDescription');
        var link = document.getElementById('subtopicLink');

        topicId.value = '';
        title.value = '';
        desc.value = '';
        link.value = '';
      })
      .catch((error) => console.log(error));
  }

  const onSubmit = (data) => {
    // extract embedid
    const splitLink = data.link.split('/');
    const embedId = splitLink[splitLink.length - 1];
    newCourse.link = embedId;

    // extract content from editor
    const contentInHtml = draftjsToHtml(
      convertToRaw(editorState.getCurrentContent())
    );

    setChosenTopicId(data.topicId);
    console.log(data.topicId);

    saveNewSubTopic(data.topicId, data.title, data.description, embedId, contentInHtml);
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} className={classes.select}>
        <InputLabel id='topic'>Topic</InputLabel>
        <Select
          labelId='topic'
          id='select-for-topic'
          label='Topic'
          variant='filled'
          {...register('topicId')}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {newCourse.topics.map((topic, index) => (
            <MenuItem key={index} value={topic.id}>
              {topic.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
        multiline
        minRows={6}
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
      >
        save
      </Button>
    </>
  );
}
