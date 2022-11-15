import React, {useState, useMemo} from 'react';
import Loading from '../components/Loading/Loading';

const initialData = {
  isLoading: false,
  setLoading: () => {},
};

export const LoaderContext = React.createContext(initialData);

export const useLoaderContext = () => React.useContext(LoaderContext);

const Provider = ({children}) => {
  const [isLoading, setIsLoading] = useState(initialData.isLoading);

  const setLoading = next => {
    setIsLoading(next);
  };

  const initialValue = useMemo(
    () => ({
      isLoading,
      setLoading,
    }),
    [isLoading, setLoading],
  );
  return (
    <LoaderContext.Provider value={initialValue}>
      {isLoading && <Loading />}
      {children}
    </LoaderContext.Provider>
  );
};

export default {Provider, Consumer: LoaderContext.Consumer};
