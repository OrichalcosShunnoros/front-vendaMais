import './RegistroVenta.css'


export const RegistroVenta = () => {
  return (
    <div className='RegistroVenta'>
        <label className='label' htmlFor="">Client:</label>
        <input className = 'input' type="text" />
        <label className='label' htmlFor="">Products:</label>
        <input className = 'input' type="text" />
        <label className='label' htmlFor="">Product Added:</label>
        <div className='ProductAdde'></div>
        <button className='enviar'>Enviar</button>
    </div>
  )
}
