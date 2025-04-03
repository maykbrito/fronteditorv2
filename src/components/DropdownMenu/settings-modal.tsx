import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { RotateCcw, Settings } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DropdownMenuItem } from '../ui/dropdown-menu'

type EditorSettings = {
  hideTabs: string[]
  logo: boolean
  previewOnly: boolean
  vertical: boolean
  editorOnly: boolean
  reverse: boolean
  theme: 'custom-theme' | 'vs' | 'vs-dark'
  lineNumbers: 'on' | 'off'
}

const SETTINGS_STORAGE_KEY = 'fronteditor:settings'

const defaultSettings: EditorSettings = {
  hideTabs: [],
  logo: true,
  previewOnly: false,
  vertical: false,
  editorOnly: false,
  reverse: false,
  theme: 'custom-theme',
  lineNumbers: 'on',
}

const saveSettings = (settings: EditorSettings) => {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
}

const getSettings = (): EditorSettings => {
  const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY)
  return storedSettings ? JSON.parse(storedSettings) : defaultSettings
}

const applySettingsToURL = (settings: EditorSettings) => {
  const url = new URL(window.location.href)
  url.search = ''

  if (settings.hideTabs.length > 0) {
    url.searchParams.set('hideTabs', settings.hideTabs.join(','))
  }

  if (!settings.logo) {
    url.searchParams.set('logo', 'false')
  }

  if (settings.previewOnly) {
    url.searchParams.set('previewOnly', 'true')
  }

  if (settings.vertical) {
    url.searchParams.set('vertical', 'true')
  }

  if (settings.editorOnly) {
    url.searchParams.set('editorOnly', 'true')
  }

  if (settings.reverse) {
    url.searchParams.set('reverse', 'true')
  }

  if (settings.theme && settings.theme !== 'custom-theme') {
    url.searchParams.set('theme', settings.theme)
  }

  if (settings.lineNumbers && settings.lineNumbers !== 'on') {
    url.searchParams.set('lineNumbers', settings.lineNumbers)
  }

  return url.toString()
}

export function SettingsModal() {
  const { t, i18n } = useTranslation()

  const [settings, setSettings] = useState<EditorSettings>(getSettings())
  const [open, setOpen] = useState(false)

  const handleToggle = (key: keyof EditorSettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }))
  }

  const handleSelectChange = (key: keyof EditorSettings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleTabToggle = (tab: string) => {
    setSettings(prev => {
      const hideTabs = [...prev.hideTabs]
      const index = hideTabs.indexOf(tab)

      if (index >= 0) {
        hideTabs.splice(index, 1)
      } else {
        hideTabs.push(tab)
      }

      return {
        ...prev,
        hideTabs,
      }
    })
  }

  const handleReset = () => {
    setSettings(defaultSettings)
  }

  const handleSave = () => {
    saveSettings(settings)
    const newUrl = applySettingsToURL(settings)
    window.location.href = newUrl
    setOpen(false)
  }

  const isTabHidden = (tab: string) => {
    return settings.hideTabs.includes(tab)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={e => {
            e.preventDefault()
            setOpen(true)
          }}
        >
          <Settings className="mr-1 size-3" />
          {t('settingsModal.trigger')}
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('settingsModal.title')}</DialogTitle>
          <DialogDescription>
            {t('settingsModal.description')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 overflow-y-auto max-h-[60vh] pr-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">
              {t('settingsModal.visibleTabs')}
            </h3>
            <div className="flex flex-col gap-2">
              {['html', 'css', 'javascript', 'markdown'].map(tab => (
                <div key={tab} className="flex items-center space-x-2">
                  <Switch
                    id={`tab-${tab}`}
                    checked={!isTabHidden(tab)}
                    onCheckedChange={() => handleTabToggle(tab)}
                  />
                  <Label htmlFor={`tab-${tab}`}>
                    {t(`settingsModal.tabs.${tab}`)}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">
              {t('settingsModal.layoutOptions')}
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="logo"
                  checked={settings.logo}
                  onCheckedChange={() => handleToggle('logo')}
                />
                <Label htmlFor="logo">{t('settingsModal.showLogo')}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="previewOnly"
                  checked={settings.previewOnly}
                  onCheckedChange={() => handleToggle('previewOnly')}
                />
                <Label htmlFor="previewOnly">
                  {t('settingsModal.previewOnly')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="vertical"
                  checked={settings.vertical}
                  onCheckedChange={() => handleToggle('vertical')}
                />
                <Label htmlFor="vertical">
                  {t('settingsModal.verticalLayout')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="editorOnly"
                  checked={settings.editorOnly}
                  onCheckedChange={() => handleToggle('editorOnly')}
                />
                <Label htmlFor="editorOnly">
                  {t('settingsModal.editorOnly')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="reverse"
                  checked={settings.reverse}
                  onCheckedChange={() => handleToggle('reverse')}
                />
                <Label htmlFor="reverse">
                  {t('settingsModal.reverseLayout')}
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme">{t('settingsModal.themeLabel')}</Label>
            <Select
              value={settings.theme}
              onValueChange={value => handleSelectChange('theme', value)}
            >
              <SelectTrigger id="theme">
                <SelectValue
                  placeholder={t('settingsModal.themePlaceholder')}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom-theme">
                  {t('settingsModal.themes.omni')}
                </SelectItem>
                <SelectItem value="vs">
                  {t('settingsModal.themes.light')}
                </SelectItem>
                <SelectItem value="vs-dark">
                  {t('settingsModal.themes.dark')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lineNumbers">
              {t('settingsModal.lineNumbersLabel')}
            </Label>
            <Select
              value={settings.lineNumbers}
              onValueChange={value =>
                handleSelectChange('lineNumbers', value as 'on' | 'off')
              }
            >
              <SelectTrigger id="lineNumbers">
                <SelectValue
                  placeholder={t('settingsModal.lineNumbersPlaceholder')}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="on">
                  {t('settingsModal.lineNumbers.show')}
                </SelectItem>
                <SelectItem value="off">
                  {t('settingsModal.lineNumbers.hide')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">{t('settingsModal.languageLabel')}</Label>
            <Select
              value={i18n.language}
              onValueChange={lang => {
                if (lang) {
                  i18n.changeLanguage(lang)
                }
              }}
            >
              <SelectTrigger id="language">
                <SelectValue
                  placeholder={t('settingsModal.languagePlaceholder')}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">
                  {t('settingsModal.languages.en')}
                </SelectItem>
                <SelectItem value="pt-BR">
                  {t('settingsModal.languages.ptBR')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="gap-1">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-1"
          >
            <RotateCcw className="size-3" />
            {t('settingsModal.resetButton')}
          </Button>
          <Button onClick={handleSave}>{t('settingsModal.applyButton')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
