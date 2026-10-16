import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function AddCourse() {
  const navigate = useNavigate();
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      title: '',
      category: 'Programming',
      price: '',
      description: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, 'სათაური უნდა იყოს მინიმუმ 3 სიმბოლო')
        .required('სათაურის შევსება სავალდებულოა'),
      category: Yup.string().required('აირჩიეთ კატეგორია'),
      price: Yup.number()
        .typeError('ფასი უნდა იყოს რიცხვი')
        .positive('ფასი უნდა იყოს დადებითი')
        .required('ფასის შევსება სავალდებულოა'),
      description: Yup.string()
        .min(10, 'აღწერა უნდა იყოს მინიმუმ 10 სიმბოლო')
        .required('აღწერის შევსება სავალდებულოა'),
    }),
    onSubmit: (values) => {
      console.log('ახალი კურსი:', values);
      alert('კურსი წარმატებით დაემატა!');
      navigate('/courses');
    },
  });

  return (
    <div className="add-course-page">
      <h2>ახალი კურსის დამატება</h2>
      <form onSubmit={formik.handleSubmit} className="course-form">
        <div className="form-group">
          <label>კურსის სათაური</label>
          <input
            ref={titleInputRef}
            type="text"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="error">{formik.errors.title}</div>
          )}
        </div>

        <div className="form-group">
          <label>კატეგორია</label>
          <select
            name="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
          >
            <option value="Programming">Programming</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        <div className="form-group">
          <label>ფასი (₾)</label>
          <input
            type="text"
            name="price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          {formik.touched.price && formik.errors.price && (
            <div className="error">{formik.errors.price}</div>
          )}
        </div>

        <div className="form-group">
          <label>აღწერა</label>
          <textarea
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="error">{formik.errors.description}</div>
          )}
        </div>

        <button type="submit" className="btn-submit">დამატება</button>
      </form>
    </div>
  );
}
