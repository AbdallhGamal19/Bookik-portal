"use client";
import { cartService } from "@/services/cartService";
import React, { useEffect, useState } from "react";
import { FiMinus, FiPlus, FiTrash2, FiX } from "react-icons/fi";

const CartDrawer: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const [cartData, setCartData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart data when drawer opens
  useEffect(() => {
    if (open) {
      fetchCartData();
    }
  }, [open]);

  const fetchCartData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await cartService.getCart();
      setCartData(data);
    } catch (err: any) {
      setError(err.message || "فشل في تحميل بيانات السلة");
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId: any) => {
    try {
      await cartService.removeFromCart(itemId);
      // Refresh cart data after removal
      await fetchCartData();
    } catch (err: any) {
      console.error("Error removing item:", err);
    }
  };

  const handleUpdateQuantity = async (itemId: any, newQuantity: any) => {
    if (newQuantity < 1) return;

    try {
      await cartService.updateCartItem(itemId, newQuantity);
      // Refresh cart data after update
      await fetchCartData();
    } catch (err: any) {
      console.error("Error updating quantity:", err);
    }
  };

  const handleClearCart = async () => {
    try {
      await cartService.clearCart();
      setCartData(null);
    } catch (err: any) {
      console.error("Error clearing cart:", err);
    }
  };

  const calculateTotal = () => {
    if (!cartData?.items || !Array.isArray(cartData.items)) return 0;
    return cartData.items.reduce((total: any, item: any) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-theme-bg-card shadow-theme-shadow-md z-[9999] transition-all duration-200 ease-in-out ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-theme-border-primary">
        <h2 className="text-theme-text-primary font-bold text-lg">
          سلة المشتريات
        </h2>
        <button
          onClick={onClose}
          className="text-theme-text-secondary hover:text-theme-text-primary transition-all duration-200 p-1 rounded-bookik-rounded-full hover:bg-theme-bg-hover"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-bookik-rounded-full h-8 w-8 border-b-2 border-theme-accent-primary"></div>
          </div>
        ) : error ? (
          <div className="p-4 text-center">
            <p className="text-theme-accent-error text-sm mb-3">{error}</p>
            <button
              onClick={fetchCartData}
              className="text-theme-accent-primary hover:text-theme-accent-primary/80 underline text-xs transition-all duration-200"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : !cartData || !cartData.items || cartData.items.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-theme-text-secondary text-sm">
              سلة المشتريات فارغة.
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {cartData.items.map((item: any) => (
              <div
                key={item.id}
                className="bg-global-background9 border border-global-background7 rounded-2xl p-4 transition-all duration-200 hover:shadow-md"
              >
                {/* Item Header */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm text-theme-text-primary line-clamp-2">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-all duration-200"
                    title="إزالة"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>

                {/* Price and Quantity */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-theme-text-secondary font-medium">
                    {item.price} ريال
                  </span>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded-full bg-theme-bg-tertiary hover:bg-theme-bg-hover text-theme-text-primary transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="w-8 text-center text-xs font-medium text-theme-text-primary">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-full bg-theme-bg-tertiary hover:bg-theme-bg-hover text-theme-text-primary transition-all duration-200 flex items-center justify-center"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <span className="text-xs font-semibold text-theme-text-primary">
                    المجموع: {item.price * item.quantity} ريال
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer with Total and Actions */}
      {cartData && cartData.items && cartData.items.length > 0 && (
        <div className="border-t border-global-background7 bg-global-background9 p-4 space-y-4">
          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-theme-text-primary">
              المجموع الكلي:
            </span>
            <span className="font-bold text-sm text-theme-accent-primary">
              {calculateTotal()} ريال
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleClearCart}
              className="w-full py-3 px-4 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all duration-200 font-semibold text-sm hover:scale-105 active:scale-95"
            >
              تفريغ السلة
            </button>

            <button
              onClick={() => {
                // TODO: Implement checkout functionality
                console.log("Proceeding to checkout...");
              }}
              className="w-full py-3 px-4 bg-theme-accent-primary text-white rounded-2xl hover:bg-theme-accent-primary/90 transition-all duration-200 font-semibold text-sm hover:scale-105 active:scale-95"
            >
              إتمام الشراء
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
