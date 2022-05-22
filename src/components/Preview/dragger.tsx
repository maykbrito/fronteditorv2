/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useLayoutEffect, useRef, useContext } from 'react';
import { MEditorContentContext } from '../MEditor';

interface DraggerProps {
  onDrag: (x: number) => void;
  onStopDrag: () => void;
  onStartDrag: () => void;
}

let initialClientX: number;

export function Dragger({ onDrag, onStopDrag, onStartDrag }: DraggerProps) {
  const draggerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function dragMouseDown(e: React.MouseEvent): void {
    e.preventDefault();
    initialClientX = e.clientX;
    setIsDragging(true);
    onStartDrag();
  }

  useLayoutEffect(() => {
    function doDrag(e: MouseEvent): void {
      // if (!isDragging || mEditorRef.current === null) return;
      if (!isDragging) {
        return;
      }
      e.preventDefault();
      onDrag(initialClientX - e.clientX);
    }

    function stopDrag(): void {
      setIsDragging(false);

      // if (mEditorRef.current === null) return;
      // mEditorRef.current.classList.remove('is-dragging');
      onStopDrag();
    }

    if (isDragging) {
      document.addEventListener('mousemove', doDrag);
      document.addEventListener('mouseup', stopDrag);
    }

    return () => {
      document.removeEventListener('mousemove', doDrag);
      document.removeEventListener('mouseup', stopDrag);
    };
  }, [isDragging, onDrag, onStopDrag]);

  return (
    <div
      ref={draggerRef}
      className={`dragger ${isDragging ? 'is-dragging' : ''}`}
      onMouseDown={e => dragMouseDown(e)}
    />
  );
}
