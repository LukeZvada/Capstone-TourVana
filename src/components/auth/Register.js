import React, { useRef } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import "./Login.css"

export const Register = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?username=${username.current.value}`)
            .then(_ => _.json())
            .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            existingUserCheck()
                .then(() => {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: username.current.value,
                            password: password.current.value,
                            name: `${firstName.current.value} ${lastName.current.value}`
                        })
                    })
                        .then(_ => _.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("tourVana_username", createdUser.id)
                                props.history.push("/")
                            }
                        })
                })
        } else {
            passwordDialog.current.showModal()
        }
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
        buttonStyle: {
            '& > *': {
                margin: theme.spacing(1),
                background: "#EB5757",
                color: "#FFFFFF",
                width: "80px",
                height: "20px",
                borderRadius: "5rem"
            },
        },
    }));
    
    const classes = useStyles()

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <div className={classes.buttonStyle}>
                     <Button className="button--close" variant="contained" onClick={e => passwordDialog.current.close()}>Close</Button>
                </div>            
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
            <img src={ require('../images/TourVanaLogo.png') } />
                <fieldset>
                    <label htmlFor="firstName"> </label>
                    <input ref={firstName} type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="First name"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> </label>
                    <input ref={lastName} type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Last name"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputUsername">  </label>
                    <input ref={username} type="username"
                        name="username"
                        className="form-control"
                        placeholder="Username"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword">  </label>
                    <input ref={password} type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword">  </label>
                    <input ref={verifyPassword} type="password"
                        name="verifyPassword"
                        className="form-control"
                        placeholder="Verify password"
                        required />
                </fieldset>
                <fieldset>
                    <div className={classes.root}>
                        <Button className="loginButton" variant="contained" type="submit">
                            Sign in
                        </Button>
                    </div>
                </fieldset>
            </form>
        </main>
    )
}
