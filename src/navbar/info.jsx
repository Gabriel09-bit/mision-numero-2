import PropTypes from 'prop-types';

export default function Info() {
  return (
    <section style={{ textAlign: "center", padding: "2em" }} aria-label="Información de la aplicación">
      <h2>Información</h2>
      <p>
        <b>NexusBook</b> es una aplicación empresarial para gestionar tus contactos de manera eficiente y segura.<br />
        Puedes agregar, editar y eliminar contactos, así como gestionar tu perfil.
      </p>
      <img src="https://img.icons8.com/color/96/000000/business-contact.png" alt="info" style={{marginTop: "1em"}} />
    </section>
  );
}

Info.propTypes = {};