import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.init";
import { useState } from "react";
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const handleRegisterbtn = e => {
        e.preventDefault();

        const email = e.target?.email?.value;
        const password = e.target?.password?.value;
        console.log(email, password);
        setRegisterError('');
        setSuccess('');

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError("You should not use UPPERCASE letter");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess("Registration Successful.")
            })
            .catch(error => {
                console.log(error);
                setRegisterError(error.message);

            })
    }

    return (
        <div className=" mx-auto w-3/5">
            <div className=" text-3xl text-center my-14">Resgister your account</div>
            <form onSubmit={handleRegisterbtn} className=" p-2 ">
                <input className="border-2 mb-3 p-2 w-full" type="email" name="email" placeholder="Enter your email" required /> <br />
                <input className="border-2 mb-3 p-2 w-full"
                    type={showPassword ?  "text" : "password"}
                    name="password"
                    placeholder="password"
                    required /> <br />
                <span onClick={()=> setShowPassword(!showPassword)}>
                    {showPassword ?  <AiFillEyeInvisible></AiFillEyeInvisible>: <AiFillEye></AiFillEye>}
                    </span>
                <button className="btn btn-warning w-full text-white ">Register</button>
            </form>
            {
                registerError && <p className="text-red-700">{registerError}</p>
            }
            {
                success && <p>{success}</p>
            }
        </div>
    );
};

export default Register;