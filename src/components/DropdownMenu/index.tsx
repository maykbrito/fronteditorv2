import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { GearIcon } from '@radix-ui/react-icons'
import { DownloadZip } from './download-zip'
import { SettingsModal } from './settings-modal'

export function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <GearIcon className="size-4 text-gray-100/60 hover:text-gray-100 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        <SettingsModal />
        <DropdownMenuSeparator />
        <DownloadZip />
        {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
        {/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
