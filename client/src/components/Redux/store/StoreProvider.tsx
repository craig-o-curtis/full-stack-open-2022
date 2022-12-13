import { Provider } from 'react-redux';
import { store } from './store';

interface StoreProviderProps {
  children: React.ReactNode;
  //   store: any;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
