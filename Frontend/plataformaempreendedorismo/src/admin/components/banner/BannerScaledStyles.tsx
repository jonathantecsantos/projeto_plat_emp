interface BannerScaledStylesProps {
  scale: number
  forExport: boolean
}

export const BannerScaledStyles = ({ scale, forExport }: BannerScaledStylesProps) => {
  const s = (value: number) => value * scale

  if (!forExport && scale === 1) return null

  return (
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
  )
}
