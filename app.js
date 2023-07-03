const express = require('express')

const app = express()

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.get('/mean', (req, res) => {
    const { nums } = req.query;
  
    if (!nums || nums.trim().length === 0) {
      return res.status(400).json({ error: 'Empty input' });
    }
  
    function mean(nums) {
      const numbers = nums.split(',').map(Number);
  
      if (numbers.some(isNaN)) {
        return res.status(400).json({ error: 'Invalid number(s) provided' });
      }
  
      let total = 0;
      let count = 0;
  
      numbers.forEach(function (item) {
        total += item;
        count++;
      });
  
      return total / count;
    }
  
    const result = mean(nums);
  
    if (typeof result === 'number') {
      const response = {
        operation: 'mean',
        value: result,
      };
      return res.json(response);
    } else {
      return res.status(400).json({ error: 'Failed to calculate mean' });
    }
  });
  
  app.get('/median', (req, res) => {
    const { nums } = req.query;
  
    if (!nums || nums.trim().length === 0) {
      return res.status(400).json({ error: 'Empty input' });
    }
  
    function median(nums) {
      const numbers = nums.split(',').map(Number);
  
      if (numbers.some(isNaN)) {
        return res.status(400).json({ error: 'Invalid number(s) provided' });
      }
  
      numbers.sort(function (a, b) {
        return a - b;
      });
  
      const middle = Math.floor(numbers.length / 2);
      const medianValue =
        numbers.length % 2 === 0
          ? (numbers[middle - 1] + numbers[middle]) / 2
          : numbers[middle];
  
      return medianValue;
    }
  
    const result = median(nums);
  
    if (typeof result === 'number') {
      const response = {
        operation: 'median',
        value: result,
      };
      return res.json(response);
    } else {
      return res.status(400).json({ error: 'Failed to calculate median' });
    }
  });
  
  
  app.get('/mode', (req, res) => {
    const { nums } = req.query;
  
    if (!nums || nums.trim().length === 0) {
      return res.status(400).json({ error: 'Empty input' });
    }
  
    function mode(nums) {
      const numbers = nums.split(',').map(Number);
      const frequency = {};
  
      if (numbers.some(isNaN)) {
        return res.status(400).json({ error: 'Invalid number(s) provided' });
      }
  
      numbers.forEach(function (num) {
        if (frequency[num]) {
          frequency[num]++;
        } else {
          frequency[num] = 1;
        }
      });
  
      let mode;
      let maxFrequency = 0;
  
      for (const num in frequency) {
        if (frequency[num] > maxFrequency) {
          mode = num;
          maxFrequency = frequency[num];
        }
      }
  
      return Number(mode);
    }
  
    const result = mode(nums);
  
    if (typeof result === 'number') {
      const response = {
        operation: 'mode',
        value: result,
      };
      return res.json(response);
    } else {
      return res.status(400).json({ error: 'Failed to calculate mode' });
    }
  });
  
//futher study 

app.get('/all', (req, res) => {
    const { nums } = req.query;
  
    function mean(nums) {
      const numbers = nums.split(',').map(Number);
  
      if (numbers.some(isNaN)) {
        throw new Error('Invalid number(s) provided');
      }
  
      if (numbers.length === 0) {
        throw new Error('Empty input');
      }
  
      let total = 0;
      let count = 0;
  
      numbers.forEach(function (item) {
        total += item;
        count++;
      });
  
      return total / count;
    }
  
    function median(nums) {
      const numbers = nums.split(',').map(Number);
  
      if (numbers.some(isNaN)) {
        throw new Error('Invalid number(s) provided');
      }
  
      numbers.sort(function (a, b) {
        return a - b;
      });
  
      const middle = Math.floor(numbers.length / 2);
      const medianValue =
        numbers.length % 2 === 0
          ? (numbers[middle - 1] + numbers[middle]) / 2
          : numbers[middle];
  
      return medianValue;
    }
  
    function mode(nums) {
      const numbers = nums.split(',').map(Number);
  
      if (numbers.some(isNaN)) {
        throw new Error('Invalid number(s) provided');
      }
  
      const frequency = {};
  
      numbers.forEach(function (num) {
        if (frequency[num]) {
          frequency[num]++;
        } else {
          frequency[num] = 1;
        }
      });
  
      let mode;
      let maxFrequency = 0;
  
      for (const num in frequency) {
        if (frequency[num] > maxFrequency) {
          mode = num;
          maxFrequency = frequency[num];
        }
      }
  
      return Number(mode);
    }
  
    try {
        if (!nums || nums.trim().length === 0) {
          throw new Error('Empty input');
        }
    
        const meanResult = mean(nums);
        const medianResult = median(nums);
        const modeResult = mode(nums);
    
        const response = {
          operation: 'all',
          mean: meanResult,
          median: medianResult,
          mode: modeResult,
        };
    
        return res.json(response);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    });
  
  


app.listen(3000, () => {
    console.log('App on port 3000');
})