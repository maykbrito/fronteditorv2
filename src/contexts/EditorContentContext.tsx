import { createContext, ReactNode, useCallback, useRef, useState } from 'react'
import { loadWASM } from 'onigasm'

import { EditorProps, Monaco, OnMount } from '@monaco-editor/react'
import { emmetHTML } from 'emmet-monaco-es'

import Storage, { StorageKeys, StorageState } from '../utils/Storage'
import { KeyMod, KeyCode, editor } from 'monaco-editor'
import monacoOmniTheme from '../assets/monaco-themes/monaco-omni.json'
import { wireTmGrammars } from 'monaco-editor-textmate'
import { registry } from '../utils/monaco-tm-registry'

import onigasmWASM from '../assets/onigasm.wasm?url'

interface EditorContextProviderProps {
  children: ReactNode
}

interface EditorContentContextData {
  app: StorageState
  isEditorReady: boolean
  handleEditorDidMount: EditorProps['onMount']
  handleValueChange: (language: string, value: string) => void
}

export const EditorContentContext = createContext(
  {} as EditorContentContextData,
)

export const editorHotkeys = new EventTarget()
export const saveEvent = new CustomEvent('save')

export function EditorContentContextProvider({
  children,
}: EditorContextProviderProps) {
  const monacoRef = useRef<Monaco>()
  const editorRef = useRef<editor.IStandaloneCodeEditor>()

  const [app, setApp] = useState(Storage.get())
  const [isEditorReady, setIsEditorReady] = useState(false)

  const handleValueChange = useCallback(
    async (language: string, value: string) => {
      setApp((oldState) => {
        const keys = Object.keys(oldState) as StorageKeys[]

        const updatedValues = keys.reduce(
          (acc, key) => {
            acc[key] = language === key ? value : oldState[key]
            return acc
          },
          { ...oldState },
        )

        Storage.add(updatedValues)

        return updatedValues
      })
    },
    [],
  )

  const loadTmGrammars = useCallback(async () => {
    await loadWASM(onigasmWASM)

    const grammars = new Map()

    grammars.set('css', 'source.css')
    grammars.set('html', 'source.html')
    grammars.set('javascript', 'source.js')
    grammars.set('markdown', 'source.md')

    monacoRef.current?.languages.register({ id: 'css' })
    monacoRef.current?.languages.register({ id: 'html' })
    monacoRef.current?.languages.register({ id: 'javascript' })
    monacoRef.current?.languages.register({ id: 'markdown' })

    await wireTmGrammars(
      monacoRef.current!,
      registry,
      grammars,
      editorRef.current,
    )
  }, [])

  const handleEditorDidMount = useCallback<OnMount>(
    (editor, monaco) => {
      editor.addCommand(KeyMod.CtrlCmd | KeyCode.KeyS, () => {
        editorHotkeys.dispatchEvent(saveEvent)
      })

      editorRef.current = editor
      monacoRef.current = monaco

      monacoRef.current.editor.defineTheme(
        'custom-theme',
        monacoOmniTheme as editor.IStandaloneThemeData,
      )

      loadTmGrammars().then(() => {
        monacoRef.current?.editor.setTheme('custom-theme')
        emmetHTML()
        setIsEditorReady(true)
      })
    },
    [loadTmGrammars],
  )

  return (
    <EditorContentContext.Provider
      value={{
        app,
        isEditorReady,
        handleEditorDidMount,
        handleValueChange,
      }}
    >
      {children}
    </EditorContentContext.Provider>
  )
}
