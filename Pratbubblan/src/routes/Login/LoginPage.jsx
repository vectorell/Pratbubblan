import './LoginPage.css'

export function LoginPage() {

    function handleClick(e) {
        e.preventDefault()
    }

    return (
        <div className="LoginPage">
            <h1>LoginPage</h1>
            <form>
                <div>
                    <p> Användarnamn </p>
                    <input type="text"/>
                </div>

                <div>
                    <p> Lösenord </p>
                    <input type="password"/>
                </div>
                <button onClick={handleClick}> Logga in </button>
            </form>
        </div>
    )
}