import {
  useState,
  useCallback,
  memo,
  useRef,
  ReactNode,
  RefObject,
  useContext,
  createContext,
} from 'react';
import CustomEditor from '../CustomEditor';
import Preview from '../Preview';
import { Dragger } from '../Preview/dragger';

import logoSvg from '../../assets/logo.svg';
import { Container } from './styles';

/** TYPES */
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

interface MEditorContextProviderProps {
  children: ReactNode;
}

interface MEditorContentContextData {
  mEditorRef: RefObject<HTMLDivElement>;
}

export const MEditorContentContext = createContext(
  {} as MEditorContentContextData
);

export function MEditorContentContextProvider({
  children,
}: MEditorContextProviderProps) {
  const mEditorRef = useRef<HTMLDivElement>(null);
  console.log(mEditorRef);

  return (
    <MEditorContentContext.Provider value={{ mEditorRef }}>
      {children}
    </MEditorContentContext.Provider>
  );
}

export function MEditor({ tabs, logo, float }: MEditorProps): JSX.Element {
  const { mEditorRef } = useContext(MEditorContentContext);

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
    <MEditorContentContextProvider>
      <Container ref={mEditorRef} className={isFloating ? '' : 'fixed-right'}>
        <div>
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
        </div>

        <Preview />
      </Container>
    </MEditorContentContextProvider>
  );
}
