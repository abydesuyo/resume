import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const parseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
const rssUrl = 'https://rsshub.app/github/repos/abydesuyo';

const Contact = ({ data }) => {
   const [error, setError] = useState(null);
   const [isLoaded, setIsLoaded] = useState(false);
   const [githubfeed, setGithubfeed] = useState({});

   useEffect(() => {
      const fetchGithubFeed = async () => {
         try {
            const response = await fetch(parseUrl + rssUrl);
            const result = await response.json();
            setGithubfeed(result);
            setIsLoaded(true);
         } catch (err) {
            setError(err);
            setIsLoaded(true);
         }
      };

      fetchGithubFeed();
   }, []);

   if (error) {
      return (
         <div className="col">
            Error: {error.message}
         </div>
      );
   }

   if (!isLoaded) {
      return (
         <div className="col">
            Loading...
         </div>
      );
   }

   if (!data) return null;

   const { name, address, phone, email, contactmessage } = data;
   const { street, city, state, zip } = address;

   return (
      <section id="contact">
         <div className="row section-head">
            <div className="two columns header-col">
               <h1><span>Get In Touch.</span></h1>
            </div>

            <div className="ten columns">
               <p className="lead">{contactmessage}</p>
            </div>
         </div>

         <div className="row">
            <div className="eight columns">
               <form action="" method="post" id="contactForm" name="contactForm">
                  <fieldset>
                     <div>
                        <label htmlFor="contactName">Name <span className="required">*</span></label>
                        <input type="text" defaultValue="" size="35" id="contactName" name="contactName" />
                     </div>

                     <div>
                        <label htmlFor="contactEmail">Email <span className="required">*</span></label>
                        <input type="text" defaultValue="" size="35" id="contactEmail" name="contactEmail" />
                     </div>

                     <div>
                        <label htmlFor="contactSubject">Subject</label>
                        <input type="text" defaultValue="" size="35" id="contactSubject" name="contactSubject" />
                     </div>

                     <div>
                        <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                        <textarea cols="50" rows="15" id="contactMessage" name="contactMessage"></textarea>
                     </div>

                     <div>
                        <button className="submit">Submit</button>
                        <span id="image-loader">
                           <img alt="" src="images/loader.gif" />
                        </span>
                     </div>
                  </fieldset>
               </form>

               <div id="message-warning"> Error </div>
               <div id="message-success">
                  <i className="fa fa-check"></i>Your message was sent, thank you!<br />
               </div>
            </div>

            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">
                  <h4>Address and Phone</h4>
                  <p className="address">
                     {name}<br />
                     {street} <br />
                     {city} {state} {zip}<br />
                     <span>{phone}</span>
                     <br />
                     <span>{email}</span>
                  </p>
               </div>

               <div className="widget widget_tweets">
                  <h4 className="widget-title">Github Feed</h4>
                  <ul id="rssfeed">
                     {githubfeed.items && githubfeed.items.length > 0 ? (
                        githubfeed.items.slice(0, 5).map((item, index) => (
                           <li key={index}>
                              <span>
                                 <b><a href={item.link}>{item.title}</a></b>
                                 <br /><br />
                                 Published : {item.pubDate}
                                 <br /><br />
                                 {item.description}
                                 <br /><br />
                              </span>
                           </li>
                        ))
                     ) : (
                        <li><span>No recent activity available</span></li>
                     )}
                  </ul>
               </div>
            </aside>
         </div>
      </section>
   );
};

Contact.propTypes = {
   data: PropTypes.object
};

export default Contact;
