export type Tab = 'html' | 'css' | 'javascript' | 'markdown'

export type TabButtonProps = {
  tabName: Tab
  displayName: string
  selectedTab: Tab
  onSelectTab: (tab: Tab) => void
}

export function TabButton({
  tabName,
  displayName,
  selectedTab,
  onSelectTab,
}: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelectTab(tabName)}
      className={selectedTab === tabName ? 'active' : undefined}
    >
      {displayName}
    </button>
  )
}
