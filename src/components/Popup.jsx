const Popup = ({ message }) => {
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
