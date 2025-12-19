import React from 'react';
import PropTypes from 'prop-types';

const Testimonials = ({ data }) => {
   if (!data) return null;

   const testimonials = data.testimonials?.map(testimonial => (
      <li key={testimonial.user}>
         <blockquote>
            <p>{testimonial.text}</p>
            <cite>{testimonial.user}</cite>
         </blockquote>
      </li>
   ));

   return (
      <section id="testimonials">
         <div className="text-container">
            <div className="row">
               <div className="two columns header-col">
                  <h1><span>Testimonials</span></h1>
               </div>

               <div className="ten columns flex-container">
                  <ul className="slides">
                     {testimonials}
                  </ul>
               </div>
            </div>
         </div>
      </section>
   );
};

Testimonials.propTypes = {
   data: PropTypes.object
};

export default Testimonials;
