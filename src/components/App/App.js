import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import "../ItemCard/ItemCard.css";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import "../../vendors/fonts.css";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";

export default function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("previewModal");
    setSelectedCard(card);
  };
  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const tempurature = parseWeatherData(data);
        setTemp(tempurature);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleTogggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };
  console.log(currentTemperatureUnit);
  return (
    <div className="page">
      <CurrentTempUnitContext.Provider
        value={{ currentTemperatureUnit, handleTogggleSwitchChange }}
      >
        <Header onCreateModal={handleCreateModal} />
        <Main weatherTemp={temp} onSelectedCard={handleSelectedCard} />
        <Footer />
        {activeModal === "create" && (
          <ModalWithForm
            buttonText="Add Garment"
            title="New Garment"
            onClose={handleCloseModal}
          >
            <div className="modal__label-input">
              <label className="modal__label">
                <span>Name</span>
                <input
                  className="modal__input"
                  placeholder="Name"
                  type="text"
                  name="name"
                  minLength="1"
                  maxLength="30"
                />
              </label>
              <label className="modal__label">
                <span>Image</span>
                <input
                  className="modal__input"
                  placeholder="Image"
                  type="url"
                  name="link"
                  minLength="1"
                  maxLength="30"
                />
              </label>
            </div>
            <p>Select weather type:</p>
            <div className="modal__input modal__input-radio">
              <div>
                <input type="radio" id="hot" value="hot" name="input" />
                <label>Hot</label>
              </div>
              <div>
                <input type="radio" id="warm" value="warm" name="input" />
                <label>Warm</label>
              </div>
              <div>
                <input type="radio" id="cold" value="cold" name="input" />
                <label>Cold</label>
              </div>
            </div>
          </ModalWithForm>
        )}
        {activeModal === "previewModal" && (
          <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
        )}
      </CurrentTempUnitContext.Provider>
    </div>
  );
}
