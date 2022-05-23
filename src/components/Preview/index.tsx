import {
  useState,
  useEffect,
  useContext,
  PointerEvent,
  useCallback,
  useRef,
} from 'react'
import { PanInfo, useDragControls, useMotionValue } from 'framer-motion'
import { CaretDown, CaretUp, DotsSixVertical, Minus, X } from 'phosphor-react'

import { EditorContentContext } from '../../contexts/EditorContentContext'
import { formatCodeToIframe } from '../../utils/FormatCodeToIframe'
import { StorageKeys } from '../../utils/Storage'

import { Container, Header, Iframe, ResizeHandler } from './styles'
import { base64EncodeUnicode } from '../../utils/base-64-encode-unicode'

let previewRenderTimer: number

type PreviewStateProps = 'minimized' | 'maximized' | 'closed'

interface PreviewProps {
  isFloating: boolean
}

export default function Preview({ isFloating = false }: PreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null)
  const { app } = useContext(EditorContentContext)

  const [isResizing, setIsResizing] = useState(false)
  const [previewTitle, setPreviewTitle] = useState('index.html')
  const [src, setSrc] = useState('')

  const [previewState, setPreviewState] =
    useState<PreviewStateProps>('minimized')

  const renderPreview = useCallback(() => {
    const keys = ['html', 'css', 'javascript'] as StorageKeys[]

    let codeToIframe = keys.reduce((acc: string, language) => {
      const value = app[language] || ''
      const formatted = formatCodeToIframe(value)
      const result = acc + formatted[language]
      return result
    }, '')

    const pageTitle = app.html.match(/<title>(?<title>.+)<\/title>/)

    codeToIframe = base64EncodeUnicode(codeToIframe)
    codeToIframe = `data:text/html;charset=utf-8;base64,${codeToIframe}`

    return {
      pageTitle: pageTitle?.groups?.title ?? 'index.html',
      codeToIframe,
    }
  }, [app])

  useEffect(() => {
    const { pageTitle, codeToIframe } = renderPreview()

    clearTimeout(previewRenderTimer)

    previewRenderTimer = setTimeout(() => {
      setSrc(codeToIframe)
      setPreviewTitle(pageTitle)
    }, 1000)
  }, [renderPreview])

  const dragControls = useDragControls()

  const startDrag = useCallback(
    (event: PointerEvent) => {
      if (previewState !== 'maximized') {
        dragControls.start(event)
      }
    },
    [dragControls, previewState],
  )

  const previewWidth = useMotionValue(600)

  const handleResize = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      previewWidth.set(previewWidth.get() - info.delta.x)
    },
    [previewWidth],
  )

  return (
    <>
      <Container
        id="preview"
        ref={previewRef}
        drag={isFloating}
        dragMomentum={false}
        dragElastic={false}
        dragListener={false}
        dragControls={dragControls}
        whileDrag={{ cursor: 'grabbing', opacity: 0.6 }}
        animate={isFloating ? previewState : undefined}
        style={!isFloating ? { width: previewWidth } : {}}
        transition={{ duration: 0 }}
        variants={{
          maximized: {
            width: 'calc(100% - 48px - 48px)',
            height: 'calc(100% - 48px - 48px)',
            x: -48,
            y: 48,
            position: 'fixed',
          },
          minimized: {
            x: 0,
            y: 0,
            width: 600,
            height: 400,
            right: 48,
            top: 48,
          },
          closed: {
            width: 100,
            height: 32,
            overflow: 'hidden',
            right: 48,
            top: 48,
          },
        }}
      >
        <Header
          $canBeDraggable={isFloating && previewState !== 'maximized'}
          $previewState={previewState}
          onPointerDown={isFloating ? startDrag : undefined}
        >
          {isFloating && (
            <div className="actions">
              <button
                type="button"
                onClick={() => setPreviewState('closed')}
                title="Fechar"
              >
                <X weight="bold" size={8} aria-label="Fechar" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewState('minimized')}
                title="Minimizar"
              >
                <Minus weight="bold" size={8} />
              </button>
              <button
                type="button"
                onClick={() => setPreviewState('maximized')}
                title="Maximizar"
              >
                <CaretUp className="arrow-up" weight="fill" size={12} />
                <CaretDown className="arrow-down" weight="fill" size={12} />
              </button>
            </div>
          )}
          <span>{previewTitle}</span>
        </Header>

        <Iframe
          src={src}
          id="result"
          frameBorder="0"
          allow="camera; microphone; fullscreen; accelerometer; autoplay; geolocation; payment; midi; magnetometer; gyroscope; document-domain; encrypted-media; picture-in-picture; screen-wake-lock"
        />

        {!isFloating && (
          <ResizeHandler
            $isResizing={isResizing}
            drag="x"
            dragMomentum={false}
            dragElastic={false}
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            onDrag={handleResize}
            onDragStart={() => setIsResizing(true)}
            onDragEnd={() => setIsResizing(false)}
          >
            <DotsSixVertical size={12} />
          </ResizeHandler>
        )}
      </Container>
    </>
  )
}
