/**
 * Reference:
 * https://github.com/adamgiebl/neumorphism/blob/877c2ef172c492961135c707e2e4a77477690cd6/src/utils.js
 *
 * @param hex
 * @param lum
 * @returns
 */
export function colorLuminance(hex: string, lum: -1 | 1 = 1) {
  const luminance = 0.15 * lum;

  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // convert to decimal and change luminosity
  let rgb = '#',
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * luminance), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }

  return rgb;
}
