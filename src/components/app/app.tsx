import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';
import { CSSProperties, useState } from 'react';


import styles from './app.module.scss';

export const App = () => {
	const [articleStateApp, setArticleStateApp] = useState(defaultArticleState);
	
	return (
		<main
			className={styles.main}
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

