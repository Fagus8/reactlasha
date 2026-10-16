import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function About() {
  const [visitCount, setVisitCount] = useLocalStorage('about_visits', 0);

  React.useEffect(() => {
    setVisitCount(prev => prev + 1);
  }, []);

  return (
    <div className="about-page">
      <h2>ჩვენ შესახებ</h2>
      <p>EduPlatform არის თანამედროვე სასწავლო პლატფორმა სტუდენტებისთვის.</p>
      <div className="stats-box">
        <p>💡 თქვენ ამ გვერდს ეწვიეთ: <strong>{visitCount}</strong>-ჯერ (useLocalStorage Custom Hook).</p>
      </div>
    </div>
  );
}
