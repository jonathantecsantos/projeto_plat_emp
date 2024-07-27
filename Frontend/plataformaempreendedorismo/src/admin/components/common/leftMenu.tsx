import AssessmentIcon from '@mui/icons-material/Assessment'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import BarChartIcon from '@mui/icons-material/BarChart'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DescriptionIcon from '@mui/icons-material/Description'
import EventIcon from '@mui/icons-material/Event'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import GroupIcon from '@mui/icons-material/Group'
import GroupsIcon from '@mui/icons-material/Groups'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import ListAltIcon from '@mui/icons-material/ListAlt'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import MicIcon from '@mui/icons-material/Mic'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import SchoolIcon from '@mui/icons-material/School'
import SettingsIcon from '@mui/icons-material/Settings'
import StorageIcon from '@mui/icons-material/Storage'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import { Divider } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { ReactNode, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RoutesNames } from '../../../globals'

interface MenuItemProps {
  outsideName: string
  outsideIcon: ReactNode
  routeName?: string
  subItens: boolean
  insideItems?: {
    insideName: string
    insideIcon?: ReactNode
    routeName: string
  }[]
}

interface DividerProps {
  divider: boolean
}

type MenuItemType = MenuItemProps | DividerProps

interface ItemProps extends MenuItemProps {
  onClick: (routeName: string) => void
}

const menuItems: MenuItemType[] = [
  {
    outsideIcon: <GroupsIcon />,
    outsideName: 'Times',
    subItens: false,
    routeName: RoutesNames.teams,
  },
  {
    outsideName: 'Importações',
    outsideIcon: <CloudUploadIcon />,
    subItens: false,
    routeName: RoutesNames.uploadFiles,
  },
  // { divider: true },
  {
    outsideName: 'Avaliações',
    outsideIcon: <AssignmentTurnedInIcon />,
    subItens: true,
    insideItems: [
      {
        insideName: 'DLJ',
        insideIcon: <AssignmentTurnedInIcon />,
        routeName: ''
      },
      {
        insideName: 'Pitch',
        insideIcon: <MicIcon />,
        routeName: '',
      },
      {
        insideName: 'Shark Tank',
        insideIcon: <AttachMoneyIcon />,
        routeName: '',
      },
      {
        insideName: 'Expo Dlei',
        insideIcon: <EventIcon />,
        routeName: ''
      }
    ]
  },
  {
    outsideName: 'Participantes',
    outsideIcon: <GroupIcon />,
    subItens: true,
    insideItems: [
      {
        insideName: 'Alunos',
        insideIcon: <SchoolIcon />,
        routeName: `${RoutesNames.students}`,
      },
      {
        insideName: 'Professores',
        insideIcon: <LocalLibraryIcon />,
        routeName: RoutesNames.teachers,
      },
      {
        insideName: 'Avaliadores',
        insideIcon: <HowToRegIcon />,
        routeName: '',
      },
      {
        insideName: 'Coordenadores',
        insideIcon: <SupervisorAccountIcon />,
        routeName: '',
      },
    ],
  },
  {
    outsideName: 'Repositório',
    outsideIcon: <StorageIcon />,
    subItens: false,
    routeName: `/${RoutesNames.repository}`,
  },
  {
    outsideName: 'Relatórios',
    outsideIcon: <AssessmentIcon />,
    subItens: true,
    insideItems: [
      {
        insideName: 'Classificação',
        insideIcon: <BarChartIcon />,
        routeName: '',
      },
      {
        insideName: 'Lista Assinatura',
        insideIcon: <ListAltIcon />,
        routeName: '',
      },
      {
        insideName: 'Ficha de Inscrição',
        insideIcon: <DescriptionIcon />,
        routeName: '',
      },
    ],
  },
  { divider: true },
  {
    outsideName: 'Configurações',
    outsideIcon: <SettingsIcon />,
    subItens: true,
    insideItems: [
      {
        insideName: 'Adicionar Aluno',
        insideIcon: <PersonAddIcon />,
        routeName: `${RoutesNames.student}`,
      },
      {
        insideName: 'Adicionar Professor',
        insideIcon: <PersonAddIcon />,
        routeName: `${RoutesNames.teacher}`,
      }
    ]
  },
]
const Item = (props: ItemProps) => {
  const location = useLocation()
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

  const isActive = (route: string) => {
    const regex = new RegExp(`^${route}(/\\d+)?$`)
    return regex.test(location.pathname)
  }


  const isOpen = open || isActive(props.routeName || '') || props.insideItems?.some(item => isActive(item.routeName))

  const listItemButtonClass = `p-4 ${isOpen ? 'bg-[#EBF6FF] text-[#242424]' : 'hover:bg-[#509CDB] hover:text-white'}`

  return (
    <div className="">
      <ListItemButton className={listItemButtonClass} onClick={handleClick}>
        <ListItemIcon sx={{ color: isOpen ? '' : 'inherit' }}>{props.outsideIcon}</ListItemIcon>
        <ListItemText primary={props.outsideName} />
        {props.subItens && (isOpen ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.insideItems?.map((item, index) => {
            const insideItemClass = `p-2 px-6 ${isActive(item.routeName) ? 'bg-[#509CDB] text-white' : 'hover:bg-[#509CDB] hover:text-white'}`
            return (
              <div key={`${item.routeName}-${index}`}>
                <ListItemButton
                  className={insideItemClass}
                  key={index}
                  onClick={() => handleInsideItemClick(item.routeName)}
                >
                  <ListItemIcon className={isActive(item.routeName) ? 'text-white' : 'text-inherit'}>{item.insideIcon}</ListItemIcon>
                  <ListItemText primary={item.insideName} className='' />
                </ListItemButton>
                {/* {index < props.insideItems!.length - 1 && <Divider color='white' />} */}
              </div>
            )
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
    <div>
      <List sx={{ width: '100%', maxWidth: 360, }} component="nav">
        {menuItems.map((menuItem, index) => {
          if ('divider' in menuItem && menuItem.divider) {
            return <Divider key={index} color="white" variant='middle' />
          }
          const itemProps = menuItem as MenuItemProps
          return <Item key={index} {...itemProps} onClick={handleMenuItemClick} />
        })}
      </List>
    </div>

  )
}
