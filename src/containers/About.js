import React, { Component } from 'react';
import AboutView from '../components/AboutView';

export default class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memberData: [
        {
          name: '정윤호',
          role: 'TVXQ',
          comment: '인간에게 가장 해로운 벌레는 대충',
        },
        {
          name: '정윤호',
          role: 'TVXQ',
          comment: '인간에게 가장 해로운 벌레는 대충',
        },
        {
          name: '정윤호',
          role: 'TVXQ',
          comment: '인간에게 가장 해로운 벌레는 대충',
        },
        {
          name: '정윤호',
          role: 'TVXQ',
          comment: '인간에게 가장 해로운 벌레는 대충',
        },
        {
          name: '정윤호',
          role: 'TVXQ',
          comment: '인간에게 가장 해로운 벌레는 대충',
        },
        {
          name: '정윤호',
          role: 'TVXQ',
          comment: '인간에게 가장 해로운 벌레는 대충',
        },
        {
          name: '정윤호',
          role: 'TVXQ',
          comment: '인간에게 가장 해로운 벌레는 대충',
        },
        {
          name: '정윤호',
          role: 'TVXQ',
          comment: '인간에게 가장 해로운 벌레는 대충',
        },
      ],
    };
  }

  render() {
    return <AboutView memberData={this.state.memberData} />;
  }
}
