import {FC, useEffect, useMemo} from 'react';
import ReactDOM from 'react-dom';

const parent = document.getElementById('modal');

export const Portal: FC = ({children}) => {
  const el = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    if (parent) {
      parent.appendChild(el);
    }
    
    return () => {
      if (parent) {
        parent.removeChild(el);
      }
    }
  }, [el])

  return ReactDOM.createPortal(
    children,
    el
  );
}