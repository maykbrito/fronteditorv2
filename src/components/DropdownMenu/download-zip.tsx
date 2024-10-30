import { useContext } from 'react'
import { EditorContentContext } from '@/contexts/EditorContentContext'

import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import pretty from 'pretty'
import { Download } from 'lucide-react'
import { DropdownMenuItem } from '../ui/dropdown-menu'

const zip = new JSZip()

export function DownloadZip() {
  const { app } = useContext(EditorContentContext)

  function addScriptsToParsedHtmlHead(parsed: Document) {
    const head = parsed.querySelector('head')!

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = './index.js'
    script.defer = true

    const style = document.createElement('link')
    style.rel = 'stylesheet'
    style.href = './index.css'

    head.appendChild(script)
    head.appendChild(style)

    return parsed
  }

  async function handleDownloadAsZip() {
    const parser = new DOMParser()

    const parsedHTML = parser.parseFromString(app.html, 'text/html')

    const htmlWithScripts = addScriptsToParsedHtmlHead(parsedHTML)

    const doctype = '<!DOCTYPE html>'

    zip.file(
      'index.html',
      pretty(doctype + htmlWithScripts.documentElement.outerHTML)
    )

    zip.file('index.css', app.css)
    zip.file('index.js', app.javascript)
    zip.file('index.md', app.markdown)

    const content = await zip.generateAsync({ type: 'blob' })

    saveAs(content, `frontend-editor-${new Date().toISOString()}.zip`)
  }

  return (
    <DropdownMenuItem onClick={handleDownloadAsZip}>
      <Download className="mr-1 size-3" />
      Download (zip)
    </DropdownMenuItem>
  )
}
