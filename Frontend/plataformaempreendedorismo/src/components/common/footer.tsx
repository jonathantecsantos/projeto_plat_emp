interface FooterProps {
  username: string
}

export const Footer = ({ username }: FooterProps) => {
  return (
    <footer className="text-gray-600 flex justify-end items-center py-2 fixed w-screen  text-xs print:hidden">
      <div className="text-center px-2">
        {username} Online Version: {import.meta.env.VITE_APP_VERSION}
      </div>
    </footer>
  )
}
