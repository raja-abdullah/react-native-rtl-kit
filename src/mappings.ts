/** Physical style property -> RTL-safe logical equivalent. */
export const PROPERTY_MAP = {
  marginLeft: 'marginStart',
  marginRight: 'marginEnd',
  paddingLeft: 'paddingStart',
  paddingRight: 'paddingEnd',
  borderLeftWidth: 'borderStartWidth',
  borderRightWidth: 'borderEndWidth',
  borderLeftColor: 'borderStartColor',
  borderRightColor: 'borderEndColor',
  borderTopLeftRadius: 'borderTopStartRadius',
  borderTopRightRadius: 'borderTopEndRadius',
  borderBottomLeftRadius: 'borderBottomStartRadius',
  borderBottomRightRadius: 'borderBottomEndRadius',
} as const;

export type PhysicalProperty = keyof typeof PROPERTY_MAP;
export type LogicalProperty = (typeof PROPERTY_MAP)[PhysicalProperty];

/** Style value -> RTL-safe logical value, keyed by property name. */
export const VALUE_MAP: Record<string, Record<string, string>> = {
  textAlign: {
    left: 'start',
    right: 'end',
  },
};
