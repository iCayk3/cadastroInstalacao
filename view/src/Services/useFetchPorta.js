import { useEffect, useState } from 'react';

const useFetchPorta = (url) => {
  const [dataApiPorta, setData] = useState(null);
  const [loadingPorta, setLoading] = useState(true);
  const [errorPorta, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { dataApiPorta, loadingPorta, errorPorta };
};

export default useFetchPorta;