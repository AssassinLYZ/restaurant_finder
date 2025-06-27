import styled from 'styled-components';

export const DrawerOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
`;

export const DrawerContainer = styled.div<{ $width: string; $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: ${(props) => props.$width};
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: ${(props) => props.theme.shadows.lg};
  z-index: 101;
  transform: translateX(${(props) => (props.$isOpen ? '0' : '100%')});
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
  }
`;

export const DrawerHeader = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${(props) => props.theme.spacing.sm};
  margin: -${(props) => props.theme.spacing.sm};
`;

export const CloseIcon = styled.span`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.gray};
  line-height: 1;
`;

export const DrawerContent = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  flex: 1;
  overflow-y: auto;
`;
