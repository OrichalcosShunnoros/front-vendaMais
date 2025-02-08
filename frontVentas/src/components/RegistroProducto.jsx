import './RegistroProducto.css'

export const RegistroProducto = () => {
  return (
    <div className='RegistroVenta'>
        <label className='label' htmlFor="">Nombre:</label>
        <input className = 'input' type="text" />
        <label className='label' htmlFor="">Producto:</label>
        <input className = 'input' type="text" />
        <label className='label' htmlFor="">cantidad:</label>
       <input className = 'input' type="text" />
        <button className='enviar'>Enviar</button>
    </div>
  )
}
