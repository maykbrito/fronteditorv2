import classNames from 'classnames'
import { X, Minus, CornersOut } from 'phosphor-react'
import { PointerEvent } from 'react'
import { useToggle } from '../../hooks/useToggle'
import { HeaderButton } from './HeaderButton'

export type WindowState = 'minimized' | 'maximized' | 'closed'

interface HeaderProps {
  isFloating: boolean
  canBeDraggable: boolean
  windowTitle?: string

  onDragStart: (event: PointerEvent) => void
  onWindowStateChanged: (state: WindowState) => void
  onLiveReloadToggle: (value: boolean) => void
}

export function Header({
  isFloating,
  canBeDraggable,
  windowTitle = 'index.html',
  onDragStart,
  onWindowStateChanged,
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
      className={classNames('bg-zinc-100 w-full h-8 px-4 grid items-center', {
        [`grid-cols-floatingPreviewHeader`]: isFloating,
        [`grid-cols-previewHeader`]: !isFloating,
        [`cursor-move`]: canBeDraggable,
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
        className={classNames('text-sm text-zinc-400 justify-self-center', {
          [`justify-self-start`]: !isFloating,
        })}
      >
        {windowTitle}
      </span>

      <div className="text-sm text-zinc-400 flex items-center gap-2">
        <span>Live reload?</span>
        <input
          type="checkbox"
          title="Habilitar/desabilitar recarregamento automático"
          onChange={() => toggleLiveReload()}
          checked={isLiveReloadEnabled}
        />
      </div>
    </header>
  )
}
