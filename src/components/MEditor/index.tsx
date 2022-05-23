import { useState, useCallback, memo } from 'react';
import CustomEditor from '../CustomEditor';
import Preview from '../Preview';

import logoSvg from '../../assets/logo.svg';
import { Container, Editor } from './styles';

type SelectedTabsProps = 'html' | 'css' | 'javascript' | 'markdown';

type TabButtonProps = {
  tabName: SelectedTabsProps;
  displayName: string;
};

interface MEditorProps {
  float: boolean;
  logo?: boolean;
  tabs?: TabButtonProps[] | null;
}

export function MEditor({ tabs, logo, float }: MEditorProps): JSX.Element {
  const [tab, setTab] = useState<SelectedTabsProps>('html');

  const isFloating = float || false;
  const showLogo = logo || true;

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
  ];

  const getClasses = useCallback(
    (editorName: string) => {
      return ['editor', tab === editorName ? 'active' : ''].join(' ');
    },
    [tab]
  );

  const TabButton = memo(
    ({ tabName, displayName }: TabButtonProps): JSX.Element => (
      <button
        type="button"
        onClick={() => setTab(tabName)}
        className={tab === tabName ? 'active' : undefined}
      >
        {displayName}
      </button>
    )
  );

  return (
    <Container $hasFloatingPreview={isFloating}>
      <Editor>
        <nav>
          {showLogo && <img src={logoSvg} alt="Logo" />}

          {displayTabs.map(currentTab => (
            <TabButton
              key={currentTab.tabName}
              displayName={currentTab.displayName}
              tabName={currentTab.tabName}
            />
          ))}
        </nav>

        <main>
          <CustomEditor language={tab} className={getClasses(tab)} />
        </main>
      </Editor>

      <Preview isFloating={isFloating} />
    </Container>
  );
}
