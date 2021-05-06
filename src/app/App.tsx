import React, { useState } from 'react';
import  { BarBaseEcharts } from '../components'
// import { BarBaseEcharts } from 'ahwecharts'
import './App.css';

const App = () => {
  const [color, setColor] = useState<string[]>(['#f00'])
  const [item, setItem] = useState<any[]>([
    { name: 'Mon', value: 20},
    { name: 'Tue', value: 30},
    { name: 'Wed', value: 224},
    { name: 'Thu', value: 218},
    { name: 'Fri', value: 135},
    { name: 'Sat', value: 147},
    { name: 'Sun', value: 260},
  ])
  const a = () => {
    setItem([
      { name: 'MonMonMonMonMon', value: 2150},
      { name: 'Tue', value: 1230},
      { name: 'Wed', value: 1224},
      { name: 'Thu', value: 1218},
      { name: 'Fri', value: 1135},
      { name: 'Sat', value: 1147},
      { name: 'Sun', value: 1260},
    ])
    setColor(['#fff000'])
  }
  const b = () => {
    setItem([
      { name: 'MonMonMonMonMon', value: 150},
      { name: 'Tue', value: 230},
      { name: 'Wed', value: 224},
      { name: 'Thu', value: 218},
      { name: 'Fri', value: 135},
      { name: 'Sat', value: 147},
      { name: 'Sun', value: 260},
    ])
    setColor(['#ff0000'])
  }
  return (
    <div className="App">
      <button onClick={a}>click mi</button>
      <button onClick={b}>click mi</button>
      <BarBaseEcharts height="300px"
        isHorizontal
        isSwitch
        itemStyle={{
          barWidth: 14
        }}
        data={item}
      />
    </div>
  );
}

export default App;
