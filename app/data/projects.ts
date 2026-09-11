import { Coding, LibrariesAndFrameworks, Tool } from './skills';

export type TechEnum = Coding | LibrariesAndFrameworks | Tool | MobilePlatform;

export enum Platform {
  Desktop = 'desktop',
  Mobile = 'mobile',
  Both = 'both',
}

export enum MobilePlatform {
  Android = 'Android',
  iOS = 'iOS',
}

// Generic overrides: values swapped in when a project's `mode` is 'generic'.
// `link: null` explicitly strips the link; omit a field to keep the detailed value.
export interface GenericOverride {
  name?: string;
  description?: string;
  link?: string | null;
}

export type ProjectMode = 'detailed' | 'generic';

export interface RelatedProduct {
  name: string;
  link?: string;
  description: string;
  platform?: Platform;
  generic?: GenericOverride;
}

export interface Product {
  name: string;
  description: string;
  link?: string;
  tech?: TechEnum[];
  related?: RelatedProduct[];
  platform?: Platform;
  generic?: GenericOverride;
}

export interface Project {
  name: string;
  description: string;
  tech?: TechEnum[];
  link?: string;
  products?: Product[];
  platform?: Platform;
  generic?: GenericOverride;
  hidden?: boolean;
  mode?: ProjectMode;
}

export const projects: Project[] = [
  {
    name: 'Keyboard for Hire',
    description:
      'Personal project — solo-built an invite-only developer community: profiles, discussions, a jobs board, and anonymous salary, interview, and company reviews. Designed an anonymity model that lets developers share honest experiences without exposing their identity.',
    tech: [
      LibrariesAndFrameworks.NextJS,
      Coding.TypeScript,
      LibrariesAndFrameworks.TailwindCSS,
      Tool.Supabase,
      Tool.Vercel,
    ],
    link: 'https://keyboardforhire.dev',
    platform: Platform.Both,
  },
  {
    name: 'NexusReport',
    hidden: true,
    description:
      'Lead frontend engineer on NexusReport, a SaaS platform that helps accounting professionals rapidly assess multi-state tax nexus obligations for their clients. Built the end-to-end client workflow — activity intake, analysis review, and white-label PDF report generation and rendering — plus Stripe-powered checkout for single and bulk report purchases.',
    tech: [
      LibrariesAndFrameworks.React,
      Coding.TypeScript,
      LibrariesAndFrameworks.ReduxToolkit,
      LibrariesAndFrameworks.StyledComponents,
      LibrariesAndFrameworks.AntDesign,
      Tool.Vite,
    ],
    link: 'https://www.nexusreport.io/',
    platform: Platform.Desktop,
    generic: {
      name: 'Tax Reporting Platform',
      description:
        'Lead frontend engineer on a SaaS platform that helps accounting professionals rapidly assess multi-state tax nexus obligations for their clients. Built the end-to-end client workflow — activity intake, analysis review, and white-label PDF report generation and rendering — plus Stripe-powered checkout for single and bulk report purchases.',
      link: null,
    },
    products: [
      {
        name: 'NexusReport App',
        description:
          'The client-facing application where accounting professionals run nexus assessments, review analyses, generate white-label PDF reports, and check out via Stripe for single or bulk report purchases.',
        link: 'https://app.nexusreport.io/',
        platform: Platform.Desktop,
        generic: {
          name: 'Tax Reporting App',
          description:
            'The client-facing application where accounting professionals run nexus assessments, review analyses, generate white-label PDF reports, and check out via Stripe for single or bulk report purchases.',
          link: null,
        },
      },
    ],
  },
  {
    name: 'CCTalent formerly CodingChiefs',
    description:
      'Built and maintained multiple products as a frontend developer, delivering responsive, interactive, and content-rich experiences. Led UI development, implemented data visualizations, notification flows, and ensured a smooth, responsive mobile experience.',
    link: 'https://cctalent.global/en/',
    generic: {
      name: 'Sports & Fan Engagement Company',
      description:
        'Built and maintained multiple products as a frontend developer, delivering responsive, interactive, and content-rich experiences. Led UI development, implemented data visualizations, notification flows, and ensured a smooth, responsive mobile experience.',
      link: null,
    },
    products: [
      {
        name: 'Mee met Oranje App',
        description:
          'Developed responsive authentication flows with social login and guest access, built real-time data visualizations for live games, scores, match schedules, and news features, implemented a push notification system to drive timely user engagement, and optimized cross-platform performance across iOS and Android.',
        link: 'https://play.google.com/store/apps/details?id=com.meemetoranje.app',
        tech: [LibrariesAndFrameworks.ReactNative, LibrariesAndFrameworks.Expo, Coding.TypeScript, Tool.OneSignal, MobilePlatform.Android, MobilePlatform.iOS],
        platform: Platform.Mobile,
        generic: {
          name: 'Sports Fan Mobile App',
          description:
            'Developed responsive authentication flows with social login and guest access, built real-time data visualizations for live games, scores, match schedules, and news features, implemented a push notification system to drive timely user engagement, and optimized cross-platform performance across iOS and Android.',
          link: null,
        },
      },
      {
        name: 'Football Transfers App',
        description:
          'Developed interactive screens and real-time data visualizations for player transfers, valuations, and rumours. Implemented notification flows and optimized for performance.',
        link: 'https://play.google.com/store/apps/details?id=com.footballtransfers.app',
        tech: [LibrariesAndFrameworks.ReactNative, LibrariesAndFrameworks.Expo, Coding.TypeScript, Tool.OneSignal, MobilePlatform.Android, MobilePlatform.iOS],
        platform: Platform.Mobile,
        generic: {
          name: 'Sports Analytics Mobile App',
          description:
            'Developed interactive screens and real-time data visualizations for player transfers, valuations, and rumours. Implemented notification flows and optimized for performance.',
          link: null,
        },
      },
      {
        name: 'FCUpdate App',
        description:
          'Developed the mobile companion to FCUpdate.nl, delivering live Dutch football news, match updates, and push notifications. Built with a shared React Native codebase for iOS and Android.',
        link: 'https://play.google.com/store/apps/details?id=com.fcupdate.app',
        tech: [LibrariesAndFrameworks.ReactNative, LibrariesAndFrameworks.Expo, Coding.TypeScript, Tool.OneSignal, MobilePlatform.Android, MobilePlatform.iOS],
        platform: Platform.Mobile,
        generic: {
          name: 'Live Sports News Mobile App',
          description:
            'Developed a mobile companion to a sports news portal, delivering live match updates and push notifications. Built with a shared React Native codebase for iOS and Android.',
          link: null,
        },
      },
      {
        name: 'Mee met Oranje',
        description:
          'Led frontend development, translating Figma designs into a polished website for the Dutch national football team fan community. Integrated CMS for dynamic content and optimized for performance.',
        link: 'https://www.meemetoranje.nl/',
        tech: [Coding.HTML5, Coding.JavaScript, Coding.SCSS, Coding.CSS3, LibrariesAndFrameworks.Bootstrap, Coding.PHP, LibrariesAndFrameworks.Laravel],
        platform: Platform.Both,
        generic: {
          name: 'Fan Community Website',
          description:
            'Led frontend development, translating Figma designs into a polished website for a national sports fan community. Integrated CMS for dynamic content and optimized for performance.',
          link: null,
        },
      },
      {
        name: 'Anfield Watch',
        description:
          'Built responsive UI and smooth user interactions for live content and community features on this Liverpool FC fan platform. Focused on performance and accessibility.',
        link: 'https://www.anfieldwatch.co.uk/',
        tech: [Coding.HTML5, Coding.JavaScript, Coding.SCSS, Coding.CSS3, LibrariesAndFrameworks.Bootstrap, Coding.PHP, LibrariesAndFrameworks.Laravel],
        platform: Platform.Both,
        generic: {
          name: 'Club Fan Website',
          description:
            'Built responsive UI and smooth user interactions for live content and community features on a football club fan platform. Focused on performance and accessibility.',
          link: null,
        },
      },
      {
        name: 'FCUpdate',
        description:
          'Developed and maintained a high-traffic football news portal, delivering live match updates, player injuries, results, and commentary. Shipped in both Dutch (NL) and English (EN) localized versions.',
        link: 'https://www.fcupdate.nl/',
        tech: [Coding.HTML5, Coding.JavaScript, Coding.SCSS, Coding.CSS3, Coding.PHP, LibrariesAndFrameworks.Laravel],
        platform: Platform.Both,
        generic: {
          name: 'Sports News Portal',
          description:
            'Developed and maintained a high-traffic sports news portal, delivering live match updates, player injuries, results, and commentary. Shipped in multiple localized versions.',
          link: null,
        },
      },
      {
        name: 'Football Transfers',
        description:
          'Enhanced a football analytics platform with real-time valuation models, transfer rumours, and interactive dashboards. Shipped in both Dutch (NL) and English (EN) localized versions.',
        link: 'https://www.footballtransfers.com/en',
        tech: [Coding.HTML5, Coding.JavaScript, Coding.SCSS, Coding.CSS3, LibrariesAndFrameworks.Bootstrap, Coding.PHP, LibrariesAndFrameworks.Laravel],
        platform: Platform.Both,
        generic: {
          name: 'Sports Analytics Platform',
          description:
            'Enhanced a sports analytics platform with real-time valuation models, transfer rumours, and interactive dashboards. Shipped in multiple localized versions.',
          link: null,
        },
      },
      {
        name: 'Real-time Embeddable Content Feed',
        description:
          'Developed a reusable, real-time embeddable content feed using WebSockets for instant updates. Focused on responsive design and seamless integration.',
        tech: [LibrariesAndFrameworks.VueJS, LibrariesAndFrameworks.Pinia, LibrariesAndFrameworks.TailwindCSS, Coding.TypeScript, Tool.WebSockets],
        platform: Platform.Both,
      },
    ],
  },
  {
    name: 'Madgicx',
    description:
      'An AI-powered advertising platform focused on helping brands and agencies optimize and scale their campaigns across platforms like Meta Platforms (Facebook & Instagram).',
    tech: [LibrariesAndFrameworks.React, LibrariesAndFrameworks.Redux, Coding.TypeScript, Coding.SCSS, LibrariesAndFrameworks.MaterialUI],
    link: 'https://madgicx.com/',
    platform: Platform.Desktop,
    products: [
      {
        name: 'Ad Library',
        description:
          'I helped build the first iteration (MVP) of the Ad Library, laying the foundation for what the product has become today. The Ad Library is a searchable, curated database of successful ad creatives across industries. Users can browse, filter by format/industry, save boards of favorite ads for inspiration, and use these as input for new ad generation.',
        link: 'https://madgicx.com/ad-library',
        platform: Platform.Desktop,
      },
      {
        name: 'AI Copywriter',
        description:
          'Built the frontend for the app, which is intended for desktop users. Users can input prompts, select tones, and instantly receive multiple creative text suggestions tailored for their campaigns. The core technology and workflows developed for AI Copywriter also powered the launch of the AI-Ads.',
        link: 'https://ai-copywriter.madgicx.com/',
        platform: Platform.Desktop,
        related: [
          {
            name: 'AI-Ads',
            link: 'https://madgicx.com/ai-ads',
            description: 'An end-to-end creative generation workflow: start with a text prompt, upload an image or select an example creative from the library, then the AI generates variants of ad creatives (images/videos), which can be edited and launched directly. Dramatically speeds up creative output, supports A/B testing, and integrates with ad deployment.',
          }
        ]
      },
      {
        name: 'Sparkle',
        description:
          'An internal ticketing and creative request system empowering clients to easily submit design briefs and track progress for their ad creatives. I led the frontend development, building intuitive flows for ticket creation, status tracking, and designer collaboration. The UI is fast, modern, and tailored for seamless client–designer interaction.',
        platform: Platform.Desktop,
      },
    ],
  },
  {
    name: 'Ready for Kindergarten Idaho',
    hidden: true,
    description:
      'Joined the project after the original team moved on — picked up a large existing codebase for Idaho\'s statewide kindergarten-readiness workshop program, maintained and improved the app, and added new features on top of it. I enjoyed the challenge of learning the system, cleaning things up, and making the experience even better for families and administrators.',
    tech: [LibrariesAndFrameworks.React, LibrariesAndFrameworks.Redux, LibrariesAndFrameworks.ReactQuery, LibrariesAndFrameworks.StyledComponents, LibrariesAndFrameworks.AntDesign, Coding.TypeScript],
    link: 'https://readyforkindergartenidaho.org/home',
    platform: Platform.Desktop,
    generic: {
      name: 'Education & Workshop Management Platform',
      description:
        'Joined the project after the original team moved on — picked up a large existing codebase, maintained and improved the app, and added new features on top of it. I enjoyed the challenge of learning the system, cleaning things up, and making the experience even better for users.',
      link: null,
    },
    products: [
      {
        name: 'Workshop Registration Portal',
        description:
          'Developed the public-facing site where families browse workshops, register, and manage their enrolment.',
        link: 'https://workshop.readyforkindergartenidaho.org/workshops',
        platform: Platform.Desktop,
        generic: {
          name: 'Registration Portal',
          description:
            'Developed user-facing interfaces for browsing, registering, and managing workshop enrolment.',
          link: null,
        },
      },
      {
        name: 'Workshop Admin Portal',
        description:
          'Built admin tools for managing workshop listings, registrations, waitlists, and attendance tracking.',
        link: 'https://workshop.admin.readyforkindergartenidaho.org/login',
        platform: Platform.Desktop,
        generic: {
          name: 'Admin Portal',
          description:
            'Built admin tools for managing workshop listings, registrations, waitlists, and attendance tracking.',
          link: null,
        },
      },
    ],
  },
  {
    name: 'OurPetPolicy',
    hidden: true,
    description:
      'Built the landing page for OurPetPolicy, a platform focused on pet-friendly rental management, including pet policy and compliance features for landlords and property managers.',
    tech: [Tool.Webflow, Coding.JavaScript],
    link: 'https://www.ourpetpolicy.com/',
    platform: Platform.Both,
    generic: {
      name: 'Pet-Friendly Rental Management Platform',
      description:
        'Built the landing page for a platform focused on pet-friendly rental management, including pet policy and compliance features.',
      link: null,
    },
  },
  {
    name: 'Content Creator Agency',
    mode: 'generic',
    description:
      'Contributed frontend work on two products for a content creator agency — xliink, a link-in-bio monetization platform, and wefans.ai, an AI-driven creator/fan engagement platform. Delivered responsive, interactive experiences across both codebases and stacks.',
    platform: Platform.Both,
    generic: {
      description:
        'Contributed frontend work on two products for a content creator agency — a link-in-bio monetization platform and an AI-driven creator/fan engagement platform. Delivered responsive, interactive experiences across both codebases and stacks.',
    },
    products: [
      {
        name: 'xliink',
        description:
          'Built a web-based platform that provides creators with a centralized hub to share links and monetize their content from a single customizable profile.',
        tech: [LibrariesAndFrameworks.React, Coding.TypeScript, LibrariesAndFrameworks.TanStack, LibrariesAndFrameworks.CSS3, LibrariesAndFrameworks.TailwindCSS, Tool.Vite],
        link: 'https://xliink.com/',
        platform: Platform.Both,
        generic: {
          name: 'Creator Link & Content Monetization Platform',
          description:
            'Built a web-based platform that provides creators with a centralized hub to share links and monetize their content from a single customizable profile.',
          link: null,
        },
      },
      {
        name: 'wefans.ai',
        description:
          'Developed frontend features for a platform enabling creators and brands to deepen fan engagement with AI-driven personalized interaction and content.',
        tech: [LibrariesAndFrameworks.EmberJS, Coding.SCSS, Tool.WebSockets, Tool.AuthorizeNet],
        link: 'https://wefans.ai/',
        platform: Platform.Both,
        generic: {
          name: 'Creator & Fan Engagement Platform',
          description:
            'Built the monetization layer for a creator platform: subscription tiers and checkout, paid content unlocking, and creator-to-fan messaging with paid exchanges.',
          link: null,
        },
      },
    ],
  },
  {
    name: 'w3bmint',
    mode: 'generic',
    description:
      'Implemented frontend flows for asset creation, metadata input, and real-time mint-status feedback, and contributed backend APIs and logic using NestJS for w3bmint, a Web3 digital asset minting platform (no longer active).',
    tech: [LibrariesAndFrameworks.VueJS, LibrariesAndFrameworks.Pinia, LibrariesAndFrameworks.NestJS, LibrariesAndFrameworks.TailwindCSS, Coding.TypeScript],
    platform: Platform.Both,
    generic: {
      name: 'Web3 Digital Asset Minting Platform',
      description:
        'Implemented frontend flows for asset creation, metadata input, and real-time mint-status feedback, and contributed backend APIs and logic using NestJS for a Web3 digital asset minting platform.',
    },
  },
  {
    name: 'Cognizant Softvision',
    mode: 'generic',
    description:
      'As part of Cognizant Softvision, contributed to an enterprise transportation management platform for an external client — building reusable and responsive frontend components, shipment tracking, dashboards, and workflow automation features.',
    link: 'https://www.cognizant.com/',
    platform: Platform.Desktop,
    generic: {
      name: 'Enterprise logistics & transportation company',
      description:
        'Contributed to an enterprise transportation management platform, building reusable and responsive frontend components, shipment tracking, dashboards, and workflow automation features.',
      link: null,
    },
    products: [
      {
        name: 'Beon Shipper',
        description: 'Contributed to developing shipment tracking, analytics dashboards, and workflow features. Built modular UI components and optimized data-driven views for performance and maintainability.',
        tech: [LibrariesAndFrameworks.AngularJS, LibrariesAndFrameworks.NgRx, LibrariesAndFrameworks.Bootstrap, Coding.TypeScript],
        link: 'https://beonshipper.gobeon.com/',
        platform: Platform.Desktop,
        generic: {
          name: 'Enterprise Transportation Management Platform',
          description: 'Contributed to developing shipment tracking, analytics dashboards, and workflow features. Built modular UI components and optimized data-driven views for performance and maintainability.',
          link: null,
        },
      },
    ],
  },
  {
    name: 'SwanLeap',
    mode: 'generic',
    description:
      'As an independent contractor, helped build core features like shipment creation, tracking, and order management on SwanLeap\'s shipping and order management platform. Collaborated with the design and backend teams to deliver a smooth, desktop-first user experience and maintain clean, scalable frontend code.',
    tech: [LibrariesAndFrameworks.React, LibrariesAndFrameworks.Redux, Coding.SCSS, Coding.TypeScript],
    link: 'https://app.swanleap.com/',
    platform: Platform.Desktop,
    generic: {
      name: 'Shipping & Order Management Platform',
      description:
        'As an independent contractor, helped build core features like shipment creation, tracking, and order management. Collaborated with the design and backend teams to deliver a smooth, desktop-first user experience and maintain clean, scalable frontend code.',
      link: null,
    },
  },
];

function applyOverride<T extends { name: string; description: string; link?: string; generic?: GenericOverride }>(
  item: T,
): T {
  if (!item.generic) return item;
  const { name, description, link } = item.generic;
  const next = { ...item };
  if (name !== undefined) next.name = name;
  if (description !== undefined) next.description = description;
  if (link === null) delete next.link;
  else if (link !== undefined) next.link = link;
  return next;
}

function applyGenericToProject(project: Project): Project {
  const base = applyOverride(project);
  if (base.products) {
    base.products = base.products.map((product) => {
      const nextProduct = applyOverride(product);
      if (nextProduct.related) {
        nextProduct.related = nextProduct.related.map((r) => applyOverride(r));
      }
      return nextProduct;
    });
  }
  return base;
}

export const resolvedProjects: Project[] = projects
  .filter((p) => !p.hidden)
  .map((p) => (p.mode === 'generic' ? applyGenericToProject(p) : p));
