/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useLayoutEffect, useRef, useContext } from 'react';
import { EditorContentContext } from '../../contexts/EditorContentContext';

export function Dragger() {
  const { appRef } = useContext(EditorContentContext);

  const draggerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function dragMouseDown(e: React.MouseEvent): void {
    e.preventDefault();
    setIsDragging(true);
  }

  useLayoutEffect(() => {
    function doDrag(e: MouseEvent): void {
      if (!isDragging || appRef.current === null) return;

      e.preventDefault();

      appRef.current.classList.add('is-dragging');

      // const maxLeft = e.clientX <= 200;
      // const maxRight = document.body.offsetWidth - e.clientX <= 200;
      // const outsideBoundaries = maxLeft || maxRight;

      appRef.current.style.gridTemplateColumns = `${e.clientX}px 1fr`;
    }

    function stopDrag(): void {
      setIsDragging(false);

      if (appRef.current === null) return;
      appRef.current.classList.remove('is-dragging');
    }

    if (isDragging) {
      document.addEventListener('mousemove', doDrag);
      document.addEventListener('mouseup', stopDrag);
    }

    return () => {
      document.removeEventListener('mousemove', doDrag);
      document.removeEventListener('mouseup', stopDrag);
    };
  });

  return (
    <div
      ref={draggerRef}
      className="dragger"
      onMouseDown={e => dragMouseDown(e)}
    />
  );
}
