export interface RelatedProduct {
  name: string;
  link?: string;
  description: string;
}

export interface Product {
  name: string;
  description: string;
  link?: string;
  tech?: string[];
  related?: RelatedProduct[];
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
      'Built and maintained multiple products as a frontend developer, delivering responsive, interactive, and content-rich experiences. Led UI development, implemented data visualizations, notification flows, and ensured a smooth, responsive mobile experience.',
    products: [
      {
        name: 'Football Player Transfer App',
        description:
          'Developed interactive screens and real-time data visualizations for player transfers, valuations, and rumours. Implemented notification flows and optimized for mobile responsiveness.',
        tech: ['React Native', 'Expo', 'TypeScript'],
      },
      {
        name: 'Football Fan-site',
        description:
          'Led frontend development, translating Figma designs into a polished website. Integrated CMS for dynamic content and optimized for performance.',
        tech: ['HTML5', 'JavaScript (ES6+)', 'SCSS / SASS', 'CSS3', 'Bootstrap'],
      },
      {
        name: 'Football Fan Engagement Platform',
        description:
          'Built responsive UI and smooth user interactions for live content and community features. Focused on performance and accessibility.',
        tech: ['HTML5', 'JavaScript (ES6+)', 'SCSS / SASS', 'CSS3', 'Bootstrap'],
      },
      {
        name: 'Sports News Platform',
        description:
          'Developed and maintained a high-traffic news portal, delivering live match updates, player injuries, results, and commentary.',
        tech: ['HTML5', 'JavaScript (ES6+)', 'SCSS / SASS', 'CSS3'],
      },
      {
        name: 'Football Insights Portal',
        description:
          'Enhanced a football analytics platform with real-time valuation models, transfer rumours, and interactive dashboards.',
        tech: ['HTML5', 'JavaScript (ES6+)', 'SCSS / SASS', 'CSS3', 'Bootstrap'],
      },
      {
        name: 'Real-time Embeddable Content Feed',
        description:
          'Developed a reusable, real-time embeddable content feed using WebSockets for instant updates. Focused on responsive design and seamless integration.',
        tech: ['Vue.js', 'Tailwind CSS', 'TypeScript'],
      },
    ],
  },
  {
    name: 'Madgicx',
    description:
      'An AI-powered advertising platform focused on helping brands and agencies optimize and scale their campaigns across platforms like Meta Platforms (Facebook & Instagram).',
    tech: ['React', 'Redux', 'TypeScript', 'SCSS / SASS', 'Material UI'],
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
          'A powerful tool for generating high-performing ad copy using advanced AI. Users can input prompts, select tones, and instantly receive multiple creative text suggestions tailored for their campaigns. The core technology and workflows developed for AI Copywriter also powered the launch of the AI-Ads.',
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
      'Enhanced education and workshop management portals, improving registration and user flows. Built and maintained frontend features for both user and admin interfaces.',
    tech: ['React', 'Redux', 'styled-components', 'Ant Design', 'TypeScript'],
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
      'Built the landing page and frontend flows for a platform focused on pet-friendly rental management, including pet policy and compliance features.',
    tech: ['Webflow', 'JavaScript (ES6+)'],
  },
  {
    name: 'Creator & Fan Engagement Platform',
    description:
      'Developed frontend features for a platform enabling creators and brands to deepen fan engagement with AI-driven personalized interaction and content.',
    tech: ['Ember.js', 'SCSS / SASS'],
  },
  {
    name: 'Web3 Digital Asset Minting Platform',
    description:
      'Implemented frontend flows for asset creation, metadata input, and real-time mint-status feedback for a Web3 digital asset minting platform.',
    tech: ['Vue.js', 'NestJS', 'Tailwind CSS', 'TypeScript'],
  },
  {
    name: 'Enterprise logistics & transportation platforms',
    description:
      'Contributed shipment tracking, dashboards, and workflow automation features. Built reusable and responsive frontend components for seamless user experience.',
    tech: ['AngularJS', 'Bootstrap', 'TypeScript'],
  },
];

// ---
// Note for portfolio viewers:
// Some projects do not include client names, links, or detailed descriptions due to confidentiality agreements. I am committed to respecting client privacy and NDAs.
