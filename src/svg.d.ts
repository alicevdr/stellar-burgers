declare module '*.svg' {
  const content: string;
  export default content;
}

declare namespace NodeJS {
  interface ProcessEnv {
    BURGER_API_URL: string;
  }
}