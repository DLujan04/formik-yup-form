import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './App.css';

const validationSchema = Yup.object({
  nombre: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .required('Campo requerido'),
  apellido: Yup.string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .required('Campo requerido'),
});

function App() {
  const [formSuccess, setFormSuccess] = useState(false);

  return (
    <div className="app-body">
      <div className="form-container">
        <h2>Formulario Básico</h2>

        {/* ✅ Mensaje de éxito */}
        {formSuccess && (
          <div className="success-message">
            ¡Formulario enviado con éxito!
          </div>
        )}

        <Formik
          initialValues={{ nombre: '', apellido: '' }}
          validationSchema={validationSchema}
          validateOnChange={true}
          validateOnBlur={true}
          onSubmit={(values, actions) => {
            console.log('Formulario validado ✅');
            console.log('Datos:', values);
            setFormSuccess(true); // Mostrar mensaje
            actions.resetForm();

            // Ocultar el mensaje después de unos segundos
            setTimeout(() => setFormSuccess(false), 4000);
          }}
        >
          {() => (
            <Form>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <Field name="nombre" id="nombre" placeholder="Tu nombre" />
                <ErrorMessage name="nombre">
                  {(msg) => <div className="error">{msg}</div>}
                </ErrorMessage>
              </div>

              <div className="form-group">
                <label htmlFor="apellido">Apellido</label>
                <Field name="apellido" id="apellido" placeholder="Tu apellido" />
                <ErrorMessage name="apellido">
                  {(msg) => <div className="error">{msg}</div>}
                </ErrorMessage>
              </div>

              <button type="submit">Enviar</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default App;
