// BreadcrumbComponent.tsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { styled } from '@mui/material'
import { IoMdHome as HomeIcon } from 'react-icons/io'
import { MdOutlineArrowForwardIos as DividerIcon } from 'react-icons/md'
import { RoutesNames } from '../../globals'
import useReactRouterBreadcrumbs from 'use-react-router-breadcrumbs'
import { ArrayUtils } from 'essencials'

// STYLE
const breadcrumbAlignItem: React.CSSProperties = { display: 'flex', alignSelf: 'center' }
const breadcrumbLinkDecoration: React.CSSProperties = { textDecoration: 'none', color: '#166CC8' }
const colorUnlink: React.CSSProperties = { color: '#606060' }

const BreadcrumbWrapperStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  paddingBlock: 10,
  paddingInline: 10,
  boxSizing: 'border-box',
  [theme.breakpoints.up('sm')]: {
    paddingInline: 20,
  }
}))

const routes = [
  {
    path: RoutesNames.home,
    breadcrumb: 'Página inicial'
  },
  {
    path: RoutesNames.students,
    breadcrumb: 'Alunos',
    children: [
      {
        path: RoutesNames.student,
        breadcrumb: 'Aluno'
      }
    ]
  },
  {
    path: RoutesNames.bannerPreview,
    breadcrumb: 'Banner Preview'
  },
  {
    path: RoutesNames.teachers,
    breadcrumb: 'Professores'
  },
  {
    path: RoutesNames.teams,
    breadcrumb: 'Times',
    children: [
      {
        path: RoutesNames.team,
        breadcrumb: 'Time'
      }
    ]
  }
]


export const BreadcrumbComponent = (props: {
  props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
}) => {
  const location = useLocation()
  const breadcrumbs = useReactRouterBreadcrumbs(routes)
  const unLink = [
    '/z',
    '/blabla'
  ]

  return (
    <BreadcrumbWrapperStyled {...props.props}>
      {breadcrumbs.map((args, index) => {
        return <React.Fragment key={index}>
          {/* HOME */}
          {args.match.pathname == RoutesNames.home ?
            <Link style={breadcrumbAlignItem} to={args.match.pathname}>
              <HomeIcon style={{ ...breadcrumbAlignItem, color: '#166CC8', marginRight: 5 }} />
            </Link> : null}

          <span style={{ ...breadcrumbAlignItem }}>
            {/* ARROW DIVIDER */}
            {args.match.pathname != RoutesNames.home ?
              <DividerIcon style={{ ...breadcrumbAlignItem, margin: '0px 5px 0px 5px', color: '#505050' }} /> : null}

            {/* PATH/ROUTES NAMES */}
            {args.match.params.id == ':id' ? 'Novo' : location.pathname == args.match.pathname ?
              <div style={colorUnlink}> {args.breadcrumb} {args.match.params.id}</div> :
              ArrayUtils.checkEqualsFromArrays([args.match.pathname], unLink) ?
                <div style={colorUnlink}>{args.match.route?.breadcrumb as string}</div> :
                <Link style={breadcrumbLinkDecoration} to={args.match.pathname}>{args.breadcrumb}</Link>}
          </span>
        </React.Fragment>
      })}
    </BreadcrumbWrapperStyled>
  )
}
