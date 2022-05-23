import {
  createContext,
  ReactNode,
  useCallback,
  useState,
  useRef,
  RefObject,
} from 'react';

import { Monaco } from '@monaco-editor/react';
import { emmetHTML } from 'emmet-monaco-es';
import { omniTheme } from '../utils/EditorCustomTheme';

import Storage, { StorageKeys, StorageState } from '../utils/Storage';

interface EditorContextProviderProps {
  children: ReactNode;
}

interface EditorContentContextData {
  app: StorageState;
  handleEditorDidMount: (editor: any) => void;
  handleValueChange: (language: string, value: string) => void;
  handleEditorWillMount: (monaco: Monaco) => void;
  editorRef: RefObject<HTMLElement>;
}

export const EditorContentContext = createContext(
  {} as EditorContentContextData
);

export function EditorContentContextProvider({
  children,
}: EditorContextProviderProps) {
  const [app, setApp] = useState(Storage.get());
  const editorRef = useRef(null);

  async function handleEditorWillMount(monaco: Monaco) {
    monaco.editor.defineTheme('Omni', omniTheme);
  }

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

  const handleEditorDidMount = useCallback(editor => {
    editorRef.current = editor;
    emmetHTML();
  }, []);

  return (
    <EditorContentContext.Provider
      value={{
        app,
        handleEditorDidMount,
        handleValueChange,
        handleEditorWillMount,
        editorRef,
      }}
    >
      {children}
    </EditorContentContext.Provider>
  );
}
