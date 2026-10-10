import React from 'react';
import Link from 'next/link'
import './Card.scss';

const Card = ({ product, favorites, toggleFavorite }) => {
    const isFavorite = favorites.includes(product.id);

    return (
        <div className="card">
            <div className="card__item">
                <Link href={`/product/${product.slug}`}>
                    <img className="card__images" src={product.imgSrc} alt={product.description} />
                </Link>

                {/* Чистый интерактивный тег кнопки */}
                <button 
                    className={`card__favorite ${isFavorite ? 'card__favorite--active' : ''}`}
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="Добавить в избранное"
                >
                    <svg className="card__favorite-icon" viewBox="0 0 24 24">
                        {/* ОДИН ОРИГИНАЛЬНЫЙ ПУТЬ С ЦЕНТРИРОВАННЫМИ КЛАССАМИ */}
                        <path className="card__favorite-path" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
            </div>

            <div className="card__info">
                <p className="card__brand">{product.brand}</p>
                <Link href={`/product/${product.slug}`} style={{ textDecoration: 'none', color: '#000' }}>
                    <h3 className="card__description">{product.description}</h3>
                </Link>
                <p className="card__price">{product.price}</p>

                <div className="card__sizes-block">
                    {product.sizes && product.sizes.map((size, index) => (
                        <span key={index} className="card__size-item">
                            {product.type === 'shoes' ? `${size}RUS` : size}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Card;
