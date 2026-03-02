'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, AlertCircle } from 'lucide-react'

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
    <main className="min-h-screen bg-black flex items-center justify-center  md:p-8 font-sans selection:bg-white/30">
      <div className="w-full max-w-md bg-transparent rounded-[3rem] p-8 sm:p-10 animate-in fade-in zoom-in duration-500">
        
        {!success ? (
          <>
            <StoreHeader />

            {/* IMAGEN REGISTRO PEGADA A LA IZQUIERDA */}
            <div className="-ml-8 sm:-ml-10 mb-4">
              <img 
                src="/registro.png" 
                alt="Registro" 
                className="w-47 mb-2 h-auto object-contain block" 
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
          </>
        ) : (
          <SuccessView />
        )}

      </div>
    </main>
  )
}