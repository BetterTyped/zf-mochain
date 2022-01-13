import React, {useState} from 'react';

interface IMainContext {
  ethAccount: string;
  sentPackets: number;
  canShare: boolean;
  carBrand: string;
  carType: string;
  canShareGeo: boolean;
  canShareWeather: boolean;
  setEthAccount?: (ethAccount: string) => void;
  setPackets?: (packets: number) => void;
  setCanShare?: (canShare: boolean) => void;
  setCarBrand?: (carBrand: string) => void;
  setCarType?: (carType: string) => void;
  setCanShareGeo?: (canShareGeo: boolean) => void;
  setCanShareWeather?: (canShareWeather: boolean) => void;
}

export const defaultValue = {
  ethAccount: '',
  sentPackets: 0,
  canShare: false,
  carBrand: '',
  carType: '',
  canShareGeo: false,
  canShareWeather: false,
};

export const MainContext = React.createContext<IMainContext>(defaultValue);

// @ts-ignore
export const MainContextProvider = ({children}) => {
  const [ethAccount, setEthAccount] = useState('');
  const [sentPackets, setPackets] = useState(0);
  const [canShare, setCanShare] = useState(false);
  const [carType, setCarType] = useState('');
  const [carBrand, setCarBrand] = useState('');
  const [canShareGeo, setCanShareGeo] = useState(false);
  const [canShareWeather, setCanShareWeather] = useState(false);
  return (
    <MainContext.Provider
      value={{
        ethAccount,
        sentPackets,
        canShare,
        carType,
        carBrand,
        canShareGeo,
        canShareWeather,
        setEthAccount,
        setPackets,
        setCanShare,
        setCarType,
        setCarBrand,
        setCanShareGeo,
        setCanShareWeather,
      }}>
      {children}
    </MainContext.Provider>
  );
};
