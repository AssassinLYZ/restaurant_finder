import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { RootState } from 'src/shared/store/store';
import Loading from 'src/shared/components/loading';
import Pagination from 'src/shared/components/pagination';
import {
  clearAllFilters,
  fetchStart,
  setCurrentPage,
} from 'src/shared/store/restaurant/restaurantsSlice';
import {
  selectFilteredRestaurants,
  selectPaginatedRestaurants,
  selectPaginationMeta,
} from 'src/shared/store/restaurant/selector';

import EmptyList from './emptyList';
import FilterGroup from './filterGroup';
import RestaurantList from './restaurantList';
import ErrorView from '../../shared/components/ErrorView';

export default function MainPage() {
  const routerParams = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, data, loading, postcode } = useSelector((state: RootState) => state.restaurants);
  const filteredRestaurants = useSelector(selectFilteredRestaurants);
  const paginatedRestaurants = useSelector(selectPaginatedRestaurants);
  const pagination = useSelector(selectPaginationMeta);

  useEffect(() => {
    if (routerParams.id === postcode) return;
    dispatch(fetchStart(routerParams.id!));
  }, [dispatch]);
  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(setCurrentPage(page));
  };

  if (error) {
    return (
      <ErrorView
        error={error}
        onAction={() => {
          navigate('/main');
        }}
        action="Home Page"
      />
    );
  }

  return (
    <>
      <FilterGroup />

      <Title>{filteredRestaurants.length} Restaurants in total </Title>
      {loading && <Loading fullScreen />}

      {!loading && (
        <RestaurantList
          restaurants={paginatedRestaurants}
          pageSize={pagination.pageSize}
          currentPage={pagination.currentPage}
        />
      )}

      {!loading && data.length !== 0 && filteredRestaurants.length === 0 && (
        <EmptyList
          action="Clear Filters"
          description=" We couldn't find any matches for your current filters."
          onAction={() => dispatch(clearAllFilters())}
        />
      )}

      {!loading && data.length === 0 && (
        <EmptyList
          action="Go Home page"
          description=" We couldn't find any matches with your current postcode."
          onAction={() => navigate('/main')}
        />
      )}

      <StyledPagination
        onPageChange={handlePageChange}
        currentPage={pagination.currentPage}
        totalPages={Math.ceil(filteredRestaurants.length / pagination.pageSize)}
      />
    </>
  );
}

const StyledPagination = styled(Pagination)`
  margin: 40px auto;
`;

const Title = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;
