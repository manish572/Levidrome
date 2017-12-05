import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Qs from 'qs';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import List from './list'

// Initialize Firebase
var config = {
	apiKey: "AIzaSyBFxEo8gLNFkJ-sw5jCqGnewR3l9YInPs4",
	authDomain: "levidromeapp.firebaseapp.com",
	databaseURL: "https://levidromeapp.firebaseio.com",
	projectId: "levidromeapp",
	storageBucket: "",
	messagingSenderId: "231325881110"
};
firebase.initializeApp(config);

//twitter script
window.twttr = (function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0],  t = window.twttr || {};
	if (d.getElementById(id)) return t;
	js = d.createElement(s); js.id = id;
	js.src = "https://platform.twitter.com/widgets.js";
	fjs.parentNode.insertBefore(js, fjs);
	t._e = []; t.ready = function(f) {
	  t._e.push(f);
	};
	return t;
 }(document, "script", "twitter-wjs"));


const key = '10faf101cb01f99e61fe0358e0807373';
//'b7b40e21fdccd7460635c749a5dbb44b'; first key
const id = 'ba5599bf';
//'a31a2791'; first id
const definitionURL = 'entries';
const wordURL = 'inflections';	

export default class LevidromeValidator extends React.Component {
	constructor() {
		super();
		this.state = {
			firstWord: '',
			flippedWord: '',
			firstRootWord: '',
			flippedRootWord:'',
			wordsArray: [],
			definitions: [],
			word : '',
			pairedWord : '',
			storedItems:[]
		}
		this.handleChange = this.handleChange.bind(this);
		this.getDefinition = this.getDefinition.bind(this);
		this.flipWord = this.flipWord.bind(this);
		this.levidrome = this.levidrome.bind(this);
		this.findRoot = this.findRoot.bind(this);
		this.runRequest = this.runRequest.bind(this);
		this.getFlippedDef = this.getFlippedDef.bind(this);
		this.addToFirebase = this.addToFirebase.bind(this);
		this.clear = this.clear.bind(this);
	}

	runRequest(urlSection, word) {
		return axios({
			method: 'GET',
			url: 'https://proxy.hackeryou.com',
			dataResponse: 'json',
			paramsSerializer: function (params) {
				return Qs.stringify(params, { arrayFormat: 'brackets' })
			},
			params: {
				reqUrl: `https://od-api.oxforddictionaries.com/api/v1/${urlSection}/en/${word}`,
				proxyHeaders: {
					'header_params': 'value',
					'app_key': key,
					'app_id': id
				},
				xmlToJSON: false
			}
		}).then((result) => {
			return result
		})
		.catch((error) => {
			swal("Oops!", "This is not a levidrome as one of the words in not valid.", "error");
		});
	}

	// first API request to check if the submitted word is valid or not
	findRoot(word) {
		return this.runRequest(wordURL, word).then((i) => {
			return i.data.results[0].lexicalEntries[0].inflectionOf[0].id	
		})
	}

	// get definition function to run request
	getDefinition(word) {
		return this.runRequest(definitionURL, word).then((i) => {
			return i.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
		})
	}

	flipWord(str) {
		var splitString = str.split("");
		var reverseArray = splitString.reverse();
		var flippedWord = reverseArray.join("");
		return flippedWord
	}

	//takes the firstWord from child component
	levidrome(firstWord) {
		// console.log(firstWord)
		this.setState({definitions: []})
		const flippedWord = this.flipWord(firstWord)
		// console.log(firstWord)
		// console.log(flippedWord)
		//runRequest to verify the entered words are valid. Store the root words, which are the 'id' property into firstRootWord and flippedRootWord and push them into the rootWords Array.
		const firstRootWord = this.findRoot(firstWord)
		.then((firstRoot) => {
			// clear word array and push first root word into word array
			const validatedWordArray = [];
			//push the first word into wordsArray
			validatedWordArray.push(firstWord)
			this.setState({
				firstWord,
				flippedWord,
				firstRootWord : firstRoot,
				wordsArray : validatedWordArray,
			}, () => {
				const firstDef = this.getDefinition(this.state.firstRootWord)
				.then((definition) => {
					// clear array and then push definitions into definition array
							const newDef = [];
							newDef.push(definition)
							this.setState({ 	
								definitions : newDef
							});
							this.getFlippedDef();
						})
					}
				)
			})
		}

		getFlippedDef() {
			const flippedRootWord = this.findRoot(this.state.flippedWord)
			.then((flippedRoot) => {
				const secondValidatedWord = Array.from(this.state.wordsArray);
				//push the flipped word into wordsArray
				secondValidatedWord.push(this.state.flippedWord);
				this.setState({ 
					wordsArray : secondValidatedWord
				})
				//push validated levidrome words to firebase
				if (this.state.wordsArray.length === 2) {
					this.addToFirebase();
				}
					this.setState({
						flippedRootWord: flippedRoot
					}, () => {
						// get definition of flippedRoot
						const flippedDef = this.getDefinition(this.state.flippedRootWord)
						.then((definition2) => {
							// push definition into array
							const newDef2 = Array.from(this.state.definitions);
							newDef2.push(definition2)
							this.setState({
								definitions : newDef2
							})
							// console.log(this.state.definitions)
						})
					}
				)
			})
		}

		addToFirebase() {
			const dbRef = firebase.database().ref()
			dbRef.push(
				{
					firstWord: this.state.firstWord,
					flippedWord: this.state.flippedWord
				}
			);
		}

		handleChange(firstWord) {
			this.setState({firstWord})
		}

		clear() {
			this.setState({
					//clear input boxes here
					firstWord:"",
					flippedWord: "",
					definitions: [],
			})
		}

	render() {
		return (
			<main className="levidrome">
				<div className="row">
					<div className="wrapper">
						<h1 className="mainTitle">Levidrome Validator</h1>
						<div className="logo">
							<img src="./public/styles/images/levidrome-icon-white.png" alt=""/>
						</div>
						<p className="introText"> A <span className="wordExample">levidrome</span> is a word that spells another valid word backwards, such as <span className="wordExample">stop</span> and <span className="wordExample">pots</span>.</p>
						<p className="instructions">Enter a word below to verify whether or not it's a levidrome!</p>
					</div>
				</div>
    				{/* main input for word */}
				<MainInput handleChange={this.handleChange} submitWord={this.levidrome} displayFlipped={this.state.flippedWord} displayFirst={this.state.firstWord}/>
			<div className="row">
				<div className="wrapper displayDefinitions">
					{this.state.definitions.map((definition, i) => {
						return <DisplayDefinitions display={definition} key={i}/>
					})}
				</div>
			</div>
			<div className="clearfix">
				<FeaturedButtons clearInputs={this.clear} />
				<Twitter />
			</div>
			</main>
		)
	}
}

class FeaturedButtons extends React.Component {
	constructor() {
		super();
		this.state={}
		this.clearInput = this.clearInput.bind(this);
	}

	clearInput(e) {
		e.preventDefault();
		this.props.clearInputs()
	}

	render() {
		return (
			<div className="featureButtons clearfix">
				<button className="clear" onClick={this.clearInput}>clear</button>
			</div>
		)
	}
}

const DisplayDefinitions = (props) => {
	return (
			<div className="col-2"> 
				<p className="definitionText">{props.display}</p>
			</div>
	)
}

const Twitter = () => (
	<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" 
	className="twitter-share-button" 
	data-text="Check out new levidromes with this levidrome validator app!" 
	data-url="https:fillerurl.com" 
	data-hashtags="levidrome" 
	data-show-count="false">Tweet</a>
 );


class MainInput extends React.Component {
	constructor() {
		super();
		this.state = {
			submittedWord: '',
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({submittedWord: e.target.value})
		// console.log(e.target.value)
		//send to value to parent so you can set textValue state from parent
		this.props.handleChange(e.target.value)
	}

	handleSubmit(e) {
		e.preventDefault();
		// prop this.state.bothWords to parent
		if (this.state.submittedWord === '') {
			return swal("Please enter a word!");	 
		}
		this.props.submitWord(this.state.submittedWord)
	}

	render() {
		return (
		<div className="row levidrome">
			<div className="wrapper">
				<form action=""	className="col-2" onSubmit={this.handleSubmit}>
					<input type="text"
						className="firstWord"
						onChange={this.handleChange}
						value={this.props.displayFirst} />
					<div className="clearfix">
						<div className="wrapper">
								<div className="clearfix"><i className="fa fa-exchange fa-4x" aria-hidden="true"></i>
								</div>
								<div className="clearfix">
									<button className="submit" type="submit">Submit</button>
								</div>
						</div>
					</div>
				</form>
				<div className="col-2">
					<input type="text" className="secondWord" value={this.props.displayFlipped}/>
				</div>
			</div>
		</div>

		)
	}
}

