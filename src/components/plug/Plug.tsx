import './style.css'

type PlugProps = {
  text:string
}

const Plug = ({text}:PlugProps): JSX.Element => {

  return (
    <h1 className='Plug'>
      {text}
    </h1>
  );
};

export default Plug;