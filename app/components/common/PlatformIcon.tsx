import { Monitor, Smartphone } from 'lucide-react';
import { Platform } from '../../data/projects';

interface PlatformIconProps {
  platform: Platform;
  showLabel?: boolean;
  variant?: 'pill' | 'bullet';
}

const ICON_SIZE = 14;
const BULLET_ICON_SIZE = 14;

const platformConfig = {
  [Platform.Desktop]: {
    label: 'DESKTOP',
    ariaLabel: 'Desktop platform only',
    pillClasses: 'bg-sky-950/60 border-sky-700/50 text-sky-400',
    bulletColor: 'text-sky-400',
  },
  [Platform.Mobile]: {
    label: 'MOBILE APP',
    ariaLabel: 'Mobile app',
    pillClasses: 'bg-violet-950/60 border-violet-700/50 text-violet-400',
    bulletColor: 'text-violet-400',
  },
  [Platform.Both]: {
    label: 'RESPONSIVE',
    ariaLabel: 'Responsive design - works on all devices',
    pillClasses: 'bg-emerald-950/60 border-emerald-700/50 text-emerald-400',
    bulletColor: 'text-emerald-400',
  },
};

const pillBase =
  'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono tracking-widest uppercase whitespace-nowrap flex-shrink-0 border';

export default function PlatformIcon({
  platform,
  showLabel = true,
  variant = 'pill',
}: PlatformIconProps) {
  const config = platformConfig[platform];

  if (!config) return null;

  if (variant === 'bullet') {
    const inner =
      platform === Platform.Both ? (
        <span className="inline-flex items-center gap-0.5" aria-hidden="true">
          <Monitor size={BULLET_ICON_SIZE} strokeWidth={2} aria-hidden="true" />
          <Smartphone size={BULLET_ICON_SIZE} strokeWidth={2} aria-hidden="true" />
        </span>
      ) : platform === Platform.Mobile ? (
        <Smartphone size={BULLET_ICON_SIZE} strokeWidth={2} aria-hidden="true" />
      ) : (
        <Monitor size={BULLET_ICON_SIZE} strokeWidth={2} aria-hidden="true" />
      );

    return (
      <span
        aria-label={config.ariaLabel}
        role="img"
        className={`inline-flex items-center shrink-0 ${config.bulletColor}`}
      >
        {inner}
      </span>
    );
  }

  if (platform === Platform.Desktop) {
    return (
      <span className={`${pillBase} ${config.pillClasses}`} aria-label={config.ariaLabel} role="img">
        <Monitor size={ICON_SIZE} strokeWidth={2} aria-hidden="true" />
        {showLabel && (
          <span aria-hidden="true">{config.label}</span>
        )}
      </span>
    );
  }

  if (platform === Platform.Mobile) {
    return (
      <span className={`${pillBase} ${config.pillClasses}`} aria-label={config.ariaLabel} role="img">
        <Smartphone size={ICON_SIZE} strokeWidth={2} aria-hidden="true" />
        {showLabel && (
          <span aria-hidden="true">{config.label}</span>
        )}
      </span>
    );
  }

  if (platform === Platform.Both) {
    return (
      <span className={`${pillBase} ${config.pillClasses}`} aria-label={config.ariaLabel} role="img">
        <span className="inline-flex items-center gap-0.5" aria-hidden="true">
          <Monitor size={ICON_SIZE} strokeWidth={2} aria-hidden="true" />
          <Smartphone size={ICON_SIZE} strokeWidth={2} aria-hidden="true" />
        </span>
        {showLabel && (
          <span aria-hidden="true">{config.label}</span>
        )}
      </span>
    );
  }

  return null;
}
