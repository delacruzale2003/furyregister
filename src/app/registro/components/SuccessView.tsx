import { CheckCircle2 } from 'lucide-react'

export default function SuccessView() {
  return (
    <div className="text-center animate-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl mb-8">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={64} strokeWidth={2.5} />
        </div>
        
        <h2 className="text-4xl font-black text-zinc-900 mb-4 tracking-tighter uppercase leading-none">
          ¡Registro <br /> Exitoso!
        </h2>
        
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">
          Ya estás participando en el sorteo.
        </p>
      </div>

      <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.4em]">
        Mucha Suerte
      </p>
    </div>
  )
}