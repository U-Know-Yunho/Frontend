import React, { Component } from 'react';
import AboutView from '../components/AboutView';

export default class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memberData: [
        {
          name: '안세나',
          img: 'https://avatars3.githubusercontent.com/u/42930317?s=460&v=4',
          role: 'Front-end Developer',
          comment: ['!!세나 === 열정', '고양이 집사 & 초코 덕후'],
          git: 'https://github.com/sena-a',
        },
        {
          name: '조서형',
          img: 'https://avatars1.githubusercontent.com/u/18183191?s=460&v=4',
          role: 'Front-end Developer',
          comment: ['인간에게 가장 해로운', "벌레는 '대충'"],
          git: 'https://github.com/Seo-Hyung',
        },
        {
          name: '김혜비',
          img: 'https://avatars3.githubusercontent.com/u/39211979?s=460&v=4',
          role: 'Front-end Developer',
          comment: ['디자인을 좋아합니다요', '외주는 저에게'],
          git: 'https://github.com/ohahthink',
        },
        {
          name: '김성훈',
          img: 'https://avatars1.githubusercontent.com/u/41003210?s=460&v=4',
          role: 'IOS Developer',
          comment: ['앱개발은 저에게', '패캠출신할인있음'],
          git: 'https://github.com/Pigfactory',
        },
        {
          name: '김철규',
          img: 'https://avatars1.githubusercontent.com/u/42608204?s=460&v=4',
          role: 'IOS Developer',
          comment: ['인간에게 가장 해로운', "벌레는 '대충'"],
          git: 'https://github.com/Chulkyu',
        },
        {
          name: '위성환',
          img: 'https://avatars0.githubusercontent.com/u/37973909?s=460&v=4',
          role: 'IOS Developer',
          comment: ['인간에게 가장 해로운', "벌레는 '대충'"],
          git: 'https://github.com/WiSeoungHwan',
        },
        {
          name: '김도향',
          img: 'https://avatars2.githubusercontent.com/u/39525435?s=460&v=4',
          role: 'Back-end Developer',
          comment: ['인간에게 가장 해로운', "벌레는 '대충'"],
          git: 'https://github.com/KimDoHyang',
        },
        {
          name: '전영훈',
          img: 'https://avatars3.githubusercontent.com/u/35748895?s=460&v=4',
          role: 'Back-end Developer',
          comment: ['인간에게 가장 해로운', "벌레는 '대충'"],
          git: 'https://github.com/jeonyh0924',
        },
      ],
    };
  }

  render() {
    return <AboutView memberData={this.state.memberData} />;
  }
}
