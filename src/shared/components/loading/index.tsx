import { FullPageLoader, LoadingContainer, Spinner, DotLoader, LoadingText } from './styled';

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
  variant?: 'spinner' | 'dots';
  size?: number;
}

export default function Loading({
  text = 'Loading...',
  fullScreen = false,
  variant = 'spinner',
  size = 40,
}: LoadingProps) {
  const Wrapper = fullScreen ? FullPageLoader : LoadingContainer;

  return (
    <Wrapper data-testid={fullScreen ? 'full-page-loader' : 'inline-loader'}>
      {variant === 'spinner' ? (
        <Spinner style={{ width: size, height: size }} data-testid="spinner" />
      ) : (
        <DotLoader data-testid="dot-loader">
          <div data-testid="dot" />
          <div data-testid="dot" />
          <div data-testid="dot" />
        </DotLoader>
      )}
      {text && <LoadingText data-testid="loading-text">{text}</LoadingText>}
    </Wrapper>
  );
}
