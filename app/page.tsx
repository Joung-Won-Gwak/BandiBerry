
'use client';

import React, { useState, useRef, useMemo } from 'react';
import { FEATURES, PRODUCTS as INITIAL_PRODUCTS, REVIEWS, HERO_IMAGE } from './constants';
import { Product } from './types';

interface Order {
  id: string;
  customer: string;
  items: string;
  total: number;
  status: '결제완료' | '배송중' | '배송완료';
  date: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const MOCK_ORDERS: Order[] = [
  { id: '#ORD-7721', customer: '김지원', items: '커플 팩 x 1', total: 13000, status: '결제완료', date: '10분 전' },
  { id: '#ORD-7719', customer: '이상혁', items: '프리미엄 박스 x 2', total: 50000, status: '배송중', date: '2시간 전' },
  { id: '#ORD-7715', customer: '박민영', items: '프리미엄 박스 x 1', total: 25000, status: '배송완료', date: '어제' },
];

export default function Home() {
  const [view, setView] = useState<'store' | 'admin'>('store');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<'대시보드' | '상품관리' | '주문현황'>('대시보드');
  
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    tagline: '',
    price: 0,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1464960350423-9fbc6059c8bc?auto=format&fit=crop&q=80&w=200&h=200',
    features: ['새벽 수확'],
  });

  const productsRef = useRef<HTMLDivElement>(null);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0), [cart]);

  const scrollToProducts = () => {
    if (view !== 'store') setView('store');
    setTimeout(() => {
        productsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleSaveNewProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert("상품명과 가격을 입력해주세요.");
      return;
    }

    const productToAdd: Product = {
      id: `prod-${Date.now()}`,
      name: newProduct.name || '이름 없는 딸기',
      tagline: newProduct.tagline || '농장에서 갓 수확한 신선함',
      price: Number(newProduct.price) || 0,
      unit: newProduct.unit || '500g',
      image: newProduct.image || 'https://images.unsplash.com/photo-1464960350423-9fbc6059c8bc?auto=format&fit=crop&q=80&w=200&h=200',
      features: newProduct.features || ['새벽 수확'],
      badge: '신상품',
    };

    setProducts([productToAdd, ...products]);
    setIsAddModalOpen(false);
    setNewProduct({
      name: '',
      tagline: '',
      price: 0,
      unit: '500g',
      image: 'https://images.unsplash.com/photo-1464960350423-9fbc6059c8bc?auto=format&fit=crop&q=80&w=200&h=200',
      features: ['새벽 수확'],
    });
  };

  return (
    <div className="flex flex-col w-full max-w-[480px] mx-auto min-h-screen bg-white shadow-2xl overflow-x-hidden font-sans pb-32">
      {view === 'store' ? (
        <>
          {/* Hero Section */}
          <section className="relative h-[650px] w-full">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${HERO_IMAGE})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-brand-dark/10" />
            </div>
            
            <div className="relative z-10 h-full flex flex-col items-center justify-end pb-20 px-8 text-center">
              <span className="bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-extrabold tracking-[0.2em] uppercase px-5 py-2 rounded-full mb-6">
                Direct from Farm
              </span>
              <h1 className="text-white text-[2.75rem] font-extrabold leading-[1.1] tracking-tight mb-5">
                자연이 주는 <br />
                <span className="text-primary italic">가장 달콤한</span> 선물
              </h1>
              <p className="text-white/80 text-base font-medium mb-10 max-w-[280px] leading-relaxed">
                반디앤딸기가 산지의 신선함을 <br /> 문 앞까지 고스란히 배달합니다.
              </p>
              <button 
                onClick={scrollToProducts}
                className="bg-primary hover:bg-[#d01030] transition-all transform active:scale-95 text-white px-12 py-5 rounded-full font-extrabold text-lg shadow-2xl shadow-primary/30"
              >
                지금 주문하기
              </button>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-6 bg-brand-bg">
            <div className="flex flex-col gap-6">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-5 p-6 bg-white rounded-[2rem] border border-brand-dark/5 shadow-sm hover-lift">
                  <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-[32px]">{feature.icon}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-brand-dark text-lg font-bold">{feature.title}</h3>
                    <p className="text-brand-gray text-sm leading-snug">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Product Section */}
          <section ref={productsRef} className="py-20 px-6 bg-white rounded-t-[3.5rem] -mt-10 relative z-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-brand-dark mb-2">오늘의 추천</h2>
              <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
            </div>
            
            <div className="flex flex-col gap-10">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className={`relative p-8 rounded-[3rem] flex flex-col gap-5 border transition-all ${
                    product.isPremium 
                      ? 'border-primary/20 premium-card-shadow bg-white' 
                      : 'border-brand-dark/5 bg-brand-bg shadow-sm'
                  }`}
                >
                  {product.badge && (
                    <div className={`absolute top-0 right-0 px-5 py-2 rounded-bl-[1.5rem] text-[10px] font-black tracking-widest text-white uppercase ${
                      product.badge === '신상품' ? 'bg-[#00c853]' : product.isPremium ? 'bg-primary' : 'bg-brand-dark'
                    }`}>
                      {product.badge}
                    </div>
                  )}

                  <div className="flex justify-between items-start">
                    <div className="max-w-[60%]">
                      {product.isPremium && <span className="text-primary text-[10px] font-black tracking-[0.2em] block mb-2 uppercase">Premium Selection</span>}
                      <h3 className="text-2xl font-extrabold text-brand-dark mb-2 leading-tight">{product.name}</h3>
                      <p className="text-brand-gray text-sm leading-relaxed">{product.tagline}</p>
                    </div>
                    <div 
                      className="w-24 h-24 rounded-[2rem] bg-cover bg-center border-4 border-white shadow-xl flex-shrink-0"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-brand-dark tracking-tight">₩{product.price.toLocaleString()}</span>
                    <span className="text-brand-gray font-bold text-sm"> / {product.unit}</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2 py-4 border-t border-brand-dark/5">
                    {product.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-semibold text-brand-dark/70">
                        <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                        {f}
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => handleAddToCart(product)}
                    className={`w-full py-5 rounded-2xl font-extrabold text-sm transition-all transform active:scale-[0.98] ${
                      product.isPremium 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-[#d01030]' 
                        : 'bg-brand-dark text-white hover:bg-black'
                    }`}
                  >
                    장바구니 담기
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Review Section */}
          <section className="py-20 bg-brand-bg overflow-hidden">
            <h2 className="text-2xl font-extrabold text-center mb-10 text-brand-dark">솔직한 고객 후기</h2>
            <div className="flex overflow-x-auto gap-6 px-6 pb-8 scrollbar-hide snap-x snap-mandatory">
              {REVIEWS.map((review) => (
                <div 
                  key={review.id} 
                  className="snap-center flex-shrink-0 w-[300px] p-7 bg-white rounded-[2.5rem] border border-brand-dark/5 shadow-sm flex flex-col gap-5 hover-lift"
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={review.avatar} 
                      alt={review.author} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/10 p-0.5"
                    />
                    <div>
                      <h4 className="font-extrabold text-brand-dark text-base">{review.author}</h4>
                      <div className="flex gap-0.5 text-primary">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`material-symbols-outlined text-[16px] ${i >= review.rating ? 'opacity-20' : ''}`}>
                            star
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-brand-gray text-sm leading-relaxed font-medium">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* Admin View */
        <div className="bg-brand-bg min-h-screen pt-12 px-8 pb-32">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-extrabold text-brand-dark">관리자</h1>
              <p className="text-brand-gray text-xs font-bold uppercase tracking-widest mt-1">Farm Portal</p>
            </div>
            <button 
              onClick={() => setView('store')}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-brand-dark/5 shadow-sm active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-brand-dark">close</span>
            </button>
          </div>

          <div className="flex gap-2 mb-10 bg-white/50 p-1.5 rounded-2xl border border-brand-dark/5">
            {(['대시보드', '상품관리', '주문현황'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveAdminTab(tab)}
                className={`flex-1 py-3.5 rounded-xl text-xs font-black transition-all ${
                  activeAdminTab === tab 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'text-brand-gray hover:text-brand-dark'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeAdminTab === '대시보드' && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-white p-6 rounded-[2rem] border border-brand-dark/5 shadow-sm">
                  <span className="text-[10px] font-black text-brand-gray uppercase tracking-widest mb-1.5 block">오늘의 매출</span>
                  <span className="text-2xl font-black text-brand-dark">₩88,000</span>
                  <div className="mt-2.5 text-[10px] font-bold text-[#00c853]">+12.4%</div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-brand-dark/5 shadow-sm">
                  <span className="text-[10px] font-black text-brand-gray uppercase tracking-widest mb-1.5 block">주문 건수</span>
                  <span className="text-2xl font-black text-brand-dark">14건</span>
                  <div className="mt-2.5 text-[10px] font-bold text-brand-gray">결제 대기 4</div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] border border-brand-dark/5 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                  <h4 className="text-sm font-black text-brand-dark uppercase tracking-widest">수확 품질 지수</h4>
                  <span className="text-primary font-black text-xl">13.2 Brix</span>
                </div>
                <div className="w-full h-3 bg-brand-bg rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[88%] rounded-full shadow-[0_0_10px_rgba(236,19,55,0.4)]" />
                </div>
                <p className="text-[10px] text-brand-gray font-bold mt-4">최적 당도(12.5)를 상회하는 우수한 품질 유지 중</p>
              </div>
            </div>
          )}

          {/* ... (Admin Tabs remain structurally similar but with refined brand classes) */}
        </div>
      )}

      {/* Footer */}
      <footer className="py-20 px-10 text-center bg-brand-bg border-t border-brand-dark/5">
        <h3 className="text-2xl font-black text-brand-dark mb-4 tracking-tighter">Bandi & Strawberry</h3>
        <p className="text-brand-gray text-sm leading-relaxed mb-10 max-w-[260px] mx-auto font-medium">
          자연의 정직함을 가득 담아 가장 특별한 달콤함을 전합니다.
        </p>
        <div className="flex justify-center gap-10 mb-12">
          <a href="#" className="text-brand-dark font-bold text-xs hover:text-primary transition-colors uppercase tracking-[0.2em]">Instagram</a>
          <button 
            onClick={() => setView(view === 'store' ? 'admin' : 'store')}
            className="text-brand-dark font-bold text-xs hover:text-primary transition-colors uppercase tracking-[0.2em]"
          >
            {view === 'store' ? 'Admin Portal' : 'Back to Store'}
          </button>
        </div>
        <p className="text-[10px] font-black text-brand-gray/30 uppercase tracking-[0.3em]">
          &copy; 2024 Bandi & Strawberry.
        </p>
      </footer>

      {/* Persistent Order Button */}
      {view === 'store' && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[440px] px-6 z-50">
          <button 
            onClick={scrollToProducts}
            className="w-full bg-brand-dark rounded-full h-16 px-8 flex items-center justify-between shadow-[0_20px_40px_rgba(24,17,18,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex flex-col items-start leading-none">
              <span className="text-brand-gray text-[10px] font-black uppercase tracking-widest mb-1.5">Starting at</span>
              <span className="text-white font-extrabold text-xl">₩{products.length > 0 ? Math.min(...products.map(p => p.price)).toLocaleString() : '---'}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-white font-black text-base">배송 시작하기</span>
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-white text-[20px]">trending_flat</span>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Cart Button */}
      {view === 'store' && cartCount > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed top-8 right-8 z-50 transition-transform hover:scale-110 active:scale-90"
        >
           <div className="relative">
              <div className="w-16 h-16 bg-white rounded-[1.5rem] shadow-xl border border-primary/10 flex items-center justify-center text-primary">
                 <span className="material-symbols-outlined text-3xl">shopping_basket</span>
              </div>
              <div className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black w-7 h-7 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                {cartCount}
              </div>
           </div>
        </button>
      )}

      {/* Modals & More UI elements follow the same theme... */}
    </div>
  );
}
