interface StudentSettingsProps {
  email?: string
}

export const StudentSettings = ({ email }: StudentSettingsProps) => {
  return <div>
    <p>studentsPage useremail - {email}</p>
  </div>
}