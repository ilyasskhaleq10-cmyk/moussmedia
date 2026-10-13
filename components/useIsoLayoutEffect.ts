import { useEffect, useLayoutEffect } from "react";

// useLayoutEffect en el navegador, useEffect durante el build estático
export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
