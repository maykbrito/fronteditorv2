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
  const { handleEditorDidMount, handleValueChange } =
    useContext(EditorContentContext);

  return (
    <div className={className}>
      <Editor
        height="100vh"
        width="100vw"
        theme="vs-dark"
        language={language}
        value={Storage.getItem(language) || ''}
        onMount={handleEditorDidMount}
        onChange={value => {
          handleValueChange(language, value || '');
        }}
      />
    </div>
  );
};

export default memo(CustomEditor);
