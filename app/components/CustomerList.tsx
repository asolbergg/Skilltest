import { useState } from "react";
import { CustomerCard } from "./CustomerCard";
import { Customer } from "../services/customerService";

interface CustomerListProps {
  customers: Customer[];
  onDeleteCustomer: (customerId: number) => void;
  isLoading: boolean;
}

export const CustomerList = ({ customers, onDeleteCustomer, isLoading }: CustomerListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (customer.note && customer.note.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12 w-full max-w-3xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Mine kunder</h2>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Søk i kunder..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200 transition text-black placeholder-gray-400 bg-gray-50 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              title="Tøm søk"
            >
              ×
            </button>
          )}
        </div>
      </div>
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center text-gray-500 py-4">
            Laster kunder...
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            {searchQuery ? "Ingen kunder funnet" : "Ingen kunder lagt til ennå"}
          </div>
        ) : (
          filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onDelete={() => onDeleteCustomer(customer.id)}
            />
          ))
        )}
      </div>
    </section>
  );
}; 