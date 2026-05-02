import { List, Clock, CheckCircle, XCircle } from 'lucide-react';

interface FilterBarProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  totalCount: number;
}

export const FilterBar = ({ currentFilter, onFilterChange, totalCount }: FilterBarProps) => {
  const filters = [
    { value: 'all', label: 'Todos', icon: List },
    { value: 'pending', label: 'Pendientes', icon: Clock },
    { value: 'completed', label: 'Completados', icon: CheckCircle },
    { value: 'failed', label: 'Fallidos', icon: XCircle },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Filtrar por estado</h3>
        <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {totalCount} registros
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <button
              key={filter.value}
              className={`px-6 py-3 border-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                currentFilter === filter.value
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg'
                  : 'border-gray-300 bg-white text-gray-900 hover:border-indigo-500 hover:bg-indigo-50'
              }`}
              onClick={() => onFilterChange(filter.value)}
            >
              <Icon className="w-5 h-5" />
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
