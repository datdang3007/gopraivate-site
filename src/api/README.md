
# API Structure

## Folder Structure
```
src/api/
├── config/
│   └── axios.ts          # Axios configuration with interceptors
├── services/
│   ├── auth.ts           # Authentication service
│   └── message.ts        # Message service
├── hooks/
│   ├── useAuth.ts        # React Query hooks for auth
│   └── useMessage.ts     # React Query hooks for messages
├── types/
│   ├── auth.ts           # Authentication types
│   └── message.ts        # Message types
├── utils/
│   └── ip.ts             # IP utility functions
├── index.ts              # Main exports
└── README.md             # This file
```

## Usage Examples

### Authentication
```typescript
import { useLogin, useRegister } from '@/api/hooks/useAuth';

// In component
const loginMutation = useLogin();
const registerMutation = useRegister();

// Login
loginMutation.mutate({ email, password });

// Register
registerMutation.mutate({ email, password, recaptchaToken });
```

### Sending Messages
```typescript
import { useSendMessage } from '@/api/hooks/useMessage';

const sendMessageMutation = useSendMessage();
sendMessageMutation.mutate({ message, recaptchaToken });
```

## Features
- ✅ Axios configuration with interceptors
- ✅ React Query integration
- ✅ TypeScript support
- ✅ Automatic IP detection
- ✅ Error handling
- ✅ Token management
- ✅ Toast notifications
