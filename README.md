# Hamro Pasal - Frontend (Next.js)

A modern, responsive eCommerce frontend built with Next.js 14, TypeScript, and Tailwind CSS. Features a complete shopping experience with product browsing, cart management, user authentication, and dynamic page rendering.

## 🚀 Features

### Core Features
- **Next.js 14** - Latest Next.js with App Router
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Responsive Design** - Mobile-first approach
- **Server Components** - Optimized performance
- **Image Optimization** - Next.js Image component

### Shopping Experience
- **Product Catalog** - Browse products with filtering and sorting
- **Product Details** - Detailed product pages with images, reviews, and ratings
- **Shopping Cart** - Add, update, remove items with real-time updates
- **Wishlist** - Save favorite products
- **Product Search** - Search products by name, category, or tags
- **Product Reviews** - Read and write product reviews with star ratings
- **Related Products** - Product recommendations
- **Recently Viewed** - Track browsing history

### User Features
- **Authentication** - User registration and login
- **User Profile** - Manage account information
- **Order History** - View past orders
- **Address Management** - Save shipping addresses
- **Wishlist Management** - Manage favorite products

### Content Features
- **Dynamic Pages** - CMS-powered custom pages
- **Page Builder** - Render pages with multiple widget types
- **Blog** - Read blog posts and articles
- **About Pages** - Company information and story
- **Contact Forms** - Customer inquiry forms
- **FAQ Pages** - Frequently asked questions

### UI Components
- **Hero Banners** - Dynamic hero sections with CTAs
- **Product Cards** - Responsive product displays
- **Category Navigation** - Mega menu with categories
- **Testimonials** - Customer testimonials slider
- **Newsletter** - Email subscription
- **Footer** - Dynamic footer with links
- **Navigation** - Responsive header with search

### Advanced Features
- **SEO Optimized** - Meta tags and structured data
- **Performance** - Code splitting and lazy loading
- **Accessibility** - WCAG compliant components
- **Toast Notifications** - User feedback system
- **Loading States** - Skeleton loaders and spinners
- **Error Handling** - Graceful error boundaries
- **Form Validation** - Client-side validation

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Backend API running (see backend README)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the frontend directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MEDIA_URL=http://localhost:8000/media/

# Site Configuration
NEXT_PUBLIC_SITE_NAME=Hamro Pasal
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at: `http://localhost:3000`

## 📚 Available Scripts

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🗂️ Project Structure

```
frontend/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── blog/                # Blog pages
│   │   ├── [slug]/
│   │   └── page.tsx
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout process
│   ├── page/                # Dynamic CMS pages
│   │   └── [slug]/
│   ├── product/             # Product pages
│   │   └── [id]/
│   ├── profile/             # User profile
│   ├── shop/                # Product catalog
│   ├── wishlist/            # User wishlist
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── AddReviewForm.tsx
│   ├── AddToCartButton.tsx
│   ├── BlogCard.tsx
│   ├── CartItem.tsx
│   ├── CategoryCard.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── HeroBanner.tsx
│   ├── MegaMenu.tsx
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── ProductTabs.tsx
│   ├── ReviewsSection.tsx
│   ├── SearchBar.tsx
│   ├── TestimonialSlider.tsx
│   └── ... (more components)
├── lib/                     # Utility functions
│   ├── api.ts              # API client
│   ├── utils.ts            # Helper functions
│   └── types.ts            # TypeScript types
├── public/                  # Static assets
│   ├── images/
│   └── icons/
├── styles/                  # Additional styles
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## 🎨 Styling

### Tailwind CSS

The project uses Tailwind CSS for styling with custom configuration:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10b981',
        secondary: '#3b82f6',
        // ... custom colors
      },
    },
  },
  plugins: [],
}
```

### Global Styles

Global styles are defined in `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
@layer components {
  .btn-primary {
    @apply bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark;
  }
}
```

## 🔌 API Integration

### API Client

The project uses Axios for API calls with a centralized client:

```typescript
// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const productsAPI = {
  getAll: () => api.get('/api/products/'),
  getById: (id: string) => api.get(`/api/products/${id}/`),
  search: (query: string) => api.get(`/api/products/search/?q=${query}`),
};

export const cartAPI = {
  getCart: () => api.get('/api/cart/'),
  addItem: (data: any) => api.post('/api/cart/add/', data),
  updateItem: (id: string, data: any) => api.put(`/api/cart/update/${id}/`, data),
  removeItem: (id: string) => api.delete(`/api/cart/remove/${id}/`),
};
```

### Data Fetching

Using Next.js 14 Server Components:

```typescript
// app/product/[id]/page.tsx
async function getProduct(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}/`, {
    cache: 'no-store', // or 'force-cache' for static
  });
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  return <ProductDetails product={product} />;
}
```

## 📱 Responsive Design

### Breakpoints

```
sm: 640px   - Small devices (phones)
md: 768px   - Medium devices (tablets)
lg: 1024px  - Large devices (desktops)
xl: 1280px  - Extra large devices
2xl: 1536px - 2X large devices
```

### Mobile-First Approach

```tsx
<div className="
  w-full           // Mobile: full width
  md:w-1/2         // Tablet: half width
  lg:w-1/3         // Desktop: third width
  xl:w-1/4         // Large: quarter width
">
  Content
</div>
```

## 🧩 Key Components

### Product Card

```tsx
<ProductCard
  product={product}
  showQuickView={true}
  showWishlist={true}
/>
```

### Add to Cart Button

```tsx
<AddToCartButton
  productId={product.id}
  productName={product.name}
  price={product.price}
  stock={product.stock}
/>
```

### Reviews Section

```tsx
<ReviewsSection
  productId={product.id}
  productSlug={product.slug}
  reviews={reviews}
  averageRating={product.average_rating}
  reviewCount={product.review_count}
/>
```

### Hero Banner

```tsx
<HeroBanner
  title="Welcome to Our Store"
  description="Shop the best products"
  backgroundImage="/images/hero.jpg"
  buttonText="Shop Now"
  buttonLink="/shop"
/>
```

## 🔐 Authentication

### Login Flow

```typescript
// Login component
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await authAPI.login({ email, password });
    localStorage.setItem('token', response.data.token);
    router.push('/profile');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### Protected Routes

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  
  if (!token && request.nextUrl.pathname.startsWith('/profile')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

## 🎯 SEO Optimization

### Metadata

```typescript
// app/product/[id]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id);
  
  return {
    title: product.name,
    description: product.short_description,
    openGraph: {
      title: product.name,
      description: product.short_description,
      images: [product.image],
    },
  };
}
```

### Structured Data

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: product.image,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'USD',
      },
    }),
  }}
/>
```

## 🚀 Performance Optimization

### Image Optimization

```tsx
import Image from 'next/image';

<Image
  src={product.image}
  alt={product.name}
  width={400}
  height={400}
  priority={false}
  loading="lazy"
/>
```

### Code Splitting

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
```

### Caching Strategy

```typescript
// Static Generation (SSG)
export const revalidate = 3600; // Revalidate every hour

// Server-Side Rendering (SSR)
export const dynamic = 'force-dynamic';

// Incremental Static Regeneration (ISR)
export const revalidate = 60; // Revalidate every minute
```

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
npm run test:e2e
```

### Type Checking

```bash
npm run type-check
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Other Platforms

- **Netlify**: Connect GitHub repo and deploy
- **AWS Amplify**: Use AWS console or CLI
- **DigitalOcean**: Use App Platform
- **Railway**: Direct deployment from Git

### Environment Variables

Set these in your deployment platform:

```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_MEDIA_URL=https://api.yourdomain.com/media/
NEXT_PUBLIC_SITE_NAME=Hamro Pasal
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 📦 Dependencies

### Main Dependencies

```json
{
  "next": "14.0.4",
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "typescript": "5.3.3",
  "tailwindcss": "3.4.0",
  "axios": "1.6.2",
  "react-icons": "4.12.0",
  "swiper": "11.0.5"
}
```

### Development Dependencies

```json
{
  "@types/node": "20.10.5",
  "@types/react": "18.2.45",
  "eslint": "8.56.0",
  "eslint-config-next": "14.0.4",
  "autoprefixer": "10.4.16",
  "postcss": "8.4.32"
}
```

## 🔧 Configuration

### Next.js Config

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['localhost', 'api.yourdomain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
};
```

### TypeScript Config

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

### Code Style

- Use TypeScript for all new files
- Follow ESLint rules
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add comments for complex logic

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:

1. Check the backend API is running
2. Verify environment variables are set
3. Check browser console for errors
4. Review Next.js documentation
5. Check API documentation at `/api/docs/`

## 🔄 Updates

### Recent Updates

- ✅ Fixed review submission functionality
- ✅ Updated review display with user icons
- ✅ Fixed product tabs dynamic content
- ✅ Enhanced cart notification system
- ✅ Improved error handling
- ✅ Updated API integration
- ✅ Enhanced responsive design

## 📞 Contact

For more information or support, please contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: March 2026  
**Next.js Version**: 14.0.4  
**Node Version**: 18.x+
# NepsFood-Frontend
