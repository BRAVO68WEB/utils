import figures from "figures";
import colors from "picocolors";

import type { Color, Fn2 as Fn } from "../types";
import { createBadge, createIcon, formatMessage } from "./utils";

export interface OptionsFancy {
  /** Log target. A function that accepts a string */
  target?: Fn;
  /** Log text color, default to bgColor */
  textColor?: Color;
  /** An option if the log type should be shown as a badge */
  isBadge?: boolean;
  /** Trailing newline */
  newline?: boolean;
}

export function createFancyFormatter(
  iconOrType: string,
  iconColor: Color,
  { target = console.log, textColor, isBadge, newline }: OptionsFancy = {},
) {
  const iconFormatter = isBadge ? createBadge : createIcon;

  const textColorFormatter = textColor ? colors[textColor] : colors[iconColor];

  return (...messages: any[]) => {
    const formattedMessages = formatMessage(messages);
    const icon = iconFormatter(iconOrType, iconColor);
    for (const message of formattedMessages) {
      target(`${icon} ${textColorFormatter(message)}${newline ? "\n" : ""}`);
    }
  };
}

export const logFancy = createFancyFormatter(figures.pointer, "gray");
export const infoFancy = createFancyFormatter(figures.info, "blue", {
  target: console.info,
});
export const warnFancy = createFancyFormatter(figures.warning, "yellow", {
  target: console.warn,
});
export const successFancy = createFancyFormatter(figures.tick, "green");
export const errorFancy = createFancyFormatter("error", "red", {
  target: console.error,
  isBadge: true,
});