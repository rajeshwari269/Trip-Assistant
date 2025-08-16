# 🌍 Trip Planner - Contributing Guidelines

## Overview

The AI-based Trip Planner is a modern web platform designed for travelers, similar to Airbnb but with additional features that enhance the travel experience. The platform provides a chatbot for travel recommendations, a friend-finding system for connecting with fellow travelers, and an admin dashboard for property management. The application features a beautiful glass-morphism UI design and is built with React, TypeScript, and Node.js.

## ✨ Features Table

| Feature                   | Description                                                                     |
| ------------------------- | ------------------------------------------------------------------------------- |
| 🧠 AI Chatbot             | Users can interact with a chatbot to get recommendations and travel tips.       |
| 🗺️ Destination Guide      | Provides information about the most visited places, attractions, and landmarks. |
| 🤝 Find Friends Page      | Allows travelers to connect, chat, and plan trips together.                     |
| 🏨 Stay Booking Support   | Similar to Airbnb, users can find and book accommodations.                      |
| 📍 Personalized Itinerary | AI suggests personalized travel plans based on user interests.                  |
| 🛠️ Admin Dashboard        | Admins and hosts can manage their listings, users, and activity.                |
| 🗺️ Interactive Maps       | Visualizes travel locations using Leaflet.js integration.                       |
| 🔐 User Authentication    | Secure login and registration for travelers and hosts.                          |
| 🎨 Modern UI Design       | Beautiful glass-morphism effects with responsive design.                        |
| 🌙 Dark Mode              | Toggle between light and dark themes.                                           |

## 🧰 Tech Stack

| Layer               | Technology                     |
| ------------------- | ------------------------------ |
| 💻 Frontend         | React.js, TypeScript, Vite     |
| 🖥️ Backend          | Node.js, Express               |
| 🗄️ Database         | MongoDB (Mongoose)             |
| 🔐 Authentication   | Custom Authentication System   |
| 🧠 AI Integration   | Custom Chatbot API             |
| 🗺️ Maps Integration | Leaflet.js                     |
| 🎨 Styling          | CSS, Bootstrap, Glass-morphism |
| 🎯 Build Tool       | Vite                           |

## ⚙️ Installation & Setup Guide

Follow the steps below to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/Richajaishwal0/Trip_assistant.git
cd Trip_assistant
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../server
npm install
```

### 4. Start Development Server

```bash
# Start frontend (in client directory)
cd ../client
npm run dev

# Start backend (in server directory, new terminal)
cd ../server
npm run dev
```

Visit the app at: http://localhost:5173

## 📌 Contribution Guidelines

We welcome and appreciate all contributions — big or small!

### 🚦 How to Contribute

- **You are free to work on any part of the website!** Whether it's fixing bugs, adding new features, improving UI/UX, or optimizing performance, your contributions are welcome—from small tweaks to major features.
- **Before starting work, always check existing [issues](https://github.com/Richajaishwal0/Trip_assistant/issues) and [pull requests](https://github.com/Richajaishwal0/Trip_assistant/pulls)** to make sure the same thing is not already being worked on. This helps avoid duplicate work and merge conflicts.
- **If you have an idea or want to experiment, feel free to open a new issue or PR.** Creativity and experimentation are encouraged to make this website as good as possible!

### 📋 Issue and Pull Request Guidelines

#### Creating Issues

- **Use clear, descriptive titles** for your issues
- **Provide detailed descriptions** including steps to reproduce (for bugs)
- **Include screenshots or videos** when relevant
- **Use appropriate labels** to categorize your issue

#### Creating Pull Requests

- **Always reference the issue number** in your PR title or description using `#issue-number`
- **Example PR title**: `Fix navbar mobile responsiveness #123`
- **Example PR description**:

  ```
  Closes #123

  This PR fixes the mobile navbar responsiveness issue by...
  ```

- **Include proof of your work** (screenshots, videos, or screen recordings)
- **Write clear commit messages** that describe what you changed
- **Keep PRs focused** - one feature or fix per PR

#### Standard Workflow

1. **Fork the repository** to your own GitHub account.
2. **Clone in your local environment**

```
git clone "https://github.com/your-profile-name/Trip_assistant"
```

3. **Create a new branch** for your work. **Do not work directly on the `main` branch.**
   - Use a descriptive branch name, e.g. `feature/add-chatbot`, `bugfix/fix-navbar`, etc.
   - Example:
     ```bash
     git checkout -b feature/your-feature-name
     ```
4. **Make your changes** in your branch.
5. **Commit your changes** with clear and descriptive commit messages.
6. **Push your branch** to your forked repository.
7. **Create a Pull Request (PR)** to the main repository.
   - **Include proof of your work in the PR description** (e.g., screenshots, photos, or screen recordings) to help reviewers understand and verify your changes.
   - PRs without proof may not be considered for merging.
8. **Wait for review and feedback.** Respond to any requested changes.

### 🚨 Important:

- **Never commit directly to the `main` branch.**
- **Always create a new branch for each feature or fix.**
- **Keep your branch up to date** with the latest `main` branch by pulling and merging regularly.
- **Resolve any merge conflicts** before submitting your PR.

### 📝 Example PR Description

```
Closes #123

## What does this PR do?
- Adds a new chatbot feature to the homepage.

## Changes Made
- Implemented chatbot component with React hooks
- Added responsive design for mobile devices
- Integrated with backend API for chat functionality

## Proof of Work
- ![Screenshot of chatbot](link-to-screenshot)
- [Optional: short video or photo]

## Testing
- Tested on Chrome, Firefox, and Safari
- Verified mobile responsiveness
- Confirmed API integration works correctly
```

Whether it’s a small typo fix or a new functionality, your contribution makes a difference! Please fork the repo, make your changes, and open a pull request.

Let's build something great together! 🚀

### 🎯 Code Quality Guidelines

#### General Principles

- **Write clean, readable code** with proper comments
- **Follow TypeScript best practices** and use proper typing
- **Maintain consistent code style** throughout the project
- **Write meaningful commit messages** that describe what you changed
- **Test your changes** before submitting a PR

#### React/TypeScript Guidelines

- **Use functional components** with hooks
- **Implement proper TypeScript interfaces** for props and state
- **Follow React naming conventions** (PascalCase for components, camelCase for variables)
- **Use proper error handling** and loading states
- **Optimize performance** by avoiding unnecessary re-renders

#### CSS/Styling Guidelines

- **Follow the existing glass-morphism design** theme
- **Use CSS variables** for consistent colors and spacing
- **Ensure responsive design** works on all screen sizes
- **Maintain accessibility** standards (proper contrast, keyboard navigation)
- **Use modern CSS features** like Grid, Flexbox, and CSS custom properties

#### Git Workflow Best Practices

- **Create descriptive branch names**: `feature/add-chatbot`, `bugfix/fix-navbar`, `docs/update-readme`
- **Write atomic commits**: Each commit should represent one logical change
- **Use conventional commit messages**: `feat: add chatbot feature`, `fix: resolve navbar mobile issue`
- **Keep branches up to date**: Regularly pull from the main branch
- **Squash commits** when merging to maintain a clean history

### 🤖 GitHub Actions

We use GitHub Actions to automate certain processes in our repository:

#### Issue Response

When you open an issue, a GitHub Action will automatically:

- Add a comment thanking you for your contribution
- Add a 'triage' label to the issue
- Notify our team members

#### Pull Request Response

When you submit a pull request, a GitHub Action will:

- Add a comment thanking you for your contribution
- Run validation checks on your code
- Add an 'awaiting-review' label to the PR
- Automatically request a review from the repository owner
- Update the PR with validation results

#### Review Requirements

- **All PRs require review and approval from the repository owner (@Richajaishwal0) before merging**
- The CODEOWNERS file ensures that all changes are reviewed by the appropriate person
- PRs cannot be merged until all required reviews are completed
- Please be patient when waiting for review
