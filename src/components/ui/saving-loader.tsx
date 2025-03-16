import { MemoryStickIcon } from "lucide-react";

export default function SavingLoader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center  bg-opacity-75 backdrop-blur-sm z-50">
<MemoryStickIcon className="animate-spin rounded-full h-12 w-12 mb-2"/>
      <p className="text-xl font-semibold text-gray-700">Trwa zapisywanie...</p>
    </div>
  );
}