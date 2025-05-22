import { useState } from "react";

interface BrregEnhet {
  navn: string;
  organisasjonsnummer: string;
  organisasjonsform: string | null;
  registreringsdatoEnhetsregisteret: string;
  naeringskode1: {
    kode: string | null;
    beskrivelse: string | null;
  };
}

export function useBrregSearch() {
  const [results, setResults] = useState<BrregEnhet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://data.brreg.no/enhetsregisteret/api/enheter?navn=${encodeURIComponent(query)}`
      );
      if (!res.ok) throw new Error("Kunne ikke hente data fra Brønnøysundregisteret.");
      const data = await res.json();
      
      // Transformer data til riktig format
      const enheter = (data._embedded?.enheter || []).map((enhet: any) => ({
        navn: enhet.navn,
        organisasjonsnummer: enhet.organisasjonsnummer,
        organisasjonsform: enhet.organisasjonsform?.beskrivelse || null,
        registreringsdatoEnhetsregisteret: enhet.registreringsdatoEnhetsregisteret,
        naeringskode1: {
          kode: enhet.naeringskode1?.kode || null,
          beskrivelse: enhet.naeringskode1?.beskrivelse || null
        }
      }));
      
      setResults(enheter);
    } catch (e) {
      setError("Noe gikk galt med søket.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search };
} 