import { useState, useCallback } from 'react'
import CustomEditor from '../CustomEditor'
import Preview from '../Preview'

import logoSvg from '../../assets/logo.svg'
import { Container, Editor, Tabs } from './styles'
import { Tab, TabButton, TabButtonProps } from './TabButton'

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

  const getClasses = useCallback(
    (editorName: string) => {
      return ['editor', selectedTab === editorName ? 'active' : ''].join(' ')
    },
    [selectedTab],
  )

  return (
    <Container $hasFloatingPreview={shouldFloat}>
      <Editor>
        <Tabs $hasLogo={showLogo}>
          {showLogo && (
            <div className="logo-container">
              <img src={logoSvg} alt="Logo" />
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
        </Tabs>

        <main>
          <CustomEditor
            language={selectedTab}
            className={getClasses(selectedTab)}
          />
        </main>
      </Editor>

      <Preview isFloating={shouldFloat} />
    </Container>
  )
}
