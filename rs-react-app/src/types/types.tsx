export interface CardProps {
  name: string;
  url: string;
}
export interface DescriptionProps {
  name: string;
  url: string;
  gender: string;
  skin_color: string;
  hair_color: string;
  height: string;
  eye_color: string;
  mass: string;
  homeworld: string;
  birth_year: string;
}

export interface CardListProps {
  items: CardProps[] | DescriptionProps[];
}

export interface MainState {
  items: CardProps[];
  loading: boolean;
  error: string | null;
}
