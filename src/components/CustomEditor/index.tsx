import { useContext, memo } from 'react';

import Editor from '@monaco-editor/react';
import Storage from '../../utils/Storage';

import { EditorContentContext } from '../../contexts/EditorContentContext';

type CustomEditorProps = {
  language: 'html' | 'css' | 'javascript' | 'markdown';
  className: string;
};

const CustomEditor = ({
  className,
  language,
}: CustomEditorProps): JSX.Element => {
  const { handleEditorDidMount, handleValueChange, handleEditorWillMount } =
    useContext(EditorContentContext);

  return (
    <div className={className}>
      <Editor
        height="100vh"
        width="100vw"
        theme="Omni"
        language={language}
        value={Storage.getItem(language) || ''}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        onChange={value => {
          handleValueChange(language, value || '');
        }}
        options={{
          minimap: {
            enabled: false,
          },
        }}
      />
    </div>
  );
};

export default memo(CustomEditor);
