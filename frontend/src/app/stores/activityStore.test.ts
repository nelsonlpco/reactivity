import {v4 as uuid} from 'uuid'

import ActivityStore from './activityStore'
import agent from '../api/agent';
import { Activity } from '../../features/models/activity';

describe('teste',() => {
  test('teste', ()=>{
    const activityStore = new ActivityStore();

    activityStore.setLoadingInitial(true);

    expect(activityStore.loadingInitial).toBeTruthy();
  });

  test('Deve carregar uma lista de atividades', async () => {
    const mock: Activity[] = [
      {
        category: 'filme',
        city: 'Maringá',
        date: '2021-07-27',
        description: 'teste',
        id: uuid(),
        title: 'titulo',
        venue: 'cinema',
      },
    ];

    jest.spyOn(agent.Activities, "list").mockResolvedValue(mock);

    const activityStore = new ActivityStore();

    await activityStore.loadActivities();

    expect(activityStore.activities).toEqual(mock)
  });
});
