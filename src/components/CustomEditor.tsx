import { useContext, memo } from 'react'

import Editor from '@monaco-editor/react'
import Storage from '../utils/Storage'

import { EditorContentContext } from '../contexts/EditorContentContext'
import classNames from 'classnames'

type CustomEditorProps = {
  language: 'html' | 'css' | 'javascript' | 'markdown'
  className: string
}

const CustomEditor = ({ className, language }: CustomEditorProps) => {
  const { handleEditorDidMount, handleValueChange, isEditorReady } =
    useContext(EditorContentContext)

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
        onChange={(value) => {
          handleValueChange(language, value || '')
        }}
        options={{
          minimap: {
            enabled: false,
          },
          rulers: [80, 120],
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
        }}
      />
    </div>
  )
}

export default memo(CustomEditor)
