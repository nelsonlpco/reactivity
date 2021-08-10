import { observer} from 'mobx-react-lite';
import React, { useEffect } from 'react';
import {useParams, Link} from 'react-router-dom';

import {Button, Card, Image} from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

function ActivityDetails() {
  const {activityStore} = useStore();
  const {selectedActivity: activity, loadingInitial, loadActivity} = activityStore;
  const { id } = useParams<{id: string}>();

  useEffect(() => {
    if (id) loadActivity(id);
  },[id, loadActivity]);

  if(!activity || loadingInitial) return <LoadingComponent content="loading"/>;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.png`} wrapped ui={false} size={'small'} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
          <Button as={Link}  to={`/manage/${activity.id}`} basic color='blue' content='Edit' />
          <Button as={Link} to='activities' basic color='grey' content='Cancel' />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

export default observer(ActivityDetails);
