import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import  { LineBase } from '../components'
import './App.css';

const App = () => (
  <div className="App">
    <LineBase
      smooth
      colors={['#f00']}
      areaStyle={{
        show: true,
        isGrad: true,
        color: ['#ff0', 'rgba(255, 255, 255, 0)']
      }}
      data={[
        { name: 'Mon', value: 150},
        { name: 'Tue', value: 230},
        { name: 'Wed', value: 224},
        { name: 'Thu', value: 218},
        { name: 'Fri', value: 135},
        { name: 'Sat', value: 147},
        { name: 'Sun', value: 260},
      ]}
    />
  </div>
);

export default App;
