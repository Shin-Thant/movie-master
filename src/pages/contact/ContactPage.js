import React, { useEffect } from "react";
import "./contactpage.css";
import * as yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import emailjs from "emailjs-com";
import { useDispatch } from "react-redux";
import { addNavLink } from "../../redux/Actions/NavbarAction";

const ContactPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addNavLink("contact"));
    }, []);

    const formSchema = yup.object().shape({
        full_name: yup.string().required("Name is required"),
        email: yup
            .string()
            .email("Please fill valid email")
            .required("Email is required"),
        phone: yup
            .number()
            .required("Please fill your phone number")
            .min(8, "Phone number should be at least 5 number"),
        suggestion: yup.string().required("Suggestion is required"),
    });

    const messageForm = useFormik({
        initialValues: {
            full_name: "",
            email: "",
            phone: "",
            suggestion: "",
        },
        validationSchema: formSchema,
        onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
            const response = await emailjs.send(
                "service_d2l7zps",
                "template_171zlig",
                values,
                "user_7NS6yEEb6IacyPRSguBEK"
            );

            setSubmitting(false);
            resetForm();
        },
    });

    const { errors, isSubmitting, handleSubmit, getFieldProps } = messageForm;

    return (
        <div className="font-roboto meassage-wrapper bg-black min-h-screen text-white flex justify-center items-center">
            <div className="w-11/12 sm:w-5/6 message flex justify-between items-center s_base:flex-col s_tablet:flex-row bg-secondary p-5 md:px-10 md:py-10 shadow-xl my-32 rounded-xl mx-auto">
                <div className="contact-img-container flex flex-col justify-center items-center rounded-3xl h-max bg-red-200">
                    {/* <h1 className='text-3xl pb-5 tracking-widest font-bold'>Get In Touch</h1> */}
                    <img
                        src="https://images.unsplash.com/photo-1586769852044-692d6e3703f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y29udGFjdCUyMHVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                        alt=""
                        className="contact-img"
                    />
                </div>
                <div className="contact-content mt-10">
                    <FormikProvider value={messageForm}>
                        <Form autoComplete="off" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-2 mb-10 s_tablet:mb-8 lg:mb-10 w-full">
                                <label
                                    className="text-base font-medium fuzzy"
                                    htmlFor="name"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full contact-input"
                                    placeholder="Enter your full name"
                                    {...getFieldProps("full_name")}
                                />
                                <p className="text-primary text-sm font-bold">
                                    {errors.full_name}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 mb-10 s_tablet:mb-8 lg:mb-10 w-full">
                                <label
                                    className="text-base font-medium"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full contact-input"
                                    placeholder="Enter your email address"
                                    {...getFieldProps("email")}
                                />
                                <p className="text-primary text-sm font-bold">
                                    {errors.email}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 mb-10 s_tablet:mb-8 lg:mb-10 w-full">
                                <label
                                    className="text-base font-medium"
                                    htmlFor="phone"
                                >
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    className="w-full contact-input"
                                    placeholder="Enter your phone number"
                                    {...getFieldProps("phone")}
                                />
                                <p className="text-primary text-sm font-bold">
                                    {errors.phone}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 mb-10 s_tablet:mb-8 lg:mb-10 w-full">
                                <label
                                    className="text-base font-medium"
                                    htmlFor=""
                                >
                                    Message
                                </label>
                                <textarea
                                    className="w-full"
                                    name=""
                                    id=""
                                    cols="40"
                                    placeholder="Send message to us"
                                    {...getFieldProps("suggestion")}
                                ></textarea>
                                <p className="text-primary text-sm font-bold">
                                    {errors.suggestion}
                                </p>
                            </div>
                            <button
                                type="submit"
                                className="uppercase text-base font-bold bg-primary px-10 py-2 rounded-full shadow-lg w-full mail-submit"
                            >
                                Send
                            </button>
                        </Form>
                    </FormikProvider>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
