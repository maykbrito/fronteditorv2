import { useState, useCallback } from 'react'
import CustomEditor from '../CustomEditor'
import Preview from '../Preview'

import logoSvg from '../../assets/logo.svg'
import { Container, Editor } from './styles'
import { Tab, TabButton, TabButtonProps } from './TabButton'

interface MEditorProps {
  float: boolean
  logo?: boolean
  tabs?: TabButtonProps[] | null
}

export function MEditor({ tabs, logo, float }: MEditorProps) {
  const [selectedTab, setSelectedTab] = useState<Tab>('html')

  const isFloating = float || false
  const showLogo = logo || true

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

  const getClasses = useCallback(
    (editorName: string) => {
      return ['editor', selectedTab === editorName ? 'active' : ''].join(' ')
    },
    [selectedTab],
  )

  return (
    <Container $hasFloatingPreview={isFloating}>
      <Editor>
        <nav>
          {showLogo && <img src={logoSvg} alt="Logo" />}

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

        <main>
          <CustomEditor
            language={selectedTab}
            className={getClasses(selectedTab)}
          />
        </main>
      </Editor>

      <Preview isFloating={isFloating} />
    </Container>
  )
}
