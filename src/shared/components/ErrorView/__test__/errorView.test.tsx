import { AxiosError } from 'axios';

import { render, screen, fireEvent } from 'src/shared/utils/test-utils';

import  ErrorView from '..';

describe('ErrorView Component', () => {
  const mockAction = jest.fn();
  const mockError = {
    message: 'Test error message',
    name: 'TestError',
    config: {},
    isAxiosError: true,
    toJSON: () => ({}),
  } as AxiosError;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render custom title and description', () => {
    render(<ErrorView error={null} title="Custom Error" description="Custom description" />);

    expect(screen.getByText('Custom Error')).toBeInTheDocument();
    expect(screen.getByText('Custom description')).toBeInTheDocument();
  });

  it('should display error details when error is provided', () => {
    render(<ErrorView error={mockError} />);

    const details = screen.getByText('Error details');
    expect(details).toBeInTheDocument();

    fireEvent.click(details);
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('should render action button when onAction is provided', () => {
    render(<ErrorView error={null} onAction={mockAction} action="Retry" />);

    const button = screen.getByRole('button', { name: 'Retry' });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockAction).toHaveBeenCalledTimes(1);
  });
});
