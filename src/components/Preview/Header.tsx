import classNames from 'classnames'
import { X, Minus, CornersOut, ArrowsCounterClockwise } from 'phosphor-react'
import { PointerEvent } from 'react'
import { useToggle } from '../../hooks/useToggle'
import { HeaderButton } from './HeaderButton'

export type WindowState = 'minimized' | 'maximized' | 'closed'

interface HeaderProps {
  isFloating: boolean
  isFullscreen: boolean
  canBeDraggable: boolean
  windowTitle?: string
  windowIcon?: string

  onDragStart: (event: PointerEvent) => void
  onWindowStateChanged: (state: WindowState) => void
  onLiveReloadToggle: (value: boolean) => void
}

export function Header({
  isFloating,
  canBeDraggable,
  windowTitle = 'index.html',
  windowIcon = '',
  onDragStart,
  onWindowStateChanged,
  onLiveReloadToggle,
  isFullscreen = false,
}: HeaderProps) {
  const [isLiveReloadEnabled, toggleLiveReload] = useToggle({
    initialValue: true,
    onChange: (value) => {
      onLiveReloadToggle(value)
    },
  })

  const activationTitleLiveReload = isLiveReloadEnabled ? 'Desabilitar' : 'Habilitar'

  return (
    <header
      className={classNames('bg-zinc-100 w-full h-8 px-4 grid items-center relative', {
        [`grid-cols-floatingPreviewHeader`]: isFloating,
        [`cursor-move`]: canBeDraggable,
        [`hidden`]: isFullscreen,
      })}
      onPointerDown={canBeDraggable ? onDragStart : undefined}
    >
      {isFloating && (
        <div className="flex items-center gap-2 h-8">
          <HeaderButton
            onClick={() => onWindowStateChanged('closed')}
            className="hover:bg-red-500"
            title="Fechar"
          >
            <X
              weight="bold"
              className="w-2 h-2 invisible group-hover:visible"
            />
          </HeaderButton>
          <HeaderButton
            onClick={() => onWindowStateChanged('minimized')}
            className="hover:bg-yellow-400"
            title="Minimizar"
          >
            <Minus
              weight="bold"
              className="w-2 h-2 invisible group-hover:visible"
            />
          </HeaderButton>
          <HeaderButton
            onClick={() => onWindowStateChanged('maximized')}
            className="hover:bg-green-400"
            title="Maximizar"
          >
            <CornersOut
              weight="bold"
              className="w-2 h-2 invisible group-hover:visible"
            />
          </HeaderButton>
        </div>
      )}

      <span
        className={classNames('text-sm text-zinc-400 justify-self-start flex items-center gap-2', {
          [`justify-self-center`]: isFloating,
        })}
      >
        {windowIcon && (
          <img src={windowIcon} className='w-[16px] h-[16px] object-cover object-center' />
        )}
        {windowTitle}
      </span>

      <label
        title={`${activationTitleLiveReload} recarregamento automático`}
        htmlFor="live-reload"
        className="hover:opacity-[1] opacity-[0.4] flex gap-2 absolute right-3 top-2 items-center select-none"
      >
        <span className="text-xs text-zinc-500 flex-1 flex justify-end cursor-pointer">{`${activationTitleLiveReload} live reload?`}</span>
        <input
          className="hidden"
          id="live-reload"
          type="checkbox"
          onChange={() => toggleLiveReload()}
          checked={isLiveReloadEnabled}
        />
        <span className="grid place-items-center">
          <ArrowsCounterClockwise size={18} />
          <span className={classNames(
            "absolute -right-0 top-0 size-1.5 rounded-full bg-red-600", {
            hidden: !isLiveReloadEnabled
          })}>
            <span className="absolute size-full rounded-full bg-red-600 animate-ping"></span>
          </span>
        </span>
      </label>
    </header >
  )
}
