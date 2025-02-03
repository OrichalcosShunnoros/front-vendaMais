import './RegistroCliente.css'


export const RegistroCliente = () => {
  return (
    <div className='RegistroCliente'>
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
