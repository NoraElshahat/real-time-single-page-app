import Token from './Token'
import AppStorage from './AppStorage'

class User {

    login(data){
        axios.post('/api/auth/login',data)
        .then(res=> this.afterLogin(res))
        .catch((err)=>console.log(err));
    }

    afterLogin(responseVar){

        const access_token = responseVar.data.access_token
        const user = responseVar.data.user
        
        if(Token.isValid(access_token))
        {
            AppStorage.store(user,access_token)  
            console.log("Token stored")
        }
        else 
        {
            console.log("Token isn't valid")
         }
    }

    hasToken(){
        const storedToken = AppStorage.getToken()
        if(storedToken){
           return Token.isValid(storedToken) ? true : false
        }
        return false
    }

    loggedIn(){
        return this.hasToken()
    }

    loggedOut(){
        AppStorage.clear()
    }

    name(){
        if(this.loggedIn())
        {
            return AppStorage.getUser()
        }
    }

    id(){
        if(this.loggedIn())
        {
            const payload = Token.payload(AppStorage.getToken())
            return payload.sub
        }
    }
}


export default User = new User();