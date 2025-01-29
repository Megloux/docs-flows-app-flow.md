export type CategoryId = 
  | 'abs'
  | 'obliques'
  | 'upper_body'
  | 'lower_body'
  | 'lower_body_basics'
  | 'lower_body_heavy'
  | 'lower_body_straps';

export type Category = {
  id: CategoryId;
  name: string;
  description: string;
}
