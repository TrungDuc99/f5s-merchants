export interface ChatRoom {
  id: string;
  users: User[];
  lastMessage: Message;
  newMessages?: number;
}
export interface User {
  id: string;
  name: string;
  imageUri: string;
}
export interface Message {
  id: string;
  content: string;
  createdAt: string;
}
