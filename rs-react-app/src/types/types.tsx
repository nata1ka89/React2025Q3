export interface CardProps {
  name: string;
  url: string;
}

export interface CardListProps {
  items: CardProps[];
}

export interface MainState {
  items: CardProps[];
  loading: boolean;
  error: string | null;
  searchValue: string;
}
