
import React, { useState, useEffect, useMemo } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  gender: 'Men' | 'Women';
  style: 'Streetwear' | 'Oversized' | 'Casual' | 'Urban';
}

const allProducts: Product[] = [
  { 
    id: 1, 
    name: 'OG Men Casual Outfit', 
    category: 'Hoodies', 
    price: '₹4,499', 
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1200', 
    description: 'Heavyweight 450GSM cotton with reflective urban graphics. A masterpiece of Indian street culture.',
    gender: 'Men',
    style: 'Casual'
  },
  { 
    id: 2, 
    name: 'Dharavi Drift Cargos', 
    category: 'Cargos', 
    price: '₹5,299', 
    image: 'https://images.unsplash.com/photo-1594938328870-9623159c8c99?q=80&w=1200', 
    description: 'Technical multi-pocket cargos designed for utility and stealth. Tapered fit.',
    gender: 'Men',
    style: 'Streetwear'
  },
  { 
    id: 3, 
    name: 'Bandra Boxy Tee', 
    category: 'Tees', 
    price: '₹2,199', 
    image: 'https://images.unsplash.com/photo-1622519407650-3df9883f76a5?q=80&w=1200', 
    description: 'Ultra-premium oversized fit with high-density screen prints. 100% organic heavy cotton.',
    gender: 'Men',
    style: 'Oversized'
  },
  { 
    id: 4, 
    name: 'Cyber City Bomber', 
    category: 'Cargos', 
    price: '₹8,999', 
    image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=1200', 
    description: 'A futuristic tech-jacket with modular attachments and thermal regulation.',
    gender: 'Men',
    style: 'Urban'
  },
  { 
    id: 5, 
    name: "Stylish Maxi", 
    category: 'Outerwear', 
    price: '₹4,999', 
    image: 'https://cdn.shopify.com/s/files/1/0252/9897/files/bollywood-style-cream-silk-tailored-skirt-cape-crop-top-indo-western-dress_250x@2x.jpg?v=1726640423', 
    description: 'Oversized silhouette with Matrix-red detailing. Designed for comfort without compromising on edge for the urban woman.',
    gender: 'Women',
    style: 'Streetwear'
  },
  { 
    id: 6, 
    name: 'Stylish Jumsuits', 
    category: 'Outerwear', 
    price: '₹6,499', 
    image: 'https://www.crimsouneclub.com/cdn/shop/products/JS50057_2.jpg?v=1754635670', 
    description: 'Multi-pocket technical cargos tailored for an urban female fit. Durable, stylish, and built for the modern Indian streets.',
    gender: 'Women',
    style: 'Urban'
  }
];

const CollectionPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<number[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('matrix_og_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        setCart([]);
      }
    }
  }, []);

  const toggleCart = (productId: number) => {
    const updatedCart = cart.includes(productId) 
      ? cart.filter(id => id !== productId) 
      : [...cart, productId];
    
    setCart(updatedCart);
    localStorage.setItem('matrix_og_cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || 
                             (categoryFilter === 'Oversized Tees' ? product.category === 'Tees' : product.category === categoryFilter);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const categoryOptions = ['All', 'Hoodies', 'Cargos', 'Oversized Tees', 'Outerwear'];

  return (
    <div className="bg-darker min-h-screen pt-20">
      {/* Header */}
      <header className="py-16 md:py-24 bg-gradient-to-b from-darker to-black border-b border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-display text-5xl md:text-8xl mb-6 tracking-tighter uppercase text-white">MATRIX <span className="text-matrix">COLLECTION</span></h1>
          <p className="max-w-2xl mx-auto text-zinc-500 text-base md:text-xl leading-relaxed">
            The evolution of the Indian urban landscape. A fusion of traditional grit and futuristic technical streetwear.
          </p>
        </div>
      </header>

      {/* Search and Filters Section */}
      <div className="bg-black/80 backdrop-blur-md sticky top-[65px] z-40 border-b border-white/5">
        <div className="container mx-auto px-6 py-6 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/10 px-6 py-4 text-white text-sm tracking-widest focus:outline-none focus:border-matrix transition-colors placeholder:text-zinc-600"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 text-center">Category</span>
            <div className="flex gap-8 justify-center overflow-x-auto no-scrollbar pb-1">
              {categoryOptions.map(opt => (
                <button 
                  key={opt}
                  onClick={() => setCategoryFilter(opt)}
                  className={`text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-b-2 pb-1 ${categoryFilter === opt ? 'text-matrix border-matrix' : 'text-zinc-500 border-transparent hover:text-white'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <main className="py-20 container mx-auto px-6 min-h-[50vh]">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative overflow-hidden aspect-[3/4] mb-6 neon-border bg-zinc-900 border border-white/5">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest">Quick View</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold uppercase tracking-tighter text-white">{product.name}</h3>
                  <span className="text-matrix font-display">{product.price}</span>
                </div>
                <div className="flex gap-3 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                  <span>{product.category}</span>
                  <span>•</span>
                  <span>{product.style}</span>
                  <span>•</span>
                  <span>{product.gender}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 border border-matrix/30 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-matrix" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-display uppercase mb-2">No matches found</h3>
            <p className="text-zinc-600 uppercase text-[10px] tracking-widest">Try adjusting your category or search query</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('All');
              }}
              className="mt-8 text-matrix font-black uppercase text-[10px] tracking-widest hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative bg-zinc-900 w-full max-w-5xl flex flex-col md:flex-row border border-matrix/20 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-10 text-white hover:text-matrix transition-colors p-2 bg-black/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-black">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex gap-2 items-center mb-2">
                <span className="text-matrix font-black text-[10px] uppercase tracking-[0.3em]">{selectedProduct.category}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400 font-black text-[10px] uppercase tracking-[0.4em]">{selectedProduct.style}</span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl mb-4 tracking-tighter uppercase text-white">{selectedProduct.name}</h2>
              <p className="text-2xl font-display text-matrix mb-6">{selectedProduct.price}</p>
              <div className="h-px w-20 bg-matrix/50 mb-8"></div>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-10">{selectedProduct.description}</p>
              <button 
                onClick={() => toggleCart(selectedProduct.id)}
                className={`w-full py-5 font-black uppercase tracking-widest transition-all ${cart.includes(selectedProduct.id) ? 'bg-zinc-800 text-matrix border border-matrix' : 'bg-matrix text-black hover:bg-white'}`}
              >
                {cart.includes(selectedProduct.id) ? 'Already in Collection' : 'Add to Collection'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Copy */}
      <footer className="py-20 bg-black border-t border-white/5 text-center">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-4xl text-matrix neon-text mb-6">MATRIX OG</h2>
          <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em] mb-10">THE FUTURE OF INDIAN STREETWEAR IS HERE</p>
          <div className="flex justify-center space-x-12 text-[10px] font-black uppercase tracking-widest text-zinc-500">
            <a href="#" className="hover:text-matrix transition-colors">Instagram</a>
            <a href="#" className="hover:text-matrix transition-colors">Twitter</a>
            <a href="#" className="hover:text-matrix transition-colors">Contact</a>
          </div>
          <p className="mt-12 text-[8px] text-zinc-800 uppercase tracking-widest">&copy; {new Date().getFullYear()} MATRIX OG CLOTHING. SYSTEM REBOOT V.2.1</p>
        </div>
      </footer>
    </div>
  );
};

export default CollectionPage;
