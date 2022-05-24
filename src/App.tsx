import { EditorContentContextProvider } from './contexts/EditorContentContext'
import { MEditor } from './components/MEditor'

import './styles/global.css'

export function App() {
  const params = new URLSearchParams(window.location.search)
  const shouldFloat = Boolean(params.get('float'))

  return (
    <EditorContentContextProvider>
      <div className="flex flex-col">
        <MEditor shouldFloat={shouldFloat} showLogo />
      </div>
    </EditorContentContextProvider>
  )
}
