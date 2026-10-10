"use client";
import { useState } from 'react';
import Link from 'next/link';
import Search from '../../components/Search/Search';
import { useShop } from '../../context/ShopContext.jsx';
import './Header.scss';

const Header = () => {
  const { favorites, cart, searchQuery, setSearchQuery } = useShop();

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalFavItems = favorites.length;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const getIconUrl = (name) => {
    return `/icons/${name}`;
};

  return (
    <header className="header">
      {/* &__inner — главный флекс-контейнер шапки */}
      <div className="header__inner container">

        {/* &__burger — кнопка бургера (видна только на мобилке) */}
        <button
          className={`header__burger ${isMenuOpen ? 'header__burger--active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Открыть меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
          


        {/* &__logo-images — логотип */}
        <Link href="/" className="header__logo-link">
          <img
            src={getIconUrl('Stone-Island-Logo.svg')}
            alt="Stone Island"
            className="header__logo-images"
          />
        </Link>

        {/* &__menu и &__menu-list — выезжающая шторка и список */}
        <nav className={`header__menu ${isMenuOpen ? 'header__menu--open' : ''}`}>
          <h3 className="header__menu-title--mobile ">Каталог</h3>
          <ul className="header__menu-list">
            <li><Link href="/catalog/clothing" className="header__menu-link" onClick={() => setIsMenuOpen(false)}>Одежда</Link></li>
            <li><Link href="/catalog/shoes" className="header__menu-link" onClick={() => setIsMenuOpen(false)}>Обувь</Link></li>
            <li><Link href="/catalog/accessories" className="header__menu-link" onClick={() => setIsMenuOpen(false)}>Аксессуары</Link></li>
            <li><Link href="/brand" className="header__menu-link" onClick={() => setIsMenuOpen(false)}>Бренды</Link></li>
            <Link href="/orders" className="header__menu-link" onClick={() => setIsMenuOpen(false)}>Мои заказы</Link>
          </ul>
        </nav>

        {/* &__form и &__form-body — выпадающий поиск */}
        <div className={`header__form ${isSearchOpen ? 'header__form--open' : ''}`}>
          <div className="header__form-body">
            <Search setSearchQuery={setSearchQuery} />
          </div>
        </div>

        {/* &__actions — блок иконок */}
        <div className="header__actions">

          {/* &__search-toggle — мобильная лупа */}
          <button
            className={`header__search-toggle ${isSearchOpen ? 'header__search-toggle--active' : ''}`}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Поиск"
          >
            <svg className="header__action-images" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {/* Избранное */}
          <Link href="/favorites" className="header__action-btn">
            <img
              src={getIconUrl('heart-icon.svg')}
              alt="Избранное"
              className="header__action-images"
            />
            {totalFavItems > 0 && <span className="header__badge">{totalFavItems}</span>}
          </Link>

          {/* Корзина */}
          <Link href="/cart" className="header__action-btn">
            <img
              src={getIconUrl('shopping-bag.svg')}
              alt="Корзина"
              className="header__action-images"
            />
            {totalCartItems > 0 && <span className="header__badge">{totalCartItems}</span>}
          </Link>

        </div>
      </div>

      {/* &__overlay — затемнение фона при открытом меню */}
      {isMenuOpen && (
        <div className="header__overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </header>
  );
};

export default Header;