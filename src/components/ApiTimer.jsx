import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const ApiTimer = () => {
	const { apiCalls } = useContext(GlobalContext);
	const [timer, setTimer] = useState(60);

	useEffect(() => {
		console.log(apiCalls);
		setTimeout(() => {
			if (timer <= 0) {
				setTimer(0);
			} else {
				setTimer(timer - 1);
			}
		}, 1000);
	}, [apiCalls]);

	return (
		<div className='api-timer'>
			<small>API timeout</small>
			<p>{timer}s</p>
		</div>
	);
};

export default ApiTimer;
