import { useState, useEffect, useRef, useContext } from 'react';
import {
  useDragControls,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion';
import { EditorContentContext } from '../../contexts/EditorContentContext';
import { formatCodeToIframe } from '../../utils/FormatCodeToIframe';
import { StorageKeys } from '../../utils/Storage';

import { Container, Header, Iframe } from './styles';
import { Dragger } from './dragger';

let pos1 = 0;
let pos2 = 0;
let pos3 = 0;
let pos4 = 0;

let timer: NodeJS.Timer;

function b64EncodeUnicode(str: string): string {
  // https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.

  const toSolidBytes = (match: string, p1: string): string => {
    return String.fromCharCode(Number(`0x${p1}`));
  };

  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, toSolidBytes));
}

type PreviewStateProps = 'minimized' | 'maximized' | 'closed';

export default function Preview(): JSX.Element {
  const { app } = useContext(EditorContentContext);

  const previewRef = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState('');

  // const [previewWidth, setPreviewWidth] = useState(0);
  const previewWidth = useMotionValue(0);
  const [isResizing, setIsResizing] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [previewState, setPreviewState] =
    useState<PreviewStateProps>('minimized');

  const [top, setTop] = useState('');
  const [left, setLeft] = useState('');
  const [zIndex, setZIndex] = useState(0);

  function dragMouseDown(e: React.MouseEvent): void {
    e.preventDefault();

    setIsDragging(true);
    // // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
  }

  useEffect(() => {
    const keys = ['html', 'css', 'javascript'] as StorageKeys[];

    let codeToIframe = keys.reduce((acc: string, language) => {
      const value = app[language] || '';
      const formated = formatCodeToIframe(value);
      const result = acc + formated[language];
      return result;
    }, '');

    codeToIframe = b64EncodeUnicode(codeToIframe);
    codeToIframe = `data:text/html;charset=utf-8;base64,${codeToIframe}`;

    clearTimeout(timer);
    timer = setTimeout(() => {
      setSrc(codeToIframe);
    }, 1000);
  }, [app]);

  function updatePreviewPosition(state: PreviewStateProps): void {
    if (previewRef.current) {
      previewRef.current.style.width = '';
      previewRef.current.style.height = '';
    }

    setTop('');
    setLeft('');
    setPreviewState(state);
  }

  useEffect(() => {
    function doDrag(e: MouseEvent): void {
      if (!isDragging) return;

      e.preventDefault();

      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      // // set the element's new position:
      const offsetTop = previewRef.current?.offsetTop ?? 0;
      const offsetLeft = previewRef.current?.offsetLeft ?? 0;

      setTop(`${offsetTop - pos2}px`);
      setLeft(`${offsetLeft - pos1}px`);

      setZIndex(-1);
    }

    function stopDrag(): void {
      setIsDragging(false);
      setZIndex(0);
    }

    if (isDragging) {
      document.addEventListener('mousemove', doDrag);
      document.addEventListener('mouseup', stopDrag);
    }

    return () => {
      document.removeEventListener('mousemove', doDrag);
      document.removeEventListener('mouseup', stopDrag);
    };
  }, [isDragging]);

  const containerStyle = useMotionTemplate`calc(50vw + ${previewWidth}px)`;

  const dragControls = useDragControls();

  const startDrag = (ev: any) => {
    dragControls.start(ev, { snapToCursor: true });
  };

  return (
    <Container
      id="preview"
      state={previewState}
      drag
      dragMomentum={false}
      // ref={previewRef}
      // top={top}
      // left={left}
      style={{ width: containerStyle }}
    >
      <Dragger
        onDrag={x => previewWidth.set(x)}
        onStopDrag={() => setIsResizing(false)}
        onStartDrag={() => setIsResizing(true)}
      />

      <Header onPointerDown={startDrag}>
        <button type="button" onClick={() => updatePreviewPosition('closed')}>
          x
        </button>
        <button
          type="button"
          onClick={() => updatePreviewPosition('minimized')}
        >
          -
        </button>
        <button
          type="button"
          onClick={() => updatePreviewPosition('maximized')}
        >
          +
        </button>
      </Header>
      <Iframe
        src={src}
        style={{ zIndex }}
        id="result"
        frameBorder="0"
        allow="camera; microphone; fullscreen; accelerometer; autoplay; geolocation; payment; midi; magnetometer; gyroscope; document-domain; encrypted-media; picture-in-picture; screen-wake-lock"
      />
    </Container>
  );
}
