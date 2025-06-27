import React from 'react';

import theme from 'src/shared/theme';
import { render, screen } from 'src/shared/utils/test-utils';

import  TextHighlighter  from '..';

describe('TextHighlighter', () => {
  it('should return content as-is when searchTerm is empty', () => {
    render(<TextHighlighter content="Hello World" searchTerm="" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.queryByTestId('highlighted-text')).not.toBeInTheDocument();
  });

  it('should highlight matching text', () => {
    render(<TextHighlighter content="Hello World" searchTerm="World" />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
    const highlighted = screen.getByText('World');
    expect(highlighted).toBeInTheDocument();
    expect(highlighted).toHaveStyle('background:' + theme.colors.primary);
  });

  it('should handle case-insensitive matches', () => {
    render(<TextHighlighter content="Hello World" searchTerm="world" />);
    expect(screen.getByText('World')).toBeInTheDocument();
  });

  it('should highlight multiple matches', () => {
    render(<TextHighlighter content="Hello World, welcome to the World" searchTerm="World" />);

    const highlights = screen.getAllByText('World');
    expect(highlights).toHaveLength(2);
    highlights.forEach((highlight) => {
      expect(highlight).toHaveStyle('background:' + theme.colors.primary);
    });
  });

  it('should escape special regex characters in searchTerm', () => {
    render(<TextHighlighter content="Hello [World]" searchTerm="[World]" />);

    expect(screen.getByText('[World]')).toBeInTheDocument();
    expect(screen.getByText('[World]')).toHaveStyle('background:' + theme.colors.primary);
  });
});
