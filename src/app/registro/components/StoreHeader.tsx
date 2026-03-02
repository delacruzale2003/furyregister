import Image from 'next/image'

export default function StoreHeader() {
  return (
    <header className="text-center mb-9">
      {/* Contenedor del Logo con efecto flotante */}
      <div className="  rounded-[2rem] flex items-center justify-center mx-auto mb-5   transform transition-transform  duration-500 overflow-hidden p-5">
        <img 
          src="/logofurymoto.png" 
          alt="Fury Moto Logo" 
          className="w-full h-full object-contain"
        />
      </div>

      {/* Título de Campaña */}
      
      
      
    </header>
  )
}