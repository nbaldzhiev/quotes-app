import React, { useState, useEffect } from "react";
import './App.css';
import quotationMarksOpening from "./quotationMarks.png"
import quotationMarksClosing from "./quotationMarksClosing.png"

function App() {

  const [quote, setQuote] = useState({});
  const [tags, setTags] = useState([]);
  const [authorData, setAuthorData] = useState({});
  const [selectValue, setSelectValue] = useState('');

  const baseUrl = 'https://api.quotable.io';
  const randomEndpoint = '/random';
  const tagsEndpoint = '/tags';
  const authorsEndpoint = '/authors';

  async function getRandomQuote() {
    let url = `${baseUrl}${randomEndpoint}`;
    if (selectValue && !selectValue.startsWith('select')) {
      url += `?tags=${selectValue}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    setQuote(data);
    return data;
  }

  async function getAuthorData(authorSlug) {
    const response = await fetch(`${baseUrl}${authorsEndpoint}?slug=${authorSlug}`)
    const data = await response.json();
    setAuthorData(data.results[0]);
  }

  async function getTags() {
    const response = await fetch(`${baseUrl}${tagsEndpoint}`);
    const data = await response.json();
    setTags(data);
  }

  useEffect(() => {
    getRandomQuote().then((data) => {getAuthorData(data.authorSlug)});
    getTags();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-text">
          <div className="poor-part">
            <div>poor</div>
            <div>man's</div>
          </div>
          <div className="quotes-part">Quotes</div>
        </div>
      </header>
      <main className="App-main">
        <select id="tags" onChange={(event) => setSelectValue(event.target.value)} value={selectValue}>
          <option value="select-a-category">Select a category</option>
          {tags.map(tag => <option value={tag.name} key={tag._id}> {tag.name} </option>)}
        </select>
        <button className="randomQuoteButton" onClick={() => {
          getRandomQuote().then((data) => {getAuthorData(data.authorSlug)});
        }}>Get a quote!</button>
        <div className="quote-container">
          <img src={quotationMarksOpening} width="150" height="150" placeholder="opening-quotations-mark" />
          <div className="quote-content-container">
            <p className="quote-text">{quote.content}</p>
            <a className="quote-author" href={authorData.link} target="_blank">&#8212; {quote.author} 🌐 <span>{authorData.bio}</span></a>
          </div>
          <img src={quotationMarksClosing} width="150" height="150" placeholder="closing-quotations-mark" />
        </div>
      </main>
    </div>
  );
}

export default App;
