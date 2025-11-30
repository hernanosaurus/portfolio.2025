import { Monitor, Smartphone } from 'lucide-react';
import { Platform } from '../../data/projects';

interface PlatformIconProps {
  platform: Platform;
  className?: string;
  showLabel?: boolean;
}

const ICON_SIZE = 14;

const platformConfig = {
  [Platform.Desktop]: {
    label: 'Desktop',
    ariaLabel: 'Desktop platform only',
  },
  [Platform.Mobile]: {
    label: 'Mobile App',
    ariaLabel: 'Mobile app',
  },
  [Platform.Both]: {
    label: 'Responsive',
    ariaLabel: 'Responsive design - works on all devices',
  },
};

export default function PlatformIcon({ platform, className = '', showLabel = true }: PlatformIconProps) {
  const config = platformConfig[platform];

  if (!config) return null;

  const baseClasses = `inline-flex items-center gap-1.5 ${className}`;

  // Desktop only (not responsive)
  if (platform === Platform.Desktop) {
    return (
      <span
        className={baseClasses}
        aria-label={config.ariaLabel}
        role="img"
      >
        <Monitor
          size={ICON_SIZE}
          strokeWidth={2}
          aria-hidden="true"
        />
        {showLabel && <span className="text-xs" aria-hidden="true">{config.label}</span>}
      </span>
    );
  }

  // Mobile app (native)
  if (platform === Platform.Mobile) {
    return (
      <span
        className={baseClasses}
        aria-label={config.ariaLabel}
        role="img"
      >
        <Smartphone
          size={ICON_SIZE}
          strokeWidth={2}
          aria-hidden="true"
        />
        {showLabel && <span className="text-xs" aria-hidden="true">{config.label}</span>}
      </span>
    );
  }

  // Responsive (works on all devices)
  if (platform === Platform.Both) {
    return (
      <span
        className={baseClasses}
        aria-label={config.ariaLabel}
        role="img"
      >
        <span className="inline-flex items-center gap-0.5" aria-hidden="true">
          <Monitor
            size={ICON_SIZE}
            strokeWidth={2}
            aria-hidden="true"
          />
          <Smartphone
            size={ICON_SIZE}
            strokeWidth={2}
            aria-hidden="true"
          />
        </span>
        {showLabel && <span className="text-xs" aria-hidden="true">{config.label}</span>}
      </span>
    );
  }

  return null;
}
