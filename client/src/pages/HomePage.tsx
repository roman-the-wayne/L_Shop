import React, { useState } from "react";
import "./home.css";

import logo from "../assets/logo.jpg";

import ball1 from "../assets/мяч1.jpg";
import ball2 from "../assets/мяч2.jpg";
import ball3 from "../assets/мяч3.jpg";
import ball4 from "../assets/мяч4.jpg";
import ball5 from "../assets/мяч5.jpg";
import ball6 from "../assets/мяч6.jpg";
import ball7 from "../assets/мяч7.jpg";
import ball8 from "../assets/мяч8.jpg";
import ball9 from "../assets/мяч9.jpg";
import ball10 from "../assets/мяч10.jpg";
import ball11 from "../assets/мяч11.jpg";
import ball12 from "../assets/мяч12.jpg";
import ball13 from "../assets/мяч13.jpg";
import ball14 from "../assets/мяч14.jpg";
import ball15 from "../assets/мяч15.jpg";

import searchIcon from "../assets/лупа.jpg";
import basketIcon from "../assets/корзина.jpg";

const balls = [
  { name: "Wilson Evolution", price: 12000, img: ball1 },
  { name: "Molten BG3000", price: 6000, img: ball2 },
  { name: "Spalding TF-1000", price: 9500, img: ball3 },
  { name: "Wilson FIBA 3x3", price: 8400, img: ball4 },
  { name: "Molten BG5000", price: 11000, img: ball5 },
  { name: "Spalding NBA Official", price: 9900, img: ball6 },
  { name: "Wilson NCAA Replica", price: 7200, img: ball7 },
  { name: "Molten GG7X", price: 8700, img: ball8 },
  { name: "Spalding Street Phantom", price: 4300, img: ball9 },
  { name: "Wilson Authentic Indoor", price: 10500, img: ball10 },
  { name: "Molten Outdoor Pro", price: 5200, img: ball11 },
  { name: "Spalding Rookie Gear", price: 3500, img: ball12 },
  { name: "Wilson Jet Pro", price: 6700, img: ball13 },
  { name: "Molten School Trainer", price: 3100, img: ball14 },
  { name: "Spalding Streetball Classic", price: 2800, img: ball15 },
];

const HomePage = () => {

  const [searchOpen, setSearchOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("по цене");

  return (
    <div className="shop-page">

      {/* логотип */}
      <img src={logo} className="logo" />

      {/* правая панель */}
      <div className="right-panel">

        <img
          src={searchIcon}
          className="panel-icon"
          onClick={() => setSearchOpen(!searchOpen)}
        />

        <img
          src={basketIcon}
          className="panel-icon"
        />

      </div>

      {/* поиск */}
      {searchOpen && (
        <div className="search-bar">
          <input placeholder="Поиск по названию мяча..." />
        </div>
      )}

      {/* бренды */}
      <div className="brands">
        {["Wilson","Molten","PLAYGROUND","Spalding","Sneakerhead"].map((brand)=>(
          <div className="brand-pill" key={brand}>
            {brand}
          </div>
        ))}
      </div>

      <div className="shop-container">

        {/* фильтры */}
        <div className="filters">

          <h2 className="filters-title">Фильтры</h2>

          <h3>РАЗМЕР</h3>

          <label>
            <input type="checkbox" /> 6
          </label>

          <label>
            <input type="checkbox" /> 7
          </label>

          <hr />

          <h3>КАТЕГОРИЯ</h3>

          <label>
            <input type="checkbox" /> indoor
          </label>

          <label>
            <input type="checkbox" /> outdoor
          </label>

        </div>

        {/* товары */}
        <div className="products-section">

          {/* сортировка */}
          <div className="sort-box">

            <div
              className="sort-header"
              onClick={() => setSortOpen(!sortOpen)}
            >
              {selectedSort} ▼
            </div>

            {sortOpen && (
              <div className="sort-options">

                <div
                  onClick={()=>{
                    setSelectedSort("по цене (по возрастанию)");
                    setSortOpen(false);
                  }}
                >
                  по цене (по возрастанию)
                </div>

                <div
                  onClick={()=>{
                    setSelectedSort("по цене (по убыванию)");
                    setSortOpen(false);
                  }}
                >
                  по цене (по убыванию)
                </div>

              </div>
            )}

          </div>

          {/* сетка товаров */}
          <div className="products-grid">

            {balls.map((ball,index)=>(
              <div className="product-card" key={index}>

                <img src={ball.img} alt={ball.name} />

                <h4>{ball.name}</h4>

                <div className="price-row">

                  <span>{ball.price} ₽</span>

                  <button>
                    В корзину
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default HomePage;