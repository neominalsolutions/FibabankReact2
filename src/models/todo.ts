export interface ITodo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  user?: ITodoUser;
}

export interface ITodoUser {
  id: number;
  name: string;
  username?: string;
}

// npm i axios
