"use client";
import Link from 'next/link';
import { brands } from '../data/brands.js';
import './page.scss';

const getIconUrl = (name) => {
    return `/icons/${name}`;
};

const Home = () => {
    return (
        <section className="home">
            <div className="home__inner container">
                <div className="home__hero">
                   <img src={getIconUrl('Stone-Island-Logo.svg')} alt="Stone Island" className="home__hero-logo"/>
                    <h1 className="home__hero-title"> Эстетика технологий и уличной культуры</h1>
                    <h3 className="home__hero-subtitle">Одежда, которая сочетает инновационные материалы, культовый дизайн и безупречный стиль.</h3>
                    <Link href="/catalog/clothing" className="home__hero-link">Перейти в каталог</Link>
                </div>
            </div>

            <div className="home__brands">
                <h2 className="home__brands-label">Brands</h2>
                    <div className="home__brands-carousel">
                        {[...brands, ...brands].map((brand, index) => (
                            <Link
                                key={`${brand.id}-${index}`}
                                href={`/catalog/clothing?brand=${encodeURIComponent(brand.name)}`}
                                className="home__brands-item"
                            >
                                <img
                                    src={brand.imgSrc.startsWith('http') ? brand.imgSrc : `/icons/${brand.imgSrc}`}
                                    alt={brand.name}
                                    className="home__brands-logo"
                                />
                            </Link>
                        ))}
                </div>
            </div>

       
            <div className="home__features container">
                <div className="home__feature">
                    <span className="home__feature-num">01</span>
                    <h3 className="home__feature-title">Доставка по России</h3>
                    <p className="home__feature-text">
                        Отправляем СДЭК и Почтой России в течение 1–3 дней
                    </p>
                </div>
                <div className="home__feature">
                    <span className="home__feature-num">02</span>
                    <h3 className="home__feature-title">14 дней на возврат</h3>
                    <p className="home__feature-text">
                        Если товар не подошёл — вернём деньги без вопросов
                    </p>
                </div>
                <div className="home__feature">
                    <span className="home__feature-num">03</span>
                    <h3 className="home__feature-title">Только оригинал</h3>
                    <p className="home__feature-text">
                        Закупаем у официальных дистрибьюторов бренда
                    </p>
                </div>
            </div>

        </section>
    );
};

export default Home;