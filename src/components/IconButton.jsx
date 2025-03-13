import React from 'react'
import Components from "../theme-ui/master-file";

const IconButton = (props) => {
  const Icon = Components.Icons[props?.icon]
  
  return (
    <Components.IconButton size='small'
      sx={{
        backgroundColor: "var(--color-indigo-dark)",
        color: '#fff',
        "&:hover": {
          backgroundColor: "var(--color-indigo-light)" /* hover:bg-indigo-500 */,
        },
      }}
      onClick={props?.onClick}
    >
      {Icon ? <Icon size={18} /> : null} {/* Prevents errors */}
    </Components.IconButton>
  )
}

export default IconButton
