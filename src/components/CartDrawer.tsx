import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const generateWhatsAppOrderUrl = () => {
    let text = `*DR•KLEEN SHOP ORDER CART*%0A%0A`;
    cartItems.forEach((item, idx) => {
      text += `${idx + 1}. *${item.product.name}* (x${item.quantity}) - ₦${(item.product.price * item.quantity).toLocaleString()}%0A`;
    });
    text += `%0A*TOTAL ORDER VALUE:* ₦${totalAmount.toLocaleString()}%0A%0A`;
    text += `_I want to complete my delivery address and payment for dispatch._`;
    return `https://wa.me/2348003755336?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-fade-in flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slide-left border-l border-slate-200">
        
        {/* Drawer Header */}
        <div className="p-5 bg-[#031F5E] text-white flex items-center justify-between border-b border-sky-900">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} className="text-[#1693d9]" />
            <div>
              <h3 className="font-extrabold text-base text-white">Your Hygiene Supply Cart</h3>
              <p className="text-[11px] text-sky-200">{totalItemsCount} item{totalItemsCount !== 1 ? 's' : ''} in basket</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Item List */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingBag size={30} />
              </div>
              <p className="font-bold text-slate-700">Your cart is currently empty</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Browse our professional hygiene concentrates and cleaning supplies in the Shop section.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 rounded-full bg-[#031F5E] text-white text-xs font-bold cursor-pointer"
              >
                Browse Shop Products
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 flex gap-3 items-center"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-xl bg-white border border-slate-200"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#031F5E] truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-xs font-extrabold text-[#1693d9] mt-0.5">
                    ₦{item.product.price.toLocaleString()}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="w-6 h-6 rounded-md bg-white border border-slate-300 text-slate-600 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-xs font-bold text-slate-800 w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="w-6 h-6 rounded-md bg-white border border-slate-300 text-slate-600 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                  title="Remove Item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-3">
            <div className="flex justify-between items-center text-sm font-bold text-slate-700">
              <span>Subtotal:</span>
              <span className="text-lg font-black text-[#031F5E]">
                ₦{totalAmount.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
              <ShieldCheck size={14} />
              <span>Free Delivery in Lagos on orders over ₦30,000</span>
            </div>

            <a
              href={generateWhatsAppOrderUrl()}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-extrabold flex items-center justify-center gap-2 shadow-md hover:scale-101 active:scale-98 transition-all cursor-pointer"
            >
              <MessageCircle size={18} className="fill-white" />
              <span>Checkout via WhatsApp Order Desk</span>
            </a>

            <button
              onClick={onClearCart}
              className="w-full text-center text-[11px] text-slate-400 hover:text-slate-600 font-medium cursor-pointer"
            >
              Clear Cart
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
