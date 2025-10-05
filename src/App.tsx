import { useEffect, useState, useRef } from 'react';
import HomePage from './pages/HomePage';
import FilePage from './pages/FilePage';

function App() {
  const [route, setRoute] = useState<{ page: 'home' | 'file'; fileCode?: string }>({ page: 'home' });
  const homeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = window.location.pathname;

    if (path.startsWith('/archive/')) {
      const fileCode = path.replace('/archive/', '');
      setRoute({ page: 'file', fileCode });
    } else {
      setRoute({ page: 'home' });
    }

    const handlePopState = () => {
      const newPath = window.location.pathname;
      if (newPath.startsWith('/archive/')) {
        const fileCode = newPath.replace('/archive/', '');
        if (homeRef.current) {
          sessionStorage.setItem('scrollPosition', homeRef.current.scrollTop.toString());
        }
        setRoute({ page: 'file', fileCode });
      } else {
        setRoute({ page: 'home' });
        setTimeout(() => {
          const savedPosition = sessionStorage.getItem('scrollPosition');
          if (savedPosition && homeRef.current) {
            homeRef.current.scrollTop = parseInt(savedPosition);
            sessionStorage.removeItem('scrollPosition');
          }
        }, 50);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <>
      <div ref={homeRef} style={{ display: route.page === 'home' ? 'block' : 'none' }}>
        <HomePage />
      </div>
      {route.page === 'file' && route.fileCode && (
        <FilePage fileCode={route.fileCode} />
      )}
    </>
  );
}

export default App;
