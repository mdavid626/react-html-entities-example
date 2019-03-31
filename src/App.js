import React, { Component } from 'react';
import './App.css';

const createMarkup = (myTextFromDatabase) => ({
  __html: myTextFromDatabase
});

const MyComponentWithDangerouslySetInnerHTML = ({myTextFromDatabase}) => (
  <div dangerouslySetInnerHTML={createMarkup(myTextFromDatabase)} />
);

const MyComponentWithoutDangerouslySetInnerHTML = ({myTextFromDatabase}) => (
  <div>{myTextFromDatabase}</div>
);

const REGISTERED_SIGN = '\u00AE';

const MyComponentUnicode = ({myTextFromDatabase}) => (
  <div>{myTextFromDatabase.replace(/&reg;/gi, REGISTERED_SIGN)}</div>
);

class App extends Component {
  render() {
    const myTextFromDatabase = 'This is the Registered sign character: &reg;';
    return (
      <div className="App">
        <header className="App-header">
          <section>
            <h1>
              With dangerouslySetInnerHTML
            </h1>
            <MyComponentWithDangerouslySetInnerHTML myTextFromDatabase={myTextFromDatabase} />
          </section>
          <section>
            <h1>
              Without dangerouslySetInnerHTML
            </h1>
            <MyComponentWithoutDangerouslySetInnerHTML myTextFromDatabase={myTextFromDatabase} />
          </section>
          <section>
            <h1>
              With Unicode character
            </h1>
            <MyComponentUnicode myTextFromDatabase={myTextFromDatabase} />
          </section>
        </header>
      </div>
    );
  }
}

export default App;
