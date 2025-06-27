import { render, screen, fireEvent } from 'src/shared/utils/test-utils';

import Select from '..';

describe('Select Component', () => {
  const mockOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2', disabled: true },
    { value: '3', label: 'Option 3' },
  ];

  const mockOnChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render with label', () => {
    render(<Select options={mockOptions} label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should render all options', () => {
    render(<Select placeholder="placeholder" options={mockOptions} />);
    const select = screen.getByRole('combobox');
    expect(select.children.length).toBe(mockOptions.length + 1); // +1 for placeholder
  });

  it('should handle selection change', () => {
    render(<Select options={mockOptions} onChange={mockOnChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: '3' } });
    expect(mockOnChange).toHaveBeenCalledWith('3');
  });

  it('should show placeholder when no value selected', () => {
    render(<Select options={mockOptions} placeholder="Select..." />);
    expect(screen.getByText('Select...')).toBeInTheDocument();
  });

  it('should disable select when disabled prop is true', () => {
    render(<Select options={mockOptions} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('should disable individual options when specified', () => {
    render(<Select options={mockOptions} />);
    const option = screen.getByRole('option', { name: 'Option 2' }) as HTMLOptionElement;
    expect(option.disabled).toBe(true);
  });

  it('should forward ref to select element', () => {
    const ref = { current: null };
    render(<Select options={mockOptions} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });
});
