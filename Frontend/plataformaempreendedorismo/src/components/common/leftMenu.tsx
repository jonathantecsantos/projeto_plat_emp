import AssessmentIcon from '@mui/icons-material/Assessment'
import ResultIcon from '@mui/icons-material/EmojiEvents'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import GradeIcon from '@mui/icons-material/Grade'
import GroupIcon from '@mui/icons-material/Group'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import StarIcon from '@mui/icons-material/Star'
import RepoIcon from '@mui/icons-material/Storage'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import { ReactNode, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RoutesNames } from '../../globals'

interface MenuItemProps {
  outsideName: string
  outsideIcon: ReactNode
  routeName?: string
  subItens: boolean
  insideItems?: {
    insideName: string
    insideIcon: ReactNode
    routeName: string
  }[]
}

interface ItemProps extends MenuItemProps {
  onClick: (routeName: string) => void
}

const menuItems: MenuItemProps[] = [
  {
    outsideIcon: <HomeIcon />,
    outsideName: 'Admin',
    subItens: false,
    routeName: `${RoutesNames.home}`
  },
  {
    outsideName: 'Importação',
    outsideIcon: <ImportExportIcon />,
    subItens: false,
    routeName: `${RoutesNames.uploadFiles}`,
  },
  // {
  //   outsideName: 'Alunos',
  //   outsideIcon: <GroupIcon />,
  //   subItens: false,
  //   routeName: `${RoutesNames.students}`,
  // },
  {
    outsideName: 'Times',
    outsideIcon: <GroupIcon />,
    subItens: true,
    insideItems: [{
      insideIcon: <GradeIcon />,
      insideName: 'Banner',
      routeName: `${RoutesNames.bannerPreview}`,
    },
    {
      insideIcon: <GradeIcon />,
      insideName: 'Alunos',
      routeName: `${RoutesNames.students}`,
    },
      {
        insideIcon: <GradeIcon />,
        insideName: 'Add Aluno',
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
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    if (props.routeName) {
      props.onClick(props.routeName)
    } else {
      setOpen(!open)
    }
  }

  const handleInsideItemClick = (routeName: string) => {
    props.onClick(routeName)
  }

  const isActive = props.routeName === location.pathname || props.insideItems?.some(item => item.routeName === location.pathname)
  const isOpen = open || isActive

  const listItemButtonClass = `p-4 ${isActive ? 'bg-[#EBF6FF] text-[#242424]' : 'hover:bg-[#509CDB] hover:text-white'}`;

  return (
    <div className=''>
      <ListItemButton className={listItemButtonClass} onClick={handleClick}>
        <ListItemIcon sx={{ color: isActive ? '' : 'inherit' }}>{props.outsideIcon}</ListItemIcon>
        <ListItemText primary={props.outsideName} />
        {props.subItens && (isOpen ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.insideItems?.map((item, index) => {
            const insideItemClass = `p-2 px-6 ${location.pathname === item.routeName ? 'bg-[#509CDB] text-white' : 'hover:bg-[#509CDB] hover:text-white'}`;
            return (
              <ListItemButton
                className={insideItemClass}
                key={index}
                onClick={() => handleInsideItemClick(item.routeName)}
              >
                <ListItemIcon className={location.pathname === item.routeName ? 'text-white' : 'text-inherit'}>{item.insideIcon}</ListItemIcon>
                <ListItemText primary={item.insideName} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </div>
  )
}

export const LeftMenuComponent = () => {
  const navigate = useNavigate()

  const handleMenuItemClick = (routeName: string) => {
    navigate(routeName)
  }

  return (
    <List sx={{ width: '100%', maxWidth: 360, }} component="nav">
      {menuItems.map((menuItem, index) => (
        <Item key={index} {...menuItem} onClick={handleMenuItemClick} />
      ))}
    </List>
  )
}
