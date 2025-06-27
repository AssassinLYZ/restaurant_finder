import { AxiosError } from 'axios';

import  Button  from '../button';
import { ErrorTitle, ErrorDescription, ErrorDetails, ErrorContainer } from './styled';

interface ErrorViewProps {
  error: AxiosError | null;
  onAction?: () => void;
  title?: string;
  action?: string;
  description?: string;
}

export default function ErrorView({
  error,
  onAction,
  action,
  title = 'Something went wrong',
  description = 'We encountered an error while fetching the data.',
}: ErrorViewProps) {
  const errorMessage = error?.message;

  return (
    <ErrorContainer role="alert">
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorDescription>{description}</ErrorDescription>

      {errorMessage && (
        <ErrorDetails>
          <summary>Error details</summary>
          <pre>{errorMessage}</pre>
        </ErrorDetails>
      )}

      {onAction && (
        <Button onClick={onAction} aria-label={action}>
          {action}
        </Button>
      )}
    </ErrorContainer>
  );
};
