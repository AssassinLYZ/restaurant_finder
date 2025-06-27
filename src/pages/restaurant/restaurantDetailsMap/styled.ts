import styled from 'styled-components';

export const MapContainer = styled.div<{ $width: string; $height: string }>`
  position: relative;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  border-radius: ${(props) => props.theme.borderRadius.md};
  overflow: hidden;
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.light};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: ${(props) => props.theme.spacing.lg};
`;

export const ErrorMessage = styled.p`
  color: ${(props) => props.theme.colors.error};
  font-size: ${(props) => props.theme.typography.body.size};
  font-family: ${(props) => props.theme.fonts.primary};
  text-align: center;
  margin: 0;
`;

export const AddressInfo = styled.div`
  width: 200px;
  position: absolute;
  left: 50%;
  top: ${(props) => props.theme.spacing.lg};
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  box-shadow: ${(props) => props.theme.shadows.md};
  max-width: 80%;
  z-index: 1;
  border: 1px solid ${(props) => props.theme.colors.border};
`;

export const RestaurantName = styled.h4`
  margin: 0 0 ${(props) => props.theme.spacing.xs} 0;
  color: ${(props) => props.theme.colors.dark};
  font-size: ${(props) => props.theme.typography.caption.size};
  font-weight: ${(props) => props.theme.typography.caption.weight};
  font-family: ${(props) => props.theme.fonts.primary};
`;

export const AddressText = styled.p`
  margin: 0;
  color: ${(props) => props.theme.colors.gray};
  font-size: ${(props) => props.theme.typography.caption.size};
  font-family: ${(props) => props.theme.fonts.primary};
`;

export const AddressInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${(props) => props.theme.spacing.xs};
`;

export const CloseButtonWrapper = styled.div`
  cursor: pointer;
  margin-left: ${(props) => props.theme.spacing.sm};
  margin-top: -${(props) => props.theme.spacing.xs};
  margin-right: -${(props) => props.theme.spacing.xs};
`;
