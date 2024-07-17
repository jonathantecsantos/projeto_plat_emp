import { useGetTeamByIdQuery } from "../../api/teamApi.slice";
import { Team } from "../../model/team";

export const TeamComponent = ({ id }: Pick<Team, 'id'>) => {
  const { data: team } = useGetTeamByIdQuery(id)
  return <p>{JSON.stringify(team, null, 4)}</p>
}