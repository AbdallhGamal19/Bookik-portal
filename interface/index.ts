// Simplified types using 'any' instead of interfaces
// Following project rules: NO interfaces, use 'any' types only

// User types
export type ApiUserResponse = any;
export type User = any;
export type ProfileStats = any;

// Video types
export type IVideo = any;
export type ExploreVideoData = any;

// Comment types
export type IComment = any;

// Category types
export type ICategoryItem = any;
export type ICoupon = any;

// Follower Ad types
export type FollowerAd = any;
export type IFollowerAd = any;

// UI Component types
export type ButtonProps = any;
export type CommentInputProps = any;
export type SearchViewProps = any;
export type RatingBarProps = any;
export type VideoIconsProps = any;
export type DiscoverSidbarProps = any;
export type AuthGuardProps = any;
export type VideoPlayerProps = any;
export type VideoModalProps = any;
export type AppContentWrapperProps = any;
export type FooterProps = any;
export type SidebarProps = any;
export type LoginModalProps = any;
export type UserProfilePageProps = any;
export type PageProps = any;
export type CategoryCardProps = any;
export type UniversalCardProps = any;
export type CategoryGridProps = any;
export type CategoryItem = any;
export type CommentProps = any;
export type CommentsProps = any;
export type Creator = any;
export type Message = any;
export type SliderProps = any;
export type DynamicData = any;
export type TopAdvertiserUser = any;
export type CustomAxiosInstance = any;
export type ThemeProviderProps = any;
export type ServerAuthData = any;
export type UseSliderInfiniteScrollOptions = any;
export type VideoModalClientProps = any;
export type VideoModalWrapperProps = any;
export type VideoData = any;
export type UserData = any;
export type VideoModalMode = any;
export type SocialLink = any;
export type VideoModalConfig = any;

// Service types
export type UserSearchParams = any;
export type UserSearchResponse = any;
export type UserRecommendationsResponse = any;
export type OfferCreateData = any;
export type VideoUploadData = any;
export type CommentData = any;
export type ProfileUpdateData = any;
export type LoginCredentials = any;
export type StoreProfile = any;

// Messaging types
export type MessageBubbleProps = any;
export type ChatInputProps = any;
export type ChatHeaderProps = any;
export type ChatListProps = any;
export type ChatWindowProps = any;
export type NewChatProps = any;
export type TypingIndicatorProps = any;

// Page types
export type LoginPageProps = any;
export type HomePageProps = any;
export type ErrorPageProps = any;
export type NotFoundPageProps = any;
export type LoadingPageProps = any;
export type CompanyStatisticsPageProps = any;

// FollowersAds types
export type FollowersAdsServerProps = any;
export type FollowersAdsClientProps = any;

// VideoModal types
export type VideoModalServerProps = any;

// Comments types
export type CommentsServerProps = any;
export type CommentsClientProps = any;
export type INormalizedVideoData = any;

// No interface constraints - code is simple and easily modifiable

/////////////////////////////////////////////////////
export type Store = {
  id: number;
  title: string;
  title_en: string;
  slug: string;
  address: string;
  email: string;
  phone: string;
  phone_verified: number;
  bio: string | null;
  admin_position: string | null;
  cr_name: string;
  cr_number: string;
  cr_image: string;
  image: string;
  logo_image: string;
  store_header: string | null;
  tax: number;
  tax_number: string;
  link: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  youtube: string | null;
  is_active: number;
  is_featured: number;
  created_by: number;
  user_id: number;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: number;
  title: string;
  slug: string;
  image: string;
  second_image: string;
  icon: string | null;
  bg_color: string;
  image_type: string;
  booking_enabled: number;
  featured: number;
  is_active: number;
  sort: number;
  created_at: string;
  updated_at: string;
};

// Category data from API response
export type CategoryData = {
  bg_color: string;
  id: number;
  image: string;
  image_type: string;
  second_image: string;
  title: string;
};
export type Comment = {
  id: number;
  body: string;
  commentable_id: number;
  commentable_type: string;
  created_at: string;
  is_active: number;
  reply_id: number | null;
  updated_at: string;
  user_id: number;
  users?: {
    id: number;
    name: string;
    nickname: string;
    avatar: string;
    image: string;
    brief: string;
    address: string;
    gender: string;
    website: string | null;
    active_status: number;
    confirmed: number;
    is_active: number;
    is_advertiser: number;
    is_company: number;
    is_featured_advertiser: number;
    created_at: string;
    updated_at: string;
  };
};

export type Like = {
  id: number;
  created_at: string;
  likeable_id: number;
  likeable_type: string;
  updated_at: string;
  user_id: number;
  value: number;
};
export type VideoItem = {
  store_id: number;
  views_count: number;
  id: number;
  title: string;
  detail: string;
  image: string;
  video_url?: string;
  have_video: boolean;
  discount: string;
  code: string;
  expiry: string;
  created_at: string;
  likes: Like[];
  comments: Comment[];
  user: {
    id: number;
    name: string;
    nickname: string;
    avatar: string;
    image: string;
  };
  store: {
    id: number;
    title: string;
  };
};

export type VideoModalData = any;
export type VideoModalUser = any;
