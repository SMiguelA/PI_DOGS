import style from './landingPage.module.css';
import { useState, useEffect } from 'react';
import validacion from './validacion';

const LandingPage = ({login, setAccess}) => {

    setAccess(false);

    const [checkUsername, setUsername] = useState({
        username:""
    });

    const [error, setError] = useState({
        username:""
    })

    const handlerInput = (event) => {
        let value = event.target.value;

        setUsername({ ...checkUsername, username:value });
        validacion({...checkUsername, username:value}, error, setError);
    };

    const handlerSubmit = (event) => {

        // ? esta linea impide que se recargue la pagina
        event.preventDefault();
        if(error.username) {
            alert('Incomplete or too long name');
            return;
        };
        login();
    };

    useEffect(() => {
        setError({...error, username: 'Enter a name'})
    },[]);


    return(
        <div className={style.fondo}>
            <form onSubmit={handlerSubmit} className={style.content}>
                <h1>¡Welcome Dogs Lovers!</h1>
                <div className={style.divContInput}>
                    <input className={
                        error.username ? style.inputError : style.input
                        } type="text" name='username' value={checkUsername.username} onChange={handlerInput} autoComplete='off'/>
                    <label htmlFor='username' className={style.label}>Please enter your name:</label>
                    <p className={style.err}>{error.username}</p>
                </div>
                <button>Lets Go ;)</button>
            </form>
        </div>
    );
};

export default LandingPage;