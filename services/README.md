# Services Documentation

This directory contains all the API service classes for the Bookik Portal application. Each service is responsible for handling specific API endpoints and provides a clean, type-safe interface for making HTTP requests.

## Table of Contents

- [Services Overview](#services-overview)
- [Usage Examples](#usage-examples)
- [Service Details](#service-details)
- [Error Handling](#error-handling)
- [Authentication](#authentication)

## Services Overview

### 1. **AuthService** (`authService.ts`)
Handles user authentication, login, logout, and token management.

### 2. **ProfileService** (`profileService.ts`)
Manages user profile operations including updates, avatar uploads, and statistics.

### 3. **FollowService** (`followService.ts`)
Handles user follow/unfollow relationships and follower management.

### 4. **UserService** (`userService.ts`)
Provides user search, recommendations, and discovery functionality.

### 5. **VideoService** (`videoService.ts`)
Manages video uploads, likes, comments, and video-related operations.

### 6. **CommentService** (`commentService.ts`)
Handles comment CRUD operations and comment management.

### 7. **OfferService** (`offerService.ts`)
Manages offers, deals, and promotional content.

## Usage Examples

### Basic Import
```typescript
import { AuthService, ProfileService, FollowService } from '@/services';
```

### Authentication
```typescript
// Login
const loginResult = await AuthService.login({
  email: 'user@example.com',
  password: 'password123'
});

if (loginResult.success) {
  console.log('Logged in successfully:', loginResult.user);
}

// Check authentication status
if (AuthService.isAuthenticated()) {
  const currentUser = AuthService.getCurrentUser();
  console.log('Current user:', currentUser);
}

// Logout
AuthService.logout();
```

### Profile Management
```typescript
// Get user profile
const profile = await ProfileService.getProfile('username123');

// Update profile
const updateResult = await ProfileService.updateProfile({
  name: 'New Name',
  bio: 'Updated bio'
});

// Upload avatar
const fileInput = document.querySelector('input[type="file"]');
if (fileInput.files[0]) {
  const avatarResult = await ProfileService.uploadAvatar(fileInput.files[0]);
}
```

### Follow/Unfollow Users
```typescript
// Follow a user
const followResult = await FollowService.followUser(123);

// Unfollow a user
const unfollowResult = await FollowService.unfollowUser(123);

// Toggle follow status
const toggleResult = await FollowService.toggleFollow(123, true);

// Get followers list
const followers = await FollowService.getFollowers(123, 1, 20);

// Get followings list
const followings = await FollowService.getFollowings(123, 1, 20);
```

### Video Operations
```typescript
// Upload video
const videoData = {
  title: 'My Video',
  description: 'Video description',
  video_file: videoFile,
  category_id: 1
};
const uploadResult = await VideoService.uploadVideo(videoData);

// Get user videos
const userVideos = await VideoService.getUserVideos(123, 1, 20);

// Like/unlike video
const likeResult = await VideoService.toggleVideoLike(456);
```

### Offer Management
```typescript
// Create offer
const offerData = {
  title: 'Special Deal',
  description: 'Limited time offer',
  price: 99.99,
  discount: '20%',
  start_date: '2024-01-01',
  expiry_date: '2024-01-31',
  category_id: 1
};
const offerResult = await OfferService.createOffer(offerData);

// Get offers by category
const categoryOffers = await OfferService.getOffersByCategory(1, 1, 20);

// Get featured offers
const featuredOffers = await OfferService.getFeaturedOffers(1, 20);
```

## Service Details

### Error Handling
All services return consistent response objects with success/error information:

```typescript
interface ServiceResponse {
  success: boolean;
  data?: any;
  message?: string;
}
```

### Pagination
Most list endpoints support pagination with `page` and `limit` parameters:

```typescript
const result = await FollowService.getFollowers(userId, 1, 20);
// result.data contains:
// - followers: array of users
// - total: total count
// - current_page: current page number
// - last_page: last page number
// - per_page: items per page
```

### File Uploads
Services that handle file uploads use FormData and automatically set the correct headers:

```typescript
// Avatar upload
const avatarResult = await ProfileService.uploadAvatar(file);

// Video upload
const videoResult = await VideoService.uploadVideo(videoData);
```

## Authentication

The services automatically handle authentication using the stored JWT token. The token is:

1. **Stored** during login in localStorage and sessionStorage
2. **Automatically added** to request headers via axios interceptors
3. **Refreshed** when needed via the AuthService
4. **Cleared** on logout or when expired

### Token Management
```typescript
// Get current token
const token = AuthService.getToken();

// Refresh user data (updates stored token if needed)
const user = await AuthService.refreshUserData();
```

## Best Practices

1. **Always check success status** before using response data
2. **Handle errors gracefully** with user-friendly messages
3. **Use pagination** for large data sets
4. **Implement loading states** while API calls are in progress
5. **Cache responses** when appropriate to reduce API calls
6. **Validate data** before sending to the API

## Error Handling Examples

```typescript
try {
  const result = await ProfileService.updateProfile(profileData);
  
  if (result.success) {
    // Handle success
    console.log('Profile updated:', result.data);
  } else {
    // Handle API error
    console.error('Update failed:', result.message);
  }
} catch (error) {
  // Handle network/unexpected errors
  console.error('Unexpected error:', error);
}
```

## TypeScript Support

All services are fully typed with TypeScript interfaces. The response types are defined in the `@/interface` module and provide full IntelliSense support in your IDE.

## Contributing

When adding new services or modifying existing ones:

1. Follow the established naming conventions
2. Include comprehensive JSDoc comments
3. Add proper TypeScript interfaces
4. Implement consistent error handling
5. Add unit tests for new functionality
6. Update this README with new examples
