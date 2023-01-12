// cSpell:ignore Toggleable
// cSpell:ignore Toggleable
import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Toggleable, { ToggleableProps } from './Toggleable';

type ComponentProps = Omit<ToggleableProps, 'children'> & {};

const Component = ({ isShowing, showText, hideText }: ComponentProps) => (
  <Toggleable isShowing={isShowing} showText={showText} hideText={hideText}>
    <div>Test children</div>
  </Toggleable>
);

describe('Toggleable component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    userEvent.setup();
  });
  it('should have defaults - not showing, Show and Hide text', async () => {
    // setup
    render(<Component />);

    // assert
    const showButton = await screen.findByRole('button', { name: 'Show' });
    expect(showButton).toBeInTheDocument();
    expect(showButton).not.toBeDisabled();
    expect(
      screen.queryByRole('button', { name: 'Hide' })
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Test children')).not.toBeInTheDocument();

    // act
    await userEvent.click(screen.getByRole('button', { name: 'Show' }));
    const hideButton = await screen.findByRole('button', { name: 'Hide' });
    expect(hideButton).toBeInTheDocument();
    expect(hideButton).not.toBeDisabled();
    expect(screen.getByText('Test children')).toBeInTheDocument();
  });

  it('should have optional isShowing, showText, and hideText props', async () => {
    // setup
    render(<Component isShowing showText="Show me" hideText="Hide me" />);

    // assert
    const hideButton = await screen.findByRole('button', { name: 'Hide me' });
    expect(hideButton).toBeInTheDocument();
    expect(hideButton).not.toBeDisabled();
    expect(screen.getByText('Test children')).toBeInTheDocument();

    // act
    await userEvent.click(screen.getByRole('button', { name: 'Hide me' }));
    const showButton = await screen.findByRole('button', { name: 'Show me' });
    expect(showButton).toBeInTheDocument();
    expect(showButton).not.toBeDisabled();
    expect(screen.queryByText('Test children')).not.toBeInTheDocument();
  });
});
