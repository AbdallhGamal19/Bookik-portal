# Authentication System Migration Guide

## Overview

The application has been migrated from a page-based login system to a modal-based authentication system using the new `AuthService` and centralized state management.

## What Changed

### 1. **Removed Login Page**
- ❌ `app/login/page.tsx` - Deleted
- ✅ Login Modal is now the primary authentication method

### 2. **New Services Architecture**
- ✅ `services/authService.ts` - Centralized authentication logic
- ✅ `services/followService.ts` - Follow/unfollow functionality
- ✅ `services/profileService.ts` - Profile management
- ✅ `services/userService.ts` - User discovery and search
- ✅ `services/videoService.ts` - Video management
- ✅ `services/commentService.ts` - Comment management
- ✅ `services/offerService.ts` - Offer management

### 3. **Enhanced App Context**
- ✅ Authentication state management
- ✅ User data persistence
- ✅ Automatic token handling
- ✅ Login modal state

### 4. **New Components**
- ✅ `AuthGuard` - Route protection component
- ✅ `ProtectedComponent` - Example of protected content

## How to Use

### Basic Authentication

```typescript
import { useAppContext } from "@/context/appContext";

function MyComponent() {
  const { isAuthenticated, currentUser, logout, openLoginModal } = useAppContext();
  
  if (!isAuthenticated) {
    return <button onClick={openLoginModal}>تسجيل الدخول</button>;
  }
  
  return (
    <div>
      <p>مرحباً {currentUser?.name}!</p>
      <button onClick={logout}>تسجيل الخروج</button>
    </div>
  );
}
```

### Protected Routes with AuthGuard

```typescript
import AuthGuard from "@/components/AuthGuard";

function ProtectedPage() {
  return (
    <AuthGuard>
      <div>هذا المحتوى محمي - يحتاج تسجيل دخول</div>
    </AuthGuard>
  );
}
```

### Using Services

```typescript
import { AuthService, FollowService, ProfileService } from "@/services";

// Login
const loginResult = await AuthService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Get followers
const followers = await FollowService.getFollowers(userId, 1, 20);

// Update profile
const updateResult = await ProfileService.updateProfile({
  name: 'New Name',
  bio: 'Updated bio'
});
```

## Migration Steps for Existing Components

### 1. **Replace Direct API Calls**
```typescript
// OLD
import axiosInstance from "@/app/Constatns/axiosInstance";
const response = await axiosInstance.post('/login', credentials);

// NEW
import { AuthService } from "@/services/authService";
const response = await AuthService.login(credentials);
```

### 2. **Use App Context Instead of Local Storage**
```typescript
// OLD
const user = JSON.parse(localStorage.getItem('user') || '{}');

// NEW
const { currentUser } = useAppContext();
```

### 3. **Replace Authentication Checks**
```typescript
// OLD
if (!localStorage.getItem('token')) {
  window.location.href = '/login';
}

// NEW
const { isAuthenticated, openLoginModal } = useAppContext();
if (!isAuthenticated) {
  openLoginModal();
}
```

## Benefits of New System

### 1. **Better User Experience**
- No page redirects for authentication
- Seamless modal-based login
- Persistent authentication state

### 2. **Centralized State Management**
- Single source of truth for user data
- Automatic token refresh
- Consistent authentication across components

### 3. **Type Safety**
- Full TypeScript support
- Proper interfaces for all API responses
- Better error handling

### 4. **Maintainability**
- Organized service architecture
- Reusable authentication logic
- Easy to extend and modify

## File Structure

```
services/
├── index.ts              # Main exports
├── authService.ts        # Authentication
├── profileService.ts     # Profile management
├── followService.ts      # Follow/unfollow
├── userService.ts        # User operations
├── videoService.ts       # Video management
├── commentService.ts     # Comments
├── offerService.ts       # Offers/deals
└── README.md            # Service documentation

components/
├── AuthGuard.tsx         # Route protection
├── LoginModal.tsx        # Login modal
├── LoginModalWrapper.tsx # Modal wrapper
└── ProtectedComponent.tsx # Example usage

context/
└── appContext.tsx        # Global state management
```

## Common Patterns

### 1. **Loading States**
```typescript
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  setLoading(true);
  try {
    const result = await SomeService.doSomething();
    // Handle success
  } catch (error) {
    // Handle error
  } finally {
    setLoading(false);
  }
};
```

### 2. **Error Handling**
```typescript
const result = await AuthService.login(credentials);
if (result.success) {
  // Handle success
} else {
  // Handle API error
  console.error(result.message);
}
```

### 3. **Authentication Guards**
```typescript
// Component level
<AuthGuard>
  <ProtectedContent />
</AuthGuard>

// Hook level
const { isAuthenticated } = useAppContext();
useEffect(() => {
  if (!isAuthenticated) {
    openLoginModal();
  }
}, [isAuthenticated]);
```

## Troubleshooting

### Common Issues

1. **Import Errors**
   - Make sure to import from `@/services/authService` not `@/services`
   - Check that all service files are properly exported

2. **Authentication State Not Updating**
   - Ensure component is wrapped in `AppProvider`
   - Check that `useAppContext` is used correctly

3. **Token Not Persisting**
   - Verify localStorage is available
   - Check browser console for errors

### Debug Tips

```typescript
// Add to components for debugging
const { isAuthenticated, currentUser } = useAppContext();
console.log('Auth state:', { isAuthenticated, currentUser });

// Check service responses
const result = await AuthService.login(credentials);
console.log('Login result:', result);
```

## Next Steps

1. **Migrate remaining components** to use the new services
2. **Add more service methods** as needed
3. **Implement error boundaries** for better error handling
4. **Add unit tests** for services
5. **Consider adding refresh token** functionality
6. **Implement offline support** with service workers

## Support

For questions or issues with the new authentication system:
1. Check the service documentation in `services/README.md`
2. Review the example components
3. Check the console for error messages
4. Verify all imports are correct
