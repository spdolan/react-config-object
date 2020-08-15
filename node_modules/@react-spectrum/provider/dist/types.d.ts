import { ProviderContext, ProviderProps } from "@react-types/provider";
import React from "react";
/**
 * Provider is the container for all React Spectrum applications.
 * It defines the theme, locale, and other application level settings,
 * and can also be used to provide common properties to a group of components.
 */
export let Provider: React.ForwardRefExoticComponent<ProviderProps & React.RefAttributes<import("@react-types/shared").DOMRefValue<HTMLDivElement>>>;
export function useProvider(): ProviderContext;
export function useProviderProps<T>(props: T): T;

//# sourceMappingURL=types.d.ts.map
