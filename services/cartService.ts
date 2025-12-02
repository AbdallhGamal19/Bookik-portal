import axiosInstance from "@/app/Constatns/axiosInstance";

export const cartService = {
  // Get cart data
  getCart: async (): Promise<any> => {
    try {
      const response = await axiosInstance.get("/cart");
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  },

  // Add item to cart
  addToCart: async (itemData: any): Promise<any> => {
    try {
      const response = await axiosInstance.post("/cart/add", itemData);
      return response.data;
    } catch (error) {
      console.error("Error adding item to cart:", error);
      throw error;
    }
  },

  // Remove item from cart
  removeFromCart: async (itemId: any): Promise<any> => {
    try {
      const response = await axiosInstance.delete(`/cart/remove/${itemId}`);
      return response.data;
    } catch (error) {
      console.error("Error removing item from cart:", error);
      throw error;
    }
  },

  // Update cart item quantity
  updateCartItem: async (itemId: any, quantity: any): Promise<any> => {
    try {
      const response = await axiosInstance.put(`/cart/update/${itemId}`, {
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }
  },

  // Clear cart
  clearCart: async (): Promise<any> => {
    try {
      const response = await axiosInstance.delete("/cart/clear");
      return response.data;
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  },
};
