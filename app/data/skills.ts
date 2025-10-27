export interface Skills {
  [category: string]: string[];
}

enum SkillCategories {
  Coding = 'Coding',
  LibrariesAndFrameworks = 'Libraries & Frameworks',
  Tools = 'Tools',
}

export enum Coding {
  HTML5 = 'HTML5',
  JavaScript = 'JavaScript (ES6+)',
  CSS3 = 'CSS3',
  SCSS = 'SCSS / SASS',
  TypeScript = 'TypeScript',
}

export enum LibrariesAndFrameworks {
  HTML5 = 'HTML5',
  JavaScript = 'JavaScript (ES6+)',
  CSS3 = 'CSS3',
  SCSS = 'SCSS / SASS',
  TypeScript = 'TypeScript',
  jQuery = 'jQuery',
  React = 'React',
  Redux = 'Redux',
  ReduxToolkit = 'Redux Toolkit',
  ReactQuery = 'React Query',
  ReactNative = 'React Native',
  AngularJS = 'AngularJS',
  NgRx = 'NgRx',
  VueJS = 'Vue.js',
  Pinia = 'Pinia',
  EmberJS = 'Ember.js',
  NestJS = 'NestJS',
  GSAP = 'GSAP',
  TailwindCSS = 'Tailwind CSS',
  AntDesign = 'Ant Design',
  StyledComponents = 'styled-components',
  MaterialUI = 'Material UI',
  Bootstrap = 'Bootstrap',
  Expo = 'Expo',
}

export enum Tool {
  VSCode = 'VS Code',
  IntelliJ = 'IntelliJ',
  Git = 'Git',
  AgileScrum = 'Agile / Scrum',
  Jira = 'Jira',
  Webflow = 'Webflow',
  Vite = 'Vite',
  CreateReactApp = 'Create React App',
  Postman = 'Postman',
  Figma = 'Figma',
  AdobePhotoshop = 'Adobe Photoshop',
  AdobeIllustrator = 'Adobe Illustrator',
  OneSignal = 'One Signal',
  WebSockets = 'WebSockets',
}

export const skills: Skills = {
  [SkillCategories.Coding]: [
    Coding.HTML5,
    Coding.JavaScript,
    Coding.CSS3,
    Coding.SCSS,
    Coding.TypeScript,
  ],
  [SkillCategories.LibrariesAndFrameworks]: [
    LibrariesAndFrameworks.jQuery,
    LibrariesAndFrameworks.React,
    LibrariesAndFrameworks.Redux,
    LibrariesAndFrameworks.ReduxToolkit,
    LibrariesAndFrameworks.ReactQuery,
    LibrariesAndFrameworks.ReactNative,
    LibrariesAndFrameworks.AngularJS,
    LibrariesAndFrameworks.NgRx,
    LibrariesAndFrameworks.VueJS,
    LibrariesAndFrameworks.Pinia,
    LibrariesAndFrameworks.EmberJS,
    LibrariesAndFrameworks.NestJS,
    LibrariesAndFrameworks.GSAP,
    LibrariesAndFrameworks.TailwindCSS,
    LibrariesAndFrameworks.AntDesign,
    LibrariesAndFrameworks.StyledComponents,
    LibrariesAndFrameworks.MaterialUI,
    LibrariesAndFrameworks.Bootstrap,
    LibrariesAndFrameworks.Expo,
  ],
  [SkillCategories.Tools]: [
    Tool.VSCode,
    Tool.IntelliJ,
    Tool.Git,
    Tool.AgileScrum,
    Tool.Jira,
    Tool.Webflow,
    Tool.Vite,
    Tool.CreateReactApp,
    Tool.Postman,
    Tool.Figma,
    Tool.AdobePhotoshop,
    Tool.AdobeIllustrator,
    Tool.OneSignal,
    Tool.WebSockets,
  ],
};
