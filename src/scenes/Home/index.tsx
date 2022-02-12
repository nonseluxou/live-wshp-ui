import { useAuth } from '../../modules/auth';

export const Home = () => {
  const { signOutUrl } = useAuth();
  return (
    <>
      <a href={signOutUrl}>Sign out</a>
    </>
  );
};
