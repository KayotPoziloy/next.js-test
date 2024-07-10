'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './styles.module.scss';
import itmo from '../img/img.png';
import rus from '../img/rus.png';
import eng from '../img/eng.png';
import triangle from '../img/triangle.png';

export default function Home() {
    const router = useRouter();
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
                            <Image src={eng} className={styles.rus} alt="English Language"/>
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
            <div className={styles.novosti}>
                <p className={styles.novostiISobytija}>
                    {language === 'rus' ? 'Новости и события' : 'News and Events'}
                </p>
                <div className={styles.gridWrapper}>
                    {news.map((newsItem) => (
                        <div key={newsItem.id} className={styles.kartochkaNovosti}>
                            <img
                                alt=""
                                className={styles.maska}
                                src={newsItem.image_small}
                            />
                            <p className={styles.date}>
                                {new Date(newsItem.date).toLocaleDateString(language === 'rus' ? 'ru-RU' : 'en-US')}
                            </p>
                            <p className={styles.tehnologiiJelektronn}>
                                {newsItem.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
