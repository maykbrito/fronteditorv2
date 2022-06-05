import { useState } from 'react'
import CustomEditor from '../CustomEditor'
import Preview from '../Preview'

import { Tab, TabButton, TabButtonProps } from './TabButton'
import { motion } from 'framer-motion'
import { DropdownMenu } from '../DropdownMenu'

import logoSvg from '../../assets/logo.svg'

interface MEditorProps {
  shouldFloat: boolean
  showLogo?: boolean
  tabs?: TabButtonProps[] | null
}

export function MEditor({
  tabs,
  showLogo = true,
  shouldFloat = false,
}: MEditorProps) {
  const [selectedTab, setSelectedTab] = useState<Tab>('html')

  const displayTabs = tabs || [
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
  ]

  return (
    <motion.div className="w-screen h-screen overflow-hidden relative flex">
      <div className="flex-1 flex flex-col h-full">
        <nav className="flex items-center gap-1 px-4 py-2 bg-[#13111b]">
          {showLogo && (
            <div className="text-center px-4">
              <img src={logoSvg} className="w-4 inline mr-2" alt="" />
            </div>
          )}

          {displayTabs.map((tab) => (
            <TabButton
              key={tab.tabName}
              displayName={tab.displayName}
              tabName={tab.tabName}
              onSelectTab={setSelectedTab}
              selectedTab={selectedTab}
            />
          ))}

          <div className="ml-auto z-50">
            <DropdownMenu />
          </div>
        </nav>

        <main
          className={
            !shouldFloat
              ? 'flex flex-1 overflow-hidden relative mt-3 h-screen'
              : ''
          }
        >
          <CustomEditor language={selectedTab} className="absolute inset-0" />
        </main>
      </div>

      <Preview isFloating={shouldFloat} />
    </motion.div>
  )
}
