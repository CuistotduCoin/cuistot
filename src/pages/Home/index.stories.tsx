import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

storiesOf('Cuistot/pages/Home', module)
    .addDecorator(story => (
        <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    )).add('default', () => <Home />);
