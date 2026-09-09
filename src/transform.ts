import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { PROPERTY_MAP, VALUE_MAP } from './mappings';

export type RtlStyle = ViewStyle | TextStyle | ImageStyle;

/**
 * Converts physical style properties (marginLeft, textAlign: 'left', ...) on a
 * single style object into their RTL-safe logical equivalents. Only top-level
 * keys are inspected — nested objects (e.g. shadowOffset) are left untouched.
 */
export function transformStyle<T extends RtlStyle>(style: T): T {
  const result: Record<string, unknown> = {};
  const source = style as Record<string, unknown>;

  for (const key of Object.keys(source)) {
    const value = source[key];
    if (value === undefined || value === null) continue;

    const logicalKey = PROPERTY_MAP[key as keyof typeof PROPERTY_MAP] as
      | string
      | undefined;

    if (logicalKey) {
      if (logicalKey in source && source[logicalKey] !== undefined && source[logicalKey] !== null) {
        // Logical equivalent already present in the same object — it wins.
        if (typeof __DEV__ === 'undefined' || __DEV__) {
          console.warn(
            `[react-native-rtl-kit] Both "${key}" and "${logicalKey}" were provided in the same style. ` +
              `"${logicalKey}" will be used and "${key}" ignored.`
          );
        }
        continue;
      }
      result[logicalKey] = mapValue(key, value);
      continue;
    }

    result[key] = mapValue(key, value);
  }

  return result as T;
}

function mapValue(key: string, value: unknown): unknown {
  if (typeof value === 'string') {
    const valueMap = VALUE_MAP[key];
    if (valueMap && value in valueMap) {
      return valueMap[value];
    }
  }
  return value;
}

declare const __DEV__: boolean | undefined;
