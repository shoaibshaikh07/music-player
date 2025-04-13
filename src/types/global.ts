export type Music = {
  id: string;
  title: string;
  cover: string;
  artist: string[];
  progress?: number;
  duration?: number;
  liked?: boolean;
};
