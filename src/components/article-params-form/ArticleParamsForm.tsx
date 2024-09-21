import { ArrowButton } from 'src/ui/arrow-button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Button } from 'src/ui/button';
import React from 'react';
import { OptionType } from 'src/constants/articleProps';
import { useEffect, useRef, useState, FormEvent } from 'react';
import { ArticleStateType, defaultArticleState, fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr } from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (articleState: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ articleState, setArticleState }: ArticleParamsFormProps) => {
    const asideRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(false);

    const [selectedFontFamily, setSelectedFontFamily] = useState<OptionType | null>(articleState.fontFamilyOption);
    const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(articleState.fontSizeOption);
    const [selectedFontColor, setSelectedFontColor] = useState<OptionType | null>(articleState.fontColor);
    const [selectedBackgroundColor, setSelectedBackgroundColor] = useState<OptionType | null>(articleState.backgroundColor);
    const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(articleState.contentWidth);

    const applyStyles = () => {
        setArticleState({
            ...articleState,
            fontFamilyOption: selectedFontFamily || defaultArticleState.fontFamilyOption,
            fontSizeOption: selectedFontSize || defaultArticleState.fontSizeOption,
            fontColor: selectedFontColor || defaultArticleState.fontColor,
            backgroundColor: selectedBackgroundColor || defaultArticleState.backgroundColor,
            contentWidth: selectedContentWidth || defaultArticleState.contentWidth,
        });
        setActive(false);
    };

    const resetSettings = () => {
        setSelectedFontFamily(defaultArticleState.fontFamilyOption);
        setSelectedFontSize(defaultArticleState.fontSizeOption);
        setSelectedFontColor(defaultArticleState.fontColor);
        setSelectedBackgroundColor(defaultArticleState.backgroundColor);
        setSelectedContentWidth(defaultArticleState.contentWidth);
        setArticleState(defaultArticleState);
        setActive(false);
    };

	useEffect(() => {
        if (!active) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (active && asideRef.current && !asideRef.current.contains(e.target as Node)) {
                setActive(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [active, setActive]);

    return (
        <div ref={asideRef}>
            <ArrowButton isOpen={active} onClick={() => setActive(!active)}/>
            <aside className={active ? styles.container + ' ' + styles.container_open : styles.container}>
                <form className={styles.form} onSubmit={(e) => { e.preventDefault(); applyStyles(); }}>
                    <Text uppercase={true} as={'h2'} size={31} weight={800} align={'left'} fontStyle={'normal'} family={'open-sans'}>
                        Задайте параметры
                    </Text>
                    <Select 
                        selected={selectedFontFamily}
                        onChange={(selected) => setSelectedFontFamily(selected)}
                        options={fontFamilyOptions}
                        title='Шрифт' 
                    />
                    <RadioGroup 
                        selected={selectedFontSize}
                        onChange={(selected) => setSelectedFontSize(selected)}
                        name='radio'
                        options={fontSizeOptions}
                        title='Размер шрифта' 
                    />
                    <Select 
                        selected={selectedFontColor}
                        onChange={(selected) => setSelectedFontColor(selected)}
                        options={fontColors}
                        title='Цвет шрифта' 
                    />
                    <Separator />
                    <Select 
                        selected={selectedBackgroundColor}
                        onChange={(selected) => setSelectedBackgroundColor(selected)}
                        options={backgroundColors}
                        title='Цвет фона' 
                    />

                    < Select
                        selected={selectedContentWidth}
                        onChange={(selected) => setSelectedContentWidth(selected)}
                        options={contentWidthArr}
                        title='Ширина контента'
                    />
                    <div className={styles.bottomContainer}>
                        <Button title='Сбросить' htmlType='reset' type='clear' onClick={resetSettings}/>
                        <Button title='Применить' htmlType='submit' type='apply' />
                    </div>
                </form>
            </aside>
        </div>
    );
};