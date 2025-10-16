import React from "react";
import RegistrationForm from "./components/RegistrationForm.jsx";
import FormikRegistrationForm from "./components/formikForm.js";

export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
      <h1>Form Handling in React</h1>
      <p>Below are two implementations of a registration form: Controlled and Formik.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, maxWidth: 980 }}>
        <section style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 16 }}>
          <RegistrationForm />
        </section>

        <section style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 16 }}>
          <FormikRegistrationForm />
        </section>
      </div>
    </div>
  );
}

