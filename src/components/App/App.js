import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import "../ItemCard/ItemCard.css";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import "../../vendors/fonts.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Route, Switch } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, addItems, deleteItems } from "../../utils/api";
import Profile from "../Profile/Profile";
import { useEscape } from "../../hooks/useEscape";

export default function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);

  //Handlers
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

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  //API Calls
  const onGetItems = () => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onDelete = (selectedCard) => {
    deleteItems(selectedCard)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item.id !== selectedCard.id)
        );
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onAddItem = (values) => {
    setIsLoading(true);
    addItems(values.name, values.imageUrl, values.weather)
      .then((addedItem) => {
        setClothingItems((prevItems) => [
          { ...addedItem, ...values },
          ...prevItems,
        ]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEscape(handleCloseModal);

  useEffect(() => {
    onGetItems();
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onCreateModal={handleCreateModal} />
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectedCard={handleSelectedCard}
              clothingItems={clothingItems}
            />
          </Route>
          <Route path="/profile">
            <Profile
              onSelectedCard={handleSelectedCard}
              onCreateModal={handleCreateModal}
              clothingItems={clothingItems}
            ></Profile>
          </Route>
        </Switch>

        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={onAddItem}
            buttonText={isLoading ? "Saving..." : "Add Garment"}
          />
        )}
        {activeModal === "previewModal" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            onDelete={onDelete}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}
