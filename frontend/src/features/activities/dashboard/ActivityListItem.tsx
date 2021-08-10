import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import {Activity} from '../../models/activity';
import { useStore } from '../../../app/stores/store';

interface Props {
  activity: Activity;
}

export default function ActivityListItem({ activity }: Props) {
  const [target, setTarget] = useState('');
  const {activityStore} = useStore();

  const { deleteActivity,  loading } = activityStore;

  function deleteHandler(event: SyntheticEvent<HTMLButtonElement>, id: string){
    setTarget(event.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Item key={ activity.id}>
    <Item.Content>
      <Item.Header as='a'>{activity.title}</Item.Header>
      <Item.Meta>{activity.date}</Item.Meta>
      <Item.Description>{activity.description}</Item.Description>
      <Item.Extra>
        <Button as={Link} to={`/activities/${activity.id}`} floated='right' loading={loading} content='View' color='blue'/>
        <Button floated='right' name={activity.id} loading={loading && activity.id === target} content='Delete' color='red' onClick={(e) => deleteHandler(e, activity.id) }/>
        <Label basic content={ activity.category} />
      </Item.Extra>
    </Item.Content>
  </Item>
  )
 }

