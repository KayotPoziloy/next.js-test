'use client';
import { useState, useEffect } from "react";
import Image from 'next/image';
import styles from './styles.module.scss';
import itmo from '../img/img.png';
import rus from '../img/rus.png';
import eng from '../img/eng.png';
import triangle from '../img/triangle.png';
import Link from "next/link";

export default function Home() {
    const [language, setlanguage] = useState('rus');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchNews();
    }, [language]);

    const fetchNews = async () => {
        const response = await fetch('https://news.itmo.ru/api/news/list/?ver=2.0');
        const data = await response.json();
        setNews(data.news.slice(0, 9));
    }

    const toggleDropdown = () => {
        console.log("выпадашка")
        console.log(isDropdownVisible)
        setDropdownVisible(!isDropdownVisible);
    }

    const switchLanguage = (lang) => {
        setlanguage(lang);
        setDropdownVisible(false);
    }


    return (
        <div>
            {/* Надстройка */}
            <div className={styles.header}>
                {/* Логотип ИТМО горизонтальный */}
                <Image className={styles.itmo} src={itmo} alt="ITMO Logo" />
                {/* Язык */}
                <div className={styles.language} onClick={toggleDropdown}>
                    <Image src={language === 'rus' ? rus : eng} className={styles.rus} alt="Russian Language" />
                    {language === 'rus' ? 'Рус' : 'Eng'}
                    <Image src={triangle} className={styles.triangle} alt="Dropdown Arrow" />
                </div>
                {/* Выпадашка */}
                {isDropdownVisible && (
                    <div className={styles.dropout}>
                        {/* Eng */}
                        <div className={styles.Eng} onClick={() => switchLanguage('eng')}>
                            <Image src={eng} className={styles.eng} alt="English Language"/>
                            <a className={styles.engTxt}>Eng</a>
                        </div>
                        {/* Rus */}
                        <div className={styles.Rus} onClick={() => switchLanguage('rus')}>
                            <Image src={rus} className={styles.rus} alt="Russian Language"/>
                            <a className={styles.rusTxt}>Рус</a>
                        </div>
                    </div>
                )}
            </div>
            {/* Новости */}
            <div className={styles.news}>
                <p className={styles.newsAndEvents}>
                    {language === 'rus' ? 'Новости и события' : 'News and Events'}
                </p>
                <div className={styles.gridWrapper}>
                    {news.map((newsItem) => (
                        <Link href={newsItem.url}>
                            <div key={newsItem.id} className={styles.newsCard}>
                                <img
                                    alt=""
                                    className={styles.mask}
                                    src={newsItem.image_small}
                                />
                                <p className={styles.date}>
                                    {new Date(newsItem.date).toLocaleDateString(language === 'rus' ? 'ru-RU' : 'en-US')}
                                </p>
                                <p className={styles.newsTitle}>
                                    {newsItem.title}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
