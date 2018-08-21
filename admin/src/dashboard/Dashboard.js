import React from 'react';
import { Responsive } from 'react-admin';

import Welcome from './Welcome';

const Dashboard = () => (
  <Responsive
    medium={
      <Welcome />
    }
  />
);

export default Dashboard;
