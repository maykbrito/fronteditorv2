import { createContext, ReactNode, useCallback, useState } from 'react'

import { EditorProps, Monaco, OnMount } from '@monaco-editor/react'
import { emmetHTML } from 'emmet-monaco-es'
import { omniTheme } from '../utils/EditorCustomTheme'

import Storage, { StorageKeys, StorageState } from '../utils/Storage'
import { KeyMod, KeyCode } from 'monaco-editor'

interface EditorContextProviderProps {
  children: ReactNode
}

interface EditorContentContextData {
  app: StorageState
  handleEditorDidMount: EditorProps['onMount']
  handleValueChange: (language: string, value: string) => void
  handleEditorWillMount: EditorProps['beforeMount']
}

export const EditorContentContext = createContext(
  {} as EditorContentContextData,
)

export const editorHotkeys = new EventTarget()
export const saveEvent = new CustomEvent('save')

export function EditorContentContextProvider({
  children,
}: EditorContextProviderProps) {
  const [app, setApp] = useState(Storage.get())

  async function handleEditorWillMount(monaco: Monaco) {
    monaco.editor.defineTheme('Omni', omniTheme)
  }

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

  const handleEditorDidMount = useCallback<OnMount>((editor) => {
    editor.addCommand(KeyMod.CtrlCmd | KeyCode.KeyS, () => {
      editorHotkeys.dispatchEvent(saveEvent)
    })

    emmetHTML()
  }, [])

  return (
    <EditorContentContext.Provider
      value={{
        app,
        handleEditorDidMount,
        handleValueChange,
        handleEditorWillMount,
      }}
    >
      {children}
    </EditorContentContext.Provider>
  )
}
