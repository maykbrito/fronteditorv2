import { useContext, memo, useEffect, useState } from 'react'

import Editor from '@monaco-editor/react'
import Storage from '../utils/Storage'

import { EditorContentContext } from '../contexts/EditorContentContext'
import classNames from 'classnames'

type CustomEditorProps = {
  language: 'html' | 'css' | 'javascript' | 'markdown'
  className: string
}

const CustomEditor = ({ className, language }: CustomEditorProps) => {

  const params =  new URLSearchParams(window.location.search)
  const lineNumbers = params.get('lineNumbers') as 'on' | 'off'
  const theme = params.get('theme') || 'custom-theme'

  const { handleEditorDidMount, handleValueChange, isEditorReady } =
    useContext(EditorContentContext)

  /**
   * Responsive
   * remove line numbers when window
   * is bellow 640 (tailwind's sm value)
   */
  const [showLineNumber, setShowLineNumbers] = useState<'on' | 'off'>('on')

  useEffect(() => {
    const handleResize = () =>
      window.innerWidth <= 640
        ? setShowLineNumbers('off')
        : setShowLineNumbers('on')

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <div className={className}>
      <Editor
        className={classNames('w-full h-full', {
          invisible: !isEditorReady,
        })}
        loading={<span className="font-sans text-zinc-700">Carregando</span>}
        language={language}
        value={Storage.getItem(language) || ''}
        path={`index.${language.toLowerCase()}`}
        onMount={handleEditorDidMount}
        onChange={value => {
          handleValueChange(language, value || '')
        }}
        options={{
          minimap: {
            enabled: false,
          },
          lineNumbers: lineNumbers || showLineNumber,
          renderLineHighlight: 'gutter',
          fontSize: 16,
          lineHeight: 26,
          fontFamily: 'JetBrains Mono, Menlo, monospace',
          fontLigatures: true,
          'semanticHighlighting.enabled': true,
          bracketPairColorization: {
            enabled: true,
          },
          wordWrap: 'on',
          tabSize: 2,
          mouseWheelZoom: true,
          theme,
          padding: {
            top: 10,
            bottom: 10,
          }
        }}
      />
    </div>
  )
}

export default memo(CustomEditor)
