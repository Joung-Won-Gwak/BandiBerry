
import React, { useState, useRef, useMemo } from 'react';
import { FEATURES, PRODUCTS as INITIAL_PRODUCTS, REVIEWS, HERO_IMAGE } from './constants';
import { Product } from './types';

// Mock Order Type for Admin
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

const App: React.FC = () => {
  const [view, setView] = useState<'store' | 'admin'>('store');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<'대시보드' | '상품관리' | '주문현황'>('대시보드');
  
  // New Product Form State
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
    <div className="flex flex-col w-full max-w-[480px] mx-auto min-h-screen bg-white shadow-2xl overflow-x-hidden pb-32">
      
      {/* View Switcher: Store vs Admin */}
      {view === 'store' ? (
        <>
          {/* Hero Section */}
          <section className="relative h-[600px] w-full">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${HERO_IMAGE})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
            </div>
            
            <div className="relative z-10 h-full flex flex-col items-center justify-end pb-16 px-8 text-center">
              <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
                농장 직송 신선함
              </span>
              <h1 className="text-white text-5xl font-black leading-tight tracking-tight mb-4">
                자연이 주는 <br />
                <span className="text-primary">가장 달콤한</span> 선물
              </h1>
              <p className="text-white/90 text-base font-medium mb-8 max-w-[280px]">
                반디앤딸기가 산지의 신선함을 문 앞까지 배달해 드립니다.
              </p>
              <button 
                onClick={scrollToProducts}
                className="bg-primary hover:bg-red-600 transition-colors text-white px-10 py-4 rounded-full font-extrabold text-lg shadow-xl shadow-primary/20"
              >
                지금 주문하기
              </button>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 px-6 bg-brand-bg">
            <div className="flex flex-col gap-6">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-5 p-5 bg-white rounded-3xl border border-[#ece7e8] shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-brand-dark text-lg font-extrabold">{feature.title}</h3>
                    <p className="text-brand-gray text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Products Section */}
          <section ref={productsRef} className="py-16 px-6 bg-white rounded-t-[3rem] -mt-8 relative z-20">
            <h2 className="text-3xl font-black text-center mb-10 text-brand-dark">오늘의 추천</h2>
            
            <div className="flex flex-col gap-8">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className={`relative p-7 rounded-[2.5rem] flex flex-col gap-4 border overflow-hidden ${
                    product.isPremium 
                      ? 'border-primary/20 shadow-xl shadow-primary/5 bg-white' 
                      : 'border-[#ece7e8] bg-brand-bg shadow-sm'
                  }`}
                >
                  {product.badge && (
                    <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-[10px] font-black tracking-widest text-white ${
                      product.badge === '신상품' ? 'bg-green-500' : product.isPremium ? 'bg-primary' : 'bg-transparent text-primary'
                    }`}>
                      {product.badge}
                    </div>
                  )}

                  <div className="flex justify-between items-start">
                    <div>
                      {!product.isPremium && !product.badge && <span className="text-primary text-[10px] font-black tracking-widest block mb-1">인기 상품</span>}
                      <h3 className="text-2xl font-black text-brand-dark mb-1">{product.name}</h3>
                      <p className="text-brand-gray text-sm">{product.tagline}</p>
                    </div>
                    <div 
                      className="w-20 h-20 rounded-full bg-cover bg-center border-2 border-white shadow-lg"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-brand-dark">₩{product.price.toLocaleString()}</span>
                    <span className="text-brand-gray font-bold text-sm"> / {product.unit}</span>
                  </div>

                  <div className="flex flex-col gap-3 py-4 border-t border-brand-dark/5">
                    {product.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-semibold text-brand-dark/80">
                        <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                        {f}
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => handleAddToCart(product)}
                    className={`w-full py-4 rounded-full font-black text-sm transition-all active:scale-[0.98] ${
                      product.isPremium 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-red-600' 
                        : 'bg-brand-dark text-white hover:opacity-90'
                    }`}
                  >
                    장바구니 담기
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 bg-white overflow-hidden">
            <h2 className="text-2xl font-black text-center mb-8 text-brand-dark">고객님들의 소중한 후기</h2>
            <div className="flex overflow-x-auto gap-5 px-6 pb-6 scrollbar-hide snap-x snap-mandatory">
              {REVIEWS.map((review) => (
                <div 
                  key={review.id} 
                  className="snap-center flex-shrink-0 w-[280px] p-6 bg-white rounded-3xl border border-[#ece7e8] shadow-sm flex flex-col gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img 
                      src={review.avatar} 
                      alt={review.author} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/10"
                    />
                    <div>
                      <h4 className="font-extrabold text-brand-dark text-base">{review.author}</h4>
                      <div className="flex gap-0.5 text-primary">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`material-symbols-outlined text-sm ${i >= review.rating ? 'opacity-30' : ''}`}>
                            star
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-brand-dark text-sm leading-relaxed italic">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* Admin View Content */
        <div className="bg-brand-bg min-h-screen pt-8 px-6 pb-20 relative">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-black text-brand-dark">관리자 콘솔</h1>
              <p className="text-brand-gray text-xs font-bold uppercase tracking-widest mt-1">농장 관리 포털</p>
            </div>
            <button 
              onClick={() => setView('store')}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-brand-dark/10 shadow-sm"
            >
              <span className="material-symbols-outlined text-brand-dark">close</span>
            </button>
          </div>

          <div className="flex gap-2 mb-8 bg-white/50 p-1.5 rounded-2xl border border-brand-dark/5">
            {(['대시보드', '상품관리', '주문현황'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveAdminTab(tab)}
                className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${
                  activeAdminTab === tab 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-brand-gray hover:text-brand-dark'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeAdminTab === '대시보드' && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-brand-dark/5 shadow-sm">
                  <span className="text-[10px] font-black text-brand-gray uppercase tracking-widest mb-1 block">오늘의 매출</span>
                  <span className="text-2xl font-black text-brand-dark">₩88,000</span>
                  <div className="mt-2 text-[10px] font-bold text-green-500">어제보다 +12%</div>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-brand-dark/5 shadow-sm">
                  <span className="text-[10px] font-black text-brand-gray uppercase tracking-widest mb-1 block">주문 건수</span>
                  <span className="text-2xl font-black text-brand-dark">14</span>
                  <div className="mt-2 text-[10px] font-bold text-brand-gray">결제 대기 4건</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-brand-dark/5 shadow-sm">
                <h4 className="text-sm font-black text-brand-dark mb-4">평균 수확 품질</h4>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-black text-primary">13.2</span>
                  <span className="text-brand-gray font-bold text-sm mb-1">Brix</span>
                </div>
                <div className="w-full h-2 bg-brand-bg rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[88%] rounded-full" />
                </div>
                <p className="text-[10px] text-brand-gray font-bold mt-3">목표: 12.5 Brix (최적의 달콤함)</p>
              </div>
            </div>
          )}

          {activeAdminTab === '상품관리' && (
            <div className="bg-white rounded-3xl border border-brand-dark/5 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-brand-bg flex justify-between items-center">
                <h4 className="text-sm font-black text-brand-dark">재고 목록</h4>
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="text-[10px] font-black text-primary uppercase bg-red-50 px-3 py-1.5 rounded-lg border border-primary/10 hover:bg-red-100"
                >
                  + 새 상품 추가
                </button>
              </div>
              {products.map((p) => (
                <div key={p.id} className="p-5 border-b border-brand-bg flex items-center justify-between last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-bg flex items-center justify-center overflow-hidden border border-brand-dark/5">
                      <img src={p.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                      <h5 className="text-sm font-extrabold text-brand-dark">{p.name}</h5>
                      <p className="text-[10px] font-bold text-brand-gray uppercase tracking-tighter">₩{p.price.toLocaleString()} | {p.unit}</p>
                    </div>
                  </div>
                  <button className="w-8 h-8 bg-brand-bg rounded-full flex items-center justify-center text-brand-dark">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeAdminTab === '주문현황' && (
            <div className="flex flex-col gap-4">
              {MOCK_ORDERS.map((o) => (
                <div key={o.id} className="bg-white p-5 rounded-3xl border border-brand-dark/5 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-[10px] font-black text-brand-gray uppercase">{o.id}</span>
                      <h5 className="font-extrabold text-brand-dark">{o.customer}</h5>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      o.status === '결제완료' ? 'bg-orange-100 text-orange-600' :
                      o.status === '배송중' ? 'bg-blue-100 text-blue-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {o.status}
                    </span>
                  </div>
                  <div className="text-xs text-brand-gray font-medium mb-4">{o.items}</div>
                  <div className="flex justify-between items-center pt-3 border-t border-brand-bg">
                    <span className="text-sm font-black text-brand-dark">₩{o.total.toLocaleString()}</span>
                    <span className="text-[10px] text-brand-gray font-bold">{o.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Footer (Always visible) */}
      <footer className="py-12 px-8 text-center bg-brand-bg border-t border-[#ece7e8]">
        <h3 className="text-xl font-black text-brand-dark mb-4 tracking-tight">반디앤딸기</h3>
        <p className="text-brand-gray text-sm leading-relaxed mb-8 max-w-[240px] mx-auto">
          2023년부터 자연의 가장 달콤한 선물을 여러분의 식탁에 전해드리고 있습니다.
        </p>
        <div className="flex justify-center gap-8 mb-8">
          <a href="#" className="text-brand-dark font-bold text-sm hover:text-primary transition-colors">인스타그램</a>
          <button 
            onClick={() => setView(view === 'store' ? 'admin' : 'store')}
            className="text-brand-dark font-bold text-sm hover:text-primary transition-colors uppercase tracking-widest text-[10px]"
          >
            {view === 'store' ? '관리자 포털' : '스토어로 돌아가기'}
          </button>
        </div>
        <p className="text-[10px] font-bold text-brand-gray/50 uppercase tracking-widest">
          © 2024 Bandi & Strawberry. All rights reserved.
        </p>
      </footer>

      {/* Sticky Bottom CTA (Only on Store View) */}
      {view === 'store' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[440px] px-4 z-50">
          <button 
            onClick={scrollToProducts}
            className="w-full bg-brand-dark rounded-full h-16 px-6 flex items-center justify-between shadow-2xl transition-transform active:scale-[0.98]"
          >
            <div className="flex flex-col items-start leading-none">
              <span className="text-brand-gray text-[10px] font-black uppercase tracking-widest mb-1">최저가</span>
              <span className="text-white font-black text-lg">₩{products.length > 0 ? Math.min(...products.map(p => p.price)).toLocaleString() : '---'}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white font-extrabold text-base">신선함 주문하기</span>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[18px]">arrow_forward</span>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Cart Badge UI (Only on Store View) */}
      {view === 'store' && cartCount > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed top-6 right-6 z-50 transition-transform hover:scale-110 active:scale-95"
        >
           <div className="relative">
              <div className="w-14 h-14 bg-white rounded-full shadow-lg border border-primary/10 flex items-center justify-center text-primary">
                 <span className="material-symbols-outlined text-3xl">shopping_cart</span>
              </div>
              <div className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </div>
           </div>
        </button>
      )}

      {/* Add Product Modal Overlay */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[480px] rounded-t-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-brand-dark">새 상품 추가</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center"
              >
                 <span className="material-symbols-outlined text-brand-dark">close</span>
              </button>
            </div>
            
            <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto scrollbar-hide">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black text-brand-gray uppercase tracking-widest ml-1">상품명</label>
                <input 
                  type="text" 
                  autoFocus
                  value={newProduct.name || ''}
                  onChange={e => setNewProduct(prev => ({...prev, name: e.target.value}))}
                  placeholder="예: 여름 한정 딸기"
                  className="w-full bg-brand-bg rounded-2xl px-5 py-4 text-sm font-bold border border-transparent focus:border-primary/20 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black text-brand-gray uppercase tracking-widest ml-1">설명 문구</label>
                <input 
                  type="text" 
                  value={newProduct.tagline || ''}
                  onChange={e => setNewProduct(prev => ({...prev, tagline: e.target.value}))}
                  placeholder="짧은 설명을 입력하세요..."
                  className="w-full bg-brand-bg rounded-2xl px-5 py-4 text-sm font-bold border border-transparent focus:border-primary/20 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black text-brand-gray uppercase tracking-widest ml-1">가격 (₩)</label>
                  <input 
                    type="number" 
                    value={newProduct.price || ''}
                    onChange={e => setNewProduct(prev => ({...prev, price: parseInt(e.target.value) || 0}))}
                    placeholder="15000"
                    className="w-full bg-brand-bg rounded-2xl px-5 py-4 text-sm font-bold border border-transparent focus:border-primary/20 outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black text-brand-gray uppercase tracking-widest ml-1">단위</label>
                  <select 
                    value={newProduct.unit}
                    onChange={e => setNewProduct(prev => ({...prev, unit: e.target.value}))}
                    className="w-full bg-brand-bg rounded-2xl px-5 py-4 text-sm font-bold border border-transparent focus:border-primary/20 outline-none transition-all appearance-none"
                  >
                    <option value="500g">500g</option>
                    <option value="1kg">1kg</option>
                    <option value="2kg">2kg</option>
                    <option value="박스">박스</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-black text-brand-gray uppercase tracking-widest ml-1">이미지 URL</label>
                <input 
                  type="text" 
                  value={newProduct.image || ''}
                  onChange={e => setNewProduct(prev => ({...prev, image: e.target.value}))}
                  className="w-full bg-brand-bg rounded-2xl px-5 py-4 text-xs font-mono border border-transparent focus:border-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            <button 
              onClick={handleSaveNewProduct}
              className="w-full bg-primary text-white py-5 rounded-3xl font-black text-base mt-8 shadow-xl shadow-primary/20 active:scale-[0.98] transition-all"
            >
              상품 저장하기
            </button>
          </div>
        </div>
      )}

      {/* Cart Modal Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-[480px] rounded-t-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300 flex flex-col max-h-[85vh]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black text-brand-dark">장바구니</h3>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center"
              >
                 <span className="material-symbols-outlined text-brand-dark">close</span>
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-brand-bg rounded-full flex items-center justify-center text-brand-gray mb-4">
                   <span className="material-symbols-outlined text-4xl">shopping_cart</span>
                </div>
                <h4 className="text-lg font-black text-brand-dark mb-2">장바구니가 비어 있습니다</h4>
                <p className="text-brand-gray text-sm mb-8">신선한 딸기를 담아보세요!</p>
                <button 
                  onClick={() => { setIsCartOpen(false); scrollToProducts(); }}
                  className="bg-brand-dark text-white px-8 py-3 rounded-full font-black text-sm"
                >
                  쇼핑 시작하기
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
                  <div className="flex flex-col gap-6 mb-8">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex gap-4 items-center">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-brand-dark/5">
                          <img src={item.product.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-extrabold text-brand-dark truncate">{item.product.name}</h4>
                          <p className="text-brand-gray text-[10px] font-bold uppercase mb-2">₩{item.product.price.toLocaleString()} / {item.product.unit}</p>
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="w-7 h-7 bg-brand-bg rounded-full flex items-center justify-center text-brand-dark font-black"
                            >
                              -
                            </button>
                            <span className="text-sm font-black w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="w-7 h-7 bg-brand-bg rounded-full flex items-center justify-center text-brand-dark font-black"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-brand-dark">₩{(item.product.price * item.quantity).toLocaleString()}</p>
                          <button 
                            onClick={() => updateQuantity(item.product.id, -item.quantity)}
                            className="text-[10px] font-bold text-red-400 mt-2 uppercase tracking-widest"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-brand-bg pt-6 mt-auto">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-brand-gray font-bold">총 결제 금액</span>
                    <span className="text-3xl font-black text-brand-dark">₩{cartTotal.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={() => { alert("주문이 완료되었습니다! 감사합니다."); setCart([]); setIsCartOpen(false); }}
                    className="w-full bg-primary text-white py-5 rounded-3xl font-black text-base shadow-xl shadow-primary/20 active:scale-[0.98] transition-all"
                  >
                    지금 결제하기
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
