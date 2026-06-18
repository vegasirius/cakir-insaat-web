export type ProjectCategory = 'Konut' | 'Ticari' | 'Lüks Konut' | 'Endüstriyel';

export type ProjectStat = {
  label: string;
  value: string;
};

export type Project = {
  id: number;
  title: string;
  category: ProjectCategory;
  image: string;
  location: string;
  year: string;
  description: string;
  client: string;
  area: string;
  delivery: string;
  stats: ProjectStat[];
  gallery: string[];
};
