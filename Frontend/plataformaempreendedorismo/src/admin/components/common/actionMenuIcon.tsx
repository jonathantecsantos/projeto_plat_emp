import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MouseEvent, useState } from 'react'

interface ActionMenuProps {
  onEdit: () => void
  onRemove: () => void
  onDetails: () => void
  onPromoteLeader: () => void
  onPromoteViceLeader: () => void
  onPromoteMember: () => void
}

export const ActionMenu = ({ onEdit, onRemove, onDetails, onPromoteLeader,
  onPromoteViceLeader, onPromoteMember }: ActionMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={handleClick} className='hover:text-white text-[#cecece] absolute right-0 top-1 mx-1'>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => { handleClose(), onEdit() }}>Editar</MenuItem>
        <MenuItem onClick={() => { handleClose(), onRemove() }}>Remover</MenuItem>
        <MenuItem onClick={() => { handleClose(), onDetails() }}>Detalhes</MenuItem>
        <MenuItem onClick={() => { handleClose(), onPromoteLeader() }}>Promover Líder</MenuItem>
        <MenuItem onClick={() => { handleClose(), onPromoteViceLeader() }}>Promover Vice Líder</MenuItem>
        <MenuItem onClick={() => { handleClose(), onPromoteMember() }}>Promover Membro</MenuItem>
      </Menu>
    </>
  )
}