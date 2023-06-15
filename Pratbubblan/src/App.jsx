import "./App.css";
import { Header } from "./components/Header/Header";
import { MainContent } from "./components/MainContent/MainContent";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { loginState } from "./recoil/atoms/loginState";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

    async function checkIfLoggedIn(token) {
        let rawCookie = document.cookie;

        // let testCookie = rawCookie.split('=')[1]

        // if (testCookie === '') {
        //   return
        // }

        if (rawCookie) {
            let cookie = JSON.parse(rawCookie.split("=")[1]);
            setIsLoggedIn(cookie);
        }
        return;
    }

    useEffect(() => {
        checkIfLoggedIn();
    }, []);

    return (
        <div className="App">
            <div>
                <Header />
            </div>
            <MainContent />
            {/* <Sidebar /> */}
        </div>
    );
}

export default App;
