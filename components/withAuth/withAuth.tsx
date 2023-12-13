
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const withAuth = (WrappedComponent: React.FC) => {
  const Wrapper: React.FC = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'loading') {
        // Session is loading, do nothing
        return;
      }

      if (!session) {
        // User is not authenticated, redirect to login page
        router.replace('/login');
      }
    }, [session, status, router]);

    if (status === 'loading') {
      // You can add a loading indicator here if needed
      return <div>Loading...</div>;
    }

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };

  // Forward the display name to help with debugging
  Wrapper.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

  return Wrapper;
};
