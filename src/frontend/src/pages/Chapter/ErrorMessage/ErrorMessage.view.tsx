import * as React from 'react'

interface IMessage {
  message: string | null
}

export const ErrorMessage = ({ message }: IMessage) => {
  if (!message) return null;

  return (
    <div className="error-message__block">
      <div className="error-message__block-text">
        <label>{message}</label>
      </div>
    </div>
  );
}
