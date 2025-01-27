import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  template: `
    <div class="projects-container">
      <h1>My Projects</h1>
      <div class="project">
        <h2>Project 1: BlogWave</h2>
        <p>A blogging platform built with Angular and ASP.NET Core. Users can create, edit, and delete posts, as well as comment on others' posts.</p>
        <a href="https://github.com/yourusername/blogwave" target="_blank">View on GitHub</a>
      </div>
      <div class="project">
        <h2>Project 2: Website Chatbot</h2>
        <p>A chatbot developed using Flask and Langchain for data scraping. It provides users with quick answers to frequently asked questions.</p>
        <a href="https://github.com/yourusername/website-chatbot" target="_blank">View on GitHub</a>
      </div>
      <div class="project">
        <h2>Project 3: Task Manager</h2>
        <p>A task management application that allows users to create, update, and delete tasks. Built with Angular and Firebase for real-time data synchronization.</p>
        <a href="https://github.com/yourusername/task-manager" target="_blank">View on GitHub</a>
      </div>
      <div class="project">
        <h2>Project 4: Portfolio Website</h2>
        <p>This portfolio website showcases my skills, projects, and experience. Built with Angular and hosted on GitHub Pages.</p>
        <a href="https://yourusername.github.io/portfolio" target="_blank">View Live</a>
      </div>
      <div class="project">
        <h2>Project 5: E-commerce Store</h2>
        <p>An e-commerce application that allows users to browse products, add them to a cart, and checkout. Built with Angular and Node.js.</p>
        <a href="https://github.com/yourusername/ecommerce-store" target="_blank">View on GitHub</a>
      </div>
    </div>
  `,
  styles: [`
    .projects-container {
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    h1 {
      //color: #333;
    }
    .project {
      margin-bottom: 20px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      //background-color: #f9f9f9;
    }
    h2 {
      //color: #007bff;
    }
    a {
      //color: #007bff;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  `]
})
export class ProjectsComponent {}