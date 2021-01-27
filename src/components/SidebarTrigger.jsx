import React from 'react';

const SidebarTrigger = () => {
	const toggleSidebar = () => {
		const trigger = document.querySelector('#sidebar-trigger > div');
		const content = document.querySelector('#content');

		if (!content.classList.contains('sidebar-open')) {
			content.classList.add('sidebar-open');
			trigger.classList.add('open');
		} else {
			content.classList.remove('sidebar-open');
			trigger.classList.remove('open');
		}
	};

	return (
		<button type='button' id='sidebar-trigger' onClick={toggleSidebar}>
			<div></div>
		</button>
	);
};

export default SidebarTrigger;
