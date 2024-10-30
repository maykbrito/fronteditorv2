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

import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/clerk-react";
import { User, UserRoundX } from 'lucide-react';

export function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <GearIcon className="size-4 text-gray-100/60 hover:text-gray-100 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <SignedIn>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
        </SignedIn>
        <DownloadZip />
        <SignedOut>
          <DropdownMenuItem>
            <User className='mr-1 size-4' />
            <SignInButton />
          </DropdownMenuItem>
        </SignedOut>

        <SignedIn>
          <DropdownMenuItem>
            <UserRoundX className='mr-1 size-4' />
            <SignOutButton />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
