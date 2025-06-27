import '@testing-library/jest-dom';

import { render, screen, fireEvent } from 'src/shared/utils/test-utils';

import { DrawerComponent } from '../';

describe('DrawerComponent', () => {
  const mockOnClose = jest.fn();
  const testProps = {
    isOpen: true,
    onClose: mockOnClose,
    width: '500px',
    children: <div>Test Content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('should render with overlay', () => {
    render(<DrawerComponent {...testProps} />);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    const overlay = screen.getByTestId('drawer-overlay');
    expect(overlay).toBeInTheDocument();
  });

  it('should trigger onClose function when clicking overlay', () => {
    render(<DrawerComponent {...testProps} />);

    fireEvent.click(screen.getByTestId('drawer-overlay'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: /Close/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(2);
  });

  it('should render with correct width', () => {
    render(<DrawerComponent {...testProps} width="600px" />);
    const drawer = screen.getByRole('dialog');
    expect(drawer).toHaveStyle('width: 600px');
  });

  it('should render when isOpen is true', () => {
    const { rerender } = render(<DrawerComponent {...testProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).toHaveStyle('transform: translateX(100%)');
    rerender(<DrawerComponent {...testProps} isOpen={true} />);
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('should control the body overflow style', () => {
    const { rerender } = render(<DrawerComponent {...testProps} isOpen={false} />);
    expect(document.body.style.overflow).toBe('');

    rerender(<DrawerComponent {...testProps} isOpen={true} />);
    expect(document.body.style.overflow).toBe('hidden');

    rerender(<DrawerComponent {...testProps} isOpen={false} />);
    expect(document.body.style.overflow).toBe('');
  });

  it('should reset body style after unmount', () => {
    const { unmount } = render(<DrawerComponent {...testProps} />);
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
