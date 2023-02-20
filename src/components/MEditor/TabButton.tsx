import classNames from 'classnames'

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
      className={classNames(
        'bg-transparent border-0 text-zinc-100 text-xs outline-none py-1 px-2.5 cursor-pointer rounded hover:bg-white/10',
        {
          [`bg-white/20`]: tabName === selectedTab,
        },
      )}
    >
      {displayName}
    </button>
  )
}
