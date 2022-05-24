import { useCallback, useState } from 'react'

type UseToggleParams = {
  initialValue?: boolean
  onChange?: (value: boolean) => void
}

export function useToggle({ initialValue = false, onChange }: UseToggleParams) {
  const [isEnabled, setIsEnabled] = useState(initialValue)

  const toggle = useCallback(() => {
    setIsEnabled((state) => {
      if (onChange) {
        onChange(!state)
      }

      return !state
    })
  }, [onChange])

  return [isEnabled, toggle] as const
}
