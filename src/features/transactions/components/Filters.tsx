import Button from '@/components/Button';
import Card from '@/components/Card';
import Dropdown from '@/components/Dropdown';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoFilterSharp } from 'react-icons/io5';
import { MdOutlineCalendarToday } from 'react-icons/md';
import type { SetURLSearchParams } from 'react-router';

type FiltersProps = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export default function Filters({
  searchParams,
  setSearchParams,
}: FiltersProps) {
  const [localSearch, setLocalSearch] = useState(
    searchParams.get('search') || '',
  );
  const [localStartDate, setLocalStartDate] = useState(
    searchParams.get('startDate') || '',
  );
  const [localEndDate, setLocalEndDate] = useState(
    searchParams.get('endDate') || '',
  );

  const debouncedSearch = useDebounce(localSearch, 500);
  const debouncedStartDate = useDebounce(localStartDate, 500);
  const debouncedEndDate = useDebounce(localEndDate, 500);

  // Effect untuk update URL Search
  useEffect(() => {
    const currentUrlSearch = searchParams.get('search') || '';
    if (debouncedSearch !== currentUrlSearch) {
      setSearchParams((prev) => {
        if (debouncedSearch) {
          prev.set('search', debouncedSearch);
        } else {
          prev.delete('search');
        }
        prev.set('_page', '1');
        return prev;
      });
    }
  }, [debouncedSearch, searchParams, setSearchParams]);

  // Effect untuk update URL Start Date
  useEffect(() => {
    const currentStartDate = searchParams.get('startDate') || '';
    if (debouncedStartDate !== currentStartDate) {
      setSearchParams((prev) => {
        if (debouncedStartDate) {
          prev.set('startDate', debouncedStartDate);
        } else {
          prev.delete('startDate');
        }
        prev.set('_page', '1');
        return prev;
      });
    }
  }, [debouncedStartDate, searchParams, setSearchParams]);

  // Effect untuk update URL End Date
  useEffect(() => {
    const currentEndDate = searchParams.get('endDate') || '';
    if (debouncedEndDate !== currentEndDate) {
      setSearchParams((prev) => {
        if (debouncedEndDate) {
          prev.set('endDate', debouncedEndDate);
        } else {
          prev.delete('endDate');
        }
        prev.set('_page', '1');
        return prev;
      });
    }
  }, [debouncedEndDate, searchParams, setSearchParams]);

  return (
    <Card variant="variant-2" className="mb-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Input Search */}
        <Input
          icon={<AiOutlineSearch className="h-5 w-auto" />}
          type="text"
          placeholder="Filter by ID or Customer..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />

        {/* Status */}
        <Select
          value={searchParams.get('status') || ''}
          onValueChange={(value) => {
            setSearchParams((prev) => {
              if (value) {
                prev.set('status', value);
              } else {
                prev.delete('status');
              }
              prev.set('_page', '1');
              return prev;
            });
          }}
          placeholder="All Statuses"
          options={[
            { value: '', label: 'All Statuses' },
            { value: 'success', label: 'Success' },
            { value: 'pending', label: 'Pending' },
            { value: 'failed', label: 'Failed' },
          ]}
        />

        {/* Dropdown Date */}
        <div className="relative">
          {localStartDate || localEndDate ? (
            <div className="size-3 bg-red-500 rounded-full absolute -top-0.5 -right-0.5 z-10"></div>
          ) : null}
          <Dropdown
            title="Date"
            icon={<MdOutlineCalendarToday />}
            triggerClasses="bg-[#0E0E10] focus:border-[#5f5e72] duration-200 px-3.5 py-2 rounded-lg border border-secondary"
            iconCaretDownClasses="text-body-text-muted absolute right-3 transform -translate-y-1/2 top-1/2"
            align="center"
          >
            <div className="flex flex-col sm:flex-row items-center gap-2 text-body-text-muted">
              <Input
                type="date"
                value={localStartDate}
                onChange={(e) => setLocalStartDate(e.target.value)}
              />
              <p>to</p>
              <Input
                type="date"
                value={localEndDate}
                onChange={(e) => setLocalEndDate(e.target.value)}
              />
            </div>
          </Dropdown>
        </div>

        <div className="flex gap-4 shrink-0">
          {/* Methods */}
          <Select
            value={searchParams.get('method') || ''}
            onValueChange={(value) => {
              setSearchParams((prev) => {
                if (value) {
                  prev.set('method', value);
                } else {
                  prev.delete('method');
                }
                prev.set('_page', '1');
                return prev;
              });
            }}
            placeholder="All Methods"
            options={[
              { value: '', label: 'All Methods' },
              { value: 'PayPal', label: 'PayPal' },
              { value: 'QRIS', label: 'QRIS' },
              { value: 'Wire Transfer', label: 'Wire Transfer' },
              { value: 'Visa Card', label: 'Visa Card' },
              { value: 'Credit Card', label: 'Credit Card' },
            ]}
          />

          {/* Other filters */}
          <Button className="bg-[#0E0E10]! focus:border-[#5f5e72]! duration-200 gap-2 px-3.5 py-2 rounded-lg flex-none">
            <IoFilterSharp className="h-4.5 w-auto" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
