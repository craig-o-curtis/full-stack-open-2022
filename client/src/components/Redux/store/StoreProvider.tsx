import { Provider } from 'react-redux';
import { configuredStore } from './store';

interface StoreProviderProps {
  children: React.ReactNode;
  //   store: any;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={configuredStore}>{children}</Provider>;
}
