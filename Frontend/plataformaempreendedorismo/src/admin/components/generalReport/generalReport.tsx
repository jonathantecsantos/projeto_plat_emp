import { useSearchParams } from "react-router-dom"
import { useGetTeamsReportItemsQuery, useGetTeamsReportsQuery } from "../../../api/studentApi"
import { GeneralTableComponent } from "./generalTable"
import { useMemo } from "react"
import { AdminHeader } from "../common/adminHeader"

export const GeneralReportComponent = () => {
  const { data: generalReport } = useGetTeamsReportsQuery()
  const { data: generalReportItems } = useGetTeamsReportItemsQuery()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || ''


  const createTableData = () => {
    if (!generalReport || !generalReportItems) return { tableRows: [], teams: [] }

    // Ordenar os itens de subcritério
    const sortedReport = [...generalReportItems].sort((a, b) => a.ordemRelatorio - b.ordemRelatorio)

    // Captura todas as equipes presentes no relatório
    const uniqueTeams = Array.from(new Set(generalReport.map(item => item.equipe)))

    const tableRows = sortedReport.map((subcriterio) => {
      const relatedItems = generalReport.filter(item => item.idSubcriterio === subcriterio.idSubcriterio)

      // Cria uma linha para cada subcritério, contendo as pontuações de todas as equipes
      const row = {
        criterio: subcriterio.descricaoCriterio,
        subcriterio: subcriterio.descricaoSubcriterio,
        scores: uniqueTeams.reduce((acc, team) => {
          const teamScore = relatedItems.find(item => item.equipe === team)
          acc[team] = { totalNota: teamScore ? teamScore.totalNota : '-' } // Substitui por 'Sem nota' caso não haja pontuação
          return acc
        }, {} as Record<string, { totalNota: string | number }>)
      }

      return row
    })

    return { tableRows, teams: uniqueTeams }
  }

  const { tableRows, teams } = createTableData()

  const columns = ['Critério', 'Subcritério', ...teams]

  const filteredRows = useMemo(() => {
    return tableRows.filter(row =>
      row.criterio.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [tableRows, searchTerm])

  const handleSearch = (query: string) => {
    setSearchParams({ search: query })
  }

  return <div className="flex flex-col h-full">
    <div className="sticky top-0 z-10">
      <AdminHeader
        onSearch={handleSearch}
        placeholder='Pesquisar por critério'
      />
    </div>
    <div className="flex-1 overflow-auto">
      <GeneralTableComponent
        columns={columns}
        bodyList={filteredRows}
        teams={teams}
      />
    </div>
  </div>
}