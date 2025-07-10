# FixMyMind

A React Native mobile application for mental health support and therapy sessions, built with Expo and Firebase.

## 🧠 About

FixMyMind is a comprehensive mental health app that provides users with AI-powered therapy sessions through both voice and text interactions. The app features psychological tests, personalized therapist styles, and session management capabilities.

## ✨ Features

### 🎤 Voice Therapy Sessions
- Real-time voice recording and playback
- AI-powered voice response generation
- Session transcription and history
- Customizable therapist voice characteristics

### 💬 Text Chat Therapy
- Interactive text-based therapy sessions
- Real-time AI responses
- Chat history preservation
- Intuitive messaging interface

### 🧪 Psychological Tests
- Various psychological assessment tools
- Interactive questionnaires
- Results analysis and summaries
- Progress tracking

### 🎭 Therapist Personalization
- Customizable therapist personality (warm, calm, analytical, motivating, philosophical)
- Adjustable speaking pace and tone
- Personalized interaction style
- Custom therapist naming

### 📱 Core Features
- User authentication with Firebase
- Google OAuth integration
- Session management and history
- Cross-platform support (iOS, Android, Web)
- Responsive design with NativeWind

## 🛠 Tech Stack

### Frontend
- **React Native** (0.79.4) - Mobile framework
- **Expo** (SDK 53) - Development platform
- **React Navigation** - Navigation system
- **NativeWind** - Tailwind CSS for React Native
- **Moti** - Animation library
- **Lucide React Native** - Icons

### Backend Integration
- **Firebase** - Authentication and backend services
- **Custom API** - https://api.fixmymind.org
- **Audio Processing** - Voice recording and playback
- **File Management** - Expo FileSystem

### Development Tools
- **Expo Router** - File-based routing
- **Metro** - JavaScript bundler
- **Babel** - JavaScript compiler
- **ESLint** - Code linting

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── AppLayout.js
│   └── HeaderWithMenu.js
├── context/
│   └── AuthContext.js
├── navigation/
│   ├── BottomTabs.js
│   ├── TestStack.js
│   └── VoiceStack.js
├── screens/
│   ├── AccountSettings.js
│   ├── Chat.js
│   ├── Dashboard.js
│   ├── Login.js
│   ├── Register.js
│   ├── TestSession.js
│   ├── TestSummary.js
│   ├── Tests.js
│   ├── TherapistStyleConfig.js
│   ├── VoiceSession.js
│   ├── VoiceSessionList.js
│   └── VoiceTranscript.js
├── utils/
│   ├── auth/
│   │   ├── firebase.js
│   │   ├── firebase.native.js
│   │   ├── firebase.web.js
│   │   └── firebaseConfig.js
│   ├── api.js
│   ├── time.js
│   ├── useVoicePlayer.js
│   └── useVoiceRecorder.js
└── styles.native.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/d3vlab-org/fixmymind-app.git
cd fixmymind
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a Firebase project
   - Add your Firebase configuration to `src/utils/auth/firebaseConfig.js`
   - Enable Authentication with Google provider

4. Start the development server:
```bash
npm start
```

### Running on Different Platforms

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and configure Google Sign-In
3. Add your configuration to `src/utils/auth/firebaseConfig.js`

### API Configuration
The app connects to the backend API at `https://api.fixmymind.org`. Ensure the following endpoints are available:
- `/api/chat` - Text chat sessions
- `/api/voice-sessions` - Voice session management
- `/api/tests` - Psychological tests
- `/api/voice-sessions/{id}/messages` - Voice message handling

### Environment Variables
Create a `.env` file in the root directory with:
```
EXPO_PUBLIC_API_BASE_URL=https://api.fixmymind.org
```

## 📱 App Screens

### Authentication Flow
- **Splash Screen** - App loading and initialization
- **Welcome Screen** - App introduction
- **Login/Register** - User authentication
- **Google OAuth** - Social login integration

### Main Application
- **Dashboard** - Main hub with session options
- **Chat** - Text-based therapy sessions
- **Voice Session** - Voice therapy interface
- **Tests** - Psychological assessments
- **Settings** - Account and app configuration
- **Therapist Config** - Personalization options

## 🎯 Key Features Explained

### Voice Sessions
- Record voice messages using device microphone
- Send audio to AI for processing
- Receive AI-generated voice responses
- Maintain conversation history
- Playback previous messages

### Text Chat
- Real-time messaging with AI therapist
- Contextual responses based on conversation history
- Emoji support and rich text formatting
- Message persistence across sessions

### Psychological Tests
- Interactive questionnaires
- Multiple choice and scale-based questions
- Automated scoring and analysis
- Progress tracking over time

### Therapist Personalization
- Choose from 5 different therapy styles
- Customize voice characteristics
- Adjust interaction patterns
- Set personal preferences

## 🔐 Security & Privacy

- Firebase Authentication for secure user management
- Encrypted data transmission
- Session-based security
- Privacy-focused design
- No sensitive data stored locally

## 🚀 Deployment

### Development Tunnel
```bash
npm run tunnel
```

### Production Build
```bash
expo build:android
expo build:ios
```

### Web Deployment
```bash
expo build:web
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the 0BSD License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please contact:
- Email: support@fixmymind.org
- Issues: [GitHub Issues](https://github.com/d3vlab-org/fixmymind-app/issues)

## 🙏 Acknowledgments

- React Native community for the excellent framework
- Expo team for the development platform
- Firebase for backend services
- All contributors and testers

---

**Note**: This app is designed for therapeutic support and should not replace professional mental health treatment. Always consult with qualified healthcare providers for serious mental health concerns.

