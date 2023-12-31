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
import { signIn, signUp, checkToken, editProfile } from "../../utils/auth";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Handlers
  const handleCurrentUser = (data) => {
    setCurrentUser(data);
  };
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
    setIsLoading(true);
    return signUp(name, avatar, email, password)
      .then(() => {
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onProfileSubmit = (name, avatar) => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");
    return editProfile(token, name, avatar)
      .then((name, avatar) => {
        setCurrentUser(name, avatar);
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onLogin = (email, password) => {
    setIsLoading(true);
    return signIn(email, password)
      .then((data) => {
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onGetItems = () => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
  };

  const onDelete = () => {
    const token = localStorage.getItem("jwt");
    deleteItems(selectedCard, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        handleCloseModal();
      })
      .catch(console.error);
  };

  const onAddItem = (values) => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");
    addItems(values.name, values.imageUrl, values.weather, token)
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
      .catch(console.error);
  }, []);

  useEscape(handleCloseModal);

  useEffect(() => {
    onGetItems();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((data) => {
          setIsLoggedIn(true);
          handleCurrentUser(data);
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);

  const handleLikeClick = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch(console.error)
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((c) => (c._id === id ? updatedCard : c))
            );
          })
          .catch(console.error);
  };

  return (
    <CurrentUserContext.Provider
      value={{ isLoggedIn, currentUser, setCurrentUser }}
    >
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
                isLoggedIn={isLoggedIn}
                handleLikeClick={handleLikeClick}
              />
            </Route>
            <ProtectedRoute path="/profile">
              <Profile
                onSelectedCard={handleSelectedCard}
                onCreateModal={handleCreateModal}
                clothingItems={clothingItems}
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                handleLikeClick={handleLikeClick}
              ></Profile>
            </ProtectedRoute>
          </Switch>
          <Footer />
          {activeModal === "EditProfileModal" && (
            <EditProfileModal
              setActiveModal={setActiveModal}
              onProfileSubmit={onProfileSubmit}
              onClose={handleCloseModal}
              onCreateModal={handleCreateModal}
              isLoading={isLoading}
              isOpen={activeModal === "EditProfileModal"}
              buttonText={isLoading ? "Saving..." : "Edit Profile"}
            />
          )}
          {activeModal === "ConfirmModal" && (
            <ConfirmModal
              buttonText={isLoading ? "Deleting..." : "Delete Item"}
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "ConfirmModal"}
              onDelete={onDelete}
              onClose={handleCloseModal}
              isLoading={isLoading}
            />
          )}
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
              isOpen={activeModal === "ItemModal"}
              selectedCard={selectedCard}
              handleCloseModal={handleCloseModal}
              setActiveModal={setActiveModal}
              onClose={handleCloseModal}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />
          )}
          {activeModal === "LoginModal" && (
            <LoginModal
              onCreateModal={handleCreateModal}
              onClose={handleCloseModal}
              buttonText="Log in"
              onLogin={onLogin}
              setActiveModal={setActiveModal}
              currentUser={currentUser}
              isLoading={isLoading}
            />
          )}
          {activeModal === "RegisterModal" && (
            <RegisterModal
              onClose={handleCloseModal}
              onCreateModal={handleCreateModal}
              buttonText="Next"
              onRegister={onRegister}
              setActiveModal={setActiveModal}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}
