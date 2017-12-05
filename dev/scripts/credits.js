import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Nav } from './app'

class Credits extends React.Component {
   render () {
      return (
         <div>
             <header className="clearfix">
                <div className="wrapper">
                    <Link to="/"><h1 className="headerLogo">Levidrome Validator</h1></Link>
                    <Nav />
                </div>
            </header>
            <div className="wrapper">
                <section className="creditSection">
                    <h3>Credits</h3>
                    <p className="creditText">This validator was created using the Oxford English Dictionary API. Credits go to the HackerYou instructor team for coming up with the idea for this project, and to Levi Budd and the Budd family for discovering and spreading the levidrome love.</p>
                    <p className="creditText">Created by Justine Nguyen, Manish Sabharwal, and Kitty Yau.</p>
                    <h3>Sources</h3>
                    <p className="sourceText"><a href="https://www.thestar.com/news/canada/2017/11/21/six-year-old-victoria-boys-invented-word-gets-support-from-william-shatner-patricia-arquette.html">Six-year-old Victoria boy’s invented word gets support from William Shatner, Patricia Arquette</a></p>
                    <p className="sourceText"><a href="https://www.thestar.com/news/canada/2017/11/24/oxford-dictionaries-responds-to-six-year-old-victoria-boy-whose-invented-word-created-twitter-buzz.html">Oxford Dictionaries responds to 6-year-old Victoria boy whose invented word created Twitter buzz</a></p>
                </section>
            </div>
         </div>
      )
   }
}

export default Credits