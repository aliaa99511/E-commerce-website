import React, { useState } from "react";
import { useFormik } from 'formik';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLoginSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
            if (response.data.message === "success") {
                toast.success("Account Added Successfully");
                localStorage.setItem('token', response.data.token);
                setTimeout(() => {
                    navigate("/");
                }, 6000);
            }
        } catch (error) {
            console.error('Error:', error.response.data.message);
            toast.warn(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = "Required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = "Required";
        } else if (values.password.length < 8) {
            errors.password = 'Must be 8 characters or more';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate,
        onSubmit: handleLoginSubmit,
    });

    return (
        <div className="login container">
            <ToastContainer />
            <Helmet>
                <title>Login</title>
            </Helmet>
            <h4 className="mb-25 mt-30">Login Now</h4>
            <form onSubmit={formik.handleSubmit}>
                <div className={`mb-3 ${formik.touched.email && formik.errors.email ? 'has-error' : ''}`}>
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        {...formik.getFieldProps('email')}
                    />
                    <div className="invalid-feedback">
                        {formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                    </div>
                </div>
                <div className={`mb-3 ${formik.touched.password && formik.errors.password ? 'has-error' : ''}`}>
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        {...formik.getFieldProps('password')}
                    />
                    <div className="invalid-feedback">
                        {formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                    </div>
                </div>
                <button type="submit" disabled={loading || !formik.dirty} className="btn btn-success">
                    {loading ? <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> : null}{" "}
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
