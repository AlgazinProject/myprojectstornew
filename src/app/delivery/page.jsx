import './Delivery.scss'

const Delivery = () => {
    return (
        <section className="delivery container">
            <div className="delivery__innder">
                <h1 className="delivery__title">Доставка и оплата</h1>
                <div className="delivery__body">
                    <h2 className="delivery__subtitle">Доставка</h2>
                    <p className="delivery__text">
                        Мы доставляем заказы по всей России. Срок доставки — от 2 до 7 рабочих дней
                        в зависимости от региона. По Москве и Санкт-Петербургу возможна курьерская
                        доставка в день заказа.
                    </p>

                    <h2 className="delivery__subtitle">Оплата</h2>
                    <p className="delivery__text">
                        Принимаем к оплате банковские карты МИР, VISA, MasterCard, а также
                        бесконтактную оплату через Apple Pay и Google Pay. Возможна оплата при
                        получении для жителей Москвы и Санкт-Петербурга.
                    </p>

                    <h2 className="delivery__subtitle">Стоимость</h2>
                    <p className="delivery__text">
                        При заказе от 10 000 ₽ доставка по России — бесплатно. При меньшей сумме
                        заказа стоимость доставки рассчитывается индивидуально при оформлении.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Delivery