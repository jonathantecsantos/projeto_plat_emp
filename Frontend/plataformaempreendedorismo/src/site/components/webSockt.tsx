import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react'


export const WebSocketOdds = () => {
  const [odds, setOdds] = useState<any>(null)

  useEffect(() => {
    // Use o protocolo ws:// para WebSocket, substitua localhost pela URL correta do servidor
    const ws = new WebSocket('ws://localhost:8080/ws')

    ws.onopen = () => {
      console.log('Conectado ao WebSocket')
    }

    ws.onmessage = (event) => {
      const oddsData = JSON.parse(event.data)
      setOdds(oddsData)

    }

    ws.onclose = () => {
      console.log('WebSocket connection closed')
    }

    return () => {
      ws.close()
    }
  }, [])

  return (
    <div className="p-6 mt-40">
      <h1 className="text-2xl font-bold mb-4">Odds ao Vivo 1xBet</h1>
      {odds ? (
        <div className="grid grid-cols-1 gap-4 w-full">
          {odds.Value.GE.slice(0, 10).map((group: { G: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, E: any[] }, index: Key | null | undefined) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow flex-col gap-2">
              <h2 className="text-xl font-semibold mb-2">MarketID {group.G}</h2>
              <div className='flex gap-2'>
                {group.E.map((event: any[], eventIndex: Key | null | undefined) => (
                  <div key={eventIndex} className="">
                    {event.map((item: { T: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, C: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined }, itemIndex: Key | null | undefined) => (
                      <div
                        key={itemIndex}
                        className="flex justify-between gap-10 items-center bg-white p-2 border border-gray-300 rounded mb-2"
                      >
                        <span className="font-medium">T: {item.T}</span>
                        <span className="text-blue-600 font-semibold">C: {item.C}</span>
                      </div>
                    ))}
                  </div>
                ))}

              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Conectando ao WebSocket...</p>
      )}
    </div>
  )
}

