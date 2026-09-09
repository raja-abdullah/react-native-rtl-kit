import { describe, expect, it, vi } from 'vitest';
import { transformStyle } from '../src/transform';

describe('transformStyle', () => {
  it('maps marginLeft/marginRight to marginStart/marginEnd', () => {
    expect(transformStyle({ marginLeft: 16 })).toEqual({ marginStart: 16 });
    expect(transformStyle({ marginRight: 8 })).toEqual({ marginEnd: 8 });
  });

  it('maps paddingLeft/paddingRight to paddingStart/paddingEnd', () => {
    expect(transformStyle({ paddingLeft: 16 })).toEqual({ paddingStart: 16 });
    expect(transformStyle({ paddingRight: 8 })).toEqual({ paddingEnd: 8 });
  });

  it('maps borderLeftWidth/borderRightWidth', () => {
    expect(transformStyle({ borderLeftWidth: 2 })).toEqual({ borderStartWidth: 2 });
    expect(transformStyle({ borderRightWidth: 3 })).toEqual({ borderEndWidth: 3 });
  });

  it('maps borderLeftColor/borderRightColor', () => {
    expect(transformStyle({ borderLeftColor: 'red' })).toEqual({ borderStartColor: 'red' });
    expect(transformStyle({ borderRightColor: 'blue' })).toEqual({ borderEndColor: 'blue' });
  });

  it('maps border corner radii', () => {
    expect(transformStyle({ borderTopLeftRadius: 4 })).toEqual({ borderTopStartRadius: 4 });
    expect(transformStyle({ borderTopRightRadius: 4 })).toEqual({ borderTopEndRadius: 4 });
    expect(transformStyle({ borderBottomLeftRadius: 4 })).toEqual({ borderBottomStartRadius: 4 });
    expect(transformStyle({ borderBottomRightRadius: 4 })).toEqual({ borderBottomEndRadius: 4 });
  });

  it('maps textAlign left/right to start/end', () => {
    expect(transformStyle({ textAlign: 'left' })).toEqual({ textAlign: 'start' });
    expect(transformStyle({ textAlign: 'right' })).toEqual({ textAlign: 'end' });
  });

  it('leaves textAlign: center untouched', () => {
    expect(transformStyle({ textAlign: 'center' })).toEqual({ textAlign: 'center' });
  });

  it('does not map left/right position properties', () => {
    expect(transformStyle({ left: 10, right: 20 })).toEqual({ left: 10, right: 20 });
  });

  it('leaves writingDirection untouched', () => {
    expect(transformStyle({ writingDirection: 'ltr' })).toEqual({ writingDirection: 'ltr' });
  });

  it('passes through unmapped properties unchanged', () => {
    expect(transformStyle({ flex: 1, backgroundColor: 'white' })).toEqual({
      flex: 1,
      backgroundColor: 'white',
    });
  });

  it('passes through already-logical properties unchanged', () => {
    expect(transformStyle({ marginStart: 16, paddingEnd: 8 })).toEqual({
      marginStart: 16,
      paddingEnd: 8,
    });
  });

  it('prefers the logical property when both physical and logical are present, and warns', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = transformStyle({ marginLeft: 16, marginStart: 24 } as any);

    expect(result).toEqual({ marginStart: 24 });
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0]?.[0]).toContain('marginLeft');

    warnSpy.mockRestore();
  });

  it('skips undefined and null values', () => {
    expect(
      transformStyle({ marginLeft: undefined, paddingRight: null, flex: 1 } as any)
    ).toEqual({ flex: 1 });
  });

  it('leaves nested style objects untouched', () => {
    const style = {
      shadowOffset: { width: 1, height: 2 },
    };
    expect(transformStyle(style as any)).toEqual({
      shadowOffset: { width: 1, height: 2 },
    });
  });

  it('handles an empty object', () => {
    expect(transformStyle({})).toEqual({});
  });
});
