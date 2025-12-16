# Deployment Guide

This portfolio is production-ready and can be deployed on various platforms.

## 🚀 Quick Deploy Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variables in Vercel dashboard:
   - `EMAIL_USER=drumilnikhare29@gmail.com`
   - `EMAIL_PASS=your-app-password`
   - `NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app`
4. Deploy automatically

### Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables in Netlify dashboard

### Railway/Render
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variables

## 📋 Pre-Deployment Checklist

### ✅ Required Environment Variables
```env
EMAIL_USER=drumilnikhare29@gmail.com
EMAIL_PASS=your-gmail-app-password
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### ✅ Gmail Setup for Contact Form
1. Enable 2-factor authentication on Gmail
2. Generate App Password:
   - Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and generate password
3. Use the 16-character app password in `EMAIL_PASS`

### ✅ Domain Configuration
1. Update `NEXT_PUBLIC_BASE_URL` with your actual domain
2. Update `robots.txt` with your domain
3. Update sitemap URLs
4. Add Google Search Console verification code in layout.tsx

### ✅ Performance Optimizations Included
- ✅ Image optimization
- ✅ Static generation
- ✅ Compression enabled
- ✅ Security headers
- ✅ SEO metadata
- ✅ Sitemap generation
- ✅ PWA manifest

### ✅ Build Test
Run locally before deploying:
```bash
npm run build
npm start
```

## 🔧 Custom Domain Setup

1. **DNS Configuration**: Point your domain to your hosting provider
2. **SSL Certificate**: Most platforms provide automatic SSL
3. **Environment Variables**: Update `NEXT_PUBLIC_BASE_URL`

## 📊 Analytics (Optional)

Add Google Analytics by including the tracking code in `app/layout.tsx`:

```typescript
// Add to head section
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
```

## 🚨 Security Notes

- ✅ Environment variables are secure (not committed to git)
- ✅ Security headers configured
- ✅ Email credentials use app passwords
- ✅ CORS and XSS protection enabled

## 📱 Mobile Optimization

- ✅ Responsive design
- ✅ Touch-friendly interface
- ✅ PWA support
- ✅ Fast loading times

Your portfolio is now ready for production deployment! 🎉