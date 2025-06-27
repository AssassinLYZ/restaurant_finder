import Button from 'src/shared/components/button';

import { NoResultsContainer, Title, Description } from './styled';

interface EmptyListProps {
  description: string;
  action?: string;
  onAction?: () => void;
}
export default function EmptyList({ description, onAction, action }: EmptyListProps) {
  return (
    <NoResultsContainer>
      <Title>No restaurants found</Title>
      <>
        <Description>{description}</Description>
        {onAction && (
          <Button onClick={onAction} aria-label="Clear all filters">
            {action}
          </Button>
        )}
      </>
    </NoResultsContainer>
  );
};
