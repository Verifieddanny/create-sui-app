#!/usr/bin/env node

import {
  outro,
  text,
  select,
  confirm,
  spinner,
  note,
  cancel,
} from "@clack/prompts";
import chalk from "chalk";
import gradient from "gradient-string";
import figlet from "figlet";
import fs from "fs-extra";
import path from "path";


// Sui brand colors
const suiGradient = gradient(["#4DA6FF", "#00D4AA", "#36D7B7"]);
const suiBlue = chalk.hex("#4DA6FF");
const suiTeal = chalk.hex("#00D4AA");
const suiGreen = chalk.hex("#36D7B7");

// Template repositories
const templates = {
  "next-ts": {
    name: "Next.js + TypeScript",
    description: "Full-stack Next.js with TypeScript and App Router",
    githubRepo: "Verifieddanny/next-sui-typescript",
    branch: "main",
    icon: "🚀",
  },
  "next-js": {
    name: "Next.js + JavaScript",
    description: "Full-stack Next.js with JavaScript and App Router",
    githubRepo: "Verifieddanny/next-sui-javascript",
    branch: "main",
    icon: "🚀",
  },
  "react-ts": {
    name: "React + TypeScript",
    description: "React with TypeScript and Vite",
    githubRepo: "Verifieddanny/react-sui-typescript",
    branch: "main",
    icon: "⚛️",
  },
  "react-js": {
    name: "React + JavaScript",
    description: "React with JavaScript and Vite",
    githubRepo: "Verifieddanny/react-sui-javascript",
    branch: "main",
    icon: "⚛️",
  },
};

async function showWelcome() {
  console.clear();

  // Animated wave effect
  const waves = ["🌊", "〜", "～", "〜", "🌊"];
  for (let i = 0; i < 3; i++) {
    process.stdout.write(
      "\r" +
        " ".repeat(20) +
        waves
          .map((w, idx) => (idx === i % waves.length ? suiBlue(w) : suiTeal(w)))
          .join(" ")
    );
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  console.log();

  // Show title with gradient
  const title = figlet.textSync("SUI DEV APP", {
    font: "ANSI Shadow",
    horizontalLayout: "fitted",
  });
  console.log(suiGradient(title));

  // Show subtitle with wave animation
  console.log(
    chalk.dim("                    ") +
      suiTeal("⚡ Build dApps on Sui with ease ⚡")
  );
  console.log();
  console.log(
    chalk.dim("                    ") +
      chalk.gray("Made by ") +
      suiBlue("DevDanny") +
      chalk.red(" ❤️")
  );
  console.log();

  // Show Sui icon with description
  console.log(
    chalk.dim("                    ") +
      suiGreen("🌊 Sui means 'water' - fluid, fast, secure 🌊")
  );
  console.log();
}

async function downloadTemplate(templateKey, projectPath) {
  const template = templates[templateKey];
  const repoUrl = `https://github.com/${template.githubRepo}.git`;

  const s = spinner();
  s.start(suiBlue(`Downloading ${template.icon} ${template.name} template...`));

  try {
    const { execa } = await import("execa");

    // Clone quietly - stdio: 'ignore' completely suppresses output
    await execa(
      "git",
      [
        "clone",
        "--quiet",
        "--depth",
        "1",
        "--branch",
        template.branch,
        repoUrl,
        projectPath,
      ],
      { stdio: "pipe" }
    ); // Changed from 'inherit' to 'pipe'

    // Remove .git folder
    await fs.remove(path.join(projectPath, ".git"));

    s.stop(suiGreen(`✓ ${template.icon} Template downloaded successfully!`));
  } catch (error) {
    s.stop(chalk.red("✗ Failed to download template"));
    console.error(chalk.yellow("⚠️  Error:"), error.message);
    throw error;
  }
}

async function createProject(projectDetails) {
  const { projectName, templateKey } = projectDetails;
  const template = templates[templateKey];

  try {
    // Create project directory
    const projectPath = path.join(process.cwd(), projectName);

    if (await fs.pathExists(projectPath)) {
      cancel(chalk.red(`Directory "${projectName}" already exists!`));
      process.exit(1);
    }

    await fs.ensureDir(projectPath);

    // Download template from GitHub
    await downloadTemplate(templateKey, projectPath);

    return projectPath;
  } catch (error) {
    console.error(chalk.red("Error:"), error.message);
    process.exit(1);
  }
}

async function getProjectDetails() {
  const projectName = await text({
    message: suiBlue("🌊 What is your project name?"),
    placeholder: "my-sui-app",
    validate(value) {
      if (value.length === 0) return "Project name is required!";
      if (!/^[a-zA-Z0-9-_]+$/.test(value))
        return "Project name can only contain letters, numbers, hyphens, and underscores";
      return;
    },
  });

  if (typeof projectName === "symbol") {
    cancel(chalk.red("Operation cancelled"));
    process.exit(0);
  }

  const framework = await select({
    message: suiTeal("🚀 Select a framework:"),
    options: [
      {
        value: "next",
        label: `${templates["next-ts"].icon} Next.js`,
        hint: "Full-stack React framework with SSR",
      },
      {
        value: "react",
        label: `${templates["react-ts"].icon} React`,
        hint: "Client-side React with Vite",
      },
    ],
  });

  if (typeof framework === "symbol") {
    cancel(chalk.red("Operation cancelled"));
    process.exit(0);
  }

  const language = await select({
    message: suiGreen("💎 Select a language:"),
    options: [
      {
        value: "typescript",
        label: "🔷 TypeScript",
        hint: "Type-safe development experience",
      },
      {
        value: "javascript",
        label: "🟨 JavaScript",
        hint: "Simple and flexible development",
      },
    ],
  });

  if (typeof language === "symbol") {
    cancel(chalk.red("Operation cancelled"));
    process.exit(0);
  }

  return {
    projectName,
    framework,
    language,
    templateKey: `${framework}-${language === "typescript" ? "ts" : "js"}`,
  };
}

function showSuccessMessage(projectName, templateKey, options = {}) {
  const { skipInstallStep = false } = options;
  console.log();

  console.log(suiGradient("✨ SUI PROJECT CREATED SUCCESSFULLY! ✨"));

  // Project info with icons
  const template = templates[templateKey];
  console.log(suiBlue("📦 Project:"), chalk.bold(projectName));
  console.log(suiTeal("🛠️  Template:"), `${template.icon} ${template.name}`);
  console.log(suiGreen("📍 Location:"), chalk.dim(`./${projectName}`));
  console.log();

  // Next steps with Sui theme
  console.log(suiGradient("🌊 Dive into development:"));
  console.log();
  console.log(chalk.dim("   1."), `cd ${chalk.cyan(projectName)}`);
  if (!skipInstallStep) {
    console.log(chalk.dim("   2."), `${chalk.cyan("npm install")}`);
    console.log(chalk.dim("   3."), `${chalk.cyan("npm run dev")}`);
  } else {
    console.log(chalk.dim("   2."), `${chalk.cyan("npm run dev")}`);
  }

  // Sui-themed tips
  note(
    `${suiBlue("🌊 Sui Tip:")} Like water finding its path, update ${chalk.cyan(
      "lib/smart-contract/config.json"
    )} with your contract addresses!`,
    "Smart Contract Setup"
  );

  console.log();
  console.log(chalk.dim("May your code flow like water! ") + suiBlue("🌊✨"));
  console.log();
}

async function main() {
  await showWelcome();

  const projectDetails = await getProjectDetails();

  const shouldContinue = await confirm({
    message: `Create ${suiBlue(projectDetails.projectName)} with ${suiTeal(
      templates[projectDetails.templateKey].name
    )}?`,
  });

  if (!shouldContinue) {
    cancel(chalk.red("Operation cancelled"));
    process.exit(0);
  }

  const projectPath = await createProject(projectDetails);

  let installed = false;
  const shouldInstall = await confirm({
    message: suiTeal("📦 Do you want to install dependencies now?"),
  });

  if (shouldInstall) {
    const s = spinner();
    s.start("Installing dependencies...");

    try {
      const { execSync } = await import("child_process");
      execSync("npm install", {
        stdio: "inherit",
        cwd: projectPath,
      });
      installed = true;
      s.stop(suiGreen("✓ Dependencies installed!"));
    } catch (err) {
      s.stop(chalk.red("✗ Failed to install dependencies"));
      console.error(err.message);
    }
  }

  showSuccessMessage(projectDetails.projectName, projectDetails.templateKey, {
    skipInstallStep: installed,
  });

  outro(suiGradient("✨ Happy building on Sui! ✨"));
}

main().catch((error) => {
  console.error(chalk.red("An error occurred:"), error);
  process.exit(1);
});
