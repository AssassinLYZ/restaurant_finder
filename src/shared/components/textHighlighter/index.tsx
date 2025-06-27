import styled from 'styled-components';

function escapeSpecialCharacters(inputString: string) {
  return inputString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const HighlightedText = styled.mark`
  background: ${({ theme }) => theme.colors.primary};
`;

interface HighlightProps {
  content: string;
  searchTerm: string;
}

export default function TextHighlighter({ content, searchTerm }: HighlightProps) {
  if (!searchTerm) return <>{content}</>;

  const sanitizedSearchTerm = escapeSpecialCharacters(searchTerm);
  const highlightPattern = new RegExp(`(${sanitizedSearchTerm})`, 'ig');
  const textFragments = content.split(highlightPattern);

  return (
    <>
      {textFragments.map((fragment, index) =>
        highlightPattern.test(fragment) ? (
          <HighlightedText key={index}>{fragment}</HighlightedText>
        ) : (
          fragment
        )
      )}
    </>
  );
}
