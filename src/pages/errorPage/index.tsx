
import { useNavigate } from 'react-router-dom';

import Button  from 'src/shared/components/button';

import { ErrorContainer, ErrorCode, ErrorMessage, ErrorDescription } from './styled';

interface ErrorPageProps {
  errorCode?: number,
  message?: string,
}

export default function ErrorPage({
  errorCode = 404,
  message = 'Page Not Found',
}: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <ErrorContainer>
      <ErrorCode data-testid='error-code'>{errorCode}</ErrorCode>
      <ErrorMessage data-testid='error-message'>{message}</ErrorMessage>
      <ErrorDescription data-testid='error-description'>
        Oops! The page you&rsquo;re looking for doesn&apos;t exist or might have been moved. Please
        check the URL or return to the homepage.
      </ErrorDescription>
      <Button data-testid='home-button' onClick={() => navigate('/main')}>Go to Homepage</Button>
    </ErrorContainer>
  );
};
