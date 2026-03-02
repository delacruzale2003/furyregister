'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Camera, CheckCircle2, Loader2, Image as ImageIcon } from 'lucide-react'

export default function RegisterForm({ campaignId, loading, setLoading, setSuccess, error, setError }: any) {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '' })
  const [file, setFile] = useState<File | null>(null)

  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const img = new Image(); img.src = URL.createObjectURL(file)
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const MAX = 800; let w = img.width, h = img.height
        if (w > h && w > MAX) { h *= MAX / w; w = MAX } else if (h > MAX) { w *= MAX / h; h = MAX }
        canvas.width = w; canvas.height = h
        canvas.getContext('2d')?.drawImage(img, 0, 0, w, h)
        canvas.toBlob(b => resolve(new File([b!], 'v.webp', { type: 'image/webp' })), 'image/webp', 0.6)
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const optimized = await compressImage(file!)
      const path = `${campaignId}/registros_generales/${Date.now()}.webp`
      await supabase.storage.from('vouchers').upload(path, optimized)
      const { data: url } = supabase.storage.from('vouchers').getPublicUrl(path)

      const { error: insError } = await supabase.from('registrations').insert({
        full_name: formData.fullName, 
        email: formData.email, 
        phone: formData.phone,
        dni: 'REGISTRO-WEB',
        voucher_url: url.publicUrl, 
        campaign_id: campaignId,
        store_id: null,
        prize_id: null 
      })

      if (insError) throw insError
      setSuccess(true)
    } catch (err) { 
      setError('Hubo un problema al guardar tus datos. Intenta de nuevo.') 
    } finally { 
      setLoading(false) 
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* IMAGEN PEGADA A LA IZQUIERDA */}
      

      <div className="text-left pb-2">
        <p className="text-white font-eb text-xl leading-tight">
          Llena con tus datos y participa <br /> por fabulosos premios
        </p>
      </div>

      {error && <div className="p-4 bg-red-500/20 text-white text-xs font-bold rounded-2xl text-center">{error}</div>}
      
      <div className="space-y-1.5">
        <label className="text-[18px] font-eb text-white ml-2 uppercase ">Nombres y Apellidos :</label>
        <input 
          type="text" required
          className="w-full px-6 py-2 rounded-full bg-white border-none outline-none text-black font-semibold shadow-inner focus:ring-4 focus:ring-black/10 transition-all"
          onChange={e => setFormData({...formData, fullName: e.target.value})}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[18px] font-eb text-white ml-2 uppercase ">Correo :</label>
        <input 
          type="email" required
          className="w-full px-6 py-2 rounded-full bg-white border-none outline-none text-black font-semibold shadow-inner focus:ring-4 focus:ring-black/10 transition-all"
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[18px] font-eb text-white ml-2 uppercase">Teléfono :</label>
        <input 
          type="tel" maxLength={9} required
          className="w-full px-6 py-2 rounded-full bg-white border-none outline-none text-black font-semibold shadow-inner focus:ring-4 focus:ring-black/10 transition-all"
          onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g,'')})}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[18px] font-eb text-white ml-2 uppercase ">Subir foto de voucher :</label>
        <label className={`flex items-center justify-between w-full px-6 py-3 rounded-full cursor-pointer transition-all bg-white shadow-inner focus-within:ring-4 focus-within:ring-black/10 ${file ? 'text-[#fcbf28]' : 'text-black/40'}`}>
          <div className="flex items-center gap-3">
            {file ? <CheckCircle2 size={20} /> : <Camera size={20} className="opacity-50" />}
            <span className="text-sm font-bold truncate max-w-[200px]">
              {file ? 'Voucher cargado' : 'Cámara / Archivo'}
            </span>
          </div>
          {!file && <div className="bg-zinc-100 p-1.5 rounded-full"><ImageIcon size={14} className="text-zinc-400"/></div>}
          <input type="file" className="hidden" accept="image/*" capture="environment" onChange={e => setFile(e.target.files?.[0] || null)} />
        </label>
      </div>

      <div className="pt-4 justify-center flex">
        <button 
          type="submit" disabled={loading || !file}
          className="w-44 py-3 bg-[#fcbf28] text-white rounded-full font-bold text-2xl shadow-2xl active:scale-95 transition-all disabled:opacity-50 uppercase"
        >
          {loading ? <Loader2 className="animate-spin mx-auto" /> : 'ENVIAR'}
        </button>
      </div>
    </form>
  )
}