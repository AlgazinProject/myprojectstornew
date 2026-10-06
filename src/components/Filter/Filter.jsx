"use client";
import { useState } from 'react';
import './Filter.scss';

const Filter = ({
  activeCategory,
  setActiveCategory,
  activeBrand,
  setActiveBrand,
  activeSize,
  setActiveSize,
  activeColors,
  setActiveColors,
  minPrice,
  maxPrice,
  currentMin,
  setCurrentMin,
  currentMax,
  setCurrentMax,
  catalogType
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const clothingFilters = {
    categories: [
      { id: 'all', name: 'Все' },
      { id: 'jackets', name: 'Куртки' },
      { id: 'tee-shirt', name: 'Футболки' },
      { id: 'hoody', name: 'Толстовка' },
      { id: 'windbreaker', name: 'Ветровки' },
      { id: 'down jacket', name: 'Пуховики' },
      { id: 'shirt', name: 'Рубашки' }
    ],
    brands: [
      { id: 'all', name: 'Все' },
      { id: 'Stone Island', name: 'Stone Island' },
      { id: 'The North Face', name: 'The North Face' },
      { id: 'Lyle & Scott', name: 'Lyle & Scott' },
      { id: 'Fred Perry', name: 'Fred Perry' },
      { id: 'C.P. Company', name: 'C.P. Company' },
    ],
    sizes: [
      { id: 'XS', name: 'XS' },
      { id: 'S', name: 'S' },
      { id: 'M', name: 'M' },
      { id: 'L', name: 'L' },
      { id: 'XL', name: 'XL' }
    ],
    colors: [
      { id: 'black', name: 'Черный' },
      { id: 'white', name: 'Белый' },
      { id: 'grey', name: 'Серый' },
      { id: 'red', name: 'Красный' },
      { id: 'beige', name: 'Бежевый' },
      { id: 'khaki', name: 'Хаки' },
      { id: 'light-green', name: 'Светло зеленый' },
      { id: 'yellow', name: 'Жёлтый' },
      { id: 'blue', name: 'Синий' },
      { id: 'burgundy', name: 'Бордовый' },
    ]
  };

  const accessoriesFilters = {
    categories: [
      { id: 'all', name: 'Все' },
      { id: 'Bag', name: 'Сумки' },
      { id: 'Backpack', name: 'Рюкзаки' },
      { id: 'Balaclava', name: 'Балаклавы' }
    ],
    brands: [
      { id: 'all', name: 'Все' },
      { id: 'A Bathing Ape', name: 'A Bathing Ape' },
      { id: 'C.P. Company', name: 'C.P. Company' }
    ],
    colors: [
      { id: 'black', name: 'Черный' },
      { id: 'khaki', name: 'Хаки' }
    ]
  };

  const shoesFilters = {
    categories: [
      { id: 'all', name: 'Все' },
      { id: 'sneakers', name: 'Кроссовки' },
      { id: 'boots', name: 'Ботинки' },
      { id: 'Canvas shoes', name: 'Кеды' }
    ],
    brands: [
      { id: 'all', name: 'Все' },
      { id: 'Nike', name: 'Nike' },
      { id: 'New Balance', name: 'New Balance' },
      { id: 'ASICS', name: 'ASICS' },
      { id: 'Puma', name: 'Puma' },
      { id: 'Lacoste', name: 'Lacoste' }
    ],
    sizes: [
      { id: '37', name: '37' },
      { id: '38', name: '38' },
      { id: '39', name: '39' },
      { id: '40', name: '40' },
      { id: '41', name: '41' },
      { id: '42', name: '42' },
      { id: '43', name: '43' },
      { id: '44', name: '44' },
      { id: '45', name: '45' }
    ],
  };

  let currentFilter = clothingFilters;

  if (catalogType === 'shoes') {
    currentFilter = shoesFilters;
  } else if (catalogType === 'accessories') {
    currentFilter = accessoriesFilters;
  }

  const handleSizeClick = (sizeId) => {
    if (activeSize.includes(sizeId)) {
      setActiveSize(activeSize.filter(id => id !== sizeId));
    } else {
      setActiveSize([...activeSize, sizeId]);
    }
  };

  const handleColorClick = (colorId) => {
    if (activeColors.includes(colorId)) {
      setActiveColors(activeColors.filter(id => id !== colorId));
    } else {
      setActiveColors([...activeColors, colorId]);
    }
  };

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), currentMax - 1000);
    setCurrentMin(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), currentMin + 1000);
    setCurrentMax(value);
  };

  return (
    <div className="filter">
      <button className="filter__toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <span className="filter__title">Фильтр</span>
        <span className={`filter__arrow ${isOpen ? 'filter__arrow--open' : ''}`}>▼</span>
      </button>

      <div className={`filter__content ${isOpen ? 'filter__content--open' : ''}`}>

        <div className="filter__category">
          <h4 className="filter__category-subtitle">Категория</h4>
          <div className="filter__category-list">
            {currentFilter.categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter__btn ${activeCategory === cat.id ? 'filter__btn--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="filter__category">
          <h4 className="filter__category-subtitle">Бренд</h4>
          <div className="filter__category-list">
            {currentFilter.brands.map((brand) => (
              <button
                key={brand.id}
                className={`filter__btn ${activeBrand === brand.id ? 'filter__btn--active' : ''}`}
                onClick={() => setActiveBrand(brand.id)}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>

        <div className="filter__category">
          <h4 className="filter__category-subtitle">Цена</h4>
          <div className="filter__slider-wrapper">
            <div className="filter__price-labels">
              <span>{currentMin.toLocaleString()} ₽</span>
              <span>{currentMax.toLocaleString()} ₽</span>
            </div>
            <div className="filter__range-slider">
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={currentMin}
                onChange={handleMinChange}
                className="filter__range-input"
              />
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={currentMax}
                onChange={handleMaxChange}
                className="filter__range-input"
              />
            </div>
          </div>
        </div>

        {currentFilter.colors && (
          <div className="filter__category">
            <h4 className="filter__category-subtitle">Цвет</h4>
            <div className="filter__category-list filter__category-list--colors">
              {currentFilter.colors.map((color) => (
                <button
                  key={color.id}
                  className={`filter__btn ${activeColors.includes(color.id) ? 'filter__btn--active' : ''}`}
                  onClick={() => handleColorClick(color.id)}
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentFilter.sizes && (
          <div className="filter__category">
            <h4 className="filter__category-subtitle">
              {catalogType === 'shoes' ? 'Размер (RUS)' : 'Размер'}
            </h4>
            <div className="filter__category-list filter__category-list--sizes">
              {currentFilter.sizes.map((sz) => (
                <button
                  key={sz.id}
                  className={`filter__btn filter__btn--size ${activeSize.includes(sz.id) ? 'filter__btn--active' : ''}`}
                  onClick={() => handleSizeClick(sz.id)}
                >
                  {sz.name}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Filter;