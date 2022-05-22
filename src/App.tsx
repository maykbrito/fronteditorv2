import { EditorContentContextProvider } from './contexts/EditorContentContext';

import { MEditor } from './components/MEditor';

import './styles/global.css';

function AppWrapper() {
  const params = new URLSearchParams(window.location.search);
  const float = Boolean(params.get('float'));

  return (
    <div className="app">
      <MEditor float={float} />
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
