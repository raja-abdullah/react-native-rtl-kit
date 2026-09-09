# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-09-09

### Added

- `rtl.create(styles)` — drop-in replacement for `StyleSheet.create` that
  maps physical style properties to their RTL-safe logical equivalents
  before handing them to React Native.
- `transformStyle(style)` — the underlying single-style transform, exported
  standalone so it can be used or tested without going through
  `StyleSheet.create`.
- Property mappings: `marginLeft`/`marginRight`, `paddingLeft`/`paddingRight`,
  `borderLeftWidth`/`borderRightWidth`, `borderLeftColor`/`borderRightColor`,
  `borderTopLeftRadius`/`borderTopRightRadius`,
  `borderBottomLeftRadius`/`borderBottomRightRadius`.
- Value mapping: `textAlign: 'left' | 'right'` → `'start' | 'end'`.
- Already-logical properties pass through untouched; when both a physical
  property and its logical equivalent are present on the same style object,
  the logical one wins and a dev-only warning is logged.
- `left` / `right` (position properties) and `writingDirection` are
  intentionally left unmapped.

[0.1.0]: https://github.com/raja-abdullah/react-native-rtl-kit/releases/tag/v0.1.0
