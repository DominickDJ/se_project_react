import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import ItemModal from "../ItemModal/ItemModal";
import "../ItemCard/ItemCard.css";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import "../../vendors/fonts.css";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";
import { Route, Switch } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, addItems, deleteItems } from "../../utils/api";
import Profile from "../Profile/Profile";
export default function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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
  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const tempurature = parseWeatherData(data); // the mistake is here. Temperature must be a number, not object OR it can be object, but you must handle it as object
        setTemp(tempurature);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  //API Calls
  const onGetItems = () => {
    getItems().then((items) => {
      setClothingItems(items);
    });
  };
  useEffect(() => {
    onGetItems();
  }, []);

  const onAddItem = (values) => {
    addItems(values.name, values.imageUrl, values.weather)
      .then((addedItem) => {
        setClothingItems((prevItems) => [...prevItems, addedItem]);
      })
      .catch((error) => {
        console.error(error);
      });

    handleCloseModal();
  };

  const onDelete = (selectedCard) => {
    deleteItems(selectedCard)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item.id !== selectedCard.id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
    handleCloseModal();
  };

  return (
    <div className="page">
      <CurrentTempUnitContext.Provider
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
          />
        )}
        {activeModal === "previewModal" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            onDelete={onDelete}
          />
        )}
      </CurrentTempUnitContext.Provider>
    </div>
  );
}
