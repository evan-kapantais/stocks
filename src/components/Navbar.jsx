import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const Navbar = () => {
	const { setDisplay } = useContext(GlobalContext);

	return (
		<nav className='navbar'>
			<button
				type='button'
				className='text-button'
				onClick={() => setDisplay('portfolio')}
			>
				Portfolio
			</button>
			<button
				type='button'
				className='text-button'
				onClick={() => setDisplay('form')}
			>
				Add Stock
			</button>
		</nav>
	);
};

export default Navbar;
