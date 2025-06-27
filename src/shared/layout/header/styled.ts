import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderWrapper = styled.header`
  width: 100%;
  box-sizing: border-box;
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xxl};
  min-height: 64px;
  box-shadow: ${(props) => props.theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 10;
  color: ${(props) => props.theme.colors.dark};
  background: ${(props) => props.theme.colors.background};
  font-family: ${(props) => props.theme.fonts.primary};

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.lg};
    min-height: 56px;
    gap: ${(props) => props.theme.spacing.sm};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.sm};
    min-height: 48px;
    gap: ${(props) => props.theme.spacing.sm};
  }
`;

export const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.lg};
`;

export const PostcodeInfo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.typography.body.size};
  font-weight: ${(props) => props.theme.typography.h3.weight};
  border-radius: ${(props) => props.theme.borderRadius.pill};
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.lg};
  color: ${(props) => props.theme.colors.dark};
  transition: background-color 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  font-family: ${(props) => props.theme.fonts.primary};

  &:hover {
    background-color: ${(props) => props.theme.colors.accent};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const UserButton = styled.button`
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: ${(props) => props.theme.borderRadius.pill};
  font-size: ${(props) => props.theme.typography.caption.size};
  font-weight: ${(props) => props.theme.typography.h3.weight};

  &:hover {
    background-color: ${(props) => props.theme.colors.accent};
  }
`;
