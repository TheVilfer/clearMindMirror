// app/index.js
import Head from 'next/head';
import Chat from '/components/Chat';
import Header from '/components/Header';

export default function Home() {
  return (
    <div>
      <Head>
        <title>AI Chat</title>
        <meta name="description" content="AI Chat Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <Chat />
      </main>
    </div>
  );
}
