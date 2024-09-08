import React from 'react'

type Props = {
  name: string;
}

export const SidebarItem = ({name}:Props) => {
  return (
    <p className="text-[#3a3a3a] text-xs hover:bg-[#202020] font-bold p-2 rounded-sm mt-2 mx-3 uppercase">
        {name}
    </p>
  )
}