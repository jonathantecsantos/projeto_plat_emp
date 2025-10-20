import footer from '@assets/footer.png';
import header from '@assets/header.jpg';
import { Avatar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useGetBannerByIdQuery, useGetTeamByIdQuery } from "../../../api/studentApi";
import { Banner } from "../../../model/banner";
import { getImageUrl } from "../../../utils/types";


const formatTextWithDashes = (text?: string) => {
  if (!text) return null;

  const items = text.split('-').filter((item) => item.trim() !== ''); // Remove itens vazios

  // if (items.length <= 1) {
  //   return <p>{text}</p>; // Retorna o texto como está se não houver mais de um traço
  // }

  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <p key={index} className="break-words break-all">
          - {item.trim()}
        </p>
      ))}
    </div>
  );
};

// Função para formatar nome: retorna primeiro e último nome
const formatName = (fullName?: string) => {
  if (!fullName) return '';

  const nameParts = fullName.trim().split(' ').filter(part => part.length > 0);

  if (nameParts.length <= 1) {
    return fullName; // Se só tem um nome, retorna como está
  }

  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];

  return `${firstName} ${lastName}`;
};

// Função para formatar lista com pontuação correta
const formatNameList = (items: any[], getName: (item: any) => string) => {
  if (!items || items.length === 0) return null;

  return items.map((item, index) => {
    const isLast = index === items.length - 1;
    const punctuation = isLast ? '.' : ',';

    return (
      <span key={index} className="print:ml-1">
        {formatName(getName(item))}{punctuation}
      </span>
    );
  });
};


export const BannerPreviewComponent = ({ id, disableAutoPrint = false, forExport = false, scale = 1 }: Pick<Banner, 'id'> & { disableAutoPrint?: boolean; forExport?: boolean; scale?: number }) => {
  const bannerRef = useRef<HTMLDivElement>(null)
  const { data: banner, isFetching: isFetchingBanner } = useGetBannerByIdQuery(id)
  const { data: team, isFetching: isFetchingTeam } = useGetTeamByIdQuery(id)

  const [imagesLoaded, setImagesLoaded] = useState(false)

  const UPLOAD_FOLDER = import.meta.env.VITE_UPLOAD_FOLDER
  const API_URL = import.meta.env.VITE_API_URL

  const imageUrls = banner?.anexos
    ?.filter((anexo) => anexo.tipoAnexo !== "LOGOTIPO")
    ?.map((anexo) => getImageUrl(anexo.caminhoAnexo, UPLOAD_FOLDER, API_URL));

  const avatar = getImageUrl(banner?.anexos?.find((anexo) => anexo.tipoAnexo === "LOGOTIPO")?.caminhoAnexo || '',
    UPLOAD_FOLDER,
    API_URL
  );

  // Função auxiliar para escalar valores
  const s = (value: number) => value * scale;

  useEffect(() => {
    if (imageUrls && imageUrls.length > 0) {
      let loadedImages = 0;

      imageUrls.forEach((url) => {
        const img = new Image();
        img.src = url;
        img.crossOrigin = "anonymous"; // IMPORTANTE: permite capturar imagens cross-origin
        img.onload = () => {
          loadedImages++;
          if (loadedImages === imageUrls.length) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          loadedImages++;
          if (loadedImages === imageUrls.length) {
            setImagesLoaded(true);
          }
        };
      });
    } else {
      setImagesLoaded(true); // Se não há imagens, marca como carregado
    }
  }, [imageUrls])

  useEffect(() => {
    if (disableAutoPrint) return; // Não executa auto-print se desabilitado

    const handleAfterPrint = () => {
      window.close();
    };

    window.onafterprint = handleAfterPrint;

    if (!isFetchingBanner && !isFetchingTeam && banner && imagesLoaded) {
      window.print();
    }

    return () => {
      window.onafterprint = null;
    };
  }, [isFetchingBanner, isFetchingTeam, banner, team, imagesLoaded, disableAutoPrint])

  useEffect(() => {
    if (disableAutoPrint) return; // Não envia mensagem se auto-print está desabilitado

    if (!isFetchingBanner && !isFetchingTeam && banner && imagesLoaded) {
      // Notifica a janela principal que os dados estão prontos
      window.opener?.postMessage("ready-to-print", window.location.origin)
    }
  }, [isFetchingBanner, isFetchingTeam, banner, imagesLoaded, disableAutoPrint])

  console.log('Banner')

  // Estilos base com escala aplicada
  const baseStyles = scale !== 1 ? {
    width: `${s(994)}px`,
    fontSize: `${s(12)}px`,
    filter: 'none'
  } : (forExport ? { width: '994px', fontSize: '18px', filter: 'none' } : {});

  return (
    <div className="w-full h-full bg-[#fefefe] mx-auto relative 
    print:w-[994px] print:text-[12px] blur print:blur-none"
      style={baseStyles}
      ref={bannerRef}>
      {/* Adiciona um style tag para forçar os estilos de impressão quando forExport=true ou scale != 1 */}
      {(forExport || scale !== 1) && (
        <style dangerouslySetInnerHTML={{
          __html: `
          .print\\:h-\\[160px\\] { height: ${s(160)}px !important; }
          .print\\:h-\\[70px\\] { height: ${s(70)}px !important; }
          .print\\:h-\\[56px\\] { height: ${s(56)}px !important; }
          .print\\:h-\\[155px\\] { height: ${s(155)}px !important; }
          .print\\:h-\\[156px\\] { height: ${s(156)}px !important; }
          .print\\:h-\\[75px\\] { height: ${s(75)}px !important; }
          .print\\:h-\\[80px\\] { height: ${s(80)}px !important; }
          .print\\:h-\\[85px\\] { height: ${s(85)}px !important; }
          .print\\:h-\\[150px\\] { height: ${s(150)}px !important; }
          .print\\:h-\\[65px\\] { height: ${s(65)}px !important; }
          .print\\:h-\\[20px\\] { height: ${s(20)}px !important; }
          .print\\:h-11 { height: ${s(44)}px !important; }
          .print\\:h-16 { height: ${s(64)}px !important; }
          .print\\:h-24 { height: ${s(96)}px !important; }
          .print\\:w-\\[994px\\] { width: ${s(994)}px !important; }
          .print\\:w-\\[240px\\] { width: ${s(240)}px !important; }
          .print\\:w-\\[220px\\] { width: ${s(220)}px !important; }
          .print\\:w-\\[135px\\] { width: ${s(135)}px !important; }
          .print\\:w-\\[128px\\] { width: ${s(128)}px !important; }
          .print\\:w-\\[125px\\] { width: ${s(125)}px !important; }
          .print\\:w-\\[90px\\] { width: ${s(90)}px !important; }
          .print\\:w-\\[147px\\] { width: ${s(147)}px !important; }
          .print\\:w-\\[145px\\] { width: ${s(145)}px !important; }
          .print\\:w-\\[150px\\] { width: ${s(150)}px !important; }
          .print\\:w-\\[350px\\] { width: ${s(350)}px !important; }
          .print\\:w-\\[490px\\] { width: ${s(490)}px !important; }
          .print\\:w-14 { width: ${s(56)}px !important; }
          .print\\:px-4 { padding-left: ${s(16)}px !important; padding-right: ${s(16)}px !important; }
          .print\\:px-1 { padding-left: ${s(4)}px !important; padding-right: ${s(4)}px !important; }
          .print\\:px-2 { padding-left: ${s(8)}px !important; padding-right: ${s(8)}px !important; }
          .print\\:pt-3 { padding-top: ${s(12)}px !important; }
          .print\\:pt-2 { padding-top: ${s(8)}px !important; }
          .print\\:pl-2 { padding-left: ${s(8)}px !important; }
          .print\\:ml-10 { margin-left: ${s(40)}px !important; }
          .print\\:mt-9 { margin-top: ${s(36)}px !important; }
          .print\\:mt-3 { margin-top: ${s(12)}px !important; }
          .print\\:mt-6 { margin-top: ${s(24)}px !important; }
          .print\\:mt-4 { margin-top: ${s(16)}px !important; }
          .print\\:mb-\\[8px\\] { margin-bottom: ${s(8)}px !important; }
          .print\\:border-\\[10px\\] { border-width: ${s(10)}px !important; }
          .print\\:border-\\[2px\\] { border-width: ${s(2)}px !important; }
          .print\\:border-l-\\[6px\\] { border-left-width: ${s(6)}px !important; }
          .print\\:border-b-\\[2px\\] { border-bottom-width: ${s(2)}px !important; }
          .print\\:border-x-\\[2px\\] { border-left-width: ${s(2)}px !important; border-right-width: ${s(2)}px !important; }
          .print\\:border-y-\\[2px\\] { border-top-width: ${s(2)}px !important; border-bottom-width: ${s(2)}px !important; }
          .print\\:border-t-\\[2px\\] { border-top-width: ${s(2)}px !important; }
          .print\\:text-\\[10px\\] { font-size: ${s(10)}px !important; }
          .print\\:text-\\[12px\\] { font-size: ${s(12)}px !important; }
          .print\\:rounded-t-lg { border-top-left-radius: ${s(8)}px !important; border-top-right-radius: ${s(8)}px !important; }
          .print\\:rounded-b-lg { border-bottom-left-radius: ${s(8)}px !important; border-bottom-right-radius: ${s(8)}px !important; }
          .print\\:p-3 { padding: ${s(12)}px !important; }
          .print\\:border-r-0 { border-right-width: 0px !important; }
          .print\\:pr-\\[40px\\] { padding-right: ${s(40)}px !important; }
          .print\\:blur-none { filter: none !important; }
          .blur { filter: none !important; }
          
          /* Estilos escalados dos pseudo-elementos do index.css */
          #equipeq1::after {
            content: '';
            width: ${s(6)}px;
            height: ${s(125)}px;
            background: #5d8b41;
            position: absolute;
            bottom: ${s(-6)}px;
            left: 0;
            z-index: 50;
            border-radius: ${s(1)}px;
          }
          
          #parceiros::after {
            content: '';
            width: ${s(6)}px;
            height: ${s(135)}px;
            background: #5d8b41;
            position: absolute;
            bottom: ${s(-6)}px;
            left: 0;
            z-index: 50;
            border-radius: ${s(1)}px;
          }
          
          #atividadeChave::after {
            content: '';
            width: ${s(6)}px;
            height: ${s(12)}px;
            background: #5d8b41;
            position: absolute;
            bottom: ${s(-3)}px;
            left: 0;
            z-index: 50;
            border-radius: ${s(1)}px;
          }
          
          #oportunidadeMercado::after {
            content: '';
            width: ${s(6)}px;
            height: ${s(12)}px;
            background: #d46316;
            position: absolute;
            bottom: ${s(-5)}px;
            left: 0;
            z-index: 50;
            border-radius: ${s(1)}px;
          }
          
          .oportunidadeMercadoDot::before {
            content: '';
            width: ${s(2)}px;
            height: calc(100% - ${s(20)}px);
            background: linear-gradient(to bottom, #d46316 rgba(0,0,0,0) 0%) repeat-y;
            background-size: 100% ${s(10)}px;
            position: absolute;
            top: ${s(10)}px;
            right: ${s(8)}px;
          }
          
          #custosq2::after {
            content: '';
            width: ${s(6)}px;
            height: ${s(12)}px;
            background: #d46316;
            position: absolute;
            bottom: ${s(-5)}px;
            left: 0;
            z-index: 50;
            border-radius: ${s(1)}px;
          }
          
          .custosq2Dot::before {
            content: '';
            width: ${s(2)}px;
            height: calc(100% - ${s(20)}px);
            background: linear-gradient(to bottom, #d46316 rgba(0,0,0,0) 0%) repeat-y;
            background-size: 100% ${s(10)}px;
            position: absolute;
            top: ${s(10)}px;
            right: ${s(8)}px;
          }
          
          #propostaValor::after {
            content: '';
            width: ${s(6)}px;
            height: ${s(12)}px;
            background: #d46316;
            position: absolute;
            bottom: ${s(-10)}px;
            left: 0;
            z-index: 50;
            border-radius: ${s(1)}px;
          }
          
          .propostaValorDot::before {
            content: '';
            width: ${s(2)}px;
            height: calc(100% - ${s(20)}px);
            background: linear-gradient(to bottom, #d46316 rgba(0,0,0,0) 0%) repeat-y;
            background-size: 100% ${s(10)}px;
            position: absolute;
            top: ${s(10)}px;
            right: ${s(8)}px;
          }
          
          #contextoProblema::after {
            content: '';
            width: ${s(6)}px;
            height: ${s(55)}px;
            background: #823e11;
            position: absolute;
            bottom: ${s(-6)}px;
            left: 0;
            z-index: 50;
            border-radius: ${s(1)}px;
          }
          
          #publicoFoco::after {
            content: '';
            width: ${s(6)}px;
            height: ${s(55)}px;
            background: #823e11;
            position: absolute;
            bottom: ${s(-6)}px;
            left: 0;
            z-index: 50;
            border-radius: ${s(1)}px;
          }
          
          #intervencoesEstrategias::after {
            content: '';
            width: ${s(6)}px;
            height: ${s(126)}px;
            background: #823e11;
            position: absolute;
            bottom: ${s(-8)}px;
            left: 0;
            z-index: 50;
          }
          
          #saidasOutputs::after {
            content: '';
            width: ${s(6)}px;
            height: ${s(70)}px;
            background: #823e11;
            position: absolute;
            bottom: ${s(-10)}px;
            left: 0;
            z-index: 50;
            border-radius: ${s(1)}px;
          }
          
          #resultadosCurtoPrazoTop::after {
            content: '';
            width: ${s(6)}px;
            height: ${s(37)}px;
            background: #823e11;
            position: absolute;
            bottom: ${s(8)}px;
            left: 0;
            z-index: 1;
            border-radius: ${s(1)}px;
          }
          
          #resultadosCurtoPrazo::after {
            content: '';
            width: ${s(6)}px;
            height: ${s(37)}px;
            background: #823e11;
            position: absolute;
            bottom: ${s(8)}px;
            left: 0;
            z-index: 1;
            border-radius: ${s(1)}px;
          }
          
          #resultadosCurtoPrazo::before {
            content: '';
            width: ${s(30)}px;
            height: ${s(15)}px;
            background: #823e11;
            position: absolute;
            bottom: ${s(-5)}px;
            left: ${s(-12)}px;
            clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
            z-index: 51;
          }
          
          #custosq2Arrow::after {
            content: '';
            width: ${s(6)}px;
            height: ${s(72)}px;
            background: #5d8b41;
            position: absolute;
            bottom: ${s(-10)}px;
            left: 0;
            z-index: 50;
          }
          
          #custosq2Arrow::before {
            content: '';
            width: ${s(30)}px;
            height: ${s(15)}px;
            background: #5d8b41;
            position: absolute;
            bottom: ${s(-18)}px;
            left: ${s(-12)}px;
            clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
            z-index: 51;
          }
          
          #custosq3Arrow::after {
            content: '';
            width: ${s(6)}px;
            height: ${s(72)}px;
            background: #d46316;
            position: absolute;
            bottom: ${s(-10)}px;
            left: 0;
            z-index: 50;
          }
          
          #custosq3Arrow::before {
            content: '';
            width: ${s(30)}px;
            height: ${s(15)}px;
            background: #d46316;
            position: absolute;
            bottom: ${s(-18)}px;
            left: ${s(-12)}px;
            clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
            z-index: 51;
          }
          
          #recursosArrow::before {
            content: '';
            width: ${s(30)}px;
            height: ${s(15)}px;
            background: #5d8b41;
            position: absolute;
            bottom: ${s(-5)}px;
            left: ${s(-12)}px;
            clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
            z-index: 51;
          }
        `}} />
      )}
      <div className="relative h-[340px] print:h-[160px]" style={scale !== 1 ? { height: `${s(160)}px` } : {}}>
        <img
          src={header}
          alt="Header"
          className="w-[1980px] h-96 object-cover absolute print:h-[160px]"
          crossOrigin="anonymous"
          style={scale !== 1 ? {
            height: `${s(160)}px`,
            width: `${s(994)}px`
          } : {}}
        />
      </div>
      {/* ----> Primeiro componente inicial parte azul */}
      <div className="relative px-8 print:px-4">
        <div className="border-[20px] print:border-[10px] border-[#075e95]" style={scale !== 1 ? { borderWidth: `${s(10)}px` } : {}}>
          <div className="p-4 border-b-4 print:border-b-[2px]  border-[#075e95]  bg-white flex h-20
           print:px-4 print:pt-3 print:h-11" style={scale !== 1 ? {
              padding: `${s(12)}px ${s(16)}px`,
              borderBottomWidth: `${s(2)}px`,
              height: `${s(44)}px`
            } : {}}>
            <p className="break-words break-all text-[#075e95]">Projeto:</p>
            <p className="break-words break-all px-2 print:px-1" style={scale !== 1 ? { paddingLeft: `${s(4)}px`, paddingRight: `${s(4)}px` } : {}}>{team?.nomeEquipe}</p>
          </div>
          {/* Seção de Alunos */}
          <div className="flex text-start bg-white">
            <div className="w-full h-36 print:h-[70px] pt-2 border-r-2 print:border-r-0 border-[#075e95] flex items-start"
              style={scale !== 1 ? {
                height: `${s(70)}px`,
                paddingTop: `${s(8)}px`,
                borderRightWidth: 0
              } : {}}>
              <p className="text-[#075e95] pl-4 print:pl-2" style={scale !== 1 ? { paddingLeft: `${s(8)}px` } : {}}>Alunos:</p>
              <div className="flex flex-wrap gap-2 print:gap-1" style={scale !== 1 ? { gap: `${s(4)}px` } : {}}>
                {formatNameList(team?.alunos || [], (student) => student?.nome || '')}
              </div>
            </div>

            {/* Seção de Orientadores */}
            <div className="w-full pt-2 border-l-2 border-[#075e95] flex items-start"
              style={scale !== 1 ? {
                paddingTop: `${s(8)}px`,
                borderLeftWidth: `${s(2)}px`
              } : {}}>
              <p className="text-[#075e95] pl-4 print:pl-2" style={scale !== 1 ? { paddingLeft: `${s(8)}px` } : {}}>Orientadores:</p>
              <div className="flex flex-wrap gap-2 print:gap-1" style={scale !== 1 ? { gap: `${s(4)}px` } : {}}>
                {formatNameList(team?.professores || [], (professor) => professor?.nome || '')}
              </div>
            </div>
          </div>
        </div>
        <div className="border-[20px] print:border-[10px] border-[#075e95] mt-6 h-96 print:h-56 print:mt-3 bg-white"
          style={scale !== 1 ? {
            borderWidth: `${s(10)}px`,
            marginTop: `${s(12)}px`,
            height: `${s(224)}px`
          } : {}}>
          <div className="flex text-start h-full">
            <div className="p-4 border-r-2 print:border-r-0 border-[#075e95] flex w-full"
              style={scale !== 1 ? {
                padding: `${s(16)}px`,
                borderRightWidth: 0
              } : {}}>
              {/* <p className="text-[#075e95]">Texto</p> */}
              <p className="break-words break-all  px-2 print:px-1" style={scale !== 1 ? { paddingLeft: `${s(4)}px`, paddingRight: `${s(4)}px` } : {}}>{banner?.textoDescricaoQ0}</p>
            </div>
            <div className="p-4 border-l-2 border-[#075e95] flex w-full"
              style={scale !== 1 ? {
                padding: `${s(16)}px`,
                borderLeftWidth: `${s(2)}px`
              } : {}}>
              {/* <p className="text-[#075e95] absolute">Imagem</p> */}
              <div className="flex-col justify-center items-center my-auto mr-2"
                style={scale !== 1 ? { marginRight: `${s(8)}px` } : {}}>
                {avatar && avatar.length > 0 &&
                  <Avatar
                    className="mr-2 w-20 h-20 print:h-14 print:w-14"
                    src={avatar}
                    alt="Avatar"
                    style={scale !== 1 ? {
                      width: `${s(56)}px`,
                      height: `${s(56)}px`,
                      marginRight: `${s(8)}px`
                    } : {}}
                  />}

              </div>
              {/* Imagens ou placeholders */}
              <div className="grid grid-cols-2 gap-1 w-full" style={scale !== 1 ? { gap: `${s(4)}px` } : {}}>
                {imageUrls && imageUrls.length > 0 && (imageUrls!)?.map((image, index) => (
                  <div
                    key={index}
                    className="w-full h-full bg-green-500 flex items-center justify-center overflow-hidden rounded-md"
                    style={scale !== 1 ? { borderRadius: `${s(6)}px` } : {}}
                  >
                    <img
                      src={image}
                      alt={`Imagem ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                      crossOrigin="anonymous"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="CAPACIDADE ORGANIZACIONAL">
          <div className="relative ml-16 print:ml-10 mt-16 print:mt-9" style={scale !== 1 ? { marginLeft: `${s(40)}px`, marginTop: `${s(36)}px` } : {}}>
            <p className="break-words break-all  font-bold text-[#5d8b41] absolute -top-7 left-6 transform transform-x-1/2" style={scale !== 1 ? { top: `${s(-28)}px`, left: `${s(24)}px` } : {}}>CAPACIDADE ORGANIZACIONAL</p>
            <div className="absolute -top-2 -left-4 bg-white text-[#5d8b41] w-[190px] print:w-[135px] pl-2 py-1 rounded-lg 
            border-4 print:border-[2px]  border-[#5d8b41]" style={scale !== 1 ? { top: `${s(-8)}px`, left: `${s(-16)}px`, width: `${s(135)}px`, paddingLeft: `${s(8)}px`, paddingTop: `${s(4)}px`, paddingBottom: `${s(4)}px`, borderWidth: `${s(2)}px`, borderRadius: `${s(8)}px` } : {}}>
              Equipe
            </div>
            <div id="equipeq1" className="border-4 print:border-[2px] border-l-8 print:border-l-[6px] border-[#5d8b41] rounded-lg p-6 print:px-1 print:pt-3
             w-[305px] h-52 print:w-[240px] print:h-[155px] bg-white" style={scale !== 1 ? { borderWidth: `${s(2)}px`, borderLeftWidth: `${s(6)}px`, borderRadius: `${s(8)}px`, padding: `${s(12)}px ${s(4)}px`, width: `${s(240)}px`, height: `${s(155)}px` } : {}}>
              <p className="break-words break-all py-2" style={scale !== 1 ? { paddingTop: `${s(8)}px`, paddingBottom: `${s(8)}px` } : {}}>{formatTextWithDashes(banner?.equipeQ1)}</p>
            </div>
          </div>

          <div className="flex">
            <div className="relative ml-16 print:ml-10 mt-4 print:mt-3 " style={scale !== 1 ? { marginLeft: `${s(40)}px`, marginTop: `${s(12)}px` } : {}}>
              <div className="absolute -top-2 -left-4 bg-white text-[#5d8b41] pr-[72px] print:pr-[40px] pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#5d8b41]" style={scale !== 1 ? { top: `${s(-8)}px`, left: `${s(-16)}px`, paddingRight: `${s(40)}px`, paddingLeft: `${s(8)}px`, paddingTop: `${s(4)}px`, paddingBottom: `${s(4)}px`, borderWidth: `${s(2)}px`, borderRadius: `${s(8)}px` } : {}}>
                Parceiros
              </div>
              <div id="parceiros" className="border-4 print:border-[2px] print:text-[10px]  border-l-8 print:border-l-[6px] border-[#5d8b41] rounded-lg p-6 print:px-1 print:pt-3 w-[130px] 
              print:w-[90px] print:h-[156px] h-52 bg-white" style={scale !== 1 ? { borderWidth: `${s(2)}px`, borderLeftWidth: `${s(6)}px`, borderRadius: `${s(8)}px`, padding: `${s(12)}px ${s(4)}px`, width: `${s(90)}px`, height: `${s(156)}px`, fontSize: `${s(10)}px` } : {}}>
                <p className="break-words break-all py-2" style={scale !== 1 ? { paddingTop: `${s(8)}px`, paddingBottom: `${s(8)}px` } : {}}>{formatTextWithDashes(banner?.parceiroQ1)}</p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="relative mx-5 mt-4 print:mt-3" style={scale !== 1 ? { marginLeft: `${s(20)}px`, marginRight: `${s(20)}px`, marginTop: `${s(12)}px` } : {}}>
                <div className="absolute -top-2 -left-4 bg-white text-[#5d8b41] pr-10 pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#5d8b41] text-nowrap print:w-[147px]" style={scale !== 1 ? { top: `${s(-8)}px`, left: `${s(-16)}px`, paddingRight: `${s(40)}px`, paddingLeft: `${s(8)}px`, paddingTop: `${s(4)}px`, paddingBottom: `${s(4)}px`, borderWidth: `${s(2)}px`, borderRadius: `${s(8)}px`, width: `${s(147)}px` } : {}}>
                  Atividade Chave
                </div>
                <div id="atividadeChave" className="border-4 print:border-[2px]  print:text-[10px] border-l-8 print:border-l-[6px] border-[#5d8b41] rounded-lg p-6 print:px-1 print:pt-3 w-[150px]
                 print:w-[128px] h-24 print:h-[75px] bg-white" style={scale !== 1 ? { borderWidth: `${s(2)}px`, borderLeftWidth: `${s(6)}px`, borderRadius: `${s(8)}px`, padding: `${s(12)}px ${s(4)}px`, width: `${s(128)}px`, height: `${s(75)}px`, fontSize: `${s(10)}px` } : {}}>
                  <p className="break-words break-all  py-2" style={scale !== 1 ? { paddingTop: `${s(8)}px`, paddingBottom: `${s(8)}px` } : {}}>{formatTextWithDashes(banner?.atividadeChaveQ1)}</p>
                </div>
              </div>

              <div className="relative mx-5 mt-3 print:mt-[10px]" style={scale !== 1 ? { marginLeft: `${s(20)}px`, marginRight: `${s(20)}px`, marginTop: `${s(10)}px` } : {}}>
                <div className="absolute -top-2 -left-4 bg-white text-[#5d8b41] pr-[88px] pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#5d8b41] print:w-[145px]" style={scale !== 1 ? { top: `${s(-8)}px`, left: `${s(-16)}px`, paddingRight: `${s(88)}px`, paddingLeft: `${s(8)}px`, paddingTop: `${s(4)}px`, paddingBottom: `${s(4)}px`, borderWidth: `${s(2)}px`, borderRadius: `${s(8)}px`, width: `${s(145)}px` } : {}}>
                  Recursos
                </div>
                <div id="recursosArrow" className="border-4 print:border-[2px]  print:text-[10px] border-l-8 print:border-l-[6px] border-[#5d8b41] rounded-lg p-6 print:px-1 print:pt-3 w-[145px] h-24 
                print:h-[70px] print:w-[125px] bg-white" style={scale !== 1 ? { borderWidth: `${s(2)}px`, borderLeftWidth: `${s(6)}px`, borderRadius: `${s(8)}px`, padding: `${s(12)}px ${s(4)}px`, width: `${s(125)}px`, height: `${s(70)}px`, fontSize: `${s(10)}px` } : {}}>
                  <p className="break-words break-all  py-2" style={scale !== 1 ? { paddingTop: `${s(8)}px`, paddingBottom: `${s(8)}px` } : {}}>{formatTextWithDashes(banner?.recursosQ1)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative ml-16 print:ml-10 mt-4 print:mt-3 " style={scale !== 1 ? { marginLeft: `${s(40)}px`, marginTop: `${s(12)}px` } : {}}>
            <div className="absolute -top-2 -left-4 bg-white text-[#5d8b41] w-[190px] pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#5d8b41] print:w-[150px]" style={scale !== 1 ? { top: `${s(-8)}px`, left: `${s(-16)}px`, width: `${s(150)}px`, paddingLeft: `${s(8)}px`, paddingTop: `${s(4)}px`, paddingBottom: `${s(4)}px`, borderWidth: `${s(2)}px`, borderRadius: `${s(8)}px` } : {}}>
              Custos
            </div>
            <div id="custosq2Arrow" className="border-4 print:border-[2px]  print:text-[10px] border-l-8 print:border-l-[6px] border-[#5d8b41] rounded-lg p-6 print:px-1 print:pt-3 w-[304px]
             print:h-[85px] bg-white print:w-[240px] h-[120px]" style={scale !== 1 ? { borderWidth: `${s(2)}px`, borderLeftWidth: `${s(6)}px`, borderRadius: `${s(8)}px`, padding: `${s(12)}px ${s(4)}px`, width: `${s(240)}px`, height: `${s(85)}px`, fontSize: `${s(10)}px` } : {}}>
              <p className="break-words break-all  py-2" style={scale !== 1 ? { paddingTop: `${s(8)}px`, paddingBottom: `${s(8)}px` } : {}}>{formatTextWithDashes(banner?.custosQ1)}</p>
            </div>
          </div>

          <div className="w-full mt-8 print:mt-6" style={scale !== 1 ? { marginTop: `${s(24)}px` } : {}}>
            <div className="relative ml-16 print:ml-10  w-full" style={scale !== 1 ? { marginLeft: `${s(40)}px` } : {}}>
              <div className="absolute z-10 -top-2 -left-4 bg-[#d46316] text-white w-full pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#d46316] uppercase font-semibold text-nowrap text-center print:w-[350px]" style={scale !== 1 ? { top: `${s(-8)}px`, left: `${s(-16)}px`, paddingLeft: `${s(8)}px`, paddingTop: `${s(4)}px`, paddingBottom: `${s(4)}px`, borderWidth: `${s(2)}px`, borderRadius: `${s(8)}px`, width: `${s(350)}px` } : {}}>
                Resultado Financeiro
              </div>
              <div className="absolute border-4 print:border-[2px]   border-[#d46316] rounded-lg p-6  bg-white w-[875px] h-[334px] print:w-[490px] print:h-[212px] print:p-3" style={scale !== 1 ? { borderWidth: `${s(2)}px`, borderRadius: `${s(8)}px`, padding: `${s(12)}px`, width: `${s(490)}px`, height: `${s(212)}px` } : {}}>
                <p className="break-words break-all py-2" style={scale !== 1 ? { paddingTop: `${s(8)}px`, paddingBottom: `${s(8)}px` } : {}}>{formatTextWithDashes(banner?.resultadoFinanceiroQ2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="FLUXO DE NEGOCIO w-2/3 ">
          <div className="relative ml-1 mt-16 print:mt-9 w-full" style={scale !== 1 ? { marginLeft: `${s(4)}px`, marginTop: `${s(36)}px` } : {}}>
            <p className="break-words break-all  font-bold text-[#d46316] absolute -top-7 left-1/3 transform transform-x-1/2" style={scale !== 1 ? { top: `${s(-28)}px` } : {}}>FLUXO DE NEGÓCIO</p>
            <div className="absolute -top-2 -left-4 bg-[#d46316] text-white w-[290px]  pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#d46316] uppercase font-semibold text-nowrap print:w-[220px]" style={scale !== 1 ? { top: `${s(-8)}px`, left: `${s(-16)}px`, width: `${s(220)}px`, paddingLeft: `${s(8)}px`, paddingTop: `${s(4)}px`, paddingBottom: `${s(4)}px`, borderWidth: `${s(2)}px`, borderRadius: `${s(8)}px` } : {}}>
              Oportunidade de mercado
            </div>
            <div id="oportunidadeMercado" className="oportunidadeMercadoDot border-y-4 print:border-y-[2px] border-l-8 print:border-l-[6px] border-[#d46316]  print:text-[10px]
            p-6 print:px-2 print:pt-2  print:h-16 h-[95px] bg-white" style={scale !== 1 ? { borderTopWidth: `${s(2)}px`, borderBottomWidth: `${s(2)}px`, borderLeftWidth: `${s(6)}px`, padding: `${s(8)}px ${s(8)}px`, height: `${s(64)}px`, fontSize: `${s(10)}px` } : {}}>
              <p className="break-words break-all  py-2" style={scale !== 1 ? { paddingTop: `${s(8)}px`, paddingBottom: `${s(8)}px` } : {}}>{formatTextWithDashes(banner?.oportunidadeNegQ2)}</p>
            </div>
          </div>

          <div className="relative ml-1 mt-4 print:mt-3 w-full" style={scale !== 1 ? { marginLeft: `${s(4)}px`, marginTop: `${s(12)}px` } : {}}>
            <div className="absolute -top-2 -left-4 bg-white text-[#d46316] w-[290px]  pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#d46316] print:w-[220px]" style={scale !== 1 ? { top: `${s(-8)}px`, left: `${s(-16)}px`, width: `${s(220)}px`, paddingLeft: `${s(8)}px`, paddingTop: `${s(4)}px`, paddingBottom: `${s(4)}px`, borderWidth: `${s(2)}px`, borderRadius: `${s(8)}px` } : {}}>
              Custos
            </div>
            <div id="custosq2" className="custosq2Dot border-y-4 print:border-y-[2px] print:text-[10px] border-l-8 print:border-l-[6px] border-[#d46316]  p-6 print:px-2 print:pt-2 h-24 bg-white print:h-[80px]" style={scale !== 1 ? { borderTopWidth: `${s(2)}px`, borderBottomWidth: `${s(2)}px`, borderLeftWidth: `${s(6)}px`, padding: `${s(8)}px ${s(8)}px`, height: `${s(80)}px`, fontSize: `${s(10)}px` } : {}}>
              <p className="break-words break-all  py-2" style={scale !== 1 ? { paddingTop: `${s(8)}px`, paddingBottom: `${s(8)}px` } : {}}>{formatTextWithDashes(banner?.custoQ2)}</p>
            </div>
          </div>

          <div className="relative ml-1 mt-4 print:mt-3  w-full" style={scale !== 1 ? { marginLeft: `${s(4)}px`, marginTop: `${s(12)}px` } : {}}>
            <div className="absolute -top-2 -left-4 bg-white text-[#d46316] w-[290px]  pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#d46316] print:w-[220px]" style={scale !== 1 ? { top: `${s(-8)}px`, left: `${s(-16)}px`, width: `${s(220)}px`, paddingLeft: `${s(8)}px`, paddingTop: `${s(4)}px`, paddingBottom: `${s(4)}px`, borderWidth: `${s(2)}px`, borderRadius: `${s(8)}px` } : {}}>
              Proposta de valor
            </div>
            <div id="propostaValor" className="propostaValorDot border-y-4 print:border-y-[2px] border-l-8 print:border-l-[6px] border-[#d46316]  p-6 print:px-2 print:pt-2 
            h-52 print:h-[150px] bg-white" style={scale !== 1 ? { borderTopWidth: `${s(2)}px`, borderBottomWidth: `${s(2)}px`, borderLeftWidth: `${s(6)}px`, padding: `${s(8)}px ${s(8)}px`, height: `${s(150)}px` } : {}}>
              <p className="break-words break-all  py-2" style={scale !== 1 ? { paddingTop: `${s(8)}px`, paddingBottom: `${s(8)}px` } : {}}>{formatTextWithDashes(banner?.propostaValorQ2)}</p>
            </div>
          </div>

          <div className="relative ml-1 mt-4" style={scale !== 1 ? { marginLeft: `${s(4)}px`, marginTop: `${s(16)}px` } : {}}>
            <div className="absolute -top-2 -left-4 bg-white text-[#d46316] w-[290px] pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#d46316] print:w-[220px]" style={scale !== 1 ? { top: `${s(-8)}px`, left: `${s(-16)}px`, width: `${s(220)}px`, paddingLeft: `${s(8)}px`, paddingTop: `${s(4)}px`, paddingBottom: `${s(4)}px`, borderWidth: `${s(2)}px`, borderRadius: `${s(8)}px` } : {}}>
              Fontes de Receitas
            </div>
            <div id="custosq3Arrow" className="border-4 print:border-[2px]  border-l-8 print:border-l-[6px] border-[#d46316] rounded-lg p-6 print:px-1 print:pt-3 w-11/12 bg-white print:h-[85px] h-[120px]" style={scale !== 1 ? { borderWidth: `${s(2)}px`, borderLeftWidth: `${s(6)}px`, borderRadius: `${s(8)}px`, padding: `${s(12)}px ${s(4)}px`, height: `${s(85)}px` } : {}}>
              <p className="break-words break-all  py-2" style={scale !== 1 ? { paddingTop: `${s(8)}px`, paddingBottom: `${s(8)}px` } : {}}>{formatTextWithDashes(banner?.fonteReceitaQ2)}</p>
            </div>
          </div>

        </div>

        <div className="CONTEXTO E PROBLEMA w-full pr-14 print:pr-8" style={scale !== 1 ? { paddingRight: `${s(32)}px` } : {}}>
          <div className="relative ml-1 mt-16 print:mt-9 w-full" style={scale !== 1 ? { marginLeft: `${s(4)}px`, marginTop: `${s(36)}px` } : {}}>
            <p className="break-words break-all  font-bold text-[#823e11] absolute -top-7 left-1/3 transform transform-x-1/2" style={scale !== 1 ? { top: `${s(-28)}px` } : {}}>TEORIA DE MUDANÇA</p>
            <div className="absolute -top-2 -left-4 bg-[#823e11] text-white w-[290px]  pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#823e11] uppercase font-semibold text-nowrap print:w-[220px]" style={scale !== 1 ? { top: `${s(-8)}px`, left: `${s(-16)}px`, width: `${s(220)}px`, paddingLeft: `${s(8)}px`, paddingTop: `${s(4)}px`, paddingBottom: `${s(4)}px`, borderWidth: `${s(2)}px`, borderRadius: `${s(8)}px` } : {}}>
              Contexto e problema
            </div>
            <div id="contextoProblema" className="border-4 print:border-[2px]  border-l-8 print:border-l-[6px] border-[#823e11] rounded-lg p-6 print:px-1 print:pt-3  bg-white print:h-16 h-[95px]" style={scale !== 1 ? { borderWidth: `${s(2)}px`, borderLeftWidth: `${s(6)}px`, borderRadius: `${s(8)}px`, padding: `${s(12)}px ${s(4)}px`, height: `${s(64)}px` } : {}}>
              <p className="break-words break-all  py-2" style={scale !== 1 ? { paddingTop: `${s(8)}px`, paddingBottom: `${s(8)}px` } : {}}>{formatTextWithDashes(banner?.contextoProblemaQ3)}</p>
            </div>
          </div>

          <div className="relative ml-1 mt-4 print:mt-3  w-full" style={scale !== 1 ? { marginLeft: `${s(4)}px`, marginTop: `${s(12)}px` } : {}}>
            <div className="absolute -top-2 -left-4 bg-white text-[#823e11] w-[290px]  pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#823e11] print:w-[220px]" style={scale !== 1 ? { top: `${s(-8)}px`, left: `${s(-16)}px`, width: `${s(220)}px`, paddingLeft: `${s(8)}px`, paddingTop: `${s(4)}px`, paddingBottom: `${s(4)}px`, borderWidth: `${s(2)}px`, borderRadius: `${s(8)}px` } : {}}>
              Público / Foco do Impacto
            </div>
            <div id="publicoFoco" className="border-4 print:border-[2px]  border-l-8 print:border-l-[6px] border-[#823e11] rounded-lg p-6 print:px-1 print:pt-3  bg-white print:h-[80px] h-[95px]" style={scale !== 1 ? { borderWidth: `${s(2)}px`, borderLeftWidth: `${s(6)}px`, borderRadius: `${s(8)}px`, padding: `${s(12)}px ${s(4)}px`, height: `${s(80)}px` } : {}}>
              <p className="break-words break-all  py-2" style={scale !== 1 ? { paddingTop: `${s(8)}px`, paddingBottom: `${s(8)}px` } : {}}>{formatTextWithDashes(banner?.publicoFocoImpactoQ3)}</p>
            </div>
          </div>

          <div className="relative ml-1 mt-4 print:mt-3  w-full" style={scale !== 1 ? { marginLeft: `${s(4)}px`, marginTop: `${s(12)}px` } : {}}>
            <div className="absolute -top-2 -left-4 bg-white text-[#823e11] w-[290px]  pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#823e11] print:w-[220px]" style={scale !== 1 ? { top: `${s(-8)}px`, left: `${s(-16)}px`, width: `${s(220)}px`, paddingLeft: `${s(8)}px`, paddingTop: `${s(4)}px`, paddingBottom: `${s(4)}px`, borderWidth: `${s(2)}px`, borderRadius: `${s(8)}px` } : {}}>
              Intervenções (estratégias)
            </div>
            <div id="intervencoesEstrategias" className="border-4 print:border-[2px]  border-l-8 print:border-l-[6px] border-[#823e11] rounded-lg p-6 print:px-1 print:pt-3  h-52 bg-white print:h-[150px]" style={scale !== 1 ? { borderWidth: `${s(2)}px`, borderLeftWidth: `${s(6)}px`, borderRadius: `${s(8)}px`, padding: `${s(12)}px ${s(4)}px`, height: `${s(150)}px` } : {}}>
              <p className="break-words break-all  py-2" style={scale !== 1 ? { paddingTop: `${s(8)}px`, paddingBottom: `${s(8)}px` } : {}}>{formatTextWithDashes(banner?.intervencoesQ3)}</p>
            </div>
          </div>

          <div className="relative ml-1 mt-4" style={scale !== 1 ? { marginLeft: `${s(4)}px`, marginTop: `${s(16)}px` } : {}}>
            <div className="absolute -top-2 -left-4 bg-white text-[#823e11] w-[290px] pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#823e11] print:w-[220px]" style={scale !== 1 ? { top: `${s(-8)}px`, left: `${s(-16)}px`, width: `${s(220)}px`, paddingLeft: `${s(8)}px`, paddingTop: `${s(4)}px`, paddingBottom: `${s(4)}px`, borderWidth: `${s(2)}px`, borderRadius: `${s(8)}px` } : {}}>
              Saídas / Outputs
            </div>
            <div id="saidasOutputs" className="border-4 print:border-[2px]  border-l-8 print:border-l-[6px] border-[#823e11] rounded-lg p-6 print:px-1 print:pt-3 w-full  bg-white print:h-[85px] h-[120px]" style={scale !== 1 ? { borderWidth: `${s(2)}px`, borderLeftWidth: `${s(6)}px`, borderRadius: `${s(8)}px`, padding: `${s(12)}px ${s(4)}px`, height: `${s(85)}px` } : {}}>
              <p className="break-words break-all  py-2" style={scale !== 1 ? { paddingTop: `${s(8)}px`, paddingBottom: `${s(8)}px` } : {}}>{formatTextWithDashes(banner?.saidasQ3)}</p>
            </div>
          </div>

          <div className="relative ml-1 mt-8 print:mt-4" style={scale !== 1 ? { marginLeft: `${s(4)}px`, marginTop: `${s(85)}px` } : {}}>
            <div className="absolute -top-2 -left-4 bg-white text-[#823e11] w-[290px] pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#823e11] print:w-[220px]" style={scale !== 1 ? { top: `${s(-8)}px`, left: `${s(-16)}px`, width: `${s(220)}px`, paddingLeft: `${s(8)}px`, paddingTop: `${s(4)}px`, paddingBottom: `${s(4)}px`, borderWidth: `${s(2)}px`, borderRadius: `${s(8)}px` } : {}}>
              Resultados Curto Prazo
            </div>
            <div id="resultadosCurtoPrazoTop" className="border-x-4 print:border-x-[2px] border-t-4 print:border-t-[2px] border-l-8 print:border-l-[6px] border-[#823e11] rounded-t-md print:rounded-t-lg p-6 print:px-1 print:pt-3 w-full  bg-white print:h-[65px] h-24" style={scale !== 1 ? { borderTopWidth: `${s(2)}px`, borderLeftWidth: `${s(6)}px`, borderRightWidth: `${s(2)}px`, borderTopLeftRadius: `${s(6)}px`, borderTopRightRadius: `${s(6)}px`, padding: `${s(12)}px ${s(4)}px`, height: `${s(65)}px` } : {}}>
              <p className="break-words break-all  py-2" style={scale !== 1 ? { paddingTop: `${s(8)}px`, paddingBottom: `${s(8)}px` } : {}}>{formatTextWithDashes(banner?.resultadosCurtoPrazoQ3)}</p>
            </div>
          </div>

          <div className="relative ml-1 mt-0" style={scale !== 1 ? { marginLeft: `${s(4)}px`, marginTop: 0 } : {}}>
            <div className="absolute -top-2 -left-4 bg-white text-[#823e11] w-[290px] pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#823e11] print:w-[220px]" style={scale !== 1 ? { top: `${s(-8)}px`, left: `${s(-16)}px`, width: `${s(220)}px`, paddingLeft: `${s(8)}px`, paddingTop: `${s(4)}px`, paddingBottom: `${s(4)}px`, borderWidth: `${s(2)}px`, borderRadius: `${s(8)}px` } : {}}>
              Resultados Médio Prazo
            </div>
            <div id="resultadosCurtoPrazo" className="border-x-4 print:border-x-[2px] border-b-4 print:border-b-[2px] border-l-8 print:border-l-[6px] border-[#823e11] rounded-b-md print:rounded-b-lg p-6 print:px-1 print:pt-3 w-full  print:h-[65px] bg-white h-24"
              style={scale !== 1 ? {
                borderTop: 'dashed',
                borderColor: "#823e11",
                borderTopWidth: `${s(2)}px`,
                borderLeftWidth: `${s(6)}px`,
                borderRightWidth: `${s(2)}px`,
                borderBottomWidth: `${s(2)}px`,
                borderBottomLeftRadius: `${s(8)}px`,
                borderBottomRightRadius: `${s(8)}px`,
                padding: `${s(12)}px ${s(4)}px`,
                height: `${s(65)}px`
              } : {
                borderTop: 'dashed',
                borderColor: "#823e11",
                borderTopWidth: 2,
              }}>
              <p className="break-words break-all  py-2" style={scale !== 1 ? { paddingTop: `${s(8)}px`, paddingBottom: `${s(8)}px` } : {}}>{formatTextWithDashes(banner?.resultadosMedioPrazoQ3)}</p>
            </div>
          </div>

          <div className="relative ml-1 mt-8 mb-4 print:mb-[8px]  print:mt-4 w-full" style={scale !== 1 ? { marginLeft: `${s(4)}px`, marginTop: `${s(16)}px`, marginBottom: `${s(8)}px` } : {}}>
            <div className="absolute -top-2 -left-4 bg-[#823e11] text-white w-[290px]  pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#823e11] uppercase font-semibold text-nowrap text-center print:w-[220px]" style={scale !== 1 ? { top: `${s(-8)}px`, left: `${s(-16)}px`, width: `${s(220)}px`, paddingLeft: `${s(8)}px`, paddingTop: `${s(4)}px`, paddingBottom: `${s(4)}px`, borderWidth: `${s(2)}px`, borderRadius: `${s(8)}px` } : {}}>
              Visão de impacto
            </div>
            <div className="border-4 print:border-[2px]   border-[#823e11] rounded-lg p-6 print:px-1 print:pt-3 h-28 bg-white max-w-full 
            print:h-[75px]" style={scale !== 1 ? { borderWidth: `${s(2)}px`, borderRadius: `${s(8)}px`, padding: `${s(12)}px ${s(4)}px`, height: `${s(75)}px` } : {}}>
              <p className="break-words break-all  py-2" style={scale !== 1 ? { paddingTop: `${s(8)}px`, paddingBottom: `${s(8)}px` } : {}}>{formatTextWithDashes(banner?.visaoImpactoQ3)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-28 bottom-0 print:h-20 mt-4" style={scale !== 1 ? { height: `${s(240)}px`, marginTop: `${s(16)}px` } : {}}>
        <img
          src={footer}
          alt="Footer"
          className="object-cover absolute"
          crossOrigin="anonymous"
          style={scale !== 1 ? {
            height: `${s(240)}px`,
            width: `${s(994)}px`,
            objectFit: 'contain'
          } : {}}
        />
      </div>
    </div>
  )
}