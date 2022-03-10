import * as React from 'react'

import { PopupText, DeleteAccountWrapper } from './DeleteAccount.style'
import { Modal } from 'app/App.components/Modal/Modal.view';

interface DeleteAccountProps {
  open: boolean,
  onClose: () => void
}

export const DeleteAccountModal = ({
  open,
  onClose,
}: DeleteAccountProps) => {
  return (
    <Modal open={open} onClose={onClose}>
        <DeleteAccountWrapper>
          <PopupText>Please check your email</PopupText>
        </DeleteAccountWrapper>
    </Modal>
  )
}
