/**
 * A module reserved for grabbing the configuration from environment variables
 */

export const colors = {
  black: "#1E1D52",
  black1: "#000000",
  blue: "#eef5fd",
  blue1: "#6663FE",
  blue2: "#302beb",
  blue3: "#2885ef",
  blue4: "#ebf2fc",
  blue5: "#6663FE1A",
  blue6: "#539DF2",
  blue7: "#2884EF",
  grey: "#3F4254",
  grey1: "#ececee",
  grey2: "#3e4152",
  grey3: "#d9d8dd",
  grey4: "#A1A5B7",
  grey5: "#EBF2FC",
  grey6: "#0D2C50",
  grey7: "#00000088",
  grey8: "#3F425433",
  violet: "#dbdbff",
  violet1: "#6763fe",
  violet2: "#6463fd",
  violet3: "#f0efff",
  white: "#ffffff",
  red: "#bc0000",
  green: "#4BEE79",
  transparent: "#00000000",
  disabledBlue: "#d9e6fa",
  disabledHoverBlue: "#6096ef",
  tooltipShadow: "#0000000D",
};

export const ResponseStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export type ResponseStatusType =
  (typeof ResponseStatus)[keyof typeof ResponseStatus];
