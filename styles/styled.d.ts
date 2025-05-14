import "styled-components";
import type { ThemeColors, FontSizes } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ThemeColors;
    fontSizes: FontSizes;
  }
}
