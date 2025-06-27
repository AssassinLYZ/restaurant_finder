import { render, screen } from 'src/shared/utils/test-utils';

import  Loading  from '..';

describe('Loading Component', () => {
  it('should render spinner variant by default', () => {
    render(<Loading />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render dots variant when specified', () => {
    render(<Loading variant="dots" />);
    expect(screen.getByTestId('dot-loader')).toBeInTheDocument();
    expect(screen.getAllByTestId('dot').length).toBe(3);
  });

  it('should render full screen loader when fullScreen is true', () => {
    render(<Loading fullScreen />);
    expect(screen.getByTestId('full-page-loader')).toBeInTheDocument();
  });

  it('should render custom text', () => {
    render(<Loading text="Processing..." />);
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  it('should apply custom size to spinner', () => {
    render(<Loading size={50} />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveStyle('width: 50px');
    expect(spinner).toHaveStyle('height: 50px');
  });

  it('should not render text when text prop is empty', () => {
    render(<Loading text="" />);
    expect(screen.queryByTestId('loading-text')).not.toBeInTheDocument();
  });
});
