
import React, { useState, useEffect, useMemo } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  price: string;
  gender: 'Men' | 'Women';
  ageGroup: 'Teens' | 'Young Adults' | 'Adults';
  style: 'Streetwear' | 'Oversized' | 'Casual' | 'Urban' | 'Indo-Western';
}

const products: Product[] = [
  {
    id: 1,
    name: "Saffron Street Hoodie",
    category: "Hoodies",
    description: "Heavyweight 450GSM premium cotton with reflective urban graphics. Designed for the Mumbai winters.",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop",
    price: "₹4,499",
    gender: 'Men',
    ageGroup: 'Young Adults',
    style: 'Streetwear'
  },
  {
    id: 2,
    name: "Dharavi Drift Cargos",
    category: "Cargos",
    description: "Multi-pocket technical cargos with adjustable strap system. Urban utility redefined.",
    image: "https://images.unsplash.com/photo-1594938328870-9623159c8c99?q=80&w=800&auto=format&fit=crop",
    price: "₹5,299",
    gender: 'Men',
    ageGroup: 'Young Adults',
    style: 'Urban'
  },
  {
    id: 3,
    name: "Bandra Boxy Tee",
    category: "Oversized Tees",
    description: "Premium oversized fit with high-density neon prints. 100% organic heavy cotton.",
    image: "https://images.unsplash.com/photo-1622519407650-3df9883f76a5?q=80&w=800&auto=format&fit=crop",
    price: "₹2,199",
    gender: 'Men',
    ageGroup: 'Teens',
    style: 'Oversized'
  },
  {
    id: 4,
    name: "Indo Western Wear",
    category: "Outerwear",
    description: "Waterproof tech-shell with isolated thermal lining. Futuristic silhouette for the modern Indian rebel.",
    image: "https://cdn.shopify.com/s/files/1/0252/9897/files/bollywood-style-cream-silk-tailored-skirt-cape-crop-top-indo-western-dress_250x@2x.jpg?v=1726640423",
    price: "₹8,999",
    gender: 'Women',
    ageGroup: 'Adults',
    style: 'Urban'
  },
  {
    id: 5,
    name: "Stylish Maxi's",
    category: "Maxis",
    description: "Cyberpunk aesthetic meets traditional comfort. High-visibility neon stitching.",
    image: "https://img.kwcdn.com/product/fancy/7f9bd8fe-ee32-47ad-9248-794616182301.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp",
    price: "₹4,999",
    gender: 'Women',
    ageGroup: 'Teens',
    style: 'Streetwear'
  },
  {
    id: 6,
    name: "Jumpsuits",
    category: "Outerwear",
    description: "Utility vest with integrated storage and breathable mesh lining. Built for the heat.",
    image: "https://www.crimsouneclub.com/cdn/shop/products/JS50057_2.jpg?v=1754635670",
    price: "₹6,499",
    gender: 'Women',
    ageGroup: 'Young Adults',
    style: 'Urban'
  }
];

interface CollectionProps {
  onFullCollection: () => void;
}

const Collection: React.FC<CollectionProps> = ({ onFullCollection }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ageFilter, setAgeFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<number[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('matrix_og_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('matrix_og_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cart]);

  const toggleCart = (productId: number) => {
    setCart(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = product.name.toLowerCase().includes(query) || 
                           product.category.toLowerCase().includes(query) ||
                           product.style.toLowerCase().includes(query);
      
      const matchesAge = ageFilter === 'All' || product.ageGroup === ageFilter;
      const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;

      return matchesSearch && matchesAge && matchesCategory;
    });
  }, [searchQuery, ageFilter, categoryFilter]);

  const filterOptions = {
    age: ['All', 'Teens', 'Young Adults', 'Adults'],
    category: ['All', 'Hoodies', 'Cargos', 'Oversized Tees', 'Outerwear']
  };

  return (
    <section id="collection" className="reveal py-24 bg-black scroll-mt-20">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-sm font-black text-matrix uppercase tracking-[0.3em] mb-4">Latest Drop</h2>
            <h3 className="text-4xl font-display">THE "CODE-01" SERIES</h3>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <button 
              onClick={onFullCollection}
              className="text-xs uppercase tracking-widest font-bold text-matrix hover:text-white transition-colors mr-4 underline underline-offset-8 decoration-2"
            >
              View Full Collection
            </button>
            <button 
              onClick={() => setShowSizeGuide(true)}
              className="text-xs uppercase tracking-widest font-bold text-zinc-400 hover:text-matrix underline transition-colors mr-4"
            >
              Size Guide
            </button>
          </div>
        </div>

        {/* Enhanced Filtering Section */}
        <div className="mb-12 space-y-8 bg-zinc-900/30 p-8 border border-white/5 neon-border">
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <input 
              type="text"
              placeholder="Search by product name or style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/50 border border-white/10 px-6 py-4 text-white text-xs tracking-widest focus:outline-none focus:border-matrix transition-all placeholder:text-zinc-600 uppercase font-bold"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-matrix/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Age Group Filter */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Age Group</h4>
              <div className="flex flex-wrap gap-3">
                {filterOptions.age.map(opt => (
                  <button 
                    key={opt}
                    onClick={() => setAgeFilter(opt)}
                    className={`text-[10px] font-black uppercase tracking-widest transition-all ${ageFilter === opt ? 'text-matrix' : 'text-zinc-600 hover:text-white'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Category</h4>
              <div className="flex flex-wrap gap-3">
                {filterOptions.category.map(opt => (
                  <button 
                    key={opt}
                    onClick={() => setCategoryFilter(opt)}
                    className={`text-[10px] font-black uppercase tracking-widest transition-all ${categoryFilter === opt ? 'text-matrix' : 'text-zinc-600 hover:text-white'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 min-h-[400px]">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-zinc-900 neon-border border border-white/5">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-matrix transition-colors shadow-2xl"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold group-hover:text-matrix transition-colors duration-300 uppercase tracking-tighter">{product.name}</h4>
                  <span className="text-matrix font-display text-sm">{product.price}</span>
                </div>
                <div className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-4">
                  <span>{product.category}</span>
                  <span>•</span>
                  <span>{product.style}</span>
                  <span>•</span>
                  <span>{product.ageGroup}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center opacity-50">
              <div className="text-matrix mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-xl font-display uppercase tracking-tighter">No items match the current protocol</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setAgeFilter('All');
                  setCategoryFilter('All');
                }}
                className="mt-6 text-matrix font-black uppercase tracking-widest text-xs hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setQuickViewProduct(null)}></div>
          <div className="relative bg-zinc-900 border border-matrix/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl">
            <button onClick={() => setQuickViewProduct(null)} className="absolute top-4 right-4 z-10 text-white hover:text-matrix transition-colors p-2 bg-black/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-full md:w-1/2 h-80 md:h-auto bg-black">
              <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <div className="flex gap-2 mb-2">
                  <span className="text-matrix font-black text-[10px] uppercase tracking-[0.4em]">{quickViewProduct.category}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-400 font-black text-[10px] uppercase tracking-[0.4em]">{quickViewProduct.style}</span>
                </div>
                <h3 className="text-4xl font-display text-white mb-4 uppercase tracking-tighter">{quickViewProduct.name}</h3>
                <p className="text-2xl text-white font-display mb-6">{quickViewProduct.price}</p>
                <div className="flex gap-4 mb-6">
                  <div className="bg-zinc-800 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest text-zinc-400">Target: {quickViewProduct.ageGroup}</div>
                </div>
                <p className="text-zinc-400 text-lg leading-relaxed">{quickViewProduct.description}</p>
              </div>
              <button onClick={() => toggleCart(quickViewProduct.id)} className={`w-full py-4 text-sm font-black uppercase tracking-widest transition-all duration-300 border ${cart.includes(quickViewProduct.id) ? 'bg-matrix text-black border-matrix' : 'bg-white text-black border-white hover:bg-matrix hover:border-matrix'}`}>
                {cart.includes(quickViewProduct.id) ? 'Access Granted (In Collection)' : 'Add to Collection'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setShowSizeGuide(false)}></div>
          <div className="relative bg-zinc-900 border border-matrix/30 w-full max-w-2xl p-8 md:p-12 shadow-2xl">
            <button onClick={() => setShowSizeGuide(false)} className="absolute top-4 right-4 text-white hover:text-matrix transition-colors p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-3xl font-display text-white mb-2 uppercase tracking-tighter">Size Protocol</h3>
            <p className="text-matrix text-[10px] font-black uppercase tracking-[0.3em] mb-10">Optimized for urban movement</p>
            
            <div className="space-y-12">
              <div>
                <h4 className="text-sm font-black text-zinc-500 uppercase tracking-widest mb-4">Oversized Tees & Hoodies (Inches)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs uppercase tracking-widest border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-zinc-600">
                        <th className="py-3 font-black">Size</th>
                        <th className="py-3 font-black">Chest</th>
                        <th className="py-3 font-black">Length</th>
                        <th className="py-3 font-black">Shoulder</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-white/5">
                        <td className="py-4 font-bold text-matrix">S</td>
                        <td className="py-4">44</td>
                        <td className="py-4">28</td>
                        <td className="py-4">20</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-4 font-bold text-matrix">M</td>
                        <td className="py-4">46</td>
                        <td className="py-4">29</td>
                        <td className="py-4">21</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-4 font-bold text-matrix">L</td>
                        <td className="py-4">48</td>
                        <td className="py-4">30</td>
                        <td className="py-4">22</td>
                      </tr>
                      <tr>
                        <td className="py-4 font-bold text-matrix">XL</td>
                        <td className="py-4">50</td>
                        <td className="py-4">31</td>
                        <td className="py-4">23</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-black text-zinc-500 uppercase tracking-widest mb-4">Technical Cargos (Inches)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs uppercase tracking-widest border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-zinc-600">
                        <th className="py-3 font-black">Size</th>
                        <th className="py-3 font-black">Waist</th>
                        <th className="py-3 font-black">Length</th>
                        <th className="py-3 font-black">Thigh</th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <tr className="border-b border-white/5">
                        <td className="py-4 font-bold text-matrix">28</td>
                        <td className="py-4">28-30</td>
                        <td className="py-4">38</td>
                        <td className="py-4">24</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-4 font-bold text-matrix">30</td>
                        <td className="py-4">30-32</td>
                        <td className="py-4">39</td>
                        <td className="py-4">25</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-4 font-bold text-matrix">32</td>
                        <td className="py-4">32-34</td>
                        <td className="py-4">40</td>
                        <td className="py-4">26</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowSizeGuide(false)}
              className="mt-12 w-full py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-matrix transition-colors text-xs"
            >
              Close Protocol
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Collection;
