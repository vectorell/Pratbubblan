import "./App.css";
import { Header } from "./components/Header/Header";
import { MainContent } from "./components/MainContent/MainContent";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { loginState } from "./recoil/atoms/loginState";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
    const [rerender, setRerender] = useState(0)

    async function checkIfLoggedIn(token) {
        let rawCookie = document.cookie;
        // console.log(rawCookie)

        // let testCookie = rawCookie.split('=')[1]

        // if (testCookie === '') {
        //   return
        // }
        let cookieValue = rawCookie.split("=")[1];
        if (cookieValue) {
            let cookie = JSON.parse(cookieValue);
            setIsLoggedIn(cookie);
        }

        // if (rawCookie !== 'user_cookie=') {
        //     let cookie = JSON.parse(rawCookie.split("=")[1]);
        //     setIsLoggedIn(cookie);
        // }
        return;
    }

    useEffect(() => {
        checkIfLoggedIn();
    }, []);

    return (
        <div className="App">
            <div>
                <Header render={rerender} setRerender={setRerender}/>
            </div>
            <MainContent />
            {/* <Sidebar /> */}
        </div>
    );
}

export default App;
