import { StyleSheet } from 'react-native';
import type { RtlStyle } from './transform';
import { transformStyle } from './transform';

type NamedStyles<T> = { [P in keyof T]: RtlStyle };

/**
 * Drop-in replacement for `StyleSheet.create` that maps physical style
 * properties (marginLeft, paddingRight, textAlign: 'left', ...) to their
 * RTL-safe logical equivalents before handing the styles to React Native.
 */
export function create<T extends NamedStyles<T>>(
  styles: T
): ReturnType<typeof StyleSheet.create<T>> {
  const transformed = {} as T;
  for (const key of Object.keys(styles) as Array<keyof T>) {
    transformed[key] = transformStyle(styles[key]) as T[keyof T];
  }
  return StyleSheet.create(transformed);
}
