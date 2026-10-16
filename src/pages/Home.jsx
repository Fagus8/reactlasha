import React from 'react';
import { Link } from 'react-router-dom';
import { useWindowSize } from '../hooks/useWindowSize';

export default function Home() {
  const { width } = useWindowSize();

  return (
    <div className="home-page">
      <div className="hero">
        <h1>ისწავლეთ თანამედროვე ტექნოლოგიები</h1>
        <p>აღმოაჩინეთ საუკეთესო ონლაინ კურსები და განავითარეთ თქვენი კარიერა.</p>
        <p className="screen-info">თქვენი ეკრანის სიგანეა: {width}px (Custom Hook)</p>
        <Link to="/courses" className="btn-primary">კურსების ნახვა</Link>
      </div>
    </div>
  );
}
