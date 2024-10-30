import { useState, useEffect, useContext, useCallback } from 'react'

import {
  EditorContentContext,
  editorHotkeys,
} from '../../contexts/EditorContentContext'
import { formatCodeToIframe } from '../../utils/FormatCodeToIframe'
import { StorageKeys } from '../../utils/Storage'

import { base64EncodeUnicode } from '../../utils/base-64-encode-unicode'
import { Header } from './Header'

let previewRenderTimer: NodeJS.Timeout

export default function Preview() {
  const params = new URLSearchParams(window.location.search)
  const fullscreen = Boolean(params.get('fullscreen'))

  const { app } = useContext(EditorContentContext)

  const [isLiveReloadEnabled, setIsLiveReloadEnabled] = useState(true)
  const [previewTitle, setPreviewTitle] = useState('index.html')
  const [pageIcon, setPageIcon] = useState('')
  const [src, setSrc] = useState('')

  const renderPreview = useCallback(() => {
    const keys = ['html', 'css', 'javascript'] as StorageKeys[]

    let codeToIframe = keys.reduce((acc: string, language) => {
      const value = app[language] || ''
      const formatted = formatCodeToIframe(value)
      const result = acc + formatted[language]
      return result
    }, '')

    const pageTitle = app.html.match(/<title>(?<title>.+)<\/title>/)
    const pageIcon = app.html.match(
      /rel=['"](?:shortcut )?icon['"] href=['"](?<icon>[^?'"]+)[?'"]/
    )

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

  if (fullscreen) {
    return (
      <iframe
        src={src}
        id="result"
        frameBorder={0}
        allow="camera; microphone; fullscreen; accelerometer; autoplay; geolocation; payment; midi; magnetometer; gyroscope; document-domain; encrypted-media; picture-in-picture; screen-wake-lock"
        className="w-full h-full flex-1 relative z-10"
      />
    )
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Header
        windowTitle={previewTitle}
        windowIcon={pageIcon}
        onLiveReloadToggle={setIsLiveReloadEnabled}
      />

      <div className="h-full flex-1">
        <iframe
          src={src}
          id="result"
          frameBorder={0}
          allow="camera; microphone; fullscreen; accelerometer; autoplay; geolocation; payment; midi; magnetometer; gyroscope; document-domain; encrypted-media; picture-in-picture; screen-wake-lock"
          className="w-full h-full"
        />
      </div>
    </div>
  )
}
