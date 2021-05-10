import { useState, useCallback } from 'react';
import CustomEditor from '../CustomEditor';

import logoSvg from '../../assets/logo.svg';

type SelectedTabsProps = 'html' | 'css' | 'javascript' | 'markdown';

type TabButtonProps = {
  tabName: SelectedTabsProps;
  displayName: string;
};

export function MEditor(): JSX.Element {
  const [tab, setTab] = useState<SelectedTabsProps>('html');

  const getClasses = useCallback(
    (editorName: string) => {
      return ['editor', tab === editorName ? 'active' : ''].join(' ');
    },
    [tab]
  );

  const TabButton = ({ tabName, displayName }: TabButtonProps): JSX.Element => (
    <button
      type="button"
      onClick={() => setTab(tabName)}
      className={tab === tabName ? 'active' : undefined}
    >
      {displayName}
    </button>
  );

  return (
    <>
      <nav>
        <img src={logoSvg} alt="Logo" />
        <TabButton displayName="HTML" tabName="html" />
        <TabButton displayName="CSS" tabName="css" />
        <TabButton displayName="JS" tabName="javascript" />
        <TabButton displayName="MARKDOWN" tabName="markdown" />
      </nav>
      <main>
        <CustomEditor language="html" className={getClasses('html')} />
        <CustomEditor language="css" className={getClasses('css')} />
        <CustomEditor
          language="javascript"
          className={getClasses('javascript')}
        />
        <CustomEditor language="markdown" className={getClasses('markdown')} />
      </main>
    </>
  );
}
