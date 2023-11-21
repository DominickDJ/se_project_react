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
    return signUp(name, avatar, email, password)
      .then(() => {
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onSubmit = (name, avatar) => {
    const token = localStorage.getItem("jwt");
    return editProfile(token, name, avatar)
      .then((name, avatar) => {
        setCurrentUser(name, avatar);
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onLogin = (email, password) => {
    return signIn(email, password)
      .then((data) => {
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
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
      .catch((error) => {
        console.error(error);
      });
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
                onCardLike={handleLikeClick}
              />
            </Route>
            <ProtectedRoute path="/profile">
              <Profile
                onSelectedCard={handleSelectedCard}
                onCreateModal={handleCreateModal}
                clothingItems={clothingItems}
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
              ></Profile>
            </ProtectedRoute>
          </Switch>
          <Footer />
          {activeModal === "EditProfileModal" && (
            <EditProfileModal
              setActiveModal={setActiveModal}
              onSubmit={onSubmit}
              onClose={handleCloseModal}
              onCreateModal={handleCreateModal}
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
            />
          )}
          {activeModal === "LoginModal" && (
            <LoginModal
              onCreateModal={handleCreateModal}
              onClose={handleCloseModal}
              buttonText="Log in"
              onLogin={onLogin}
              setActiveModal={setActiveModal}
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
