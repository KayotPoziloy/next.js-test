'use client';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../../src/app/styles.module.scss';

export default function NewsPage() {
    const router = useRouter();
    const { id } = router.query;
    const [newsItem, setNewsItem] = useState(null);

    useEffect(() => {
        if (id) {
            fetchNewsItem();
        }
    }, [id]);

    const fetchNewsItem = async () => {
        const response = await fetch(`https://news.itmo.ru/api/news/${id}/?ver=2.0`);
        const data = await response.json();
        setNewsItem(data);
    }

    if (!newsItem) return <div>Loading...</div>;

    return (
        <div className={styles.newsDetail}>
            <h1 className={styles.title}>{newsItem.title}</h1>
            <img src={newsItem.image_big} alt={newsItem.title} className={styles.newsImage} />
            <p className={styles.date}>{new Date(newsItem.date).toLocaleDateString('ru-RU')}</p>
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: newsItem.content }}></div>
        </div>
    );
}
