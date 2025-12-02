# Messaging System Components

This directory contains all the components needed for a modern messaging/chat system that integrates seamlessly with the Bookik portal design.

## Components Overview

### Core Components

- **ChatList** - Displays a list of all available chats with search functionality
- **ChatWindow** - Main chat interface showing messages and input
- **ChatHeader** - Header showing chat participant info and status
- **MessageBubble** - Individual message display with timestamps and read status
- **ChatInput** - Message input area with emoji, attachment, and voice options
- **NewChat** - Modal for starting new conversations
- **TypingIndicator** - Shows when someone is typing

### Features

- **Responsive Design** - Works on both desktop and mobile
- **Real-time Updates** - Simulated typing indicators and message replies
- **Search Functionality** - Search through chats and users
- **Modern UI** - Uses the app's color scheme and design patterns
- **Arabic RTL Support** - Properly configured for Arabic text
- **Status Indicators** - Online/offline status with colored dots
- **Unread Count** - Shows unread message counts
- **Message Timestamps** - Relative time display (e.g., "منذ 5 دقائق")

## Usage

### Basic Implementation

```tsx
import { ChatList, ChatWindow, NewChat } from "@/components/messaging";

function MessagingPage() {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex h-full">
      <ChatList onChatSelect={setSelectedChat} />
      {selectedChat && (
        <ChatWindow
          chat={selectedChat}
          onBack={() => setSelectedChat(null)}
          isMobile={false}
        />
      )}
    </div>
  );
}
```

### Starting New Chats

```tsx
const [showNewChat, setShowNewChat] = useState(false);

<NewChat
  onClose={() => setShowNewChat(false)}
  onStartChat={(userId) => {
    // Handle starting new chat
    console.log("New chat with:", userId);
  }}
/>;
```

## Color Scheme

The messaging system uses the app's global color variables:

- **Primary**: `bg-primary` (#A73A93) - Used for buttons and current user messages
- **Backgrounds**: `bg-global-background5`, `bg-global-background8` - Main chat areas
- **Text**: `text-global-text11`, `text-global-text8` - Message text and timestamps
- **Borders**: `border-global-background7` - Subtle separators

## Responsive Behavior

- **Desktop**: Side-by-side chat list and chat window
- **Mobile**: Full-width chat list, then full-width chat window with back button
- **Breakpoint**: 768px (md: in Tailwind)

## Data Structure

The system expects data in this format:

```typescript
interface IChatUser {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  status?: "online" | "offline" | "away";
}

interface IChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  messageType: "text" | "image" | "video" | "file";
}
```

## Future Enhancements

- **Real-time Messaging** - WebSocket integration
- **File Uploads** - Image, video, and document sharing
- **Group Chats** - Multi-participant conversations
- **Push Notifications** - Message alerts
- **Message Reactions** - Like, heart, etc.
- **Voice Messages** - Audio recording and playback
- **Video Calls** - Integrated calling functionality
