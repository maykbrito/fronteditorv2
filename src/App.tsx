import { EditorContentContextProvider } from './contexts/EditorContentContext'
import { MEditor } from './components/MEditor'

import './styles/global.css'

export function App() {
  
  return (
    <EditorContentContextProvider>
      <div className="flex flex-col">
        <MEditor />
      </div>
    </EditorContentContextProvider>
  )
}
