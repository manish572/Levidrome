import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import { Nav } from './app';


class List extends React.Component {
   constructor() {
      super();
      this.state = {
         storedItems:[],
         uniquePairs: [],
      }
    }

    //retrive info from firebase to display in levidrome list
    componentDidMount() {
      const dbRef = firebase.database().ref()

      dbRef.on('value', (firebaseData) => {
         const pairArray = [];
         const levidromeData = firebaseData.val();

         for (let itemsKey in levidromeData) {
            pairArray.push({
               key : itemsKey,
               firstWord: levidromeData[itemsKey].firstWord,
               flippedWord: levidromeData[itemsKey].flippedWord
            })
         }
         this.setState({
            storedItems: pairArray
         });            
         // console.log('yasss', this.state.storedItems);
         
         let words = pairArray;
         let uniquePairs = [];

         words.forEach((pair) => {
            let i = uniquePairs.findIndex(x => x.firstWord == pair.firstWord);
            if (i <= -1) {
               uniquePairs.push({key: pair.key, firstWord: pair.firstWord, flippedWord: pair.flippedWord})
            }
         })
         this.setState({ uniquePairs })
         // console.log('what', this.state.uniquePairs)
      });
    }

    render() {
        return (
            <div className="row">
               <header className="clearfix">
                  <div className="wrapper">
                     <Link to="/"><h1 className="headerLogo">Levidrome Validator</h1></Link>
                     <Nav />
                  </div>
               </header>
               <div className="textWrapper">
               <h2 className="listTitle">List of Levidromes</h2>
                  <ul className="levidromeList">
                        {this.state.uniquePairs.map((pair) => {
                        return (
                           <ul key={pair.key} className="pairing">
                              <li className="col-2">{pair.firstWord}</li>
                              <li className="col-2">{pair.flippedWord}</li>
                           </ul>
                        )
                        })}
                  </ul>
               </div>
            </div>
        )
    }
}

export default List