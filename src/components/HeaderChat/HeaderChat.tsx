import IconTimeCircle from "../Icons/IconTimeCircle";
import IconCloseCenter from "../Icons/IconCloseCenter";

export default function HeaderChat() {
  return (
    <div className="w-full h-12 bg-white px-4 border-b border-[#E6EAEF] flex-shrink-0">
      <div className="w-full h-full flex items-center justify-between">
        <p className="text-sm font-bold text-[#101820] leading-[18px]">Geor IA</p>
        <div className="h-full flex gap-1 items-center">
          <button className="px-[10px] py-[6px] text-xs text-[#0375F8] leading-4" type="button">Nuevo chat</button>
          <div className="p-[5px] text-black cursor-pointer">
            <IconTimeCircle />
          </div>
          <div className="p-[5px] text-black cursor-pointer">
            <IconCloseCenter />
          </div>
        </div>  
      </div>
    </div>
  )
}