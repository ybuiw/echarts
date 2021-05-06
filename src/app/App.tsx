import React, { useState } from 'react';
import  { LineStackedEcharts } from '../components'
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
    },
    { 
      name: '周四', 
      child: [
        { name: '邮件营销1', value: 320},
        { name: '邮件营销2', value: 332},
        { name: '邮件营销3', value: 301},
        { name: '邮件营销4', value: 334},
        { name: '邮件营销5', value: 390},
      ]
    },
    { 
      name: '周五', 
      child: [
        { name: '邮件营销1', value: 820},
        { name: '邮件营销2', value: 932},
        { name: '邮件营销3', value: 901},
        { name: '邮件营销4', value: 934},
        { name: '邮件营销5', value: 1290},
      ]
    },
  ])
  return (
    <div className="App">
      <LineStackedEcharts height="300px"
        smooth
        areaStyle={{
          show: true
        }}
        data={item}
      />
    </div>
  );
}

export default App;
