import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/courses.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => item.id === id);
        setCourse(found);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loader">იტვირთება...</div>;
  if (!course) return <div>კურსი ვერ მოიძებნა!</div>;

  return (
    <div className="course-details-page">
      <button onClick={() => navigate(-1)} className="btn-back">← უკან დაბრუნება</button>
      <div className="details-card">
        <h2>{course.title}</h2>
        <p className="badge">{course.category}</p>
        <p className="desc">{course.description}</p>
        <p className="price-large">ფასი: {course.price} ₾</p>
        <button 
          onClick={() => {
            dispatch(addToCart(course));
            alert('დაემატა კალათაში!');
          }}
          className="btn-primary"
        >
          კალათაში დამატება
        </button>
      </div>
    </div>
  );
}
