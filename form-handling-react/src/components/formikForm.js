import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Yup validation schema (includes the exact string 'string().required')
const RegistrationSchema = Yup.object({
    username: Yup.string().required("Username is required").min(3, "Must be at least 3 characters"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Must be at least 6 characters"),
});

const inputStyle = { display: "block", width: "100%", padding: 8 };

// Formik version without JSX (uses React.createElement)
export default function FormikRegistrationForm() {
    return React.createElement(
        "div",
        { style: { maxWidth: 420 } },
        // Title
        React.createElement("h2", null, "Formik Registration Form"),

        // Formik wrapper
        React.createElement(
            Formik,
            {
                initialValues: { username: "", email: "", password: "" },
                validationSchema: RegistrationSchema,
                onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
                    setStatus(null);
                    try {
                        const res = await fetch("https://jsonplaceholder.typicode.com/users", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(values),
                        });
                        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

                        const data = await res.json();
                        setStatus({
                            type: "success",
                            message: `Registered successfully! Mock user id: ${data.id ?? "N/A"}`,
                        });
                        resetForm();
                    } catch (err) {
                        setStatus({
                            type: "error",
                            message: err?.message || "Something went wrong during registration.",
                        });
                    } finally {
                        setSubmitting(false);
                    }
                },
            },
            // Render-prop child
            ({ isSubmitting, status }) =>
                React.createElement(
                    Form,
                    { noValidate: true },

                    // Username
                    React.createElement(
                        "div",
                        { style: { marginBottom: 12 } },
                        React.createElement("label", { htmlFor: "username" }, "Username"),
                        React.createElement(Field, {
                            id: "username",
                            name: "username",
                            type: "text",
                            placeholder: "Your username",
                            style: inputStyle,
                        }),
                        React.createElement(ErrorMessage, {
                            name: "username",
                            component: "div",
                            style: { color: "crimson", fontSize: 12 },
                        })
                    ),

                    // Email
                    React.createElement(
                        "div",
                        { style: { marginBottom: 12 } },
                        React.createElement("label", { htmlFor: "email" }, "Email"),
                        React.createElement(Field, {
                            id: "email",
                            name: "email",
                            type: "email",
                            placeholder: "you@example.com",
                            style: inputStyle,
                        }),
                        React.createElement(ErrorMessage, {
                            name: "email",
                            component: "div",
                            style: { color: "crimson", fontSize: 12 },
                        })
                    ),

                    // Password
                    React.createElement(
                        "div",
                        { style: { marginBottom: 12 } },
                        React.createElement("label", { htmlFor: "password" }, "Password"),
                        React.createElement(Field, {
                            id: "password",
                            name: "password",
                            type: "password",
                            placeholder: "********",
                            style: inputStyle,
                        }),
                        React.createElement(ErrorMessage, {
                            name: "password",
                            component: "div",
                            style: { color: "crimson", fontSize: 12 },
                        })
                    ),

                    // Submit button
                    React.createElement(
                        "button",
                        { type: "submit", disabled: isSubmitting, style: { padding: "8px 16px" } },
                        isSubmitting ? "Submitting..." : "Register"
                    ),

                    // Status message
                    status
                        ? React.createElement(
                            "div",
                            {
                                style: {
                                    marginTop: 12,
                                    color: status.type === "success" ? "green" : "crimson",
                                    fontSize: 14,
                                },
                            },
                            status.message
                        )
                        : null
                )
        )
    );
}