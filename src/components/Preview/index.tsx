import {
  useState,
  useEffect,
  useContext,
  PointerEvent,
  useCallback,
  useRef,
  ChangeEvent,
} from 'react'
import { PanInfo, useDragControls, useMotionValue } from 'framer-motion'
import { CaretDown, CaretUp, DotsSixVertical, Minus, X } from 'phosphor-react'

import {
  EditorContentContext,
  editorHotkeys,
} from '../../contexts/EditorContentContext'
import { formatCodeToIframe } from '../../utils/FormatCodeToIframe'
import { StorageKeys } from '../../utils/Storage'

import { Container, Header, Iframe, ResizeHandler } from './styles'
import { base64EncodeUnicode } from '../../utils/base-64-encode-unicode'

let previewRenderTimer: NodeJS.Timeout

type PreviewStateProps = 'minimized' | 'maximized' | 'closed'

interface PreviewProps {
  isFloating: boolean
}

export default function Preview({ isFloating = false }: PreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null)
  const { app } = useContext(EditorContentContext)

  const [isResizing, setIsResizing] = useState(false)
  const [isLiveReloadEnabled, setIsLiveReloadEnabled] = useState(true)
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

    setSrc(codeToIframe)
    setPreviewTitle(pageTitle?.groups?.title ?? 'index.html')
  }, [app])

  useEffect(() => {
    if (isLiveReloadEnabled) {
      clearTimeout(previewRenderTimer)

      previewRenderTimer = setTimeout(() => {
        renderPreview()
      }, 1000)
    }
  }, [renderPreview, isLiveReloadEnabled])

  useEffect(() => {
    editorHotkeys.addEventListener('save', renderPreview)

    return () => {
      editorHotkeys.removeEventListener('save', renderPreview)
    }
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

  function handleToggleLiveReload(event: ChangeEvent<HTMLInputElement>) {
    setIsLiveReloadEnabled(event.target.checked)
  }

  return (
    <>
      <Container
        id="preview"
        ref={previewRef}
        $previewState={previewState}
        drag={isFloating}
        dragMomentum={false}
        dragElastic={false}
        dragListener={false}
        dragControls={dragControls}
        whileDrag={{ cursor: 'grabbing', opacity: 0.6 }}
        animate={isFloating ? previewState : undefined}
        style={!isFloating ? { width: previewWidth } : {}}
        transition={{ duration: 0.2 }}
        variants={{
          maximized: {
            x: 0,
            y: 0,
            left: 24,
            top: 24,
            bottom: 24,
            right: 24,
          },
          minimized: {
            left: 'calc(100% - 600px - 48px)',
            top: 48,
            bottom: 'unset',
            right: 'unset',
          },
        }}
      >
        <Header
          $isFloating={isFloating}
          $canBeDraggable={isFloating && previewState !== 'maximized'}
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

          <div className="live-reload">
            <span>Live reload?</span>
            <input
              type="checkbox"
              title="Habilitar/desabilitar recarregamento automático"
              onChange={handleToggleLiveReload}
              checked={isLiveReloadEnabled}
            />
          </div>
        </Header>

        <div className="preview-iframe">
          <Iframe
            src={src}
            id="result"
            frameBorder="0"
            allow="camera; microphone; fullscreen; accelerometer; autoplay; geolocation; payment; midi; magnetometer; gyroscope; document-domain; encrypted-media; picture-in-picture; screen-wake-lock"
          />
        </div>

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
