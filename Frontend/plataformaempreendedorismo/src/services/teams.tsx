import {
  useGetTeamsQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useCreateTeamMutation,
  useGetTeamQuery,
} from '../api/teamApi.slice';
import { Team } from '../model/team';

export const TeamApiService = () => {

  const [createTeam, { isLoading: isCreating, isError: createError, data: createData }] = useCreateTeamMutation();
  const [updateTeam, { isLoading: isUpdating, isError: updateError, data: updateData }] = useUpdateTeamMutation();
  const [deleteTeam, { isLoading: isDeleting, isError: deleteError, data: deleteData }] = useDeleteTeamMutation();

  const { data: teams, isLoading: isFetching, isError: fetchError } = useGetTeamsQuery();

  const getTeamById = (id: number) => {
    const { data: team, isLoading: isFetchingStudent, isError: fetchTeamError } = useGetTeamQuery(id)
    return { team, isFetchingStudent, fetchTeamError }
  }

  // const getTeamById = async (id: number) => {
  //   try {
  //     const { data: student } = await useGetTeamQuery(id);
  //     return { student, isFetchingTeam: false, fetchTeamError: null }; // Simples exemplo, ajuste conforme necessário
  //   } catch (error) {
  //     console.error('Erro ao buscar estudante:', error);
  //     return { student: null, isFetchingTeam: false, fetchTeamError: error };
  //   }
  // };

  const create = async (data: Team) => {
    try {
      const result = await createTeam(data).unwrap();
      return result;
    } catch (error) {
      console.error('TeamApiService => Error creating Team:', error);
      throw error;
    }
  };

  const update = async (id: any, data: Team) => {
    try {
      const result = await updateTeam({ id, data }).unwrap();
      return result;
    } catch (error) {
      console.error('TeamApiService => Error updating Team:', error);
      throw error;
    }
  };

  const deleteUser = async (id: any) => {
    try {
      await deleteTeam(id).unwrap();
    } catch (error) {
      console.error('TeamApiService => Error deleting Team:', error);
      throw error;
    }
  };

  return {
    create,
    update,
    deleteUser,
    teams,
    getTeamById,
    isFetching,
    fetchError,
    isCreating,
    createError,
    createData,
    isUpdating,
    updateError,
    updateData,
    isDeleting,
    deleteError,
    deleteData,
  };
};
