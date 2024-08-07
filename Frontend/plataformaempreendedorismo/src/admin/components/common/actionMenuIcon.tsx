import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import LeaderIcon from '@mui/icons-material/Person'
import ViceLeaderIcon from '@mui/icons-material/PersonOutline'
import MemberIcon from '@mui/icons-material/Group'
import ViewIcon from '@mui/icons-material/Visibility'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { MouseEvent, useState } from 'react'

interface ActionMenuProps {
  onEdit?: () => void
  onRemove?: () => void
  onPromoteLeader?: () => void
  onPromoteViceLeader?: () => void
  onPromoteMember?: () => void
  onView?: () => void
}

export const ActionMenu = ({ onEdit, onRemove, onPromoteLeader, onPromoteViceLeader, onPromoteMember, onView }: ActionMenuProps) => {
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
        {onView && (
          <MenuItem onClick={() => { handleClose(); onView(); }}>
            <ViewIcon fontSize="small" />
            <span style={{ marginLeft: 8 }}>Visualizar</span>
          </MenuItem>
        )}
        {onEdit && (
          <MenuItem onClick={() => { handleClose(); onEdit(); }}>
            <EditIcon fontSize="small" />
            <span style={{ marginLeft: 8 }}>Editar</span>
          </MenuItem>
        )}
        {onRemove && (
          <MenuItem onClick={() => { handleClose(); onRemove(); }}>
            <DeleteIcon fontSize="small" />
            <span style={{ marginLeft: 8 }}>Remover</span>
          </MenuItem>
        )}
        {onPromoteLeader && (
          <MenuItem onClick={() => { handleClose(); onPromoteLeader(); }}>
            <LeaderIcon fontSize="small" />
            <span style={{ marginLeft: 8 }}>Promover Líder</span>
          </MenuItem>
        )}
        {onPromoteViceLeader && (
          <MenuItem onClick={() => { handleClose(); onPromoteViceLeader(); }}>
            <ViceLeaderIcon fontSize="small" />
            <span style={{ marginLeft: 8 }}>Promover Vice Líder</span>
          </MenuItem>
        )}
        {onPromoteMember && (
          <MenuItem onClick={() => { handleClose(); onPromoteMember(); }}>
            <MemberIcon fontSize="small" />
            <span style={{ marginLeft: 8 }}>Promover Membro</span>
          </MenuItem>
        )}
      </Menu>
    </>
  )
}
