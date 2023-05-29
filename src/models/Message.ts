export interface MessageI {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
}
