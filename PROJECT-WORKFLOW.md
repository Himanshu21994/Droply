# PROJECT WORKFLOW - DROPLY

## Project Overview
**Droply** is a modern file management application built with Next.js, featuring file upload, folder organization, and file management capabilities with Clerk authentication and ImageKit integration.

## Tech Stack
- **Frontend**: React, Next.js 15.5.6, TypeScript, Tailwind CSS
- **UI Components**: HeroUI (Hero.dev)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Clerk
- **File Storage**: ImageKit
- **State Management**: React Hooks
- **Build Tool**: Turbopack

## Project Structure
```
/Users/himanshukumar/DROPLY/
├── app/
│   ├── api/              # API routes
│   │   ├── files/        # File operations
│   │   ├── folders/      # Folder operations
│   │   └── imagekit-auth/# ImageKit authentication
│   ├── dashboard/        # Dashboard page
│   ├── sign-in/          # Sign-in page
│   ├── sign-up/          # Sign-up page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── providers.tsx     # App providers
│   └── error.tsx         # Error boundary
├── components/           # React components
│   ├── FileList.tsx      # File list display
│   ├── FileUploadForm.tsx # File upload form
│   ├── DashboardContent.tsx
│   ├── ui/               # UI components
│   │   ├── ModalPortal.tsx
│   │   ├── ConfirmationModal.tsx
│   │   ├── Toast.tsx
│   │   ├── Badge.tsx
│   │   └── ModalPortal.tsx
│   └── ...
├── lib/
│   ├── db/
│   │   ├── schema.ts     # Database schema
│   │   ├── index.ts      # DB connection
│   │   └── migrate.ts    # Database migrations
│   ├── utils.ts          # Utility functions
│   └── toastMessages.ts  # Toast messages
├── public/               # Static assets
├── schemas/              # Validation schemas
├── styles/               # Global styles
├── types/                # TypeScript types
├── drizzle/              # Database migrations
└── config/               # Configuration files
```

## Key Features

### 1. **File Management**
- Upload files (images up to 5MB)
- Download files
- Star/unstar files
- Move files to trash
- Permanently delete files

### 2. **Folder Organization**
- Create folders
- Navigate nested folders
- Organize files in folders
- Breadcrumb navigation

### 3. **User Authentication**
- Clerk integration
- Sign-up and Sign-in pages
- User profile management
- Secure authentication

### 4. **File Storage**
- ImageKit integration for image uploads
- Automatic image optimization
- Thumbnail generation
- CDN delivery

### 5. **UI/UX**
- Responsive design
- Dark theme
- Modal dialogs with proper stacking
- Toast notifications
- Loading states
- Empty states

## Recent Fixes & Improvements

### 1. **Modal Stacking System**
- Implemented dynamic z-index management
- Proper backdrop blur for delete confirmations
- Fixed overlapping modal issues
- High-priority modals always on top

### 2. **Folder Creation**
- Fixed authorization logic
- Removed redundant userId verification
- Proper error handling
- Detailed logging for debugging

### 3. **File Operations**
- Star/unstar files
- Move to trash
- Restore from trash
- Permanent deletion with confirmation
- Download files

## Database Schema

### Files Table
```
- id (UUID, PK)
- name (text)
- path (text)
- size (integer)
- type (text)
- fileUrl (text)
- thumbnailUrl (nullable)
- imagekitFileId (nullable)
- userId (text, FK)
- parentId (UUID, FK, nullable)
- isFolder (boolean)
- isStarred (boolean)
- isTrash (boolean)
- createdAt (timestamp)
- updatedAt (timestamp)
```

## API Endpoints

### Files
- `GET /api/files` - Get files for user
- `POST /api/files/upload` - Upload file
- `PATCH /api/files/[fileId]/star` - Star/unstar file
- `PATCH /api/files/[fileId]/trash` - Move to/restore from trash
- `DELETE /api/files/[fileId]/delete` - Permanently delete file
- `DELETE /api/files/empty-trash` - Empty trash

### Folders
- `POST /api/folders/create` - Create folder
- `GET /api/imagekit-auth` - Get ImageKit auth token

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## Environment Variables Required

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=
IMAGEKIT_PRIVATE_KEY=
DATABASE_URL=postgresql://...
```

## Common Issues & Solutions

### Issue: Folder Not Creating
- **Check**: Clerk authentication is working
- **Check**: DATABASE_URL is correct
- **Solution**: Review API logs for error details

### Issue: Modal Overlapping
- **Fixed**: Dynamic z-index stacking system
- **Status**: ✅ Resolved in recent update

### Issue: File Upload Failing
- **Check**: File size (max 5MB)
- **Check**: ImageKit credentials
- **Solution**: Check browser console for errors

## Testing
To test the application:

1. **Start dev server**: `npm run dev`
2. **Sign up/Sign in** with Clerk
3. **Upload files** - test file upload functionality
4. **Create folders** - test folder creation
5. **Manage files** - test all file operations
6. **Test modals** - test modal stacking and interactions

## Performance Considerations

1. **Image Optimization**: Using ImageKit for automatic optimization
2. **Lazy Loading**: Images load on demand
3. **Pagination**: Implement for large file lists
4. **Caching**: Use Next.js image optimization
5. **Database**: Index on userId and parentId for faster queries

## Future Enhancements

- [ ] File sharing functionality
- [ ] Collaborative folders
- [ ] Advanced search and filtering
- [ ] File versioning
- [ ] Backup and recovery
- [ ] Integration with cloud services
- [ ] Real-time updates with WebSockets
- [ ] Mobile app

## Deployment

Deployed using Vercel with:
- Next.js framework optimization
- Automatic deployments from GitHub
- Environment variables management
- PostgreSQL database (Neon)
- ImageKit CDN integration

## Contributing

When making changes:
1. Follow the existing code structure
2. Add proper error handling
3. Include console logging for debugging
4. Update tests if applicable
5. Keep components reusable

## Support & Resources

- **Clerk Docs**: https://clerk.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Drizzle ORM**: https://orm.drizzle.team
- **ImageKit**: https://imagekit.io/docs
- **HeroUI**: https://www.heroui.com
