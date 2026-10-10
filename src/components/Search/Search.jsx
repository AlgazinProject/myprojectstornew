"use client";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import './Search.scss';

const Search = ({ setSearchQuery }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get('search') || '';

  const handleChange = (event) => {
    const value = event.target.value;

    
    if (setSearchQuery) setSearchQuery(value);

   
    if (pathname.startsWith('/catalog')) {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim() === '') {
        params.delete('search');
      } else {
        params.set('search', value);
      }
      router.replace(`${pathname}?${params.toString()}`);
    } else {
     
      if (value.trim() !== '') {
        router.push(`/catalog/clothing?search=${encodeURIComponent(value)}`);
      }
    }
  };

  return (
    <>
      <label htmlFor="search-task" className="search__label visually-hidden">
        Поиск товара
      </label>
      <input
        className="search__input"
        id="search-task"
        placeholder="Искать в каталоге"
        autoComplete="off"
        type="search"
        defaultValue={currentSearch}
        onChange={handleChange}
      />
    </>
  );
};

export default Search;