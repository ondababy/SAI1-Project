// import { useState } from "react";
// import api from "../api"
// import { useNavigate } from "react-router-dom";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
// import "../styles/Form.css"
// function Form({route, method}) {
//     const [username, setUsername] = useState("")
//     const [password, setPassword] = useState("")
//     const [loading, setLoading] = useState(false)
//     const navigate = useNavigate()

//     const name = method === "login" ? "Login" : "Register"

//     const handleSubmit = async (values) => {
//         setLoading(true); 
//         const { username, password } = values;
    
//         try {
//             const res = await api.post(route, { username, password });
    
//             if (method === "login") {
//                 localStorage.setItem(ACCESS_TOKEN, res.data.access);
//                 localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
//                 navigate("/"); 
//             } else {
//                 navigate("/login");
//             }
//         } catch (error) {
//             alert(error.message || "An error occurred. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };
    
//     return <form onSubmit={handleSubmit} className="form-container">
//         <h1>{name}</h1>
//         <input
//             className="form-input"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Username"
//         />
//         <input
//             className="form-input"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//         />
//         <button className="form-button" type="submit">
//             {name}
//         </button>
//     </form>

// }

// export default Form

import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevent default form submission
        setLoading(true);

        try {
            const res = await api.post(route, { username, password });

            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/"); 
            } else {
                navigate("/login");
            }
        } catch (error) {
            // Check for specific error messages from the API
            alert(error.response?.data?.detail || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit" disabled={loading}>
                {loading ? "Loading..." : name}
            </button>
        </form>
    );
}

export default Form;
