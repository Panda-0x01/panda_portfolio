# Email Setup Guide

To enable the contact form functionality, you need to configure email settings.

## Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. **Update Environment Variables**:
   - Open `.env.local` file
   - Replace `your-email@gmail.com` with your Gmail address
   - Replace `your-app-password` with the generated app password

## Environment Variables

```env
EMAIL_USER=drumilnikhare29@gmail.com
EMAIL_PASS=your-16-character-app-password
```

## Alternative Email Services

You can also use other email services by modifying the transporter configuration in `app/api/contact/route.ts`:

### Outlook/Hotmail
```javascript
service: 'hotmail'
```

### Custom SMTP
```javascript
host: 'your-smtp-server.com',
port: 587,
secure: false,
```

## Testing

1. Start the development server: `npm run dev`
2. Navigate to the contact page
3. Fill out and submit the form
4. Check your email for the message

## Security Notes

- Never commit your `.env.local` file to version control
- Use app passwords, not your regular email password
- The `.env.local` file is already included in `.gitignore`