export interface Product {
  name: string;
  description: string;
  link?: string;
  tech?: string[];
}

export interface Project {
  name: string;
  description: string;
  tech?: string[];
  link?: string;
  products?: Product[];
}

export const projects: Project[] = [
  {
    name: 'Publishing Company',
    description:
      'A digital publishing company focused on sports and fan engagement. Built and maintained multiple products as a frontend developer, delivering responsive, interactive, and content-rich experiences for users.',
    products: [
      {
        name: 'Football Player Transfer App',
        description:
          'Real-time updates and deep data insights around player transfers, valuations, and rumours. Built interactive screens, implemented data visualizations, notification flows, and ensured a smooth, responsive mobile experience.',
        tech: ['React Native', 'Expo', 'One Signal', 'TypeScript'],
      },
      {
        name: 'Football Fan-site',
        description:
          'Independent fan-site delivering news, rumours, opinions and analysis. Led frontend development using SCSS and Bootstrap, translating Figma designs into a polished website. Integrated CMS for dynamic content rendering and optimized for performance.',
        tech: ['HTML5', 'JavaScript (ES6+)', 'SCSS / SASS / LESS', 'CSS3', 'Bootstrap', 'Laravel'],
      },
      {
        name: 'Football Fan Engagement Platform',
        description:
          'Led frontend development for a football fan engagement platform centered around the Dutch national team — focusing on responsive UI, performance, and smooth user interactions for live content and community features.',
        tech: ['HTML5', 'JavaScript (ES6+)', 'SCSS / SASS / LESS', 'CSS3', 'Bootstrap', 'Laravel'],
      },
      {
        name: 'Sports News Platform',
        description:
          'Built and maintained a high-traffic football news portal, delivering live match updates, player injuries, results and commentary for fans.',
        tech: ['HTML5', 'JavaScript (ES6+)', 'SCSS / SASS / LESS', 'CSS3', 'Laravel'],
      },
      {
        name: 'Football Insights Portal',
        description:
          'Developed and enhanced a football insights-analytics platform, providing real-time valuation models, transfer rumours, and interactive player–market dashboards for a global audience.',
        tech: ['HTML5', 'JavaScript (ES6+)', 'SCSS / SASS / LESS', 'CSS3', 'Bootstrap', 'Laravel'],
      },
      {
        name: 'Real-time Embeddable Content Feed',
        description:
          'Developed a real-time embeddable content feed using WebSockets for instant updates. Built a reusable UI component that can be embedded in other platforms, with a focus on responsive design and seamless integration.',
        tech: ['Vue.js', 'Tailwind CSS', 'WebSockets', 'TypeScript'],
      },
    ],
  },
  {
    name: 'Madgicx',
    description:
      'An AI-powered advertising platform focused on helping brands and agencies optimize and scale their campaigns across platforms like Meta Platforms (Facebook & Instagram).',
    tech: ['React', 'Redux', 'TypeScript', 'SCSS / SASS / LESS', 'Material UI'],
    link: 'https://madgicx.com/',
    products: [
      {
        name: 'Ad Library',
        description:
          'A searchable, curated database of successful ad creatives across industries. Users can browse, filter by format/industry, save boards of favorite ads for inspiration, and use these as input for new ad generation.',
        link: 'https://madgicx.com/ad-library',
      },
      {
        name: 'AI-Ads (formerly ‘AI-Copywriter’)',
        description:
          'An end-to-end creative generation workflow: start with a text prompt, upload an image or select an example creative from the library, then the AI generates variants of ad creatives (images/videos), which can be edited and launched directly. Dramatically speeds up creative output, supports A/B testing, and integrates with ad deployment.',
        link: 'https://madgicx.com/ai-ads',
      },
    ],
  },
  {
    name: 'Education & Workshop Management Platform',
    description:
      'Enhanced education and workshop management portals for early-learning programs, improving registration and user flows.',
    tech: ['React', 'RTK', 'styled-components', 'Ant Design', 'TypeScript'],
    products: [
      {
        name: 'Registration Portal',
        description:
          'The interface where families or caregivers can browse workshop listings, register for upcoming sessions, and manage their enrolment.',
      },
      {
        name: 'Admin Portal',
        description:
          'For administrators or coordinators: managing workshop listings, handling registrations or waitlists, and tracking attendance or kit distribution.',
      },
    ],
  },
  {
    name: 'Pet-Friendly Rental Management Platform',
    description:
      'Built the landing page for a platform focused on pet-friendly rental management, helping property managers and tenants handle pet policies, documentation, and compliance online.',
    tech: ['Webflow', 'JavaScript (ES6+)'],
  },
  {
    name: 'Creator & Fan Engagement Platform',
    description:
      'A platform that enables creators and entertainment brands to deepen fan engagement by providing AI-driven personalized interaction experiences, content, and operations support.',
    tech: ['Ember.js', 'Parse', 'SCSS / SASS / LESS'],
  },
  {
    name: 'Web3 Digital Asset Minting Platform',
    description:
      'Web3-minting platform for launching tokenised digital assets. Implemented frontend flows for asset creation, metadata input, and real-time mint-status feedback.',
    tech: ['Vue.js', 'NestJS', 'Tailwind CSS', 'TypeScript'],
  },
  {
    name: 'Enterprise logistics & transportation platforms',
    description:
      'Contributed shipment tracking, dashboards, and workflow automation features. Built reusable and responsive frontend components for the app, ensuring seamless user experience across devices.',
    tech: ['Angular', 'Bootstrap', 'TypeScript'],
  },
];
