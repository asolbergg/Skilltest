import { useState, useEffect } from "react";

interface CustomerFormProps {
  companyName: string;
  onSave: (note: string) => void;
  onCancel: () => void;
  isVisible: boolean;
}

export const CustomerForm = ({ companyName, onSave, onCancel, isVisible }: CustomerFormProps) => {
  const [note, setNote] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsMounted(true);
    } else {
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(note);
    setNote("");
  };

  if (!isMounted && !isVisible) return null;

  return (
    <div 
      className={`flex-1 flex items-center justify-center transition-all duration-300 ease-in-out ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}
    >
      <div className="border border-gray-200 bg-gray-50 rounded-xl p-6 w-full max-w-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold text-gray-700">{companyName}</div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="mb-2 text-gray-600">Notat</div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full flex-grow border border-gray-300 rounded-lg p-2 mb-4 resize-none text-black placeholder-gray-400 bg-white shadow-sm focus:ring-2 focus:ring-blue-100 outline-none"
            placeholder="Legg til et notat om kunden her ..."
            autoFocus
          />
          <div className="flex justify-between gap-2">
            <button 
              type="button"
              onClick={onCancel}
              className="border border-gray-300 rounded-lg px-4 py-1 bg-white hover:bg-gray-100 transition text-gray-700 shadow-sm"
            >
              Tilbake
            </button>
            <button 
              type="submit"
              className="border border-blue-500 rounded-lg px-4 py-1 bg-blue-500 text-white hover:bg-blue-600 transition shadow-sm"
            >
              Lagre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 