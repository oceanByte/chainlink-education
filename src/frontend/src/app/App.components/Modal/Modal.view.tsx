import React, {FC, useRef} from 'react';

import { Portal } from '../Portal/Portal.view';
import { Backdrop, Content } from './Modal.style';

interface ModalProps {
  open: boolean,
  onClose: () => void, 
}

export const Modal: React.FC<ModalProps> = ({open, onClose, children}) => {
  const backdrop = useRef(null);
  if (!open) {
    return null;
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (backdrop.current === e.target) {
      onClose();
    }
  }

  return (
    <Portal>
      <Backdrop ref={backdrop} onClick={onClick}>
        <Content>
          {children}
        </Content>
      </Backdrop>
    </Portal>
  )
}