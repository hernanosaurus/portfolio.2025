import { Coding, LibrariesAndFrameworks, Tool } from './skills';

export type TechEnum = Coding | LibrariesAndFrameworks | Tool;

export interface RelatedProduct {
  name: string;
  link?: string;
  description: string;
}

export interface Product {
  name: string;
  description: string;
  link?: string;
  tech?: TechEnum[];
  related?: RelatedProduct[];
}

export interface Project {
  name: string;
  description: string;
  tech?: TechEnum[];
  link?: string;
  products?: Product[];
}

export const projects: Project[] = [
  {
    name: 'Publishing Company',
    description:
      'Built and maintained multiple products as a frontend developer, delivering responsive, interactive, and content-rich experiences. Led UI development, implemented data visualizations, notification flows, and ensured a smooth, responsive mobile experience.',
    products: [
      {
        name: 'Football Player Transfer App',
        description:
          'Developed interactive screens and real-time data visualizations for player transfers, valuations, and rumours. Implemented notification flows and optimized for mobile responsiveness.',
        tech: [LibrariesAndFrameworks.ReactNative, LibrariesAndFrameworks.Expo, Coding.TypeScript, Tool.OneSignal],
      },
      {
        name: 'Football Fan-site',
        description:
          'Led frontend development, translating Figma designs into a polished website. Integrated CMS for dynamic content and optimized for performance.',
        tech: [Coding.HTML5, Coding.JavaScript, Coding.SCSS, Coding.CSS3, LibrariesAndFrameworks.Bootstrap],
      },
      {
        name: 'Football Fan Engagement Platform',
        description:
          'Built responsive UI and smooth user interactions for live content and community features. Focused on performance and accessibility.',
        tech: [Coding.HTML5, Coding.JavaScript, Coding.SCSS, Coding.CSS3, LibrariesAndFrameworks.Bootstrap],
      },
      {
        name: 'Sports News Platform',
        description:
          'Developed and maintained a high-traffic news portal, delivering live match updates, player injuries, results, and commentary.',
        tech: [Coding.HTML5, Coding.JavaScript, Coding.SCSS, Coding.CSS3],
      },
      {
        name: 'Football Insights Portal',
        description:
          'Enhanced a football analytics platform with real-time valuation models, transfer rumours, and interactive dashboards.',
        tech: [Coding.HTML5, Coding.JavaScript, Coding.SCSS, Coding.CSS3, LibrariesAndFrameworks.Bootstrap],
      },
      {
        name: 'Real-time Embeddable Content Feed',
        description:
          'Developed a reusable, real-time embeddable content feed using WebSockets for instant updates. Focused on responsive design and seamless integration.',
        tech: [LibrariesAndFrameworks.VueJS, LibrariesAndFrameworks.Pinia, LibrariesAndFrameworks.TailwindCSS, Coding.TypeScript, Tool.WebSockets],
      },
    ],
  },
  {
    name: 'Madgicx',
    description:
      'An AI-powered advertising platform focused on helping brands and agencies optimize and scale their campaigns across platforms like Meta Platforms (Facebook & Instagram).',
    tech: [LibrariesAndFrameworks.React, LibrariesAndFrameworks.Redux, Coding.TypeScript, Coding.SCSS, LibrariesAndFrameworks.MaterialUI],
    link: 'https://madgicx.com/',
    products: [
      {
        name: 'Ad Library',
        description:
          'I helped build the first iteration (MVP) of the Ad Library, laying the foundation for what the product has become today. The Ad Library is a searchable, curated database of successful ad creatives across industries. Users can browse, filter by format/industry, save boards of favorite ads for inspiration, and use these as input for new ad generation.',
        link: 'https://madgicx.com/ad-library',
      },
      {
        name: 'AI Copywriter',
        description:
          'Built the frontend for the app, which is intended for desktop users. Users can input prompts, select tones, and instantly receive multiple creative text suggestions tailored for their campaigns. The core technology and workflows developed for AI Copywriter also powered the launch of the AI-Ads.',
        link: 'https://ai-copywriter.madgicx.com/',
        related: [
          {
            name: 'AI-Ads',
            link: 'https://madgicx.com/ai-ads',
            description: 'An end-to-end creative generation workflow: start with a text prompt, upload an image or select an example creative from the library, then the AI generates variants of ad creatives (images/videos), which can be edited and launched directly. Dramatically speeds up creative output, supports A/B testing, and integrates with ad deployment.'
          }
        ]
      },
      {
        name: 'Sparkle',
        description:
          'An internal ticketing and creative request system empowering clients to easily submit design briefs and track progress for their ad creatives. I led the frontend development, building intuitive flows for ticket creation, status tracking, and designer collaboration. The UI is fast, modern, and tailored for seamless client–designer interaction.',
      },
    ],
  },
  {
    name: 'Education & Workshop Management Platform',
    description:
      'Joined the project after the original team moved on — picked up a large existing codebase, maintained and improved the app, and added new features on top of it. I enjoyed the challenge of learning the system, cleaning things up, and making the experience even better for users.',
    tech: [LibrariesAndFrameworks.React, LibrariesAndFrameworks.Redux, LibrariesAndFrameworks.ReactQuery, LibrariesAndFrameworks.StyledComponents, LibrariesAndFrameworks.AntDesign, Coding.TypeScript],
    products: [
      {
        name: 'Registration Portal',
        description:
          'Developed user-facing interfaces for browsing, registering, and managing workshop enrolment.',
      },
      {
        name: 'Admin Portal',
        description:
          'Built admin tools for managing workshop listings, registrations, waitlists, and attendance tracking.',
      },
    ],
  },
  {
    name: 'Pet-Friendly Rental Management Platform',
    description:
      'Built the landing page for a platform focused on pet-friendly rental management, including pet policy and compliance features.',
    tech: [Tool.Webflow, Coding.JavaScript],
  },
  {
    name: 'Creator & Fan Engagement Platform',
    description:
      'Developed frontend features for a platform enabling creators and brands to deepen fan engagement with AI-driven personalized interaction and content.',
    tech: [LibrariesAndFrameworks.EmberJS, Coding.SCSS, Tool.WebSockets],
  },
  {
    name: 'Web3 Digital Asset Minting Platform',
    description:
      'Implemented frontend flows for asset creation, metadata input, and real-time mint-status feedback, and contributed backend APIs and logic using NestJS for a Web3 digital asset minting platform.',
    tech: [LibrariesAndFrameworks.VueJS, LibrariesAndFrameworks.Pinia, LibrariesAndFrameworks.NestJS, LibrariesAndFrameworks.TailwindCSS, Coding.TypeScript],
  },
  {
    name: 'Enterprise logistics & transportation platforms',
    description:
      'Contributed to multiple versions of enterprise logistics and transportation platforms, building reusable and responsive frontend components, shipment tracking, dashboards, and workflow automation features.',
    products: [
      {
        name: 'Enterprise Transportation Management Platform',
        description: 'Contributed to developing shipment tracking, analytics dashboards, and workflow features. Built modular UI components and optimized data-driven views for performance and maintainability.',
        tech: [LibrariesAndFrameworks.React, LibrariesAndFrameworks.Redux, Coding.SCSS, Coding.TypeScript],
      },
      {
        name: 'Shipping & Order Management Platform',
        description: 'Helped build core features like shipment creation, tracking, and order management. Collaborated with the design and backend teams to deliver a smooth, desktop-first user experience and maintain clean, scalable frontend code.',
        tech: [LibrariesAndFrameworks.AngularJS, LibrariesAndFrameworks.NgRx, LibrariesAndFrameworks.Bootstrap, Coding.TypeScript],
      },
    ],
  },
];
