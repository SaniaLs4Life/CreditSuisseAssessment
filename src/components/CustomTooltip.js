import React, { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './CustomTooltip.scss';

export default function CustomTooltip({position = 'top', message, children}) {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);
  const node = useRef(null);
  let style = {};
  if (node.current && node.current.offsetWidth) {
    if (position === 'top' || position === 'bottom') {
      style.left = `${String(node.current.offsetWidth / 2)}px`;
    } else {
      style.top = `-${String(node.current.offsetHeight / 1.5)}px`;
    }
  }

  return (
    <div className="Tooltip">
      <div
        className="Tooltip__toggler"
        onMouseOverCapture={toggle}
        onMouseOut={toggle}
        ref={node}
      >
        {children}
      </div>
      <CSSTransition
        in={isVisible}
        timeout={200}
        classNames="Tooltip"
        unmountOnExit
      >
        <div
          className={`Tooltip__message Tooltip__message--${position}`}
          style={style}
        >
          {message}
        </div>
      </CSSTransition>
    </div>
  );
}
