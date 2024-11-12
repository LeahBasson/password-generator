import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './App.css';

const App = () => {
  const [password, setPassword] = useState(''); //This component uses useState to track password options, generated password, strength, and copy status.
  const [length, setLength] = useState(10);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [strength, setStrength] = useState('Medium');
  const [copied, setCopied] = useState(false);
  const [sliderBackground, setSliderBackground] = useState('50%');

  const generatePassword = () => {
    let charset = '';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charset += '0123456789';
    if (symbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length); //Math.random() * charset.length generates a random decimal number between 0 and charset.length
      generatedPassword += charset[randomIndex];
    }
    setPassword(generatedPassword); //setPassword(generatedPassword) sets the password state to the newly generated password.
    evaluateStrength(generatedPassword); //Calls evaluateStrength(generatedPassword) to assess the password’s strength.
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Hide "COPIED" message after 2 seconds
  };

  const evaluateStrength = (password) => {
    if (password.length >= 12 && uppercase && lowercase && numbers && symbols) {
      setStrength('Strong');
    } else if (password.length >= 8 && uppercase && lowercase && numbers) {
      setStrength('Medium');
    } else if (password.length >= 6 && (uppercase || lowercase || numbers)) {
      setStrength('Weak');
    } else {
      setStrength('Too Weak!');
    }
  };

  const handleSliderChange = (e) => {
    setLength(Number(e.target.value));
    setSliderBackground(`${((length - 4) / 16) * 100}%`);
  };

  useEffect(() => {
    setSliderBackground(`${((length - 4) / 16) * 100}%`);
  }, [length]);

  const getStrengthBlocks = () => {
    switch (strength) {
      case 'Too Weak!':
        return ['too-weak', '', '', ''];
      case 'Weak':
        return ['weak', 'weak', '', ''];
      case 'Medium':
        return ['medium', 'medium', 'medium', ''];
      case 'Strong':
        return ['strong', 'strong', 'strong', 'strong'];
      default:
        return ['', '', '', ''];
    }
  };

  //This is the JSX that renders the UI
  return (
    <div className="app">
      <div className="heading">
        <h1>Password Generator</h1>
      </div>
      <div className="password-display">
        <div className="password-input">
          <input type="text" value={password} readOnly placeholder="P4$5W0rD!" />
          <CopyToClipboard text={password} onCopy={handleCopy}>
            <div className="copy-section">
              {copied && <span className="copied-message">COPIED</span>}
              <div className="copy-icon">
                <svg width="21" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.341 3.091L17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z" fill="#A4FFAF" />
                </svg>
              </div>
            </div>
          </CopyToClipboard>
        </div>
      </div>

      <div className="options">
        <div className="settings">
          <div className="length">
            <label>Character Length</label> <span>{length}</span>
          </div>
          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={handleSliderChange}
            style={{
              background: `linear-gradient(to right, #A4FFAF 0%, #A4FFAF ${sliderBackground}, #18171F ${sliderBackground}, #18171F 100%)`
            }}
          />

          <div className="checkbox">
            <input type="checkbox" checked={uppercase} onChange={() => setUppercase(!uppercase)} />
            <label>Include Uppercase Letters</label>
          </div>
          <div className="checkbox">
            <input type="checkbox" checked={lowercase} onChange={() => setLowercase(!lowercase)} />
            <label>Include Lowercase Letters</label>
          </div>
          <div className="checkbox">
            <input type="checkbox" checked={numbers} onChange={() => setNumbers(!numbers)} />
            <label>Include Numbers</label>
          </div>
          <div className="checkbox">
            <input type="checkbox" checked={symbols} onChange={() => setSymbols(!symbols)} />
            <label>Include Symbols</label>
          </div>
        </div>

        <div className="strength">
          <label>STRENGTH</label>
          <div className="strength-cal">
          <span className="strength-text">{strength.toUpperCase()}</span>
          <div className="strength-bar-container">
            {getStrengthBlocks().map((block, index) => (
              <div key={index} className={`strength-bar ${block}`} />
            ))}
          </div>
          </div>
        </div>

        <button className="generate-button" onClick={generatePassword}>
          GENERATE{' '}
          <span>
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path fill="#24232C" d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default App;
