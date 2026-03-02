export default function SuccessView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-center p-4 animate-in fade-in duration-700">
      
      {/* Logo Superior */}
      <img 
        src="/logofurymoto.png" 
        alt="Logo Fury Moto" 
        className="h-16 w-auto mb-8 object-contain"
      />

      {/* Imagen Principal */}
      <img 
        src="/prizefury.png" 
        alt="Premio" 
        className="w-full max-w-sm mb-6 object-contain"
      />

      {/* Textos Inferiores */}
      <div className="flex flex-col ">
        <p className="text-md  text-white   ">
          Sorteos cada semana
        </p>
        <p className="text-md text-white  ">
          Imágenes referenciales*
        </p>
      </div>

    </div>
  )
}