import React from 'react';
import {NavLink} from 'react-router-dom'

import { Button, Container, Menu } from 'semantic-ui-react';


export default function NavBar() {

	return (
		<Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/' exact header>
          <img src="/assets/logo.jpg" alt="logo" style={{marginRight: '10px'}} />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activities' name='Actvities' />
        <Menu.Item>
          <Button  as={NavLink} to='/createactivity' positive content='Create Actvitity'/>
        </Menu.Item>
      </Container>

		</Menu>
	)
}
