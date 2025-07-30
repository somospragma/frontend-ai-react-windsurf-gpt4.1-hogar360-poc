import React, { useState, useRef } from 'react';

export interface AutoCompleteSelectorProps<T extends { id?: string }> {
  readonly id: string;
  readonly options: T[];
  readonly getOptionLabel: (option: T) => string;
  readonly onSelect: (option: T) => void;
  readonly placeholder?: string;
  readonly value?: string;
  readonly onInput?: (value: string) => void;
  readonly onBlur?: () => void;
  readonly selectedOption?: T | null;
}

export function AutoCompleteSelector<T extends { id?: string }>({
  id,
  options,
  getOptionLabel,
  onSelect,
  placeholder = '',
  value = '',
  onInput,
  onBlur,
  selectedOption = null,
}: AutoCompleteSelectorProps<T>) {
  const [show, setShow] = useState(false);
  const [filtered, setFiltered] = useState<T[]>(options);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onInput?.(val);
    setShow(true);
    setFiltered(
      options.filter(opt =>
        getOptionLabel(opt).toLowerCase().includes(val.toLowerCase())
      )
    );
  };

  const handleSelect = (opt: T) => {
    onInput?.(getOptionLabel(opt));
    setShow(false);
    onSelect(opt);
  };

  return (
    <div className='relative'>
      <input
        id={id}
        ref={inputRef}
        type='text'
        value={value}
        onChange={handleInput}
        onFocus={() => setShow(true)}
        onBlur={onBlur}
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
          {filtered.map((opt: T) => {
            const key = opt.id ?? getOptionLabel(opt);
            const isSelected = selectedOption && (opt.id === selectedOption.id);
            return (
              <button
                key={key}
                type="button"
                role="option"
                aria-selected={!!isSelected}
                className={`w-full text-left px-3 py-2 hover:bg-blue-100 cursor-pointer${isSelected ? ' bg-purple-100' : ''}`}
                onClick={() => handleSelect(opt)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') handleSelect(opt);
                }}
              >
                {getOptionLabel(opt)}
              </button>
            );
          })}
        </ul>
      )}
    </div>
  );
}

