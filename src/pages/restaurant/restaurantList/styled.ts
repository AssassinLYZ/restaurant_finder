import styled from 'styled-components';

import RestaurantCard from '../restaurantCard';

export const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
    gap: ${(props) => props.theme.spacing.md};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    gap: ${(props) => props.theme.spacing.sm};
  }
`;

export const StyledRestaurantCard = styled(RestaurantCard)`
  width: calc(48% - ${(props) => props.theme.spacing.md});

  @media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
    width: 100%;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-bottom: ${(props) => props.theme.spacing.sm};
  }
`;
