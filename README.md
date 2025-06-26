# Create Sui App 🌊

A beautiful CLI tool to scaffold Sui dApps with React or Next.js, featuring TypeScript and JavaScript support.

## ✨ Features

- 🎨 **Beautiful CLI** with Sui-themed colors and animations
- 🚀 **Multiple Templates**: Next.js and React with TypeScript/JavaScript
- 💼 **Wallet Integration** pre-configured with @mysten/dapp-kit
- 🔗 **Smart Contract Integration** template included
- 📱 **Responsive Design** with Tailwind CSS
- ⚡ **Modern Tooling** (Vite, Next.js 15, React 18)


## 🚀 Quick Start

```bash
# Using npx (recommended)
npx sui-dapp-cli@latest

# Or global install
npm install -g sui-dapp-cli
sui-dapp-cli

# Alternative (if you set multiple bin names)
npx sui-dapp

## 📦 Available Templates

### Next.js Templates
- **Next.js + TypeScript**: Full-stack with App Router and type safety
- **Next.js + JavaScript**: Full-stack with App Router, no TypeScript

### React Templates  
- **React + TypeScript**: Client-side with Vite and type safety
- **React + JavaScript**: Client-side with Vite, no TypeScript

## 🎯 What You Get

Each template includes:

- ✅ **Sui Wallet Integration** with connection/disconnection
- ✅ **Smart Contract Integration** template with examples
- ✅ **Modern UI Components** with Tailwind CSS
- ✅ **Responsive Design** that works on all devices
- ✅ **Developer Experience** with hot reload and fast builds
- ✅ **Best Practices** for Sui dApp development

## 🔧 Smart Contract Setup

After creating your project:

1. **Deploy your Move contract** to Sui network
2. **Update config**: Edit `lib/smart-contract/config.json` with your addresses
3. **Customize functions**: Modify transaction builders and queries
4. **Test integration**: Connect wallet and test your contract

## 📁 Project Structure

```bash
my-sui-app/
├── src/                    # Source code
│   ├── components/         # React components
│   ├── lib/smart-contract/ # Smart contract integration
│   ├── pages/             # Page components
│   └── providers/         # React providers
├── public/                # Static assets
├── package.json           # Dependencies
└── README.md             # Project documentation
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎨 CLI Preview

```bash
    ███████╗██╗   ██╗██╗    ██████╗ ███████╗██╗   ██╗
    ██╔════╝██║   ██║██║    ██╔══██╗██╔════╝██║   ██║
    ███████╗██║   ██║██║    ██║  ██║█████╗  ██║   ██║
    ╚════██║██║   ██║██║    ██║  ██║██╔══╝  ╚██╗ ██╔╝
    ███████║╚██████╔╝██║    ██████╔╝███████╗ ╚████╔╝ 
    ╚══════╝ ╚═════╝ ╚═╝    ╚═════╝ ╚══════╝  ╚═══╝  

                █████╗ ██████╗ ██████╗                
               ██╔══██╗██╔══██╗██╔══██╗               
               ███████║██████╔╝██████╔╝               
               ██╔══██║██╔═══╝ ██╔═══╝                
               ██║  ██║██║     ██║                    
               ╚═╝  ╚═╝╚═╝     ╚═╝                    

                    ⚡ Build dApps on Sui with ease ⚡
                    Made by DevDanny ❤️

◇  What is your project name?
│  my-awesome-sui-app
│
◆  Select a framework:
│  ● 🚀 Next.js
│  ○ ⚛️  React
└

◆  Select a language:
│  ● 🔷 TypeScript
│  ○ 🟨 JavaScript
└
```

## 🌈 Features

- **Sui-themed colors** with beautiful gradients
- **Interactive prompts** with validation
- **Animated spinners** during project creation
- **Success celebration** with next steps
- **Error handling** with helpful messages

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Sui Website](https://sui.io/)
- [Sui Discord](https://discord.com/invite/Sui)
- [Sui Documentation](https://docs.sui.io/)
- [DevDanny GitHub](https://github.com/Verifieddanny)

---

**Built with ❤️ for the Sui ecosystem**
