import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState  } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleStateApp, setArticleStateApp] = useState(defaultArticleState);
	
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleStateApp.fontFamilyOption.value,
					'--font-size': articleStateApp.fontSizeOption.value,
					'--font-color': articleStateApp.fontColor.value,
					'--container-width': articleStateApp.contentWidth.value,
					'--bg-color': articleStateApp.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm articleState={articleStateApp} setArticleState={setArticleStateApp}/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
