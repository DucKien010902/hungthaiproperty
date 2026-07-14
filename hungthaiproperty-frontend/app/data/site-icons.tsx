import type { SVGProps } from "react";

type SiteIconProps = SVGProps<SVGSVGElement>;

export function BrandRibbonIcon(props: SiteIconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22" />
      <path d="m12 18 2.57-3.5" />
      <path d="M6.243 9.016a7 7 0 0 1 11.507-.009" />
      <path d="M9.35 14.53 12 11.22" />
      <path d="M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z" />
    </svg>
  );
}

export function MissionHandshakeIcon(props: SiteIconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </svg>
  );
}

export function VisionGoalIcon(props: SiteIconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 13V2l8 4-8 4" />
      <path d="M20.561 10.222a9 9 0 1 1-12.55-5.29" />
      <path d="M8.002 9.997a5 5 0 1 0 8.9 2.02" />
    </svg>
  );
}

export function CoreValuesQueenIcon(props: SiteIconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      <path d="m12.474 5.943 1.567 5.34a1 1 0 0 0 1.75.328l2.616-3.402" />
      <path d="m20 9-3 9" />
      <path d="m5.594 8.209 2.615 3.403a1 1 0 0 0 1.75-.329l1.567-5.34" />
      <path d="M7 18 4 9" />
      <circle cx="12" cy="4" r="2" />
      <circle cx="20" cy="7" r="2" />
      <circle cx="4" cy="7" r="2" />
    </svg>
  );
}

export const siteIcons = {
  "brand-ribbon": BrandRibbonIcon,
  "mission-handshake": MissionHandshakeIcon,
  "vision-goal": VisionGoalIcon,
  "core-values-queen": CoreValuesQueenIcon,
} as const;

export type SiteIconKey = keyof typeof siteIcons;
