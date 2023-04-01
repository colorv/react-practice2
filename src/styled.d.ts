import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    black: {
      bgColor: string;
      darker: string;
      lighter: string;
      period: string;
    };
    white: {
      lighter: string;
      darker: string;
      hover: string;
    };
    green: {
      vote_average: string;
    };
    pagination: {
      default: string;
      selected: string;
    };
  }
}
