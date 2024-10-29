import { useEffect, useState } from 'react';

const useFetchCto = (url) => {
  const [dataApiCto, setData] = useState(null);
  const [loadingCto, setLoading] = useState(true);
  const [errorCto, setError] = useState(null);

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

  return { dataApiCto, loadingCto, errorCto };
};

export default useFetchCto;