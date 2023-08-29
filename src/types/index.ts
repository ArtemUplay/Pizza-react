import { store } from '../redux/store';
import { useDispatch } from 'react-redux';

// В данной строке typeof store.getState возвращает саму функцию, а ReturnType возвращает то, что возвращает функция
export type RootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<TAppDispatch>();
