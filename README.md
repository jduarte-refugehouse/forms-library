# Refuge House Form Directory

Professional React form components for Refuge House services management. These are draft forms for review and evaluation purposes by external reviewers.

## 🚀 Live Demo

Visit the deployed application: [https://refuge-house-forms.vercel.app](https://refuge-house-forms.vercel.app)

## 📋 Available Forms

### General
- **Quick Phone Contact Widget (Draft)** - Compact widget for rapid phone contact logging with voice notes

### Aftercare
- **Contact Log Entry Form (Draft)** - Log phone contacts and in-person visits with comprehensive tracking
- **Service Refusal Documentation (Draft)** - Multi-step form for documenting service refusals with compliance tracking
- **Aftercare Services Plan (Draft)** - Create comprehensive aftercare plans with package-specific requirements

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🏗️ Local Development

### Prerequisites

- Node.js 18.17.0 or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/refuge-house/form-directory.git
cd form-directory
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment

### Deploy to Vercel

1. **Using Vercel CLI** (Recommended):
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts to configure your deployment
\`\`\`

2. **Using GitHub Integration**:
   - Push your code to a GitHub repository
   - Connect your repository to Vercel
   - Vercel will automatically deploy on every push to main

3. **Manual Deployment**:
   - Build the project: `npm run build`
   - Upload the `.next` folder to your hosting provider

### Environment Variables

No environment variables are required for the basic deployment. All forms work with mock data for demonstration purposes.

### Custom Domain

To use a custom domain:

1. In your Vercel dashboard, go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Configure DNS settings as instructed

## 🔧 Configuration

### Vercel Configuration

The project includes a `vercel.json` file with optimized settings:

- **Framework**: Next.js
- **Node.js Runtime**: 18.x
- **Security Headers**: Enabled
- **SPA Fallback**: Configured for client-side routing

### Build Settings

- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## 📱 Features

### Form Capabilities

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Validation**: Client-side form validation
- **Draft Status**: All forms clearly marked as drafts
- **Accessibility**: WCAG compliant with screen reader support
- **Voice Notes**: Simulated voice recording functionality
- **Data Export**: Download forms in multiple formats

### Technical Features

- **TypeScript**: Full type safety
- **Server Components**: Optimized performance
- **Static Generation**: Fast loading times
- **SEO Optimized**: Meta tags and structured data
- **Progressive Enhancement**: Works without JavaScript

## 🎨 Customization

### Styling

The project uses Tailwind CSS for styling. To customize:

1. Edit `tailwind.config.ts` for theme changes
2. Modify `app/globals.css` for global styles
3. Update component styles in individual files

### Adding New Forms

1. Create a new page in `app/forms/[form-name]/page.tsx`
2. Add the form to the forms array in `app/page.tsx`
3. Update the download page with the new form

## 🔒 Security

- **Content Security Policy**: Configured headers
- **XSS Protection**: Enabled
- **Frame Options**: Deny embedding
- **HTTPS**: Enforced in production

## 📊 Analytics

To add analytics:

1. Add your analytics provider to `app/layout.tsx`
2. Configure tracking in `vercel.json` if needed
3. Set up environment variables for API keys

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version (18.17.0+)
   - Clear `.next` folder and rebuild
   - Verify all dependencies are installed

2. **Deployment Issues**:
   - Check Vercel logs in dashboard
   - Verify `vercel.json` configuration
   - Ensure all required files are committed

3. **Styling Issues**:
   - Clear browser cache
   - Check Tailwind CSS compilation
   - Verify component imports

### Getting Help

- Check the [Vercel Documentation](https://vercel.com/docs)
- Review [Next.js Documentation](https://nextjs.org/docs)
- Open an issue in the repository

## 📄 License

This project is proprietary software developed for Refuge House. All rights reserved.

## 🤝 Contributing

This is a private project for Refuge House. External contributions are not accepted at this time.

## 📞 Support

For support and questions, please contact the development team or open an issue in the repository.

---

**Note**: These forms are currently in draft status and are provided for review and evaluation purposes only.
\`\`\`
