import {  makeAutoObservable, runInAction } from 'mobx';
import { Activity } from '../../features/models/activity';
import agent from '../api/agent';
import {v4 as uuid} from 'uuid';

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date) )
  }

  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = activity.date;
        activities[date] = activities[date] ? [...activities[date], activity] : [activity];
        return activities;

      }, {} as  {[key: string]: Activity[]})
    )
  }

  loadActivities = async () => {
    this.setLoadingInitial(true);

    try {
      const activities = await agent.Activities.list();
      activities.forEach(activity => {
        this.setActivity(activity);
      });
    } catch (error) {
      console.log(error);
    }
    finally {
      this.setLoadingInitial(false);
    }
  }

  loadActivity = async (id: string): Promise<Activity | undefined> => {
    let activity = this.getActivity(id);

    if(activity) {
      this.selectedActivity = activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        if(activity) {
          runInAction(() => {
            this.selectedActivity = activity;
          })
          this.setActivity(activity);
        }
      } catch (e) {
        console.log(e)
      }
      finally {
        this.setLoadingInitial(false);
      }
    }

    return activity;
  }

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split('T')[0];
    this.activityRegistry.set(activity.id, activity);
  }

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  }

  setLoadingInitial = (state: boolean) => { this.loadingInitial = state };

  createActivity = async (activity: Activity): Promise<string> => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
      });
      return activity.id;
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.editMode = false;
        this.loading = false;
      });
    }

    return '';
  }

  updateActivity = async (activity: Activity): Promise<string> => {
    this.loading = true;
    try {
      await agent.Activities.update(activity.id, activity);

      runInAction(() => {
        this.activityRegistry.set(activity.id, activity)
        this.selectedActivity = activity;
      });

      return activity.id;
    } catch(error) {
      console.log(error)
    } finally {
      runInAction(()=>{
        this.loading = false;
        this.editMode = false;
      });
    }

    return '';
  }

  createOrEditActivity = async (activity: Activity): Promise<string> => {
    if(activity.id) {
      return await this.updateActivity(activity);
    }
    else {
      return await this.createActivity(activity);
    }
  }

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
    await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
      });
    } catch (e) {
      console.log(e);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}
