import React, {useState} from 'react'
import {useNavigate, Link, useLocation} from 'react-router-dom';
import styles from './Login.module.css';

const Signup = (props) => {
    const loc = useLocation();
    const [credentials, setCredentials] = useState({name : "", email : "", password : "", cpassword : ""});
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        console.log(name,email,password);
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({name, email, password})
        });
        const json = await response.json();
        if(json.success) {
            localStorage.setItem('token', json.authtoken);
            history('/login');
            props.showAlert("Successfully Created your account", "success");
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }
    return (
        <>
            {/* <form className='container' onSubmit={handleSubmit}>
                <div className="form-group my-2">
                    <label htmlFor="name">Email Username</label>
                    <input onChange={onChange} type="text" className="form-control" name='name' id="name" aria-describedby="emailHelp" minLength={5} required placeholder="Enter User name"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="email">Email address</label>
                    <input onChange={onChange} type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" required placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password">Password</label>
                    <input onChange={onChange} type="password" name='password' className="form-control" id="password" minLength={8} required placeholder="Password"/>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input onChange={onChange} type="password" className="form-control" name='cpassword' id="cpassword" required minLength={8} placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Create account</button>
            </form> */}
            <div className={styles.container}>
                <div className={styles.inputForm}>
                    <div className={styles.inputWrapper}>
                        <div className={styles.inputItems}>
                            <Link  className= {`${loc.pathname === "/login" ? styles.loginActive : styles.login}`} to="/login" role="button">Login</Link>
                            <Link to="/signup" role="button" className={`${loc.pathname === "/signup" ? styles.loginActive : styles.login}`}>Signup</Link>
                        </div>
                        <div className={styles.inputFields}>
                            <form className={styles.input} onSubmit={handleSubmit}>
                                <div className={styles.inputCon}>
                                    <label>Name</label>
                                    <input className={styles.inputItemsField} onChange={onChange} value={credentials.name} type="text" id="name" name='name' placeholder="Enter Your Name"/>
                                </div>
                                <div className={styles.inputCon}>
                                    <label>Email address</label>
                                    <input className={styles.inputItemsField} onChange={onChange} value={credentials.email} type="email" id="email" name='email' placeholder="Enter email"/>
                                </div>
                                <div className={styles.inputCon}>
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input className={styles.inputItemsField} name='password' onChange={onChange} value={credentials.password} type="password" id="password" placeholder="Password" />
                                </div>
                                <div className={styles.inputBtn}>
                                    <button className={styles.btn} type="submit" >Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
