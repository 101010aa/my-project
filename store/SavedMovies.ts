import { create } from 'zustand';

interface Movie {
    id: number;
    title:string;
    poster_path:string;
}

interface SavedMoviesStore {
    savedMovies: Movie[];
    toggleSave:(movie:Movie) => void;
    isSaved:(id:number) => boolean;
}

export const useSavedMovies = create<SavedMoviesStore>((set, get) =>({
    savedMovies:[],
    toggleSave:(movie) =>{
        const exists = get().savedMovies.find((m) => m.id === movie.id);
        if(exists) {
            set({savedMovies:get().savedMovies.filter((m) => m.id ! == movie.id)});
        } else {
            set({ savedMovies: [...get().savedMovies, movie]});
        }
    },
    isSaved: (id) => !!get().savedMovies.find((m) =>m.id===id),
}));