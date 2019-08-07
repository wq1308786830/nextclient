import dynamic from 'next/dynamic';

const WeChat = dynamic(() => import('../components/WeChat'));

export default function About() {
  return <WeChat />;
}
