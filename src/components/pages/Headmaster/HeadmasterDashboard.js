import React, { useState, useEffect } from 'react';
// import PrivateRoute from '../utils/PrivateRoute';
import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Village from '../Village/Village.component.js';
import VillageForm from '../Village/VillageForm.js';
import Schools from '../School/Schools.component.js';
import SchoolForm from '../School/SchoolForm.js';
// import HeadmasterNav from './Drawer';
import TestComponent from './TestComponent';
import { Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './HeadmasterDashboard.css';
import {
  menuButton,
  menuIcon,
  menuMove,
  Dashboard,
} from './HeadmasterDashboard.style';

function HeadmasterDashboard() {
  const [visible, setVisible] = useState(true);
  const [desktop, setDesktop] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 800 || document.documentElement.width <= 800) {
      setDesktop(false);
      setVisible(false);
    } else {
      setDesktop(true);
    }
  }, []);

  const onClose = () => {
    setVisible(false);
  };

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 800 || document.documentElement.width <= 800) {
      setDesktop(false);
      setVisible(false);
    } else {
      setDesktop(true);
      setVisible(true);
    }
  });

  window.addEventListener('scroll', () => {
    setVisible(false);
  });

  return (
    <div>
      <Dashboard>
        <Switch>
          <Route path="/mentor-pairings" component={TestComponent} />
          <Route path="/mentor-advisor" />
          <Route path="/school" component={Schools} />
          <Route path="/village" component={Village} />
          <Route
            exact
            path="/village/edit/:villageId"
            component={VillageForm}
          />
          <Route exact path="/school/edit/:schoolId" component={SchoolForm} />
          <Route path="/library" />
        </Switch>
      </Dashboard>

      {desktop ? null : (
        // inline style to force animation
        <div style={visible ? menuMove : menuIcon}>
          <Button
            type="primary"
            style={menuButton} // inline style to override Ant Design
            onClick={() => setVisible(!visible)}
            icon={<MenuOutlined />}
          >
            Menu
          </Button>
        </div>
      )}
      <div>
        <Drawer
          placement={desktop ? 'left' : 'bottom'}
          closable={false}
          onClose={onClose}
          visible={visible}
          mask={false}
          width={desktop ? 300 : 500}
          height={500}
        >
          <h2>Hello, Headmaster!</h2>

          <NavLink to="/dashboard" onClick={() => setVisible(true)}>
            <button className="btn l2-btn menuLinks">Home</button>
          </NavLink>
          <NavLink to="/mentor-pairings" onClick={() => setVisible(true)}>
            <button className="btn l2-btn menuLinks">Mentor Pairings</button>
          </NavLink>
          <NavLink to="/mentor-advisor" onClick={() => setVisible(true)}>
            <button className="btn l2-btn menuLinks">Mentor Advisor</button>
          </NavLink>
          <NavLink to="/village" onClick={() => setVisible(true)}>
            <button className="btn l2-btn menuLinks">Village</button>
          </NavLink>
          <NavLink to="/school" onClick={() => setVisible(true)}>
            <button className="btn l2-btn menuLinks">School</button>
          </NavLink>
          <NavLink to="/library" onClick={() => setVisible(true)}>
            <button className="btn l2-btn menuLinks">Library</button>
          </NavLink>
        </Drawer>

        {/* <HeadmasterNav /> */}
      </div>
    </div>
  );
}

export default HeadmasterDashboard;
