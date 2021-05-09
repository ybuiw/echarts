import React, { useState } from 'react';
import  { BarStackedEcharts } from '../components'
// import { BarBaseEcharts } from 'ahwecharts'
import './App.css';

const App = () => {
  const [color, setColor] = useState<string[]>(['#f00'])
  const [item, setItem] = useState<any[]>([
    { 
      name: '周一', 
      child: [
        { name: '邮件营销1', value: 120},
        { name: '邮件营销2', value: 132},
        { name: '邮件营销3', value: 101},
        { name: '邮件营销4', value: 134},
        { name: '邮件营销5', value: 90},
      ]
    },
    { 
      name: '周二', 
      child: [
        { name: '邮件营销1', value: 220},
        { name: '邮件营销2', value: 182},
        { name: '邮件营销3', value: 191},
        { name: '邮件营销4', value: 234},
        { name: '邮件营销5', value: 290},
      ]
    },
    { 
      name: '周三', 
      child: [
        { name: '邮件营销1', value: 150},
        { name: '邮件营销2', value: 232},
        { name: '邮件营销3', value: 201},
        { name: '邮件营销4', value: 154},
        { name: '邮件营销5', value: 190},
      ]
    }
  ])
  return (
    <div className="App">
      <BarStackedEcharts height="300px"
        data={item}
        isHorizontal
        itemStyle={{
          barWidth: 20
        }}
      />
    </div>
  );
}

export default App;
