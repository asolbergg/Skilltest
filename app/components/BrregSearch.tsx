import { useState } from "react";
import { useBrregSearch } from "../hooks/useBrregSearch";

interface Company {
  navn: string;
  organisasjonsnummer: string;
  organisasjonsform: string | null;
  registreringsdatoEnhetsregisteret: string;
  naeringskode1: {
    kode: string | null;
    beskrivelse: string | null;
  };
}

interface BrregSearchProps {
  onSelectCompany: (company: Company) => void;
}

export const BrregSearch = ({ onSelectCompany }: BrregSearchProps) => {
  const [query, setQuery] = useState("");
  const { results, loading, error, search } = useBrregSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      search(query.trim());
    }
  };

  return (
    <div className="flex-1">
      <div className="text-xs text-gray-500 mb-2 font-medium">Søk i Brønnøysundsregisteret</div>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Søk etter firma ..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200 transition text-black placeholder-gray-400 bg-gray-50 shadow-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition whitespace-nowrap"
          onClick={handleSearch}
        >
          {loading ? "Søker..." : "Søk"}
        </button>
      </div>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <div className="rounded-lg bg-white border-l border-r border-b border-gray-200 overflow-y-auto max-h-[300px]">
        {results.map((enhet, idx) => (
          <button 
            key={idx} 
            className="w-full text-left flex items-center px-4 py-3 hover:bg-blue-50 transition-colors cursor-pointer last:border-b-0"
            onClick={() => onSelectCompany(enhet)}
          >
            <div className="flex-1">
              <div className="text-gray-700">{enhet.navn}</div>
              <div className="text-sm text-gray-500 mt-1">
                {enhet.organisasjonsform && (
                  <span className="mr-2">{enhet.organisasjonsform}</span>
                )}
                {enhet.naeringskode1?.beskrivelse && (
                  <span>{enhet.naeringskode1.beskrivelse}</span>
                )}
              </div>
            </div>
            <span className="ml-auto text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}; 