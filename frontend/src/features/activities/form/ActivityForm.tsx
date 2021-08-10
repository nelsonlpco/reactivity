import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState, useEffect } from 'react';
import {useParams, useHistory} from 'react-router-dom'

import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

function ActivityForm() {
  const { id } = useParams<{id:string}>();
  const history = useHistory();
  const {activityStore} = useStore();
  const {createOrEditActivity, loadActivity, loading, loadingInitial} = activityStore;
  const [internalActivity, setInternalActivity] = useState({
    category: '',
    city: '',
    date: '',
    description: '',
    id: '',
    title: '',
    venue: '',
  });

  useEffect(() => {
    if(id) {
      loadActivity(id).then(activity => {
        if(activity) {
          setInternalActivity(activity);
        }
      });
    }
  }, [loadActivity, id]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value} = event.target;
    setInternalActivity({...internalActivity, [name]: value});
  }

  const onSubmitHandler = () => {
    createOrEditActivity(internalActivity).then((id) => {
      history.push(`/activities/${id}`);
    })
  }

  if(loadingInitial) return <LoadingComponent content="loading"/>;

  return (
    <Segment clearing>
      <Form onSubmit={onSubmitHandler}>
        <Form.Input placeholder='Title' value={internalActivity.title} name='title' onChange={handleInputChange}/>
        <Form.TextArea placeholder='Description' value={internalActivity.description} name='description' onChange={handleInputChange}/>
        <Form.Input placeholder='Category' value={ internalActivity.category} name='category' onChange={handleInputChange}/>
        <Form.Input type='date' placeholder='Date' value={ internalActivity.date} name='date' onChange={handleInputChange}/>
        <Form.Input placeholder='City' value={internalActivity.city} name='city' onChange={handleInputChange}/>
        <Form.Input placeholder='Venue' value={internalActivity.venue} name='venue' onChange={handleInputChange}/>
        <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
        <Button loading={loading} floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  );
}

export default observer(ActivityForm);
