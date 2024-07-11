import React, { useState } from "react";
import { useFormik } from 'formik';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegisterSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
            if (response.data.message === "success") {
                toast.success("Account Added Successfully");
                setTimeout(() => {
                    navigate("/login");
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

        if (!values.name) {
            errors.name = "Required";
        } else if (values.name.length < 4) {
            errors.name = 'Must be 4 characters or more';
        }

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

        if (!values.rePassword) {
            errors.rePassword = "Required";
        } else if (values.rePassword !== values.password) {
            errors.rePassword = 'Passwords must match';
        }

        if (!values.phone) {
            errors.phone = "Required";
        } else if (!/^01[0-9]{9}$/.test(values.phone)) {
            errors.phone = 'Invalid phone number format';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        validate,
        onSubmit: handleRegisterSubmit,
    });

    return (
        <div className="register container">
            <ToastContainer />
            <Helmet>
                <title>Register</title>
            </Helmet>
            <h4 className="mb-25 mt-30">Register Now</h4>
            <form onSubmit={formik.handleSubmit}>
                <div className={`mb-3 ${formik.touched.name && formik.errors.name ? 'has-error' : ''}`}>
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                        type="text"
                        className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                        id="name"
                        {...formik.getFieldProps('name')}
                    />
                    <div className="invalid-feedback">
                        {formik.touched.name && formik.errors.name ? formik.errors.name : ''}
                    </div>
                </div>
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
                <div className={`mb-3 ${formik.touched.rePassword && formik.errors.rePassword ? 'has-error' : ''}`}>
                    <label htmlFor="rePassword" className="form-label">Confirm Password:</label>
                    <input
                        type="password"
                        className={`form-control ${formik.touched.rePassword && formik.errors.rePassword ? 'is-invalid' : ''}`}
                        id="rePassword"
                        {...formik.getFieldProps('rePassword')}
                    />
                    <div className="invalid-feedback">
                        {formik.touched.rePassword && formik.errors.rePassword ? formik.errors.rePassword : ''}
                    </div>
                </div>
                <div className={`mb-3 ${formik.touched.phone && formik.errors.phone ? 'has-error' : ''}`}>
                    <label htmlFor="phone" className="form-label">Phone:</label>
                    <input
                        type="tel"
                        className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
                        id="phone"
                        {...formik.getFieldProps('phone')}
                    />
                    <div className="invalid-feedback">
                        {formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''}
                    </div>
                </div>
                <button type="submit" disabled={loading || !formik.dirty} className="btn btn-success">
                    {loading ? <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span> : null}{" "}
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
