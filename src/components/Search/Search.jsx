import './Search.scss'

const Search = ({setSearchQuery}) => {
    return (
        <>
            <label htmlFor="search-task" className="search__label visually-hidden">
                Поиск товара
            </label>
            <input
                className="search__input"
                id="search-task"
                placeholder="Искать в катологе"
                autoComplete="off"
                type="search"
                onChange={(event) =>  setSearchQuery(event.target.value) }
            />
        </>
    )
}

export default Search

