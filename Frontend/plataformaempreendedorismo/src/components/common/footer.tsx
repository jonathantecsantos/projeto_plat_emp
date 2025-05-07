
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 px-4 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:text-start text-center  mb-4 md:mb-0">
            <h2 className="text-xl font-bold">JW Softwares</h2>
            <p className="text-gray-400 mt-2">Soluções digitais, impacto real.</p>
            {/* <p className="text-gray-400 mt-2">Potencializando o ensino com inovação sob medida.</p> */}
          </div>

          <div className="flex space-x-6">
            <a href="/termos" className="hover:text-gray-300 transition-colors">Termos de Serviço</a>
            <a href="/privacidade" className="hover:text-gray-300 transition-colors">Política de Privacidade</a>
            <a href="/contato" className="hover:text-gray-300 transition-colors">Contato</a>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400">
          <p>© {currentYear} JW Softwares. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">Site seguro</p>
        </div>
      </div>
    </footer>
  )
}

export const Footer2 = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} JW Softwares. Todos os direitos reservados.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="/politica-de-privacidade" className="text-sm hover:underline">Privacidade</a>
          <a href="/termos-de-uso" className="text-sm hover:underline">Termos</a>
        </div>
      </div>
    </footer>
  );
};

