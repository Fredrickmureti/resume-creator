# 🚀 AI-Powered Resume & Career Platform

<div align="center">

![Resume Creator](https://img.shields.io/badge/AI-Powered-blueviolet?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase)

**Your Complete AI Career Toolkit - Create, Optimize, and Manage Professional Career Documents**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Core Functionality](#-core-functionality)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

This is a comprehensive, AI-powered platform designed to revolutionize how professionals create and manage their career documents. Built with modern web technologies and powered by advanced AI, it offers a complete suite of tools for resume building, cover letter generation, LinkedIn optimization, and job application tracking.

### Why This Platform?

- **🤖 AI-Powered Intelligence** - Leverages cutting-edge AI to generate professional content tailored to your experience
- **⚡ Lightning Fast** - Create professional documents in minutes, not hours
- **🎨 Beautiful Templates** - 20+ professionally designed templates for every industry
- **🔒 Secure & Private** - Your data is encrypted and secure with industry-standard authentication
- **📱 Fully Responsive** - Works seamlessly across all devices
- **🎯 ATS-Optimized** - All documents are formatted to pass Applicant Tracking Systems

---

## ✨ Features

### 1. **AI Resume Builder** 🧠

Transform your professional experience into stunning, ATS-friendly resumes with our intelligent AI interview system.

- **Interactive AI Interview**: Conversational AI guides you through your experience
- **20+ Professional Templates**: From classic to modern, including CV templates with photo support
- **Real-Time Preview**: See changes instantly as you edit
- **Smart Content Optimization**: AI suggests improvements for maximum impact
- **Multiple Export Formats**: Download as PDF with perfect formatting
- **80% Completion Validation**: Ensures quality before saving to database

**Templates Available:**
- Modern, Classic, Professional, Minimalist
- Bold, Creative, Technical, Executive
- Compact, Simple, Academic, Corporate
- Infographic + 10 CV Photo Templates

### 2. **Cover Letter Generator** ✍️

Create compelling, personalized cover letters that perfectly match any job description.

- **Job Description Analysis**: AI analyzes posting to extract key requirements
- **Tailored Content**: Automatically highlights your most relevant qualifications
- **Professional Tone**: Maintains appropriate formality and industry standards
- **Instant Generation**: Generate complete letters in seconds
- **Editable Output**: Fine-tune generated content to perfection

### 3. **Job Application Generator** 🎯

Craft complete job applications that emphasize your best qualifications for each position.

- **Multiple Resume Sources**: Use database resumes or upload existing ones
- **Comprehensive Applications**: Includes salary expectations and availability
- **Smart Formatting**: Professional structure automatically applied
- **Save & Track**: All applications saved to your job tracker
- **Reusable Content**: Edit and reuse successful applications

### 4. **LinkedIn Optimizer** 💼

Transform your LinkedIn profile into a recruiter magnet with AI-powered optimization.

- **SEO-Optimized Headlines**: Craft attention-grabbing professional headlines
- **Compelling About Sections**: AI-generated summaries that tell your story
- **Experience Descriptions**: Reframe your work for maximum LinkedIn impact
- **Skill Recommendations**: Discover skills to add based on your experience
- **Industry-Specific**: Tailored to your specific field and career level

### 5. **Job Application Tracker** 📊

Keep all your job applications organized with a powerful tracking system.

- **Centralized Dashboard**: All applications in one place
- **Status Management**: Track Applied, Interview, Offer, or Rejected
- **Search & Filter**: Quickly find specific applications
- **Statistics Overview**: Total applications, weekly activity, companies applied
- **Notes & Updates**: Add personal notes and update details
- **Full History**: Complete record of all application details

### 6. **Resume Optimizer** 🔍

Get AI-powered suggestions to improve your resume's impact and ATS compatibility.

- **Detailed Scoring**: Comprehensive analysis of your resume
- **Actionable Recommendations**: Specific suggestions for improvement
- **ATS Compatibility Check**: Ensure your resume passes screening systems
- **Before/After Comparison**: Track improvements over time

### 7. **Public Resume Profile** 🌐

Share your professional resume as a beautiful public profile page.

- **Custom Username URLs**: Create personalized links (e.g., yoursite.com/username)
- **Privacy Controls**: Toggle public/private anytime
- **Always Current**: Automatically displays your latest resume
- **Beautiful Presentation**: Responsive design looks great on any device
- **Template Support**: Your chosen template displays perfectly
- **Professional Branding**: Perfect for email signatures and social media

### 8. **Additional Features**

- **Auto-Save**: Never lose your work with real-time saving
- **Photo Upload**: Add professional photos to CV templates
- **Custom Sections**: Add unique sections tailored to your field
- **Multiple Languages**: Support for multilingual resumes
- **Certifications & Projects**: Dedicated sections for achievements
- **Dark Mode Ready**: Eye-friendly interface (coming soon)

---

## 🛠 Tech Stack

### Frontend
- **React 18.3** - Modern UI framework with hooks
- **TypeScript 5.0** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling with custom design system
- **React Router 7.9** - Client-side routing
- **Lucide React** - Beautiful icon library

### Backend & Database
- **Supabase** - Backend-as-a-Service platform
  - PostgreSQL database with RLS (Row Level Security)
  - Authentication (Email, Google, etc.)
  - Real-time subscriptions
  - Storage for images and files
  - Edge Functions for serverless logic

### AI Integration
- **OpenRouter API** - AI model access for content generation
- **Edge Functions** - Serverless AI processing
  - Resume generation
  - Cover letter creation
  - Job application generation
  - LinkedIn optimization
  - Resume parsing from uploads

### State Management & Data
- **Local Storage** - Session persistence
- **Supabase Client** - Real-time data sync
- **React Hooks** - Component state management

### File Handling
- **PDF Export** - HTML to PDF conversion
- **Image Upload** - Profile and resume photos
- **Resume Parsing** - Extract data from uploaded resumes

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier available)
- OpenRouter API key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resume-creator.git
   cd resume-creator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   VITE_SUPABASE_PROJECT_ID=your_project_id
   ```

4. **Set up Supabase**

   - Create a new Supabase project
   - Run the migrations in `supabase/migrations/`
   - Set up the following secrets in Supabase Edge Functions:
     - `OPENROUTER_API_KEY`
     - `SUPABASE_URL`
     - `SUPABASE_SERVICE_ROLE_KEY`

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:5173
   ```

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

---

## 📁 Project Structure

```
resume-creator/
├── src/
│   ├── assets/              # Images and static files
│   ├── components/          # React components
│   │   ├── templates/       # Resume templates
│   │   ├── Navigation.tsx
│   │   ├── Dashboard.tsx
│   │   ├── ResumeEditor.tsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── AuthPage.tsx
│   │   ├── CoverLetterGenerator.tsx
│   │   ├── JobApplicationGenerator.tsx
│   │   ├── LinkedInOptimizer.tsx
│   │   ├── JobTracker.tsx
│   │   ├── ResumeOptimizer.tsx
│   │   ├── PublicProfile.tsx
│   │   ├── FeaturesPage.tsx
│   │   └── ...
│   ├── integrations/       # External service integrations
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── types.ts
│   ├── hooks/              # Custom React hooks
│   │   └── use-toast.ts
│   ├── types/              # TypeScript type definitions
│   │   ├── resume.ts
│   │   └── profile.ts
│   ├── utils/              # Utility functions
│   │   ├── pdfExport.ts
│   │   └── resumeCompletion.ts
│   ├── App.tsx             # Main app component
│   ├── index.css           # Global styles & design system
│   └── main.tsx            # App entry point
├── supabase/
│   ├── functions/          # Edge Functions
│   │   ├── generate-resume/
│   │   ├── generate-cover-letter/
│   │   ├── generate-job-application/
│   │   ├── optimize-linkedin/
│   │   ├── optimize-resume/
│   │   └── parse-resume-upload/
│   └── migrations/         # Database migrations
├── public/                 # Public static files
├── tailwind.config.js      # Tailwind configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Dependencies
```

---

## 🔧 Core Functionality

### Resume Completion Validation

To ensure data quality, resumes must be **80% complete** before being saved to the database:

**Scoring System (100 points total):**
- **Personal Info (30 pts)**: Name, email, phone, location, summary
- **Experience (25 pts)**: At least one complete work experience
- **Education (20 pts)**: At least one complete education entry
- **Skills (15 pts)**: At least one skill category with 3+ items
- **Additional (10 pts)**: Projects, certifications, languages, custom sections

**Implementation:**
- Real-time completion percentage display
- Visual progress indicator
- Guidance on missing sections
- Session storage for draft recovery
- Database save only when ≥80% complete

### AI-Powered Generation

All AI features use edge functions for secure API key management:

1. **Resume Generation**: Interactive interview → structured resume data
2. **Cover Letter**: Job description analysis → tailored letter
3. **Job Application**: Resume + job details → complete application
4. **LinkedIn**: Resume data → optimized profile sections
5. **Resume Parsing**: Uploaded file → extracted structured data

### Template System

Dynamic template rendering with support for:
- Multiple layout styles (1-column, 2-column, infographic)
- Photo variants for CV templates
- Custom section rendering
- Dark/light theme support
- Print-optimized PDF export

### Security & Authentication

- **Row Level Security (RLS)**: All database tables protected
- **User-specific data**: Users can only access their own records
- **Secure file storage**: Profile images in public buckets, resumes in private
- **Role-based access**: Admin dashboard for user management
- **API key protection**: Edge functions handle sensitive credentials

---

## 🔒 Security

This application implements multiple layers of security:

### Database Security
- **RLS Policies**: Every table has Row Level Security enabled
- **User Isolation**: Users can only read/write their own data
- **Foreign Key Constraints**: Data integrity maintained
- **Secure Functions**: Database functions use `SECURITY DEFINER`

### Authentication
- **Supabase Auth**: Industry-standard authentication
- **Session Management**: Secure token handling
- **Password Policies**: Enforced strong passwords
- **OAuth Support**: Google sign-in available

### Data Privacy
- **Encrypted Storage**: All data encrypted at rest
- **HTTPS Only**: Secure transport layer
- **No Third-Party Sharing**: Your data stays private
- **Public Profile Control**: Users control visibility

### Best Practices
- Input validation on client and server
- SQL injection prevention via parameterized queries
- XSS protection with React's built-in escaping
- CSRF protection via Supabase tokens

---

## 🎨 Design System

The application uses a comprehensive design system defined in `src/index.css` and `tailwind.config.js`:

### Color Palette (HSL-based)
- **Primary**: Main brand color with variants
- **Secondary**: Accent colors
- **Semantic Colors**: Success, warning, error, info
- **Neutrals**: Slate-based grays for UI

### Typography
- **System Fonts**: Native font stacks for performance
- **Hierarchy**: Defined heading and body styles
- **Responsive**: Scales appropriately across devices

### Components
- **Shadcn UI**: Base component library
- **Custom Variants**: Extended with app-specific variants
- **Consistent Spacing**: Tailwind's spacing scale
- **Dark Mode Ready**: Prepared for dark theme

---

## 📊 Database Schema

### Core Tables

**profiles**
- User profile information
- Username for public URLs
- Profile image
- Privacy settings

**resumes**
- Resume data (JSONB for flexibility)
- Template selection
- Personal info, experience, education, skills
- Custom sections support
- Photo URL for CV templates

**cover_letters**
- Generated cover letters
- Job details
- Associated resume reference

**job_applications**
- Application tracking
- Status management (applied, interview, offer, rejected)
- Notes and metadata
- Salary and availability info

**linkedin_optimizations**
- Optimized profile content
- Headlines, about sections
- Experience descriptions
- Skill suggestions

**resume_optimizations**
- Optimization history
- Before/after scores
- Improvement suggestions

**user_roles**
- Role-based permissions
- Admin access control

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit with clear messages (`git commit -m 'Add amazing feature'`)
5. Push to your branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Code Standards
- Use TypeScript for type safety
- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly

### Areas for Contribution
- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- 🌍 Internationalization
- ♿ Accessibility improvements

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Supabase** - Amazing backend platform
- **OpenRouter** - AI model access
- **Shadcn UI** - Beautiful component library
- **Lucide** - Gorgeous icons
- **Tailwind CSS** - Utility-first styling

---

## 📞 Support

For support, please open an issue on GitHub or contact the maintainers.

---

## 🗺 Roadmap

### Coming Soon
- [ ] Dark mode support
- [ ] More resume templates
- [ ] Resume analytics (views, downloads)
- [ ] Team collaboration features
- [ ] Mobile app (React Native)
- [ ] Advanced AI suggestions
- [ ] Integration with job boards
- [ ] Calendar integration for interviews
- [ ] Email notifications
- [ ] Resume versioning

---

<div align="center">

**Built with ❤️ using React, TypeScript, and AI**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/yourusername/resume-creator/issues) • [Request Feature](https://github.com/yourusername/resume-creator/issues)

</div>
