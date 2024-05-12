import { inRange } from "./inRange";

export const coinFlip = () => {
    return !!inRange(0, 1);
};