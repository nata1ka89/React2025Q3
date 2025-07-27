export interface CharacterResult {
  uid: string;
  name: string;
  url: string;
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
  uid?: string;
}

export interface CardListProps {
  items: DescriptionProps[];
  onSelect: (item: DescriptionProps) => void;
}

export interface DetailProps {
  item: DescriptionProps | null;
  onClose: () => void;
}

export interface MainState {
  items: DescriptionProps[];
  loading: boolean;
  error: string | null;
  throwError: boolean;
}
