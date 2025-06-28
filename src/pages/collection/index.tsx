import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/shared/store/store';
import  Button  from 'src/shared/components/button';
import { logout } from 'src/shared/store/user/userSlice';

import  EmptyList  from '../restaurant/emptyList';
import RestaurantList from '../restaurant/restaurantList';

export default function Collection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const collectedRestaurants = useSelector((state: RootState) => state.user.collectedRestaurants);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('accessToken')
    navigate('/main');
  };
  return (
    <>
      {Object.keys(collectedRestaurants).length === 0 && (
        <EmptyList description="You don't have any collected restaurants." />
      )}
      {Object.entries(collectedRestaurants).map(([postcode, restaurants]) => (
        <div key={postcode}>
          {restaurants.length !== 0 && <h3>Postcode: {postcode}</h3>}
          <RestaurantList restaurants={restaurants} />
        </div>
      ))}
      <Button onClick={handleLogout}> Logout </Button>
    </>
  );
}
