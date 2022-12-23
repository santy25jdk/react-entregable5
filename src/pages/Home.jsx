import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTrainerGlobal } from "../store/slices/trainer.slice";
import "./styles/home.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainerGlobal(e.target.name.value.trim()));
    e.target.name.value = "";
    navigate("/pokedex");
  };

  return (
    <div className="home">
      <img className="home__img" src="/Home/pokedex.png" alt="" />
      <div className="title-container">
        <h1 className="home__title">¡Hi Trainer!</h1>
        <p className="home__subtitle">Give me your name to start</p>
      </div>
      <form className="home__form" onSubmit={handleSubmit}>
        <input className="home__input" id="name" type="text" placeholder="your name..." />
        <button className="home__button">Start</button>
      </form>
      <div className="container__principal">
        <div className="container__barra">
          <div className="red"></div>
          <div className="black"></div>
          
          <div className="circle__margin">
            <div className="circle__padding">
              <div className="circle__element"></div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
