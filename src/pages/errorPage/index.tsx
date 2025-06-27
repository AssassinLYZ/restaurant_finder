
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
      <ErrorCode>{errorCode}</ErrorCode>
      <ErrorMessage>{message}</ErrorMessage>
      <ErrorDescription>
        Oops! The page you&rsquo;re looking for doesn&apos;t exist or might have been moved. Please
        check the URL or return to the homepage.
      </ErrorDescription>
      <Button onClick={() => navigate('/main')}>Go to Homepage</Button>
    </ErrorContainer>
  );
};
