import AssessmentIcon from '@mui/icons-material/Assessment'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import GroupIcon from '@mui/icons-material/Group'
import GroupsIcon from '@mui/icons-material/Groups'
import SettingsIcon from '@mui/icons-material/Settings'
import { Divider } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { ReactNode, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { evaluatorsRoutes, RoutesNames } from '../../../globals'
import { RootState } from '../../../redux/store'
import { Roles } from '../../../utils/types'

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
        insideName: 'Pitch',
        routeName: RoutesNames.pitchTeams,
      },
      {
        insideName: 'Canvas',
        routeName: RoutesNames.canvasTeams
      },
      {
        insideName: 'Expo Dlei',
        routeName: RoutesNames.expoDleiTeams
      },
      {
        insideName: 'Shark Tank',
        routeName: RoutesNames.sharkTankTeams,
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
        routeName: RoutesNames.students,
      },
      {
        insideName: 'Professores',
        routeName: RoutesNames.teachers,
      },
      {
        insideName: 'Avaliadores',
        routeName: RoutesNames.evaluators,
      },
      {
        insideName: 'Coordenadores',
        routeName: RoutesNames.coordinators,
      },
    ],
  },
  {
    outsideName: 'Relatórios',
    outsideIcon: <AssessmentIcon />,
    subItens: true,
    insideItems: [
      {
        insideName: 'Notas Gerais',
        routeName: RoutesNames.generalReport,
      },
      {
        insideName: 'Notas por Time',
        routeName: RoutesNames.teamsNotes,
      },
      {
        insideName: 'Classificação',
        routeName: RoutesNames.classification,
      },
      {
        insideName: 'TOP 5',
        routeName: RoutesNames.classificationTop5,
      },
      {
        insideName: 'Canvas',
        routeName: RoutesNames.classificationCanvas,
      },
      {
        insideName: 'Pitch',
        routeName: RoutesNames.classificationPitch,
      },
      {
        insideName: 'Shark Tank',
        routeName: RoutesNames.classificationSharkTank,
      },
      {
        insideName: 'Expo Dlei',
        routeName: RoutesNames.classificationExpoDlei,
      },
    ],
  },
  { divider: true },
  {
    outsideName: 'Configurações',
    routeName: RoutesNames.adminConfig,
    outsideIcon: <SettingsIcon />,
    subItens: false,
    // insideItems: [
    //   {
    //     insideName: 'Adicionar Aluno',
    //     routeName: `${RoutesNames.student}`,
    //   },
    //   {
    //     insideName: 'Adicionar Professor',
    //     routeName: `${RoutesNames.teacher}`,
    //   }
    // ]
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
    //controle de rotas nao configuradas
    if (!route) return
    // const regex = new RegExp(`^${route}(/\\d+)?$`) serve para considerar /:id 
    const regex = new RegExp(`^${route}(/.*)?$`)
    return regex.test(location.pathname)
  }


  const isOpen = open || isActive(props.routeName || '') || props.insideItems?.some(item => isActive(item.routeName))

  const listItemButtonClass = `p-4 ${isOpen ? 'bg-[#3C14A4] text-[#fefefe]' : 'hover:bg-[#9F8FD9] hover:text-white'}`

  return (
    <div className="">
      <ListItemButton className={listItemButtonClass} onClick={handleClick}>
        <ListItemIcon className={`${isOpen ? 'text-white' : 'text-inherit'}`}>{props.outsideIcon}</ListItemIcon>
        <ListItemText primary={props.outsideName} />
        {props.subItens && (isOpen ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.insideItems?.map((item, index) => {
            const insideItemClass = `p-2 px-6 ${isActive(item.routeName) ? 'bg-[#9F8FD9] text-white' : 'hover:bg-[#9F8FD9] hover:text-white'}`
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
  const userGlobalState = useSelector((state: RootState) => state.userInfo)
  const coordinator = [Roles.Coordenador].includes(userGlobalState.enumRole!)
  const evaluator = [Roles.Avaliador].includes(userGlobalState.enumRole!)

  const avaliacaoItems = userGlobalState?.tipoAvaliacaoList!
    .map((tipo: string) => evaluatorsRoutes[tipo])
    .filter(Boolean)

  let menuEvaluator = [
    {
      outsideName: "Avaliações",
      outsideIcon: <AssignmentTurnedInIcon />,
      subItens: true,
      insideItems: avaliacaoItems, // Adiciona os itens gerados dinamicamente
    },
  ];

  const filteredMenuItems = coordinator
    ? menuItems.filter((item) =>
      "outsideName" in item &&
      ["Times", "Participantes"].includes(item.outsideName)
    )
    : menuItems;

  const handleMenuItemClick = (routeName: string) => {
    navigate(routeName)
  }

  return (
    <div>
      <List sx={{ width: '100%', maxWidth: 360, }} component="nav">
        {evaluator ? menuEvaluator.map((menuItem, index) => {
          if ('divider' in menuItem && menuItem.divider) {
            return <Divider key={index+1} color="white" variant='middle' />
          }
          const itemProps = menuItem as MenuItemProps
          return <Item key={index} {...itemProps} onClick={handleMenuItemClick} />
        }) : filteredMenuItems.map((menuItem, index) => {
          if ('divider' in menuItem && menuItem.divider) {
            return <Divider key={index+2} color="white" variant='middle' />
          }
          const itemProps = menuItem as MenuItemProps
          return <Item key={index} {...itemProps} onClick={handleMenuItemClick} />
        })}
      </List>
    </div>

  )
}
