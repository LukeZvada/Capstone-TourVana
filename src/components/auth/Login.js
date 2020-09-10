import React, { useRef } from "react"
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import "./Login.css"


export const Login = props => {
    const username = useRef()
    const password = useRef()
    const existDialog = useRef()
    const passwordDialog = useRef()
    
    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?username=${username.current.value}`)
        .then(_ => _.json())
        .then(user => user.length ? user[0] : false)
    }
    
    const handleLogin = (e) => {
        e.preventDefault()
        
        existingUserCheck()
        .then(exists => {
            if (exists && exists.password === password.current.value) {
                localStorage.setItem("tourVana_username", exists.id)
                props.history.push("/")
            } else if (exists && exists.password !== password.current.value) {
                passwordDialog.current.showModal()
            } else if (!exists) {
                existDialog.current.showModal()
            }
        })
    }
    
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                background: "#EB5757",
                color: "#FFFFFF",
                width: "300px",
                borderRadius: "5rem"
            },
 
        },
    }));
    
    const classes = useStyles()

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>
            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Password does not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <img src={ require('../images/TourVanaLogo.png') } />
                    <fieldset>
                        <label htmlFor="inputUsername"> username </label>
                        <input ref={username} type="username"
                            id="username"
                            className="form-control"
                            placeholder="Username"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            required />
                    </fieldset>
                    <fieldset className="login--fieldset">
                        <div className={classes.root}>

                            <Button className="loginButton" variant="contained" type="submit">
                                Sign in
                            </Button>
                        </div>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">NEW ACCOUNT</Link>
            </section>
        </main>
    )
}
