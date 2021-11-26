export type Post = {
  publisherId: string;
  textContent?: string;
  mediaContent?: string;
  date: Date;
  categories?: string[];
};
