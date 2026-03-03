'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, AlertCircle, X } from 'lucide-react'

// Sub-componentes
import StoreHeader from './components/StoreHeader'
import RegisterForm from './components/RegisterForm'
import SuccessView from './components/SuccessView'

export default function RegisterPage() {
  const CAMPAIGN_NAME = process.env.NEXT_PUBLIC_VAR_CAMPAIGN || 'FuryMotocorp'

  const [campaignId, setCampaignId] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  
  // Estado para el Modal de Términos
  const [showTerms, setShowTerms] = useState(true)

  useEffect(() => {
    const initCampaign = async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('id')
        .eq('name', CAMPAIGN_NAME)
        .eq('is_active', true)
        .single()

      if (error || !data) {
        setIsValid(false)
        return
      }

      setCampaignId(data.id)
      setIsValid(true)
    }
    initCampaign()
  }, [CAMPAIGN_NAME])

  if (isValid === null) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="animate-spin text-white/50" size={40} />
    </div>
  )
  
  if (isValid === false) return (
    <div className="min-h-screen bg-gradient-to-r from-[#f89824] to-[#e53829] flex flex-col items-center justify-center p-6 text-white text-center">
      <AlertCircle size={64} className="mb-4 opacity-50" />
      <h1 className="text-2xl font-bold uppercase tracking-tighter">Campaña no disponible</h1>
      <p className="opacity-80">Por el momento no se pueden realizar registros.</p>
    </div>
  )

  return (
    <main 
      className="min-h-screen bg-black bg-[url('/furybg.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 md:p-8 font-sans selection:bg-white/30"
    >
      <div className="w-full max-w-md bg-transparent animate-in fade-in zoom-in duration-500">
        
        {!success ? (
          <>
            {/* MODAL DE TÉRMINOS Y CONDICIONES */}
            {showTerms ? (
              <div className="relative bg-black backdrop-blur-xl border-3 border-[#f9c433] rounded-[1.8rem] p-6 pt-16 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
                
                {/* Botón de cerrar (X) estilizado */}
                <button 
                  onClick={() => setShowTerms(false)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full border-3 border-[#f9c433] text-[#f9c433] hover:bg-[#f9c433] hover:text-black transition-all active:scale-90"
                >
                  <X size={24} strokeWidth={4} />
                </button>

                <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                  <div className="text-white/80 text-[11px] leading-relaxed text-justify space-y-3">
                    <p className="text-white font-bold">
                      Promoción válida a nivel nacional a través de las Tiendas TAMBO, del 02 de marzo al 27 de abril de 2026 y/o hasta agotar stock.
                    </p>
                    
                    <p>
                      <span className="text-white font-bold">Mecánica:</span> Participan personas naturales mayores de 18 años, con residencia legal y domicilio en el territorio nacional del Perú, por la compra de 02 botellas de Fury Energy a S/4.90 (precio regular: Desde 2 x S/ 6.60) en Tiendas TAMBO, podrás participar de la promoción “Motocorp & Fury”, regístrate con tu boleta de compra ingresando al QR y podrás ganar 1 de las motos que se sortearán semanalmente.
                    </p>

                    <p>
                      <span className="text-white font-bold">Stock de premios:</span> 8 motos Mig125-25. Organiza AC CORPORATIVO. (antes Corporación Lindley S.A) Av. Javier Prado Este 6210, piso 10 La Molina. Consultas al 0800-1-4000 (Horario de lunes a viernes de 8.00 am a 5.00 pm).
                    </p>

                    <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                       <p className="text-white font-bold underline mb-1">Fechas de sorteos:</p>
                       <p className="text-[10px] leading-relaxed">
                         09/03/2026, 16/03/2026, 23/03/2026, 30/03/2026, 06/04/2026, 13/04/2026, 20/04/2026, 27/04/2026.
                       </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* VISTA DE REGISTRO */
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <StoreHeader />

                <div className="-ml-8 sm:-ml-10 mb-4 mt-2">
                  <img 
                    src="/registro.png" 
                    alt="Registro" 
                    className="w-40 h-auto object-contain block" 
                  />
                </div>

                <RegisterForm 
                  campaignId={campaignId}
                  setLoading={setLoading}
                  loading={loading}
                  setSuccess={setSuccess}
                  setError={setError}
                  error={error}
                />
              </div>
            )}
          </>
        ) : (
          <SuccessView />
        )}

      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(249, 196, 51, 0.4);
          border-radius: 10px;
        }
      `}</style>
    </main>
  )
}