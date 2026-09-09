# react-native-rtl-kit

Automatically convert physical React Native style properties into RTL-safe
logical properties.

## The problem

In React Native, physical style properties like `marginLeft` don't flip when
the layout switches to RTL (Arabic, Urdu, Hebrew). React Native provides
logical properties — `marginStart` / `marginEnd` — that do flip automatically,
but developers rarely use them in practice and end up writing conditionals
like this all over the codebase:

```js
const styles = StyleSheet.create({
  card: {
    ...(I18nManager.isRTL
      ? { marginRight: 16 }
      : { marginLeft: 16 }),
  },
});
```

`react-native-rtl-kit` lets you keep writing the physical properties you
already know, and converts them to their logical equivalents for you.

## Install

```sh
npm install react-native-rtl-kit
```

`react` and `react-native` are peer dependencies and are not bundled.

## Usage

**Before:**

```js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    marginLeft: 16,
    paddingRight: 8,
    textAlign: 'left',
    borderLeftWidth: 2,
  },
});
```

**After:**

```js
import { rtl } from 'react-native-rtl-kit';

const styles = rtl.create({
  card: {
    marginLeft: 16,      // -> marginStart: 16
    paddingRight: 8,     // -> paddingEnd: 8
    textAlign: 'left',   // -> textAlign: 'start'
    borderLeftWidth: 2,  // -> borderStartWidth: 2
  },
});
```

`styles` is a real `StyleSheet` object, produced by `StyleSheet.create`
underneath — use it exactly as you would today.

You can also transform a single style object without going through
`StyleSheet.create`, e.g. for unit tests or dynamic styles:

```js
import { transformStyle } from 'react-native-rtl-kit';

transformStyle({ marginLeft: 16 }); // { marginStart: 16 }
```

## Mapping table

| Physical property         | Logical property           |
| -------------------------- | --------------------------- |
| `marginLeft`               | `marginStart`               |
| `marginRight`               | `marginEnd`                 |
| `paddingLeft`               | `paddingStart`              |
| `paddingRight`              | `paddingEnd`                |
| `borderLeftWidth`           | `borderStartWidth`          |
| `borderRightWidth`          | `borderEndWidth`            |
| `borderLeftColor`           | `borderStartColor`          |
| `borderRightColor`          | `borderEndColor`            |
| `borderTopLeftRadius`       | `borderTopStartRadius`      |
| `borderTopRightRadius`      | `borderTopEndRadius`        |
| `borderBottomLeftRadius`    | `borderBottomStartRadius`   |
| `borderBottomRightRadius`   | `borderBottomEndRadius`     |
| `textAlign: 'left'`         | `textAlign: 'start'`        |
| `textAlign: 'right'`        | `textAlign: 'end'`          |

Rules applied while transforming a style object:

- Only top-level keys of each named style are inspected — nested objects
  (e.g. `shadowOffset`) are left untouched.
- `undefined` and `null` values are skipped.
- If a style already uses a logical property (e.g. `marginStart`), it is
  passed through untouched.
- If both a physical and its logical equivalent are present in the same
  style object, the logical one wins, the physical one is dropped, and a
  dev-only warning is logged.
- Anything not in the mapping table (including `flex`, `backgroundColor`,
  etc.) passes through unchanged.

## What this does NOT do

- It does **not** map `left` / `right` (position properties). They are
  ambiguous outside of absolute positioning and are intentionally left as-is
  in this version.
- It does **not** touch `writingDirection`.
- It does **not** provide an RTL context/provider, hooks, or components.
- It does **not** mirror icons or images.
- It does **not** handle i18n, translations, or language switching.
- It does **not** ship an ESLint rule.

These may be considered for future versions.
