import { Customer } from "../services/customerService";

interface CustomerCardProps {
  customer: Customer;
  onDelete: () => void;
}

export const CustomerCard = ({ customer, onDelete }: CustomerCardProps) => {
  const formattedDate = new Date(customer.createdAt).toLocaleDateString('nb-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex items-center border border-gray-200 rounded-lg px-4 py-3 justify-between bg-gray-50 hover:bg-blue-50 transition shadow-sm group">
      <div className="flex-1">
        <div className="font-medium text-gray-900">{customer.name}</div>
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-gray-500 mt-1">
          {customer.organizationNumber && (
            <span>Org.nr: {customer.organizationNumber}</span>
          )}
          {customer.industryDescription && (
            <span>• {customer.industryDescription}</span>
          )}
        </div>
        {customer.note && (
          <div className="text-sm text-gray-500 mt-1 line-clamp-1">{customer.note}</div>
        )}
        <div className="text-xs text-gray-400 mt-1">Lagt til {formattedDate}</div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onDelete}
          className="text-xl text-red-400 hover:text-red-500 transition-colors"
          title="Slett kunde"
        >
          ×
        </button>
      </div>
    </div>
  );
}; 