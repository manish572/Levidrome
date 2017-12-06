import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';
import { Nav, FooterNav } from './app'

class About extends React.Component {
	render() {
		return (
			<div>
			<header className="clearfix">
				<div className="wrapper">
					<Link to="/"><h1 className="headerLogo">Levidrome Validator</h1></Link>
					<Nav />
				</div>
			</header>
			<div className="textWrapper">
				<section className="aboutLevidrome clearfix">
					<h3>What is a levidrome?</h3>
					<div className="col-2">
						<p className="historyText">A levidrome, pronounced lev-ih-drome, is a word that spells another word backwards. They're littered throughout the English language, but it wasn't until Levi Budd from Vancouver, Canada, asked his parents for the accurate term to describe such a word, that they realized that such a term did not exist in the dictionary. Thus, levidrome was born, named after the inquisitive boy who was thought to ask his parents, "What do we call a word that spells another word backwards?".</p>
					</div>
					<div className="col-2">
						{/* Video from the Budd family about Levidromes */}
						<iframe className="video vid1" src="https://www.youtube.com/embed/jpZ3bh1R6Kk?rel=0" frameBorder="0"></iframe>
					</div>
				</section>
				</div>

				<div className="textWrapper">
				<section className="aboutLevidrome clearfix">
					<h3>Make <em>levidrome</em> dictionary-worthy!</h3>
					<div className="col-2">
						<iframe className="video vid2" src="https://www.youtube.com/embed/JJkV9HwtM4k?rel=0" frameBorder="0"></iframe>
					</div>
					<div className="col-2 dictionaryText">
						<p>Both the Merriam-Webster Dictionary and the Oxford English Dictionary have been contacted regarding the possibility of having levidrome officially accepted as a formal word in the dictionary. The response has been the same - to earn a spot in their dictionaries, the word has to be used by a group of people for an extended period of time. It isn't in the dictionary yet, but if we start using it today, that may change!</p>
					</div>
				</section>
				</div>

				<div className="textWrapper">
				<section className="clearfix aboutLevidrome">
					<h3>#Levidrome supporters:</h3>
					<ul className="testimonials">
						<li>
							<div className="testimonialsLogo">
								<img src="./dev/styles/images/oxford.png" alt=""/>
							</div>
						</li>
						<li>
							<div className="testimonialsLogo">
								<img src="/dev/styles/images/MW_logosmall.png" alt=""/>
							</div>
						</li>
						<li>
							<div className="testimonialsLogo">
								<img src="./dev/styles/images/startrek.png" alt=""/>
							</div>
							<p>William Shatner</p>
						</li>
						<li>
							<div className="testimonialsLogo">
							<img src="./dev/styles/images/oscar.png" alt=""/>
							</div>
							<p>Patricia Arquette</p>
						</li>
					</ul>
				</section>
				</div>
			</div>
		)
	}
}

export default About