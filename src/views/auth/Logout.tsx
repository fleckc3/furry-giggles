import useAuth from 'src/hooks/useAuth';

function Logout() {
  const { logout } = useAuth();
  logout();
  return <div>Logout</div>;
}

export default Logout;
