
import { Feature, Product, Review } from './types';

export const FEATURES: Feature[] = [
  {
    icon: 'schedule',
    title: '새벽 수확',
    description: "가장 신선하고 아삭한 상태를 위해 수확 당일 배송합니다."
  },
  {
    icon: 'favorite',
    title: '프리미엄 당도',
    description: '한 입 베어 물 때마다 완벽한 달콤함을 선사하는 고당도(Brix)를 보장합니다.'
  },
  {
    icon: 'eco',
    title: '친환경 농법',
    description: '환경과 고객님의 건강을 생각하는 지속 가능한 농법으로 재배합니다.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'couple-pack',
    name: '커플 팩',
    tagline: '두 분이서 즐기기에 딱 좋은 구성',
    price: 13000,
    unit: '500g',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZub1gXWVfxFvt5242nDxR5XOvsG5QCrXV7oDazU-ZgALCeW4LNnB25VpC-9FSbdBW04wvT1bk2YEM1GrRQM3jS_klrSW9WGQZzOlItFkkH0v3stFaocZWGkESAamqKi728a8ZDxDztFGJ0Io_kGebYwF3m1RQRi91QSK2aNFMNJLvc3G5QMZB055zShL5zLfNYjQYigNkmdqm_CpM-hQZ_lypntaDpL31cj1WQc2jFrBkrY5ajcSYrjkyFhb_X5Fe5iHsHnP1LKeR',
    features: ['매일 새벽 수확', '친환경 포장재 사용'],
    badge: '인기 상품',
    origin: {
      location: '경남 산청군',
      farmName: '반디 햇살 농원',
      description: '지리산 자락의 깨끗한 공기와 맑은 물로 재배하여 아삭한 식감이 일품입니다.'
    },
    nutrition: {
      calories: '32kcal (100g당)',
      sugarContent: '11-12 Brix',
      vitaminC: '62mg',
      fiber: '2.0g'
    }
  },
  {
    id: 'premium-box',
    name: '프리미엄 박스',
    tagline: '온 가족이 넉넉하게 즐기는 패밀리 사이즈',
    price: 25000,
    unit: '1kg',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4AWwLvQDbniIlSLb7kEvxnWVyO-aYgaCn7D0y-aCSmprWc85mlIBtiQ-qEHO0TjnEH6yHbgfqKBxX0TQj9uRkAuNE8PhRRscuNU-XSitDGYTynUa6EZPo-75ZZm6SR1zJY55VxNNhqCK8J5nrIoTHOdZQkmSN1uaiojUzX30tBS8AtVxCZ0rk6xJrMP83BneN2HueVZjRenp7R27cZ6zZb41mdeMQhrUCeeMJn1O-7URNnzR-BoHNuZ6Qa98846EcOYPhM8RQL6SR',
    features: ['최상급 당도 보장', '고급 선물용 포장', '우선 배송 서비스'],
    badge: '가성비 최고',
    isPremium: true,
    origin: {
      location: '충남 논산시',
      farmName: '연무 프리미엄 팜',
      description: '전국 최대 딸기 산지인 논산에서 가장 당도가 높은 품종만을 선별하여 재배합니다.'
    },
    nutrition: {
      calories: '35kcal (100g당)',
      sugarContent: '13-14 Brix',
      vitaminC: '75mg',
      fiber: '2.2g'
    }
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: '김지연',
    rating: 5,
    text: '"정말 살면서 먹어본 딸기 중에 가장 달아요! 포장도 너무 꼼꼼해서 상처 하나 없이 도착했어요."',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmuq-3qVu_6Ur2tDLCSVZtGyNGq4TmC6-ceEW4_ookMXflHeDzylIQcAwDp7irHuEI5tQeXSx9vizDUEGjeHVun9MWqhrR2I5qQ1laNNnzkHj2Tolxm2hcMiuYmQQH_ilUZZoZB8xbBHcR2PhSMu7vMylYo0NdWFlvZt6sCSyQYST46iwXRM0yWFkvrVAzOrz5-Dzl9gjy54pytTek7B4gZ7Z1_YHjrIkuGLD8R0aFiKaifb2tlhBDPv6V9ohvX1Cdvh87CxuPXJPI'
  },
  {
    id: '2',
    author: '이민수',
    rating: 5,
    text: '"배송이 진짜 빨라요. 아이들이 앉은 자리에서 한 박스를 다 비웠네요. 다음엔 꼭 1kg 박스로 주문해야겠어요!"',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRveG46sqpkOWmHYsT1p0EUfiFxwDLhFdc3fA1UFIF3B_1zV0DH3uC8RVHos4O7Yyp809yunj_ImwmdmsXX5XImtbRtUGYlJAdHHcwq0BZIbuPiARCkItV4F67a9qS9YxtDO-pozyY8O15GuPN-ltfXiHGTKqV5000cZdNmZuACfzpCBHKN55LXXUlFepuXtze88iz7dD3n0ioN4ujPmeCRwmRIJDusMTUseaHyWW7nLiWSHn_jhABwsDZXcwfWCHADfAyScfsli9n'
  },
  {
    id: '3',
    author: '박소라',
    rating: 4,
    text: '"대형마트 딸기랑은 차원이 다른 품질입니다. 신선함과 달콤함이 그대로 느껴져요."',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDafPzjhYOc5Y4Rms30CwyfwNqRB_cfE-rVOyt4SgDBFpHrHm65KJTyZDDxJOXwkHTy2latMqo3_2DTZvUrjnDejGNyOR9O9USAlmQ60cJ6Yn-jZybBD766DeCyhDaIB2J4KQWwZulzI4glTQASHAOV81OKDdVwuJZC6jgVdAGdPyJVEjbp86pKH_lAxz97lHWA4VxhdGF53dNoRT1XDZfRXEG0T_6dc8pNGN9kHDO2e2k8l8TkA5WyJVV64Q7UNTKT2na2mnc3IW71'
  }
];

export const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBn0IIHDHgRVohp9Mvbwby3UxUEfLbZUq9mQK80naeQleJOOcaIobiFw3-1KhzQXCT8Zq3nl8saWgYYLBwQIb7gVZVWzSe-Y7O6M557Z6gwjE22kO1JAn4W2KNOcukjqOlryDApHFkoskoVLri3fhRKY6ntH72Pm8XKBs7Jw32mtlsAfCK6BfnTsVPpwx9rtZZZBSoHTNZuf3tvgMqmX4vrYfKiiN8oWSBwxicnP2jfI8Up0Am50oHhOboOrUKSVhmoEkVFjALwC2Ru';
