# ExploreHub - Influencer Marketing Platform

## Overview

ExploreHub is a comprehensive platform connecting brands with influencers. It provides tools for both influencers to showcase their work and brands to find the perfect partnerships.

## Features

### For Influencers
- **Media Kit Creation**: Build professional media kits to showcase your work
- **Analytics Dashboard**: Track your performance and engagement metrics
- **Social Media Integration**: Connect and manage multiple social media accounts
- **Appearance Customization**: Personalize your profile's look and feel
- **Messaging System**: Communicate directly with brands

### For Brands
- **Influencer Discovery**: Find the perfect influencers for your campaigns
- **Advanced Filtering**: Filter by demographics, niche, and engagement rates
- **Campaign Management**: Track and manage your influencer campaigns
- **Analytics**: Measure campaign performance and ROI
- **Direct Communication**: Message influencers through the platform

## Technical Stack

This project is built with modern technologies:

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Build Tool**: Vite
- **State Management**: React Query
- **Backend**: Supabase
- **Authentication**: Supabase Auth

## Getting Started

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── brand/         # Brand-specific components
│   ├── dashboard/     # Dashboard components
│   ├── landing/       # Landing page components
│   ├── theme/         # Theme-related components
│   └── ui/            # Base UI components
├── hooks/             # Custom React hooks
├── integrations/      # Third-party integrations
├── lib/              # Utility functions
└── pages/            # Main page components
```

## Component Documentation

### Dashboard Components

- **Messages**: Real-time messaging system between brands and influencers
- **Analytics**: Performance tracking and data visualization
- **MediaKit**: Media kit creation and management
- **Appearance**: Theme and styling customization
- **Settings**: User preferences and account management

### Brand Components

- **BrandOverview**: Main dashboard for brands
- **BrandMessages**: Communication center
- **InfluencerCard**: Displays influencer information

### Landing Components

- **Hero**: Main landing page section
- **Benefits**: Platform benefits showcase
- **Services**: Available services
- **Pricing**: Subscription plans

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please visit our [documentation](https://docs.lovable.dev/) or join our [Discord community](https://discord.gg/lovable).