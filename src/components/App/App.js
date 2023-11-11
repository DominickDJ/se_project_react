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
import { getItems, addItems, deleteItems, api } from "../../utils/api";
import Profile from "../Profile/Profile";
import { useEscape } from "../../hooks/useEscape";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { signIn, signUp } from "../../utils/auth";

export default function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Handlers
  const handleCreateModal = (modalName) => {
    setActiveModal(modalName);
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
  const onRegister = (name, avatar, email, password) => {
    return signUp(name, avatar, email, password).then(() => {
      setIsLoggedIn(true);
      handleCloseModal();
    });
  };

  const onLogin = (email, password) => {
    return signIn(email, password).then(() => {
      handleCloseModal();
    });
  };

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

  const handleLikeClick = ({ id, isLiked, user }) => {
    const token = localStorage.getItem("jwt");
    isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch((err) => console.log(err));
  };
  return (
    <CurrentUserContext.Provider value={isLoggedIn}>
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
                onCardLike={handleLikeClick}
              />
            </Route>
            <ProtectedRoute path="/profile">
              <Profile
                onSelectedCard={handleSelectedCard}
                onCreateModal={handleCreateModal}
                clothingItems={clothingItems}
                isLoggedIn={isLoggedIn}
              ></Profile>
            </ProtectedRoute>
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
          {activeModal === "LoginModal" && (
            <LoginModal
              onCreateModal={handleCreateModal}
              onClose={handleCloseModal}
              buttonText="Log in"
              onLogin={onLogin}
            />
          )}
          {activeModal === "RegisterModal" && (
            <RegisterModal
              onClose={handleCloseModal}
              onCreateModal={handleCreateModal}
              buttonText="Next"
              onRegister={onRegister}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}
