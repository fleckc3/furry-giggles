import { createContext, useState, useContext } from "react";

const DataContext = createContext({});

export const DataProvider = ({ defaultValues, children }: any) => {
  const [data, setData] = useState(defaultValues);

  const setValues = (values: any) => {
    setData((prevData: any) => ({
      ...prevData,
      ...values,
    }));
  };

  return (
    <DataContext.Provider value={{ data, setValues }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
