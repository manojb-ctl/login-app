import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [errors, setErrors] = useState({});
    const regexEmail =
        /^(([^<>()[\],;:\s@]+([^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i;

    const inputChange = (e) => {
        console.log(e.target.value);
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const signupUserData = (e) => {
        e.preventDefault();

        // Form Validation....
        if (!user.name || user.name === "") {
            setErrors({
                ...errors,
                name: "Name must be required*"
            });
            return;
        } else if (!user.username || user.username === "") {
            setErrors({
                ...errors,
                username: "Username must be required*"
            });
            return;
        } else if (!user.email || user.email === "") {
            setErrors({
                ...errors,
                email: "Email must be required*"
            });
            return;
        } else if (!user.email || regexEmail.test(user.email) === false) {
            setErrors({
                ...errors,
                email: "Email is not valid*"
            });
            return;
        } else if (!user.password || user.password === "") {
            setErrors({
                ...errors,
                password: "Password must be required*"
            });
            return;
        } else {
            // Form Validation is finished....
            let olddata = localStorage.getItem('UserData');
            console.log("Get Old Items : ", JSON.parse(olddata));
            if (olddata === null) {
                olddata = [];
                olddata.push(user);
                localStorage.setItem('UserData', JSON.stringify(olddata));
                console.log("Olddata: ", olddata);
            } else {
                let oldArr = JSON.parse(olddata);
                oldArr.push(user);
                localStorage.setItem("UserData", JSON.stringify(oldArr));
                console.log("OldArr: ", oldArr);
            }
            console.log("Saved in Local Storage");
            navigate("/login");
        }
    }
   
  return (
    <>
        <div className='container'>
            <h1>SignUp Form</h1>
            <form className='user-form'>
                <input type="text" 
                    name="name" 
                    placeholder='Name' 
                    onChange={e => inputChange(e)}
                />
                { errors.name ? <div className='error'>{errors.name}</div> : null }
                <br/><br/>
                <input type="text" 
                    name="username" 
                    placeholder='Username' 
                    onChange={e => inputChange(e)}
                />
                { errors.username ?  <div className='error'>{errors.username}</div> : null }
                <br/><br/>
                <input type="text" 
                    name="email" 
                    placeholder='Email'
                    onChange={e => inputChange(e)}
                />
                { errors.email ?  <div className='error'>{errors.email}</div> : null }
                <br/><br/>
                <input type="text" 
                    name="password" 
                    placeholder='Password'
                    onChange={e => inputChange(e)}
                />
                { errors.password ?  <div className='error'>{errors.password}</div> : null }
                <br/><br/>
                <button className='btn signup-btn' onClick={e => signupUserData(e)}>Sign Up</button>
                <p>Already SignUp? <Link className='btn already-signup-btn' to={`/login`}>Login</Link></p>
            </form>
        </div>
    </>
  )
}

export default Signup;