import { debounce } from '..';

describe('debounce', () => {
  jest.useFakeTimers();

  it('should delay the function execution', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn();
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should cancel previous calls when called multiple times', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn('first');
    jest.advanceTimersByTime(500);
    debouncedFn('second');

    jest.runAllTimers();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('second');
  });

  it('should handle multiple arguments', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn('arg1', 'arg2', 3);
    jest.runAllTimers();

    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 3);
  });

  it('should allow cancellation', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn();
    debouncedFn.cancel();
    jest.runAllTimers();

    expect(mockFn).not.toHaveBeenCalled();
  });

  it('should use default delay when none provided', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn);

    debouncedFn();
    jest.advanceTimersByTime(300);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should handle rapid successive calls', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    for (let i = 0; i < 10; i++) {
      jest.advanceTimersByTime(500);
      debouncedFn(`call ${i}`);
    }

    jest.runAllTimers();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('call 9');
  });
});
