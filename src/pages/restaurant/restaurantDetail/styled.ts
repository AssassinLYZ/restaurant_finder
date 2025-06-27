import styled from 'styled-components';

export const Name = styled.div`
  font-weight: ${(props) => props.theme.typography.h3.weight};
  color: ${(props) => props.theme.colors.dark};
  font-size: ${(props) => props.theme.typography.h3.size};
`;
export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.spacing.lg};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding-bottom: ${(props) => props.theme.spacing.md};
`;

export const CollectButton = styled.button`
  height: 50px;
  width: 50px;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.background};
  text-align: center;
  border-radius: ${(props) => props.theme.borderRadius.pill};
  font-size: ${(props) => props.theme.typography.h3.size};
  font-weight: ${(props) => props.theme.typography.caption.weight};

  &:hover {
    background-color: ${(props) => props.theme.colors.accent};
  }
`;

export const MapSection = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.md};
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

export const Logo = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  flex-shrink: 0;
`;

export const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
`;

export const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm};
`;

export const Stars = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
  font-size: 1.1rem;
`;

export const ReviewCount = styled.span`
  color: ${(props) => props.theme.colors.gray};
  font-size: 0.875rem;
`;

export const Cuisines = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.sm};
`;

export const CuisineTag = styled.span`
  background-color: ${(props) => props.theme.colors.dark};
  color: ${(props) => props.theme.colors.light};
  padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-weight: ${(props) => props.theme.typography.h1.weight};
  font-size: 0.875rem;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
`;

export const SectionTitle = styled.h3`
  margin: 0;
  font-size: ${(props) => props.theme.typography.body.size};
  font-weight: 600;
  color: ${(props) => props.theme.colors.dark};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding-bottom: ${(props) => props.theme.spacing.sm};
`;

export const Address = styled.p`
  margin: 0;
  color: ${(props) => props.theme.colors.gray};
  line-height: 1.5;
`;

export const DeliveryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
`;

export const DeliveryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.span`
  color: ${(props) => props.theme.colors.gray};
  font-size: 0.875rem;
`;

export const Value = styled.span`
  color: ${(props) => props.theme.colors.dark};
  font-weight: 500;
`;
