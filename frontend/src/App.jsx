import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './redux/authSlice';

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) return <div>Loading session...</div>;

  return (
    <div>
      <h1>Welcome {user ? user.name : 'Guest'}</h1>
      {/* Your routes/components */}
    </div>
  );
}

export default App;
