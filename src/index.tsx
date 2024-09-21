import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState  } from 'react';
import clsx from 'clsx';
import { App } from './components/app';

import './styles/index.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
