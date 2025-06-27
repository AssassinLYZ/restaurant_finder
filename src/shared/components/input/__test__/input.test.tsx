import { render, screen } from 'src/shared/utils/test-utils';

import Input from '..';

describe('Input Component', () => {
  it('should render basic input without label', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.queryByTestId('label')).not.toBeInTheDocument();
  });

  it('should render label when provided', () => {
    render(<Input label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should show error message when error exists', () => {
    render(<Input error="Test error" />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('should render start adornment', () => {
    render(<Input startAdornment={<span>@</span>} />);
    expect(screen.getByText('@')).toBeInTheDocument();
  });

  it('should render end adornment', () => {
    render(<Input endAdornment={<span>$</span>} />);
    expect(screen.getByText('$')).toBeInTheDocument();
  });

  it('should forward ref to input element', () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('should pass all input props to native input', () => {
    render(<Input type="email" placeholder="Enter email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'Enter email');
  });
});
