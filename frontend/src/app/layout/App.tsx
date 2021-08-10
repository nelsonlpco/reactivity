import { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom'

import './styles.css';
import NavBar from './NavBar';
import HomePage from '../../features/home/HomePage';
import { Route } from 'react-router-dom';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
  const location = useLocation();

  return (
    <>
    <Route exact path='/'  component={HomePage} />
    <Route
    path={'/(.+)'}
    render={() => {
      return (
        <Fragment>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Route exact path='/activities' component={ActivityDashboard} />
            <Route path='/activities/:id' component={ActivityDetails} />
            <Route key={location.key} path={['/createactivity', '/manage/:id']} component={ActivityForm} />
          </Container>
        </Fragment>
      );
    }} />
    </>
  );
}

export default App;
