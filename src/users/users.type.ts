export type User = {
  image?: string;
  pseudo: string;
  firstname: string;
  lastname: string;
  email: string;
  birthdate: Date;
  phone: string;
  isPrivate: boolean;
  motto?: Motto[];
};

export type Motto = {
  title: string;
  content?: string;
};
