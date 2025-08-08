# Bills Memory Keeper 🏈💙❤️

A chat application to discuss Buffalo Bills history with an AI superfan! Chat with Bills Memory Keeper, a passionate AI that knows everything about the Buffalo Bills and loves to share that knowledge with enthusiasm.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key 

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bills-memory-keeper
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the environment example file
   cp env.example .env
   
   # Edit .env and add your OpenAI API key
   # Replace 'your_openai_api_key_here' with your actual OpenAI API key - or just copy the env example file (already has the key) as it is to .env 
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **OpenAI API** - GPT-3.5-turbo for AI chat responses
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **ts-node-dev** - Development server with hot reload

### Frontend
- **React** - JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **React Scripts** - Create React App build tools
- **Axios** - HTTP client for API requests
- **CSS3** - Styling and responsive design

### Development Tools
- **ESLint** - Code linting and formatting

### Architecture
- **Port**: 3001 (Backend), 3000 (Frontend)
- **API**: `/api/chat` - OpenAI integration for Bills chat
- **Proxy**: Frontend configured to backend on port 3001
- **Hot Reload**: Automatic server restart on file changes

## 📁 Project Structure

```
bills-memory-keeper/
├── src/
│   ├── server/           # Backend API server
│   │   └── index.ts      # Express server with OpenAI integration
│   └── client/           # React frontend application
│       ├── public/       # Static assets
│       ├── src/          # React components and logic
│       └── package.json  # Frontend dependencies
├── config/               # Configuration files
│   └── tsconfig.json    # TypeScript configuration
├── package.json         # Root dependencies and scripts
├── env.example          # Environment variables template
└── README.md           # Project documentation
```

## 🏈 Bills Memory Keeper AI

The AI is programmed as a passionate Buffalo Bills superfan with:
- 🦬 Encyclopedic knowledge of Bills history
- 💙❤️ Quirky, sportsmanship-filled responses
- 🎉 Bills Mafia culture and traditions
- 🏈 Current roster and team information
- 🥶 Buffalo weather references
- 🍕 Local food mentions
- ❤️ Easter egg responses with music

### 🎵 Easter Egg Triggers
The app includes special audio responses when you mention these Bills-related phrases:
- "bills mafia"
- "go bills"
- "bills shout"
- "wide right"
- "bills by a billion"
- "lets go buffalo"
- "bills backers"
- "highmark stadium"
- "orchard park"
- "bills backers bar"

*Try saying any of these phrases to hear the Bills Shout song! 🎵* 

## 🚀 Available Scripts

- `npm run dev` - Start both frontend and backend
- `npm run dev:backend` - Start backend only
- `npm run dev:frontend` - Start frontend only
- `npm run build` - Build for production
- `npm run test` - Run frontend tests
- `npm run clean` - Clean build directories

## 🏆 Features

- Real-time chat with Bills Memory Keeper AI
- Complete Bills roster information
- Historical facts and statistics
- Bills Mafia culture integration
- Responsive design
- TypeScript for type safety

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_actual_openai_api_key_here

# Server Configuration
PORT=3001
```

### Getting an OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and paste it in your `.env` file

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the PORT in your `.env` file
   - Or kill the process using the port

2. **OpenAI API errors**
   - Verify your API key is correct
   - Check your OpenAI account has sufficient credits

3. **Build errors**
   - Run `npm run clean` to clear build cache
   - Reinstall dependencies with `npm install`

## 📸 Media Attribution

- **Background Image**: Buffalo Bills players image sourced from [NBC Sports](https://www.nbc.com)
- **Bills Shout Song**: Audio clip from [Voicemod Sound Library](https://tuna.voicemod.net/sound/08e6311b-0892-4b5b-8c3c-a9e6b73c309b) - "buffalo bills shout song" by @ShelvingFrequencyEcho28728

*Note: All media used in this project is for educational and fan appreciation purposes only.*

Let's go Buffalo! 🦬💙❤️