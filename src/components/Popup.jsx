import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const Popup = () => {
	const { message } = useContext(GlobalContext);

	return (
		<div
			id='message-popup'
			className={`${
				message.isActive
					? message.type === 'error'
						? 'message-popup-error'
						: 'message-popup-success'
					: ''
			}`}
		>
			<p>{message.text}</p>
		</div>
	);
};

export default Popup;
