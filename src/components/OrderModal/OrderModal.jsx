"use client";
import { useState } from 'react';
import { useShop } from '../../context/ShopContext.jsx';
import './OrderModal.scss';

const OrderModal = ({ isOpen, onClose, onOrderSuccess }) => {
    const { cart } = useShop();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('+7 ');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');
    const [delivery, setDelivery] = useState('cdek');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const Cities = [
        'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань',
        'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону',
        'Уфа', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград', 'Краснодар', 'Сочи'
    ];

    if (!isOpen) return null;

    const handlePhoneChange = (e) => {
        const input = e.target.value;
        if (input.length < 3) {
            setPhone('+7 ');
            return;
        }
        const digitsAfterPrefix = input.slice(3).replace(/[^\d]/g, '');
        if (digitsAfterPrefix.length <= 10) {
            setPhone(`+7 ${digitsAfterPrefix}`);
        }
    };

    const handlePhoneFocus = () => {
        if (!phone) setPhone('+7 ');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');

        // Валидация
        const nameWords = name.trim().split(/\s+/);
        if (nameWords.length < 2) {
            setSubmitError('Пожалуйста, введите имя и фамилию через пробел');
            return;
        }

        const pureDigits = phone.replace(/[^\d]/g, '');
        if (pureDigits.length < 11) {
            setSubmitError('Номер телефона должен содержать 11 цифр (включая +7)');
            return;
        }

        if (!city.trim()) {
            setSubmitError('Пожалуйста, выберите или введите город доставки');
            return;
        }

        if (!cart || cart.length === 0) {
            setSubmitError('Корзина пуста');
            return;
        }

        // Считаем сумму
        const totalPrice = cart.reduce((sum, item) => {
            const price = parseInt(item.price.toString().replace(/[^\d]/g, ''), 10) || 0;
            return sum + price * item.quantity;
        }, 0);

        // Формируем данные для отправки
        const orderData = {
            customerName: name.trim(),
            phone: phone.trim(),
            email: email.trim() || null,
            city: city.trim(),
            address: address.trim() || null,
            comment: comment.trim() || null,
            delivery: delivery,
            items: cart.map(item => ({
                id: item.id,
                brand: item.brand,
                description: item.description,
                price: item.price,
                size: item.size,
                quantity: item.quantity,
                imgSrc: item.imgSrc,
            })),
            totalPrice,
        };

        try {
            setIsSubmitting(true);

            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Ошибка отправки заказа');
            }

            onOrderSuccess(nameWords[0], data.orderId);

            // Очищаем форму
            setName('');
            setPhone('+7 ');
            setEmail('');
            setCity('');
            setAddress('');
            setComment('');
            setDelivery('cdek');

            onClose();
        } catch (err) {
            setSubmitError(err.message || 'Не удалось отправить заказ. Попробуйте позже.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="order__modal-overlay" onClick={onClose}>
            <div className="order__modal" onClick={(e) => e.stopPropagation()}>
                <button className="order__modal-close-btn" onClick={onClose}>✕</button>

                <h2 className="order__modal-title">Оформление заказа</h2>

                <form className="order__modal-form" onSubmit={handleSubmit}>

                    <div className="order__modal-field">
                        <label className="order__modal-label">Имя и Фамилия</label>
                        <input
                            type="text"
                            className="order__modal-input"
                            placeholder="Иван Иванов"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="order__modal-field">
                        <label className="order__modal-label">Телефон</label>
                        <input
                            type="text"
                            className="order__modal-input"
                            placeholder="+7 (999) 999-99-99"
                            value={phone}
                            onChange={handlePhoneChange}
                            onFocus={handlePhoneFocus}
                            required
                        />
                    </div>

                    <div className="order__modal-field">
                        <label className="order__modal-label">Email (необязательно)</label>
                        <input
                            type="email"
                            className="order__modal-input"
                            placeholder="example@mail.ru"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="order__modal-field">
                        <label className="order__modal-label">Город доставки</label>
                        <input
                            type="text"
                            className="order__modal-input"
                            placeholder="Выберите или введите город"
                            list="cities-list"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                        <datalist id="cities-list">
                            {Cities.map((item, index) => (
                                <option key={index} value={item} />
                            ))}
                        </datalist>
                    </div>

                    <div className="order__modal-field">
                        <label className="order__modal-label">Адрес (необязательно)</label>
                        <input
                            type="text"
                            className="order__modal-input"
                            placeholder="ул. Пушкина, д. 10, кв. 5"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className="order__modal-field">
                        <label className="order__modal-label">Комментарий (необязательно)</label>
                        <input
                            type="text"
                            className="order__modal-input"
                            placeholder="Например, позвонить за час"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    <div className="order__modal-field">
                        <label className="order__modal-label">Способ доставки</label>
                        <select
                            className="order__modal-select"
                            value={delivery}
                            onChange={(e) => setDelivery(e.target.value)}
                        >
                            <option value="cdek">СДЭК (Быстро / До склада или двери)</option>
                            <option value="post">Почта России (В любое отделение)</option>
                        </select>
                    </div>

                    {submitError && (
                        <div className="order__modal-error">{submitError}</div>
                    )}

                    <button
                        type="submit"
                        className="order__modal-submit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Отправка...' : 'Подтвердить заказ'}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default OrderModal;