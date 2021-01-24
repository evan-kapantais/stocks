import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Form from './Form';
import SidebarTrigger from './SidebarTrigger';
import StockDetails from './StockDetails';
import FullPortfolio from './FullPortfolio';

const Content = () => {
	const { display } = useContext(GlobalContext);

	return (
		<section id='content'>
			{display.type === 'form' && <Form />}
			{display.type === 'stock' && <StockDetails />}
			{display.type === 'portfolio' && <FullPortfolio />}
			<SidebarTrigger />
		</section>
	);
};

export default Content;
