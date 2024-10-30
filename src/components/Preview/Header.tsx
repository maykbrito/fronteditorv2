import { useToggle } from '../../hooks/useToggle'
import { Switch } from '../ui/switch'

interface HeaderProps {
  windowTitle?: string
  windowIcon?: string

  onLiveReloadToggle: (value: boolean) => void
}

export function Header({
  windowTitle = 'index.html',
  windowIcon = '',
  onLiveReloadToggle,
}: HeaderProps) {
  const [isLiveReloadEnabled, toggleLiveReload] = useToggle({
    initialValue: true,
    onChange: (value) => {
      onLiveReloadToggle(value)
    },
  })

  return (
    <header
      className='bg-zinc-100 w-full h-8 px-4 grid items-center relative'
    >
      <span
        className='text-sm text-zinc-400 justify-self-start flex items-center gap-2'
      >
        {windowIcon && (
          <img src={windowIcon} className='w-[16px] h-[16px] object-cover object-center' />
        )}
        {windowTitle}
      </span>

      <label
        title="Habilitar/desabilitar recarregamento automático"
        htmlFor="live-reload"
        className="hover:opacity-[1] opacity-[0.4] flex gap-2 absolute right-3 top-2 items-center">
        <span className="text-xs text-zinc-500 flex-1 flex justify-end cursor-pointer">Live reload?</span>
        <Switch
          id="live-reload"
          aria-label="Live reload"
          onCheckedChange={toggleLiveReload}
          checked={isLiveReloadEnabled}
          className="w-8 h-3 bg-zinc-500 rounded-full relative"
        />
      </label>
    </header>
  )
}
