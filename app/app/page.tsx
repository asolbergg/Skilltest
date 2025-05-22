"use client";

import { useState, useEffect } from "react";
import { BrregSearch } from "../components/BrregSearch";
import { CustomerForm } from "../components/CustomerForm";
import { CustomerList } from "../components/CustomerList";
import { customerService, Customer } from "../services/customerService";

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

export default function Home() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setIsLoading(true);
      const data = await customerService.getAllCustomers();
      setCustomers(data);
      setError(null);
    } catch (err) {
      setError('Kunne ikke laste kunder. Prøv igjen senere.');
      console.error('Feil ved lasting av kunder:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setShowCustomerForm(true);
  };

  const handleSaveCustomer = async (note: string) => {
    if (selectedCompany) {
      try {
        const newCustomer = await customerService.createCustomer({
          name: selectedCompany.navn,
          note,
          organizationNumber: selectedCompany.organisasjonsnummer,
          industryCode: selectedCompany.naeringskode1?.kode || undefined,
          industryDescription: selectedCompany.naeringskode1?.beskrivelse || undefined
        });
        setCustomers([...customers, newCustomer]);
        setShowCustomerForm(false);
        setSelectedCompany(null);
        setError(null);
      } catch (err) {
        setError('Kunne ikke lagre kunde. Prøv igjen senere.');
        console.error('Feil ved lagring av kunde:', err);
      }
    }
  };

  const handleCancelCustomerForm = () => {
    setShowCustomerForm(false);
    setSelectedCompany(null);
  };

  const handleDeleteCustomer = async (customerId: number) => {
    try {
      await customerService.deleteCustomer(customerId);
      setCustomers(customers.filter(customer => customer.id !== customerId));
      setError(null);
    } catch (err) {
      setError('Kunne ikke slette kunde. Prøv igjen senere.');
      console.error('Feil ved sletting:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex flex-col items-center justify-center py-16 text-black font-sans">
      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {/* søk etter kunde */}
      <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12 mb-12 w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-10 tracking-tight">Søk etter ny kunde</h1>
        <div className={`flex flex-col gap-10 transition-all duration-300 ease-in-out`}>
          <div className={`transition-all duration-300 ease-in-out ${showCustomerForm ? 'hidden' : 'w-full'}`}>
            <BrregSearch onSelectCompany={handleCompanySelect} />
          </div>
          <div className={`transition-all duration-300 ease-in-out ${showCustomerForm ? 'w-full opacity-100 translate-x-0' : 'w-full opacity-0 translate-x-4 pointer-events-none'}`}>
            <CustomerForm
              companyName={selectedCompany?.navn || ""}
              onSave={handleSaveCustomer}
              onCancel={handleCancelCustomerForm}
              isVisible={showCustomerForm}
            />
          </div>
        </div>
      </section>

      {/* mine kunder */}
      <CustomerList
        customers={customers}
        onDeleteCustomer={handleDeleteCustomer}
        isLoading={isLoading}
      />
    </div>
  );
}
