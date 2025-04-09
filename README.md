# Body Planner

## Table of Contents

- [Project Name](#project-name)
- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Getting Started Locally](#getting-started-locally)
- [Available Scripts](#available-scripts)
- [Project Scope](#project-scope)
- [Project Status](#project-status)
- [License](#license)

## Project Name

**Body Planner**

## Project Description

Body Planner is an application designed to help users create and manage personalized training plans. Leveraging the power of artificial intelligence, the application generates tailored workout plans based on user data such as age, weight, height, body fat percentage, injuries, training goals, and experience. This solution is ideal for individuals who are new to planning workouts or wish to save time by automating the planning process.

## Tech Stack

- **Frontend:** Next.js 15.2.5, React 19, TypeScript 5, Tailwind CSS 4, Shadcn/ui
- **Backend:** Supabase for authentication and PostgreSQL database
- **AI Integration:** AI SDK by Vercel for generating personalized workout plans
- **CI/CD & Hosting:** GitHub Actions and Vercel
- **Package Manager:** pnpm
- **Node Version:** 23.11.0 (as specified in the .nvmrc file)

## Getting Started Locally

To set up the project on your local machine, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd body-planner
   ```

2. **Install dependencies using pnpm:**

   ```bash
   pnpm install
   ```

3. **Run the development server:**

   ```bash
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

> **Note:** Ensure you are using Node.js version 23.11.0 as defined in the `.nvmrc` file.

## Available Scripts

Within the project directory, you can run:

- **pnpm dev**  
  Starts the development server with turbopack.

- **pnpm build**  
  Builds the application for production.

- **pnpm start**  
  Starts the production server.

- **pnpm lint**  
  Runs the linting tool to analyze code quality.

## Project Scope

The project scope includes:

- **User Authentication:**

  - Registration, login, and password recovery mechanisms.

- **User Profile Management:**

  - Collection and editing of profile data including age, weight, height, body fat percentage, injuries, and training goals.

- **AI-Powered Training Plan Generation:**

  - Automatic generation of personalized training plans in JSON format based on user data.

- **Plan Editing and Management:**

  - Ability for users to manually edit generated plans and receive AI recommendations for alternative exercises.

- **Calendar Integration:**

  - Visualization and management of training sessions via a calendar view.

- **Notifications and Logging:**
  - Inline confirmations, toast notifications, and activity logging for user interactions.

## Project Status

This project is currently in the early stages of development (version 0.1.0). The MVP focuses on core functionalities, including user authentication, profile management, AI-based plan generation, and plan editing. Future enhancements will include additional features and optimizations based on user feedback and evolving requirements.

## License

This project is licensed under the MIT License.
