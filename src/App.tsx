import { useContext } from 'react';
import {
  EditorContentContext,
  EditorContentContextProvider,
} from './contexts/EditorContentContext';

import { MEditor } from './components/MEditor';
import Preview from './components/Preview';

import './styles/global.css';

function AppWrapper() {
  const { appRef } = useContext(EditorContentContext);

  return (
    <div ref={appRef} className="app fixed-right">
      <MEditor />
      <Preview />
    </div>
  );
}

export default function App() {
  return (
    <EditorContentContextProvider>
      <AppWrapper />
    </EditorContentContextProvider>
  );
}
