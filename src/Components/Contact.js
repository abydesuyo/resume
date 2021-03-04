import React, { Component } from 'react';

const parseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
const rssUrl = 'https://rsshub.app/github/repos/abydesuyo';

 
class Contact extends Component {

   constructor(props) {
      super(props);
      this.state = {
         error: null,
         isLoaded: false,
         githubfeed: {}
       };
    }

    fetchGithubFeed = async() => { 
      fetch(parseUrl + rssUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            githubfeed: result
          });
        },
        // error handler
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
   }

   componentDidMount() 
   {
      this.fetchGithubFeed();
   }


  render() {

    const { error, isLoaded, githubfeed } = this.state;
   
   //  const top3feed = githubfeed.slice(0,3);

    if (error) {
      return (
        <div className="col">
          Error: {error.message}
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div className="col">
          Loading...
        </div>
      );
    } 
    else {
       
      if(this.props.data){
         var name = this.props.data.name;
         var street = this.props.data.address.street;
         var city = this.props.data.address.city;
         var state = this.props.data.address.state;
         var zip = this.props.data.address.zip;
         var phone= this.props.data.phone;
         var email = this.props.data.email;
         var message = this.props.data.contactmessage;
      }


      return (
         <section id="contact">

            <div className="row section-head">

               <div className="two columns header-col">

                  <h1><span>Get In Touch.</span></h1>

               </div>

               <div className="ten columns">

                     <p className="lead">{message}</p>

               </div>

            </div>

            <div className="row">
               <div className="eight columns">

                  <form action="" method="post" id="contactForm" name="contactForm">
                  <fieldset>

                     <div>
                        <label htmlFor="contactName">Name <span className="required">*</span></label>
                        <input type="text" defaultValue="" size="35" id="contactName" name="contactName" onChange={this.handleChange}/>
                     </div>

                     <div>
                        <label htmlFor="contactEmail">Email <span className="required">*</span></label>
                        <input type="text" defaultValue="" size="35" id="contactEmail" name="contactEmail" onChange={this.handleChange}/>
                     </div>

                     <div>
                        <label htmlFor="contactSubject">Subject</label>
                        <input type="text" defaultValue="" size="35" id="contactSubject" name="contactSubject" onChange={this.handleChange}/>
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
                        <br/>
                        <span>{email}</span>
                     </p>
                  </div>

                  <div className="widget widget_tweets">
                     <h4 className="widget-title">Github Feed</h4>
                     <ul id="rssfeed">
                        {githubfeed.items.slice(0,5).map(item => <li><span><b><a href={item.link}>{item.title}</a></b><br></br>Published : {item.pubDate}<br></br>{item.description}<br></br></span></li>)}
                     </ul>
                  </div>
               </aside>
         </div>
      </section>
      );
   }
   }
}

export default Contact;
