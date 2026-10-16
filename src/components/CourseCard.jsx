import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = React.memo(({ course, onAddToCart }) => {
  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p className="category">კატეგორია: {course.category}</p>
      <p className="price">ფასი: {course.price} ₾</p>
      <div className="card-actions">
        <Link to={`/courses/${course.id}`} className="btn-details">
          დეტალურად
        </Link>
        <button 
          onClick={() => onAddToCart(course)} 
          className="btn-add"
        >
          კალათაში დამატება
        </button>
      </div>
    </div>
  );
});

export default CourseCard;
