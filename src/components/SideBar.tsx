import { useEffect, useState } from 'react';

import { Button } from './Button';

import { api } from '../services/api';

import { GenreResponseProps } from '../@types/types';

import '../styles/sidebar.scss';

interface ISideBarProps {
  selectedGenreId: number;
  setSelectedGenreId(id: number): void;
}

export function SideBar({ selectedGenreId, setSelectedGenreId }: ISideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}