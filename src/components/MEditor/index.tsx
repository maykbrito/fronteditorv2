import { useState } from 'react'
import CustomEditor from '../CustomEditor'
import Preview from '../Preview'

import { type Tab, TabButton, type TabButtonProps } from './TabButton'
import { Menu } from '@/components/DropdownMenu'

import logoSvg from '../../assets/logo.svg'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable'
import { useWindowSize } from '@uidotdev/usehooks'

interface MEditorProps {
  tabs?: TabButtonProps[] | null
}

export function MEditor({ tabs }: MEditorProps) {
  const size = useWindowSize()
  const params = new URLSearchParams(window.location.search)
  const showLogo = params.get('logo') !== 'false'
  const previewOnly = params.get('previewOnly')
  const hideTabs = params.get('hideTabs')
  const editorOnly = params.get('editorOnly') === 'true' || false
  const vertical = params.get('vertical') === 'true' || false
  const reverse = params.get('reverse') === 'true' || false

  const displayTabs =
    tabs ||
    [
      {
        tabName: 'html',
        displayName: 'HTML',
      },
      {
        tabName: 'css',
        displayName: 'CSS',
      },
      {
        tabName: 'javascript',
        displayName: 'JS',
      },
      {
        tabName: 'markdown',
        displayName: 'MD',
      },
    ].filter(tab => !hideTabs?.includes(tab.tabName))

  const [selectedTab, setSelectedTab] = useState<Tab>(
    displayTabs[0].tabName as Tab
  )

  if (previewOnly) {
    return (
      <div className="w-full h-screen overflow-hidden relative sm:flex grid">
        <Preview />
      </div>
    )
  }

  const renderEditor = () => (
    <div className="w-full flex flex-col h-full bg-[#191622]">
      <nav className="flex items-center gap-1 py-1 px-0 sm:px-4 sm:py-2 bg-[#11111b]">
        {showLogo && (
          <a
            title="visit the open-source project"
            href="https://github.com/maykbrito/fronteditorv2"
            target="_blank"
            rel="noreferrer noopenner"
            className="text-center px-4"
          >
            <img src={logoSvg} className="inline" alt="Fronteditor Logo" />
          </a>
        )}

        {displayTabs.map(tab => (
          <TabButton
            key={tab.tabName}
            displayName={tab.displayName}
            tabName={tab.tabName as Tab}
            onSelectTab={setSelectedTab}
            selectedTab={selectedTab}
          />
        ))}

        <div className="ml-auto z-50">
          <Menu />
        </div>
      </nav>

      <main className="flex flex-1 overflow-hidden relative h-screen">
        <CustomEditor language={selectedTab} className="absolute inset-0" />
      </main>
    </div>
  )

  if (editorOnly) {
    return (
      <div className="w-screen h-screen overflow-hidden relative sm:flex grid">
        {renderEditor()}
      </div>
    )
  }

  return (
    <div className="w-screen h-screen overflow-hidden relative sm:flex grid">
      <ResizablePanelGroup
        direction={
          vertical || (size.width && size.width < 640)
            ? `vertical`
            : `horizontal`
        }
      >
        <ResizablePanel>
          {!reverse ? renderEditor() : <Preview />}
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          {!reverse ? <Preview /> : renderEditor()}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
