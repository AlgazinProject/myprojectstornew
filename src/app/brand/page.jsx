"use client";
import Link from 'next/link';
import './Brand.scss';
import { brands } from '../../data/brands.js';

const Brand = () => {
    const getIconUrl = (name) => {
        if (name.startsWith('http')) return name;
        return `/icons/${name}`;
    };

    return (
        <section className="brands container">
            <h1 className="brands__title">Наши Бренды</h1>
            <div className="brands__body">
                <ul className='brands__list'>
                    {brands.map((brand) => (
                        <li key={brand.id} className='brands__item'>
                            <Link className='brands__link' href={`/catalog/clothing?brand=${encodeURIComponent(brand.name)}`}>
                                <img className='brands__icon' src={getIconUrl(brand.imgSrc)} alt={brand.name} />
                                <div className="brands__decription">
                                    <p className='brands__name'>{brand.name}</p>
                                    <p className='brands__founded'>{brand.founded}</p>
                                    <p className='brands__from'>{brand.from}</p>
                                    <p className='brands__text'>{brand.description}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Brand;