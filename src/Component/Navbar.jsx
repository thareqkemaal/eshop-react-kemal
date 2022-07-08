import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Text } from "@chakra-ui/react";
import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { logoutAction } from "../actions/userAction";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { API_URL } from "../helper.js";
import { AiOutlinePoweroff } from "react-icons/ai";
import ClipLoader from "react-spinners/ClipLoader";

import {
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

const NavbarComponent = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username, status, role } = useSelector((state) => { // const { username, status, role } = global;
    return {
      username: state.userReducer.username,
      status: state.userReducer.status,
      role: state.userReducer.role,
    };
  });
  
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 1000)
  }, []);
   
  console.log("cek use selector NAVBAR", global);

  const btnLogout = () => {
    Axios.get(API_URL + `/users?username=${username}&status=${status}`)
      .then((response) => {
        console.log("btn logout", response.data);
        localStorage.removeItem("eshopLog");
        dispatch(logoutAction());
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <div style={{ position: "absolute", zIndex: "2", width: "100%" }}>
      <div className="navbar navbar-expand-lg navbar-light bg-transparent">
        <div className="container">
          <span className="navbar-brand" onClick={() => navigate("/")}>
            <span className="fw-bold text-light">E-SHOP</span>
            <span className="lead ms-1 text-light">| Furniture</span>
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#eshopNavbar"
            aria-controls="eshopNavbar"
            aria-expanded="false"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="eshopNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li>
                <span
                  className="nav-link text-light"
                  onClick={() => navigate("/products")}
                >
                  Product
                </span>
              </li>
            </ul>
            <div className="d-flex">
              {username ? (
                <div>
                  {
                    loading ?
                        <ClipLoader color={"#545454"} loading={loading} size={40}/>
                    :
                    <div>
                      {role === "Admin" ? (
                        <div>
                          <div className="d-flex align-items-center">
                            <Text className="text-white me-3" fontStyle="italic">
                              {status}
                            </Text>
                            <Menu>
                              <MenuButton>
                                <Avatar name={username} size="md">
                                  <AvatarBadge boxSize="1em" bg="green.500" />
                                </Avatar>
                              </MenuButton>
                              <MenuList>
                                <div>
                                  <MenuItem
                                    onClick={() => navigate("/products/admin")}
                                  >
                                    Product Management
                                  </MenuItem>
                                  <MenuItem>Transaction Management</MenuItem>
                                </div>
                                <div className="d-flex align-items-center">
                                  <div>
                                    <MenuItem
                                      type="button"
                                      onClick={btnLogout}
                                      className="fw-bold"
                                    >
                                      Log Out
                                    </MenuItem>
                                  </div>
                                  <div>
                                    <AiOutlinePoweroff />
                                  </div>
                                </div>
                              </MenuList>
                            </Menu>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="d-flex align-items-center">
                            <Text className="text-white me-3" fontStyle="italic">
                              {status}
                            </Text>
                            <Menu>
                              <MenuButton>
                                <Avatar name={username} size="md">
                                  <AvatarBadge boxSize="1em" bg="green.500" />
                                </Avatar>
                              </MenuButton>
                              <MenuList>
                                <div>
                                  <MenuItem onClick={() => navigate("/products")}>
                                    Product
                                  </MenuItem>
                                  <MenuItem>Cart</MenuItem>
                                </div>
                                <div className="d-flex align-items-center">
                                  <div>
                                    <MenuItem
                                      type="button"
                                      onClick={btnLogout}
                                      className="fw-bold"
                                    >
                                      Log Out
                                    </MenuItem>
                                  </div>
                                  <div>
                                    <AiOutlinePoweroff />
                                  </div>
                                </div>
                              </MenuList>
                            </Menu>
                          </div>
                        </div>
                      )}
                    </div>
                  }
                </div>
              ) : (
                <div className="btn-group">
                  <button
                    className="btn btn-outline-light"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </button>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => navigate("/register")}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
