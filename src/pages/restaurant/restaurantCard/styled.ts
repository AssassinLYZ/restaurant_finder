import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.light};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    background: ${({ theme }) => theme.colors.light};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const LogoContainer = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
  flex-shrink: 0;
`;

export const Logo = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 80px;
    height: 80px;
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; // Ensures text truncation works
`;

export const Title = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.typography.h3.size};
  font-weight: ${({ theme }) => theme.typography.h3.weight};
  color: ${({ theme }) => theme.colors.dark};
  line-height: 1;
`;

export const InfoPair = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => theme.spacing.xs} 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
`;

export const StarIcon = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

export const RatingValue = styled.span`
  font-weight: ${({ theme }) => theme.typography.h1.weight};
  margin-right: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.dark};
`;

export const RatingCount = styled.span`
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.typography.caption.size};
`;

export const Cuisines = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Cuisine = styled.p`
  width: fit-content;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: white;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.caption.size};
  white-space: nowrap;
  font-weight: ${({ theme }) => theme.typography.h2.weight};
  margin-right: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.caption.size};
`;

export const DetailItem = styled.span<{ $highlight?: boolean }>`
  display: flex;
  align-items: center;
  color: ${({ theme, $highlight }) => ($highlight ? theme.colors.success : theme.colors.gray)};
  font-weight: ${({ $highlight }) => ($highlight ? '500' : '400')};

  &::before {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;
