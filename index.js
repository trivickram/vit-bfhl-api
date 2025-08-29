
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { alternateCapsReverse } = require('./utils');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const FULL_NAME = 'john_doe'; 
const DOB = '17091999';
const EMAIL = 'john@xyz.com';
const ROLL_NUMBER = 'ABCD123';

function isNumber(str) {
  return /^\d+$/.test(str);
}

function isAlphabet(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function isSpecialChar(str) {
  return !isNumber(str) && !isAlphabet(str);
}

// GET route for root path
app.get('/', (req, res) => {
  res.status(200).json({
    message: "VIT BFHL API is running!",
    endpoints: {
      POST: "/bfhl - Main API endpoint"
    },
    status: "Active"
  });
});

// GET route for bfhl (optional - for testing)
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(200).json({
        is_success: false,
        user_id: `${FULL_NAME}_${DOB}`,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: ""
      });
    }
    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let alpha_concat = "";
    for (let item of data) {
      if (isNumber(item)) {
        let num = parseInt(item);
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
        sum += num;
      } else if (isAlphabet(item)) {
        alphabets.push(item.toUpperCase());
        alpha_concat += item;
      } else {
        special_characters.push(item);
      }
    }
    const concat_string = alternateCapsReverse(alpha_concat);
    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });
  } catch (err) {
    res.status(200).json({
      is_success: false,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: ""
    });
  }
});

module.exports = app;
