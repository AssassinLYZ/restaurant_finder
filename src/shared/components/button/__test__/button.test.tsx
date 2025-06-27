import { render, screen, fireEvent } from 'src/shared/utils/test-utils';

import  Button  from '..';

describe('Button Component - Non-mock Testing', () => {
  it('renders children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('passes props correctly and handles click events', () => {
    const mockOnClick = jest.fn();
    render(
      <Button
        className="custom-class"
        data-testid="test-button"
        onClick={mockOnClick}
        type="submit"
      >
        Test Button
      </Button>
    );

    const button = screen.getByTestId('test-button');

    // Verify attributes
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveAttribute('type', 'submit');

    // Verify click handler
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('handles disabled state correctly', () => {
    const mockOnClick = jest.fn();
    render(
      <Button disabled onClick={mockOnClick}>
        Disabled Button
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('renders complex children', () => {
    render(
      <Button>
        <span>Icon</span> Text
      </Button>
    );
    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });
});
