export interface Category {
  id: number;
  nom: string;
  creationDate: string[];
  children: Category[];
  isRoot: boolean;
  parent?: Category;
}

