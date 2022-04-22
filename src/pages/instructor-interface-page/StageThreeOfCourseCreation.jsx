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
import { convertToRaw } from 'draft-js';

const schema = yup.object({
  topicId: yup.number().required(),
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

export default function StageThreeOfCourseCreation({
  classes,
  newCourse,
  setNewCourse,
  setIsStageSubmited,
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
    const contentInHtml = draftjsToHtml(
      convertToRaw(editorState.getCurrentContent())
    );

    const subTopic = {
      title: data.title,
      description: data.description,
      content: contentInHtml,
      link: embedId,
    };

    newCourse.topics[data.topicId].subTopics.push(subTopic);

    setNewCourse(newCourse);

    reset();
    setIsStageSubmited(true);
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
            <MenuItem key={index} value={index}>
              {topic.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
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
