import { createContext, useContext, useState,useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const[token,setToken]=useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading,setIsLoading]=useState(true);
  const [services,setServices ] = useState([]);
  const authorizationToken =`Bearer ${token}`;
  const API=import.meta.env.VITE_APP_URI_API;
  //function to stored the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };


let isLoggedIn=!!token;
console.log("isLoggedIn",isLoggedIn);

    const LogoutUser=()=>{
      setToken("");
      return localStorage.removeItem("token");
  };
  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response=await fetch(`${API}/api/auth/user`,{
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('user-data',data.userData);
        // our main goal is to get the user data 👇
        setUser(data.userData);
        setIsLoading(false);
      } else {
        console.error("Error fetching user data");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error fetching user data");
    }
  };

  const getServices=async()=>{
    try {
      const response=await fetch(`${API}/api/data/service`,{
        method:"GET",
      });
      if(response.ok){
        const services=await response.json();
        // console.log(data.msg);
        setServices(services.data);
      }
    } catch (error) {
      console.log(`service error ${error}`)
    }

  }





  useEffect(() => {
    getServices(); 
    userAuthentication();
  }, []);

  
  return (
    <AuthContext.Provider value={{ isLoggedIn,storeTokenInLS,LogoutUser,user,services,authorizationToken,API,isLoading,}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};






