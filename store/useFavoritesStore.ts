import { create } from "zustand";

interface FavoritesState {
  favorites: string[]; // массив id машин
  toggleFavorite: (id: string) => void;
}

// Zustand store для избранного, синхронизированного с localStorage
export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites:
    typeof window !== "undefined" && localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites")!)
      : [],
  toggleFavorite: (id: string) =>
    set((state) => {
      let newFavorites;
      if (state.favorites.includes(id)) {
        // Если уже в избранном — удаляем
        newFavorites = state.favorites.filter((fid) => fid !== id);
      } else {
        // Если нет — добавляем
        newFavorites = [...state.favorites, id];
      }
      // Сохраняем в localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
      }
      return { favorites: newFavorites };
    }),
}));
