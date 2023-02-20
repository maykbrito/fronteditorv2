import { useState } from 'react'
import CustomEditor from '../CustomEditor'
import Preview from '../Preview'

import { Tab, TabButton, TabButtonProps } from './TabButton'
import { motion } from 'framer-motion'
import { DropdownMenu } from '../DropdownMenu'

import logoSvg from '../../assets/logo.svg'
import classNames from 'classnames'

interface MEditorProps {
  shouldFloat: boolean
  isFullscreen: boolean
  showLogo?: boolean
  tabs?: TabButtonProps[] | null
}

export function MEditor({
  tabs,
  showLogo = true,
  shouldFloat = false,
  isFullscreen = false,
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
    <motion.div 
      className={classNames("w-screen h-screen overflow-hidden relative sm:flex grid", {
        [`grid-rows-2`]: !isFullscreen,
      })}>
      <div className={isFullscreen ? `hidden` : `w-full flex flex-col h-full`}>
        <nav className="flex items-center gap-1 py-1 px-0 sm:px-4 sm:py-2 bg-[#11111b]">
          {showLogo && (
            <a title="visit the open-source project" href="https://github.com/maykbrito/fronteditorv2" target="_blank" className="text-center px-4">
              <img src={logoSvg} className="inline" alt="Fronteditor Logo" />
            </a>
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
          className='flex flex-1 overflow-hidden relative mt-1 sm:mt-3 h-screen'
        >
          <CustomEditor language={selectedTab} className="absolute inset-0" />
        </main>
      </div>

      <Preview isFloating={shouldFloat} fullscreen={isFullscreen} />
    </motion.div>
  )
}
