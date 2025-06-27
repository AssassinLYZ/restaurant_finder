import { render, screen, fireEvent } from 'src/shared/utils/test-utils';

import Pagination from '..';

describe('Pagination Component', () => {
  const mockPageChange = jest.fn();
  const baseProps = {
    currentPage: 3,
    totalPages: 10,
    onPageChange: mockPageChange,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render page numbers correctly', () => {
    render(<Pagination {...baseProps} maxVisiblePages={5} />);

    // should show 1-5 when current page is 3
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.queryByText('6')).not.toBeInTheDocument();
  });

  it('should highlight current page', () => {
    render(<Pagination {...baseProps} />);
    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
  });

  it('should handle page navigation clicks', () => {
    render(<Pagination {...baseProps} showPrevNext showFirstLast />);

    fireEvent.click(screen.getByLabelText('Go to previous page'));
    expect(mockPageChange).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByLabelText('Go to next page'));
    expect(mockPageChange).toHaveBeenCalledWith(4);

    fireEvent.click(screen.getByLabelText('Go to first page'));
    expect(mockPageChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByLabelText('Go to last page'));
    expect(mockPageChange).toHaveBeenCalledWith(10);
  });

  it('should disable navigation buttons when appropriate', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockPageChange} />);

    expect(screen.getByLabelText('Go to previous page')).toBeDisabled();
    expect(screen.getByLabelText('Go to first page')).toBeDisabled();
    expect(screen.getByLabelText('Go to next page')).not.toBeDisabled();
  });

  it('should handle manual page input', () => {
    render(<Pagination {...baseProps} />);

    const input = screen.getByLabelText('Enter page number');
    fireEvent.change(input, { target: { value: '5' } });
    fireEvent.submit(screen.getByText('Go'));

    expect(mockPageChange).toHaveBeenCalledWith(5);
    expect(input).toHaveValue('');
  });

  it('should reject invalid page input', () => {
    render(<Pagination {...baseProps} />);

    const input = screen.getByLabelText('Enter page number');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(input).toHaveValue('');

    fireEvent.change(input, { target: { value: '0' } });
    expect(input).toHaveValue('');

    fireEvent.change(input, { target: { value: '11' } });
    fireEvent.submit(screen.getByText('Go'));
    expect(mockPageChange).not.toHaveBeenCalled();
  });

  it('should show page info', () => {
    render(<Pagination {...baseProps} />);
    expect(screen.getByText('Page 3 of 10')).toBeInTheDocument();
  });

  it('should respect showPrevNext and showFirstLast props', () => {
    const { rerender } = render(
      <Pagination {...baseProps} showPrevNext={false} showFirstLast={false} />
    );

    expect(screen.queryByLabelText('Go to previous page')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Go to first page')).not.toBeInTheDocument();

    rerender(<Pagination {...baseProps} showPrevNext showFirstLast />);

    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to first page')).toBeInTheDocument();
  });
});
