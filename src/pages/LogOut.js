import { useEffect } from "react"
import Loading from "../components/Loading"
import * as Realm from 'realm-web'
import { useHistory } from "react-router"
import { isAnon } from "../utils"

function LogOut ({mongoContext: {app, user, setUser, setClient}}) {
    const history = useHistory()

    if (isAnon(user)) {
        history.push('/')
    }

    useEffect(() => {
        async function logout () {
            console.log("logout")
            await app.currentUser.logOut()
            //login anon user
            setUser(await app.logIn(Realm.Credentials.anonymous()))
            //set new client
            setClient(app.currentUser.mongoClient('mongodb-atlas'))
        }

        logout()
    }, [app, setClient, setUser])

    return (
        <Loading />
    )
}

export default LogOut