import React from 'react';
import ReactDOM from 'react-dom/client';
import Finder from './components/Finder';
import EffectDemo from './components/EffectDemo';
import Pizza from './components/Pizza.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		{/*<Finder />/*}
		{/* <EffectDemo /> */}
		<Pizza />
	</React.StrictMode>
);
