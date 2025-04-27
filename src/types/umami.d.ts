interface UmamiPayload {
  [key: string]: string | number | boolean | undefined | null;
}

interface UmamiObject {
  track: (eventName: string, eventData?: UmamiPayload) => void;
}

declare global {
  interface Window {
    umami?: UmamiObject;
  }
}

export {};
