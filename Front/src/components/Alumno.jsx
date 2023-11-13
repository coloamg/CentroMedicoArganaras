function Alumno({ legajo, nombre, condicion, mail }) {
  return (
    <li>
      Legajo: {legajo}. Nombre: {nombre}.{' '}
      {condicion === 'Inscripto' && `Mail: ${mail}`}
    </li>
  )
}

export default Alumno
