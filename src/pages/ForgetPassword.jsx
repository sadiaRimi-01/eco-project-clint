import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 

const ForgotPassword = () => {
    const { resetPassword } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const emailFromQuery = queryParams.get('email') || '';
    const [email, setEmail] = useState(emailFromQuery);

    const handleReset = (e) => {
        e.preventDefault();
        resetPassword(email)
            .then(() => {
                toast.success('Check your Gmail to reset password! 📧', { autoClose: 2000 });
               
                window.open('https://mail.google.com', '_blank');
               
                setTimeout(() => navigate('/auth/login'), 2000);
            })
            .catch(err => {
                toast.error(`Error: ${err.message}`, { autoClose: 2500 });
            });
    };

    useEffect(() => {
        document.title = 'Forgot Password';
    }, []);

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Reset Password</h1>
                    <p className="py-6">Enter your email to reset your password</p>
                </div>

                <form onSubmit={handleReset} className="card bg-base-100 shadow-2xl w-full max-w-sm">
                    <div className="card-body">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="input input-bordered"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-primary mt-4 w-full">
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
