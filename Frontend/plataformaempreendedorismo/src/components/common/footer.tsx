interface FooterProps {
  username: string
}

export const Footer = ({ username }: FooterProps) => {
  return (
    <footer className="text-gray-400 flex justify-start items-center py-2 w-full text-[10px] print:hidden">
      <div className="text-center px-2 ">
        {username} Online Version: {import.meta.env.VITE_APP_VERSION}
      </div>
    </footer>
  )
}
