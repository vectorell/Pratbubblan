import { useRecoilState } from "recoil";
import "./EditAccount.css";
import { loginState } from "../../recoil/atoms/loginState";
import { useRef, useState } from "react";
import { putExistingUser } from "../../utils/AJAX/users/putExistingUser";
import { useParams } from "react-router";
import { deleteUser } from "../../utils/AJAX/users/deleteUser";
import { useNavigate } from "react-router";

export function EditAccount() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
    const [confirmation, setConfirmation] = useState(false);
    const usernameInput = useRef(null);
    const emailInput = useRef(null);
    const { uuid } = useParams();
    const navigate = useNavigate();

    async function handleClick(e) {
        e.preventDefault();

        let updatedUsername = usernameInput.current.value;
        let updatedEmail = emailInput.current.value;

        let reqBody = {
            name: updatedUsername,
            mail: updatedEmail,
            uuid: isLoggedIn.uuid,
            token: isLoggedIn.token,
        };

        await putExistingUser(reqBody);
        usernameInput.current.value = "";
        emailInput.current.value = "";
    }

    async function handleDelete(e) {
        e.preventDefault();
        setConfirmation(!confirmation);

        let reqBody = {
            uuid: isLoggedIn.uuid,
            token: isLoggedIn.token,
        };

        // console.log("reqBody: ", reqBody);

        await deleteUser(reqBody);
        navigate("/");
    }

    return (
        <div className="EditAccount">
            <h1> Hej, {isLoggedIn.name}! </h1>
            <h2> Redigera konto </h2>

            <form>
                <div>
                    <p> Användarnamn: </p>
                    <input type="text" ref={usernameInput} />
                </div>
                <div>
                    <p> Mailadress:</p>
                    <input type="text" ref={emailInput} />
                </div>

                <div>
                    <button onClick={handleClick}> Spara </button>
                    {!confirmation && (
                        <button onClick={() => setConfirmation(true)}>
                            {" "}
                            Radera konto{" "}
                        </button>
                    )}

                    {confirmation && (
                        <button onClick={handleDelete}> Är du säker? </button>
                    )}
                </div>
            </form>
        </div>
    );
}
