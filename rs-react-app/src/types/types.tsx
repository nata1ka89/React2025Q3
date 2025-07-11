export interface CharacterResult {
  properties: DescriptionProps;
  description: string;
  uid: string;
}
export interface DescriptionProps {
  name: string;
  url: string;
  gender?: string;
  skin_color?: string;
  hair_color?: string;
  height?: string;
  eye_color?: string;
  mass?: string;
  homeworld?: string;
  birth_year?: string;
}

export interface CardListProps {
  items: DescriptionProps[];
}

export interface MainState {
  items: DescriptionProps[];
  loading: boolean;
  error: string | null;
  throwError: boolean;
}
