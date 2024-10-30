import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { DownloadZip } from './download-zip'
import { GearIcon } from '@radix-ui/react-icons'

export function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <GearIcon className="size-4 text-gray-100/60 hover:text-gray-100 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        <DownloadZip />
        {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
        {/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
