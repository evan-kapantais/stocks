import React from 'react';

const SidebarTrigger = () => {
	const toggleSidebar = () => {
		const sidebar = document.querySelector('#sidebar');
		const trigger = document.querySelector('#sidebar-trigger');
		const button = trigger.querySelector('button');

		if (!sidebar.classList.contains('shown')) {
			sidebar.classList.add('shown');
			trigger.classList.remove('active');
			button.style.transform = 'rotateY(180deg)';
			button.classList.add('open');
		} else {
			sidebar.classList.remove('shown');
			trigger.classList.add('active');
			button.style.transform = 'rotateY(0)';
			button.classList.remove('open');
		}
	};

	return (
		<div id='sidebar-trigger'>
			<button type='button' onClick={toggleSidebar}></button>
		</div>
	);
};

export default SidebarTrigger;
