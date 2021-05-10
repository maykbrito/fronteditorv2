import { createContext, ReactNode, useCallback, useState } from 'react';

import { emmetHTML } from 'emmet-monaco-es';

import Storage, { StorageKeys, StorageState } from '../utils/Storage';

interface EditorContextProviderProps {
  children: ReactNode;
}

interface EditorContentContextData {
  app: StorageState;
  handleEditorDidMount: () => void;
  handleValueChange: (language: string, value: string) => void;
}

export const EditorContentContext = createContext(
  {} as EditorContentContextData
);

export function EditorContentContextProvider({
  children,
}: EditorContextProviderProps) {
  const [app, setApp] = useState(Storage.get());

  const handleValueChange = useCallback(
    async (language: string, value: string) => {
      setApp(oldState => {
        // atualização funcional
        const keys = Object.keys(oldState) as StorageKeys[];
        const updatedValues = keys.reduce(
          (acc, key) => {
            acc[key] = language === key ? value : oldState[key];
            return acc;
          },
          { ...oldState }
        );

        Storage.add(updatedValues);

        return updatedValues;
      });
    },
    []
  );

  const handleEditorDidMount = useCallback(() => {
    emmetHTML();
  }, []);

  return (
    <EditorContentContext.Provider
      value={{
        app,
        handleEditorDidMount,
        handleValueChange,
      }}
    >
      {children}
    </EditorContentContext.Provider>
  );
}
