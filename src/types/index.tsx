// Основные типы приложения
export type SortOrder = "asc" | "desc";

export interface SortOption {
  sortBy: string;
  order: SortOrder;
  label: string;
}

export interface Board {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  rating: number;
  category: number;
}

export interface FavoriteItem {
  id: string;
  image: string;
  title: string;
  description: string;
}
