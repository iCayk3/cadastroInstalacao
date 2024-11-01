import { useEffect, useState } from 'react';

const useFetchTecnico = (url) => {
  const [dataApiTecnico, setData] = useState(null);
  const [loadingTecnico, setLoading] = useState(true);
  const [errorTecnico, setError] = useState(null);

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

  return { dataApiTecnico, loadingTecnico, errorTecnico };
};

export default useFetchTecnico;