import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function HeaderButton(props: HeaderButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className={classNames([
        'w-3 h-3 bg-zinc-400 border-0 rounded-full cursor-pointer flex items-center justify-center text-black/50 leading-[0] group',
        props.className,
      ])}
    />
  )
}
