import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import App from '../../App.jsx'


const SignUp = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "client",
    agreeTerms: false,
  });

  const handleroleChange = (type) => {
    setSignUpForm({
      ...signUpForm,
      role: type,
    });
    console.log(signUpForm);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignUpForm({
      ...signUpForm,
      [name]: type === "checkbox" ? checked : value,
    });
    console.log(signUpForm);
  };

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  
  const {serverUrl , setChanged } = useContext(App.context)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(signUpForm.email)) {
      setMessage("Invalid email address!!");
    } else if (signUpForm.password.length <= 0) {
      setMessage("You must set a password!!");
    } else if (signUpForm.password !== signUpForm.confirmPassword) {
      setMessage("Passwords are unmatched!!");
    } else if (!signUpForm.agreeTerms) {
      setMessage("You have to agree to the terms and conditions");
    } else {
      try {
        setMessage('')
        const register = await axios.post(`${serverUrl}/api/v1/auth/register/user`,signUpForm)
        if(register.status===201){
          const login = await axios.post(
            `${serverUrl}/api/v1/auth/login`,signUpForm,{withCredentials:true})
            setChanged(true)

            if (signUpForm.role === "client") {
              navigate("/register/client");
            } else if (signUpForm.role === "seller") {
              navigate("/register/seller");
            }
            
             } 
      } catch (error) {
        console.log(error)
        setMessage(error.response.data.error)
      }
      
    }
  };

  return (
    <div className="py-12 min-h-screen flex items-center justify-center bg-custom-background rounded bg-cover bg-no-repeat px-4 sm:px-10 lg:px-8">
      <div className="max-w-lg w-full py-10 px-16 rounded space-y-8 bg-white">
        <div>
          <h2 className="text-center text-4xl font-extrabold text-gray-900 font-montserrat">
            REGISTER
          </h2>
        </div>
        <form
          className="space-y-6 flex flex-col gap-4"
          onSubmit={handleSubmit}
          method="post"
        >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md font-montserrat flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="font-semibold text-gray-900">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="text"
                required
                className="input appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={signUpForm.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="font-semibold text-gray-900">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={5}
                className="input appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={signUpForm.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="font-semibold text-gray-900"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                minLength={5}
                required
                className="input block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={signUpForm.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-900 mb-4">
                User Type
              </label>
              <div>
                <button
                  type="button"
                  className={`px-8 py-4 font-semibold font-montserrat mr-2 ${
                    signUpForm.role === "client"
                      ? "border-[#607D8B] border-[3px]"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleroleChange("client")}
                >
                  Client
                </button>
                <button
                  type="button"
                  className={`px-8 py-4 font-semibold font-montserrat mr-2 ${
                    signUpForm.role === "seller"
                      ? "border-[#607D8B] border-[3px]"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleroleChange("seller")}
                >
                  Seller
                </button>
              </div>
            </div>
            <div className="flex items-center ml-2">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                required
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={signUpForm.agreeTerms}
                onChange={handleChange}
              />
              <label
                htmlFor="agreeTerms"
                className="ml-2 block text-sm text-gray-900"
              >
                I agree to the
                <a
                  href="#"
                  className="font-medium text-blue-400 inline-block ml-1"
                >
                  terms and conditions
                </a>
              </label>
            </div>
          </div>
          <p className="text-red-500">{message}</p>
          <button type="submit" className="button">
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
