import React, { useEffect } from 'react';

import {
  DrawerOverlay,
  DrawerContainer,
  DrawerHeader,
  CloseButton,
  CloseIcon,
  DrawerContent,
} from './styled';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  width?: string;
  children: React.ReactNode;
}

export const DrawerComponent: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  width = '768px',
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <DrawerOverlay $isOpen={isOpen} onClick={onClose} data-testid="drawer-overlay" />
      <DrawerContainer $isOpen={isOpen} $width={width} role="dialog">
        <DrawerHeader>
          <CloseButton aria-label="Close drawer" onClick={onClose}>
            <CloseIcon>×</CloseIcon>
          </CloseButton>
        </DrawerHeader>
        <DrawerContent>{children}</DrawerContent>
      </DrawerContainer>
    </>
  );
};
