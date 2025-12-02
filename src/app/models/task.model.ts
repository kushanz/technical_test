export type Task =  {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'done' | 'in-progress';
  createdAt?: Date;
}