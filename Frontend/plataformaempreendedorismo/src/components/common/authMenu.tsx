import AssessmentIcon from '@mui/icons-material/Assessment'
import ClassIcon from '@mui/icons-material/Class'
import ResultIcon from '@mui/icons-material/EmojiEvents'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import GroupIcon from '@mui/icons-material/Group'
import GroupsIcon from '@mui/icons-material/Groups'
import HomeIcon from '@mui/icons-material/Home'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import SettingsIcon from '@mui/icons-material/Settings'
import StarIcon from '@mui/icons-material/Star'
import RepoIcon from '@mui/icons-material/Storage'
import { Collapse, IconButton, List, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import React, { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { RoutesNames } from '../../globals'

interface MenuItemProps {
  outsideName: string,
  outsideIcon: ReactNode,
  routeName?: string,
  subItens: boolean,
  insideItems?: {
    insideName: string,
    insideIcon: ReactNode,
    routeName: string,
  }[],
}

interface ItemProps extends MenuItemProps {
  onClick: (routeName: string,) => void,
}

const menuItems: MenuItemProps[] = [
  {
    outsideIcon: <HomeIcon />,
    outsideName: 'Admin',
    subItens: false,
    routeName: `${RoutesNames.adminHome}`
  },
  {
    outsideName: 'Importações',
    outsideIcon: <ImportExportIcon />,
    subItens: false,
    routeName: `${RoutesNames.uploadFiles}`,
  },
  {
    outsideName: 'Times',
    outsideIcon: <GroupIcon />,
    subItens: true,
    insideItems: [{
      insideIcon: <ClassIcon />,
      insideName: 'Banner',
      routeName: `${RoutesNames.bannerPreview}`,
    },
    {
      insideIcon: <GroupsIcon />,
      insideName: 'Alunos',
      routeName: `${RoutesNames.students}`,
    },
    {
      insideIcon: <PersonAddAlt1Icon />,
      insideName: 'Aluno',
      routeName: `${RoutesNames.createStudent}`,
    },
    ],
  },
  {
    outsideName: 'Repositório',
    outsideIcon: <RepoIcon />,
    subItens: false,
    routeName: `/${RoutesNames.repository}`,
  },
  {
    outsideName: 'Avaliação',
    outsideIcon: <AssessmentIcon />,
    subItens: true,
    insideItems: [
      {
        insideName: 'Avaliar',
        insideIcon: <StarIcon />,
        routeName: `${''}`,
      },
      {
        insideName: 'Classificação',
        insideIcon: <LeaderboardIcon />,
        routeName: `${''}`,
      },
      {
        insideName: 'Res. Final',
        insideIcon: <ResultIcon />,
        routeName: `${''}`,
      },
    ],
  },
]

const Item = (props: ItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    if (props.routeName) {
      props.onClick(props.routeName)
    } else {
      setIsOpen(!isOpen)
    }
  }

  const handleInsideItemClick = (routeName: string) => {
    props.onClick(routeName)
  }

  return (
    <div className=''>
      <MenuItem onClick={handleClick}>
        <ListItemIcon>{props.outsideIcon}</ListItemIcon>
        <ListItemText primary={props.outsideName} />
        {props.subItens && (isOpen ? <ExpandLess /> : <ExpandMore />)}
      </MenuItem>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.insideItems?.map((item, index) => (
            <MenuItem sx={{ pl: 2, }} key={index} onClick={() => handleInsideItemClick(item.routeName)}>
              <ListItemIcon>{item.insideIcon}</ListItemIcon>
              <ListItemText primary={item.insideName} />
            </MenuItem>
          ))}
        </List>
      </Collapse>
    </div>
  )
}

export const AuthMenuComponent = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = (routeName: string) => {
    navigate(routeName)
    handleClose()
  }

  const open = Boolean(anchorEl)

  return (
    <div>
      <IconButton
        aria-label="configurações"
        aria-controls={open ? 'auth-menu' : undefined}
        aria-haspopup="listbox"
        onClick={handleClick}
        className='mx-4'
      >
        <SettingsIcon style={{ color: '#cecece',  }} />
      </IconButton>
      <Menu
        id="auth-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {menuItems.map((menuItem, index) => (
          <Item
            key={index}
            {...menuItem}
            onClick={handleMenuItemClick}
          />
        ))}
      </Menu>
    </div>
  )
}

