import { useHistory } from 'react-router-dom'
import { firebase, auth } from '../../services/firebase'
import { Button } from '../../components/Button/button'
import googleIconImg from '../../assets/google-icon.svg'
import './styles.scss'

export function Login() {

    const history = useHistory()


    function signIn() {

        const provider = new firebase.auth.GoogleAuthProvider()

        auth.signInWithPopup(provider).then(result => {

            history.push('/dragons')

        })
    }

    return (

        <div id="div-login">


            <Button 
                className="button-login" 
                type="button" 
                onClick={signIn}
                
            >
                <img src={googleIconImg} alt="" />
                Faça login com o Google
            </Button>

            <h2>E conheça o mundo escondido de SMAUG!</h2>



        </div>
    )
}