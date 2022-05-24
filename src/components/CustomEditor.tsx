import { useContext, memo } from 'react'

import Editor from '@monaco-editor/react'
import Storage from '../utils/Storage'

import { EditorContentContext } from '../contexts/EditorContentContext'

type CustomEditorProps = {
  language: 'html' | 'css' | 'javascript' | 'markdown'
  className: string
}

const CustomEditor = ({ className, language }: CustomEditorProps) => {
  const { handleEditorDidMount, handleValueChange, handleEditorWillMount } =
    useContext(EditorContentContext)

  return (
    <div className={className}>
      <Editor
        height="100%"
        width="100%"
        theme="Omni"
        loading={<span className="font-sans text-zinc-700">Carregando</span>}
        language={language}
        value={Storage.getItem(language) || ''}
        beforeMount={handleEditorWillMount}
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
