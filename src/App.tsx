import { EditorContentContextProvider } from './contexts/EditorContentContext';

import { MEditor } from './components/MEditor';
import Preview from './components/Preview';

import './styles/global.css';

export default function App() {
  return (
    <EditorContentContextProvider>
      <div className="app">
        <MEditor />
        <Preview />
      </div>
    </EditorContentContextProvider>
  );
}
