import {
  useState,
  useEffect,
  useContext,
  PointerEvent,
  useCallback,
  useRef,
} from 'react'
import { motion, PanInfo, useDragControls, useMotionValue, useTransform } from 'framer-motion'
import { DotsSixVertical } from 'phosphor-react'

import {
  EditorContentContext,
  editorHotkeys,
} from '../../contexts/EditorContentContext'
import { formatCodeToIframe } from '../../utils/FormatCodeToIframe'
import { StorageKeys } from '../../utils/Storage'

import { base64EncodeUnicode } from '../../utils/base-64-encode-unicode'
import classNames from 'classnames'
import { Header, WindowState } from './Header'

let previewRenderTimer: NodeJS.Timeout

interface PreviewProps {
  isFloating: boolean
  fullscreen: boolean
}

export default function Preview({ isFloating = false, fullscreen = false }: PreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null)
  const { app } = useContext(EditorContentContext)

  const [isLiveReloadEnabled, setIsLiveReloadEnabled] = useState(true)
  const [previewTitle, setPreviewTitle] = useState('index.html')
  const [pageIcon, setPageIcon] = useState('')
  const [src, setSrc] = useState('')

  const [previewWindowState, setPreviewWindowState] =
    useState<WindowState>('minimized')

  const renderPreview = useCallback(() => {
    const keys = ['html', 'css', 'javascript'] as StorageKeys[]

    let codeToIframe = keys.reduce((acc: string, language) => {
      const value = app[language] || ''
      const formatted = formatCodeToIframe(value)
      const result = acc + formatted[language]
      return result
    }, '')

    const pageTitle = app.html.match(/<title>(?<title>.+)<\/title>/)
    const pageIcon = app.html.match(/rel=['"](?:shortcut )?icon['"] href=['"](?<icon>[^?'"]+)[?'"]/)

    codeToIframe = base64EncodeUnicode(codeToIframe)
    codeToIframe = `data:text/html;charset=utf-8;base64,${codeToIframe}`

    setSrc(codeToIframe)
    setPreviewTitle(pageTitle?.groups?.title ?? 'index.html')
    setPageIcon(pageIcon?.groups?.icon ?? '')
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
 
  /**
   * Responsive
   * Reset the preview to 100% when window 
   * is bellow 640 (tailwind's sm value)
   */
  useEffect(() => {
    const handleResize = () => 
      window.innerWidth <= 640 && previewWidth.set(100)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  const dragControls = useDragControls()

  const handlePreviewDragStart = useCallback(
    (event: PointerEvent) => {
      if (previewWindowState !== 'maximized') {
        dragControls.start(event)
      }
    },
    [dragControls, previewWindowState],
  )

  const previewWidth = useMotionValue(100)

  const handleResize = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      /* 
      * this calc is not working good
      * I wanna something that follows the mouse's pointer
      */
      const newWidth = previewWidth.get() - info.delta.x / 8 
      previewWidth.set(newWidth)
    },
    [previewWidth],
  )

  return (
    <>
      <motion.div
        className={classNames('bg-white flex flex-col', {
          [`absolute z-10 rounded-t-lg overflow-auto shadow`]: isFloating,
          [`relative h-full rounded-none`]: !isFloating,
          [`h-8 w-28 overflow-hidden`]: previewWindowState === 'closed',
          [`flex-1`]: fullscreen,
        })}
        ref={previewRef}
        drag={isFloating}
        dragMomentum={false}
        dragElastic={false}
        dragListener={false}
        dragControls={dragControls}
        whileDrag={{ cursor: 'grabbing', opacity: 0.6 }}
        animate={isFloating ? previewWindowState : undefined}
        style={!isFloating ? { width: useTransform(previewWidth, (value) => `${value}%`) } : {}}
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
          isFloating={isFloating}
          canBeDraggable={isFloating && previewWindowState !== 'maximized'}
          windowTitle={previewTitle}
          windowIcon={pageIcon}
          onDragStart={handlePreviewDragStart}
          onLiveReloadToggle={setIsLiveReloadEnabled}
          onWindowStateChanged={setPreviewWindowState}
          isFullscreen={fullscreen}
        />

        <div
          className={classNames('resize overflow-hidden h-full', {
            [`resize-none w-full h-full`]: previewWindowState === 'maximized',
            [`hidden`]: previewWindowState === 'closed',
          })}
        >
          <iframe
            src={src}
            id="result"
            frameBorder="0"
            allow="camera; microphone; fullscreen; accelerometer; autoplay; geolocation; payment; midi; magnetometer; gyroscope; document-domain; encrypted-media; picture-in-picture; screen-wake-lock"
            className="w-full h-full flex-1 relative z-10"
          />
        </div>

        {(!isFloating && !fullscreen) && (
          <motion.div
            className="top-0 w-3 h-full z-20 absolute cursor-col-resize sm:flex items-center active:w-full hidden"
            drag="x"
            dragMomentum={false}
            dragElastic={false}
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            onDrag={handleResize}
          >
            <DotsSixVertical size={12} />
          </motion.div>
        )}
      </motion.div>
    </>
  )
}
