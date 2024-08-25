import { Interfaces } from "./interfaces";

export namespace Utils {
    export const OutputFile = (path: string): string => {
        return `/output/${path}`
    }

    export const TierName = (sku: string): string => {
        return sku === Interfaces.TIER_BASIC
           ? "Basic"
           : "Premium"
    }
}