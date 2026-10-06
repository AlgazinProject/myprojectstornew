"use client";
import Link from 'next/link';
import './Footer.scss';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const getIconUrl = (name) => `/icons/${name}`;

    return (
        <footer className="footer">
            <div className="footer__inner container">
                <div className="footer__grid">

                    <div className="footer__col footer__col--info">
                        <Link href="/" className="footer__logo-link">
                            <img className="footer__logo-images" src={getIconUrl('Stone-Island-Logo.svg')} alt="Stone Island" />
                        </Link>
                        <p className="footer__text">
                            Интернет-магазин технологичной и премиальной casual одежды. Эксклюзивные архивные коллекции и дропы.
                        </p>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__col-title">Каталог</h4>
                        <ul className="footer__menu-list">
                            <li className="footer__menu-item">
                                <Link href="/catalog/clothing" className="footer__menu-link">Одежда</Link>
                            </li>

                            <li className="footer__menu-item">
                                <Link href="/catalog/shoes" className="footer__menu-link">Обувь</Link>
                            </li>

                            <li className="footer__menu-item">
                                <Link href="/catalog/accessories" className="footer__menu-link">Аксессуары</Link>
                            </li>
                            <li className="footer__menu-item">
                                <Link href="/brands" className="footer__menu-link">Бренды</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__col-title">Покупателю</h4>
                        <ul className="footer__menu-list">
                            <li className="footer__menu-item">
                                <Link href="/delivery" className="footer__menu-link">Доставка и оплата</Link>
                            </li>
                            <li className="footer__menu-item">
                                <Link href="/return" className="footer__menu-link">Возврат товара</Link>
                            </li>
                            <li className="footer__menu-item">
                                <a href="#" className="footer__menu-link" id="footer__link-discounts">Скидки и акции 🔥</a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__col-title">Контакты</h4>
                        <ul className="footer__menu-list footer__menu-list--contacts">
                            <li className="footer__menu-item">
                                <a
                                    className="footer__contact-link"
                                    href="https://google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg className="footer__contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    Москва, ул. Петровка, 15
                                </a>
                            </li>
                            <li className="footer__menu-item">
                                <a className="footer__contact-link" href="tel:+78005553535">
                                    <svg className="footer__contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.79 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                    8 (800) 555-35-35
                                </a>
                            </li>
                            <li className="footer__menu-item">
                                <a className="footer__contact-link" href="mailto:support@stone-store.ru">
                                    <svg className="footer__contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                    support@stone-store.ru
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="footer__bottom">
                    <p className="footer__copy">
                        &copy; {currentYear} STONE ISLAND STORE. Все права защищены.
                    </p>
                    <div className="footer__payments">
                        <span className="footer__payment-type">MIR</span>
                        <span className="footer__payment-type">VISA</span>
                        <span className="footer__payment-type">MASTERCARD</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;