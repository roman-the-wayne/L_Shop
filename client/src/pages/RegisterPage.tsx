import React from "react";
import "./auth.css";
import bgImage from "../assets/фотоАвт.jpg";

const RegisterPage = () => {
  return (
    <div
      className="auth-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="auth-card">

        {/* левая часть */}
        <div className="auth-left">
          <h1>Добро пожаловать в BallShop</h1>
          <p className="lead">
            Создайте аккаунт, чтобы покупать профессиональные баскетбольные
            мячи, отслеживать заказы и получать эксклюзивные предложения.
          </p>

          <div className="features">
            <div className="feature-box">
              <h4>Быстрая доставка</h4>
              <p>Отправка по всей стране в кратчайшие сроки</p>
            </div>

            <div className="feature-box">
              <h4>Профессиональное качество</h4>
              <p>Только оригинальные мячи от лучших брендов</p>
            </div>

            <div className="feature-box">
              <h4>Удобная оплата</h4>
              <p>Безопасные способы оплаты и защита покупателя</p>
            </div>
          </div>
        </div>

        {/* правая часть */}
        <div className="auth-right">
          <h2>Регистрация</h2>
          <p className="subtitle">Создайте новый аккаунт</p>

          <form className="auth-form">

            <div className="form-group">
              <label>Email адрес</label>
              <input type="email" placeholder="Введите ваш email" />
              <div className="form-hint">
                Например: example@domain.com
              </div>
            </div>

            <div className="form-group">
              <label>Пароль</label>
              <input type="password" placeholder="Введите ваш пароль" />
              <div className="form-hint">
                Минимум 6 символов
              </div>
            </div>

            <div className="form-group">
              <label>Подтвердите пароль</label>
              <input type="password" placeholder="Повторите пароль" />
            </div>

            <button type="submit">
              Зарегистрироваться
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;