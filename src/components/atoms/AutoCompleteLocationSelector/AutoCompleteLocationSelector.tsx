import React, { useState, useRef } from 'react';
import type { Departamento, Ciudad, Location } from '../../../shared/interfaces/types.d.ts';

interface AutoCompleteLocationSelectorProps {
  id: string;
  departamentos: Departamento[];
  ciudades: Ciudad[];
  onSelect: (loc: Location) => void;
  placeholder?: string;
  selectedOption?: Location | null;
  inputValue?: string;
  onInputChange?: (value: string) => void;
}

export const AutoCompleteLocationSelector: React.FC<AutoCompleteLocationSelectorProps> = ({
  id,
  departamentos,
  ciudades,
  onSelect,
  placeholder = '',
  selectedOption = null,
  inputValue,
  onInputChange,
}) => {
  const [internalInput, setInternalInput] = useState('');
  const input = inputValue ?? internalInput;
  const setInput = onInputChange ?? setInternalInput;
  const [show, setShow] = useState(false);
  const [filtered, setFiltered] = useState<Ciudad[]>(ciudades);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    setShow(true);
    setFiltered(
      ciudades.filter(city =>
        city.nombre.toLowerCase().includes(val.toLowerCase()) ||
        city.descripcion.toLowerCase().includes(val.toLowerCase())
      )
    );
  };

  const handleSelect = (city: Ciudad) => {
    const departamento = departamentos.find(dep => dep.id === city.idDepartamento);
    if (!departamento) return;
    const loc: Location = {
      id: `${departamento.id}-${city.id}`,
      name: city.nombre,
      neighborhood: '',
      descripcion: city.descripcion,
      departamento,
      ciudad: city,
    };
    setInput(city.nombre);
    setShow(false);
    onSelect(loc);
  };

  return (
    <div className='relative'>
      <input
        id={id}
        ref={inputRef}
        type='text'
        value={input}
        onChange={handleInput}
        onFocus={() => setShow(true)}
        placeholder={placeholder}
        className='w-full border rounded px-3 py-2'
        autoComplete='off'
        aria-autocomplete='list'
        aria-controls={`${id}-listbox`}
      />
      {show && filtered.length > 0 && (
        <ul
          id={`${id}-listbox`}
          className='absolute z-10 bg-white border w-full mt-1 rounded shadow max-h-48 overflow-auto'
        >
          {filtered.map((city) => (
            <button
              key={city.id}
              type="button"
              role="option"
              aria-selected={selectedOption?.id === city.id}
              className={`w-full text-left px-3 py-2 hover:bg-blue-100 cursor-pointer${selectedOption?.id === city.id ? ' bg-purple-100' : ''}`}
              onClick={() => handleSelect(city)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') handleSelect(city);
              }}
            >
              {city.nombre} <span className='text-xs text-gray-500'>({departamentos.find(dep => dep.id === city.idDepartamento)?.nombre})</span>
            </button>
          ))}
        </ul>
      )}
    </div>
  );
};
