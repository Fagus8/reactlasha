import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import CourseCard from '../components/CourseCard';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/courses.json')
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching courses:', err);
        setLoading(false);
      });
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [courses, searchQuery, selectedCategory]);

  const handleAddToCart = useCallback((course) => {
    dispatch(addToCart(course));
    alert(`"${course.title}" დაემატა კალათაში!`);
  }, [dispatch]);

  if (loading) return <div className="loader">იტვირთება კურსები...</div>;

  return (
    <div className="courses-page">
      <h2>ყველა კურსი</h2>

      <div className="filter-section">
        <input 
          type="text" 
          placeholder="მოძებნე კურსი..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="All">ყველა კატეგორია</option>
          <option value="Programming">Programming</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      {filteredCourses.length === 0 ? (
        <p className="no-results">კურსები ვერ მოიძებნა.</p>
      ) : (
        <div className="courses-grid">
          {filteredCourses.map(course => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
