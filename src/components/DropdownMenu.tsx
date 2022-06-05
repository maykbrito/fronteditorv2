import { Menu, Transition } from '@headlessui/react'
import { Fragment, useContext } from 'react'

import { ArchiveBox, Gear } from 'phosphor-react'
import { EditorContentContext } from '../contexts/EditorContentContext'

import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import pretty from 'pretty'

const zip = new JSZip()

export function DropdownMenu() {
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
      pretty(doctype + htmlWithScripts.documentElement.outerHTML),
    )

    zip.file('index.css', app.css)
    zip.file('index.js', app.javascript)
    zip.file('index.md', app.markdown)

    const content = await zip.generateAsync({ type: 'blob' })

    saveAs(content, `frontend-editor-${new Date().toISOString()}.zip`)
  }

  return (
    <div className="top-16">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex text-gray-400 hover:text-gray-200 items-center w-full justify-center rounded-md p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <Gear size={18} weight="bold" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-green-400 text-gray-900' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={handleDownloadAsZip}
                  >
                    <ArchiveBox size={20} className="mr-2" />
                    Download as ZIP
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
