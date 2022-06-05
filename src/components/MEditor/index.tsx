import { useState } from 'react'
import CustomEditor from '../CustomEditor'
import Preview from '../Preview'

import { Tab, TabButton, TabButtonProps } from './TabButton'
import { motion } from 'framer-motion'
import classNames from 'classnames'
import { DropdownMenu } from '../DropdownMenu'

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
        <nav
          className={classNames('flex items-center gap-1 py-2 bg-[#13111b]', {
            [`pl-8`]: !showLogo,
          })}
        >
          {showLogo && (
            <div className="w-32 text-center z-50">
              <DropdownMenu />
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
