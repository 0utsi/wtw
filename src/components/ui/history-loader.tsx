

export default function HistoryLoader() {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center  bg-opacity-75 backdrop-blur-sm z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-2" />
        <p className="text-lg font-medium text-gray-700">Trwa zapisywanie</p> 
      </div>
    );
  }