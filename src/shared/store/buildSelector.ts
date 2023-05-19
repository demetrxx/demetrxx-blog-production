import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/store';

type Selector<T> = (state: StateSchema) => T;
type Result<T> = [() => T, Selector<T>]

// if sectors length > 1 => reselect
export function buildSelector<T>(selector: Selector<T>): Result<T> {
  const useSelectorHook = () => useSelector(selector);

  return [useSelectorHook, selector];
}