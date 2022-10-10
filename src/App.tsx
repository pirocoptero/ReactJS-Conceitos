import { Header } from './Components/Header';
import { Sidebar } from './Components/Sidebar';
import { Post } from './Components/Post';

import './global.css';
import styles from './App.module.css';

function App() {
    const posts = [
        {
            id: 1,
            author: {
                avatarUrl: 'https://github.com/pirocoptero.png',
                name: 'Adriano Ferreira',
                role: 'CTO @UtopixStudio',
            },
            content: [
                { type: 'paragraph', content: 'Salve salve galerinha! 👋🏻' },
                { type: 'paragraph', content: 'Acabei de subir mais um projeto para o portfólio, confere que doidera! 🚀' },
                { type: 'link', content: 'github.com/pirocoptero' },
            ],
            publishedAt: new Date('2022-06-03 07:58:00'),
        },
        {
            id: 2,
            author: {
                avatarUrl: 'https://pbs.twimg.com/profile_images/1529956155937759233/Nyn1HZWF_400x400.jpg',
                name: 'Ellon Musk',
                role: 'CEO @SpaceX',
            },
            content: [
                { type: 'paragraph', content: 'A Tesla dominou a exosfera 🛰' },
                {
                    type: 'paragraph',
                    content: 'Enviamos mais 48 satélites para explorar os aliens, eles que se cuidem, estamos chegando 👽😂 ',
                },
                { type: 'link', content: 'www.spacex.com' },
            ],
            publishedAt: new Date('2022-06-03 07:58:00'),
        },
    ];

    return (
        <>
            <Header />
            <div className={styles.wrapper}>
                <Sidebar />
                <main>
                    {posts.map((post) => {
                        return <Post key={post.id} author={post.author} publishedAt={post.publishedAt} content={post.content} />;
                    })}
                </main>
            </div>
        </>
    );
}

export default App;
