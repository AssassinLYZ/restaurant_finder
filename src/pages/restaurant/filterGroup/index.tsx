import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';

import { debounce } from 'src/shared/utils';
import { RootState } from 'src/shared/store/store';
import { FILTERS, SORT_SELECT_OPTIONS } from 'src/shared/constant/restaurant';
import {
  resetFilters,
  setSearchFilter,
  setSortOption,
  SortOption,
  toggleFilter,
} from 'src/shared/store/restaurant/restaurantsSlice';

import {
  Container,
  FilterButton,
  FilterContainer,
  ResetButton,
  SearchSort,
  StyledInput,
  StyledSelect,
} from './styled';

export default function FilterGroup() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.restaurants.filters);
  const hasActiveFilters = Object.values(filters.activeFilters).some(Boolean);
  const [localSearch, setLocalSearch] = useState('');
  const handleSelectChange = (value: string | number) => {
    dispatch(setSortOption(value as SortOption));
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => dispatch(setSearchFilter(value)), 300),
    []
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, []);

  useEffect(() => {
    if (filters.searchQuery === '') setLocalSearch(filters.searchQuery);
  }, [filters.searchQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLocalSearch(value);
    debouncedSearch(value);
  };
  return (
    <Container>
      <SearchSort>
        <StyledInput
          label="Search By Name:"
          value={localSearch}
          endAdornment={<>🔍︎</>}
          onChange={handleChange}
          placeholder="Search by restrauant name ...."
        />
        <StyledSelect
          value={filters.sortBy}
          label="Sort By:"
          placeholder="Sort by..."
          options={[...SORT_SELECT_OPTIONS]}
          onChange={handleSelectChange}
        />
      </SearchSort>

      {/* </SelectContainer> */}
      <FilterContainer>
        {FILTERS.map((filter) => (
          <FilterButton
            key={filter.id}
            $active={filters.activeFilters[filter.id]}
            onClick={() => dispatch(toggleFilter(filter.id))}
            aria-pressed={filters.activeFilters[filter.id]}
          >
            {filter.label}
          </FilterButton>
        ))}

        {hasActiveFilters && (
          <ResetButton $active={false} onClick={() => dispatch(resetFilters())}>
            Clear X
          </ResetButton>
        )}
      </FilterContainer>
    </Container>
  );
}
