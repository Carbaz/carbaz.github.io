# Carlos Bazaga – Personal Portfolio Website

This repository contains the source code for my personal portfolio website.
The site is fully static (HTML + CSS) and can be deployed on any static hosting provider,
including GitHub Pages, Netlify, Vercel, or traditional FTP hosting.

The website includes:

- **Interactive Career Chatbot**
  Embedded from my Hugging Face Space:
  <https://carbaz-career-conversation.hf.space>
  The chatbot is trained on my CV and can answer questions about my background, skills,
  and experience.

- **About / Bio Section**
  A short introduction about who I am and what I do.

  Links to my GitHub, LinkedIn, Hugging Face profile, and other relevant platforms.

- **Certificates & Diplomas**
  A collection of my professional certifications, available as PDF or image files.

---

## Project Structure

```sh
.
│
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── img/
│   │   └── (profile photo, logos, etc.)
│   └── certificates/
│       └── (PDFs, PNGs, JPGs of diplomas)
└── README.md
```

---

## Deployment

This project is designed to work on any static hosting provider.

### GitHub Pages Deployment

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under “Source”, select the `main` branch and the root `/` folder.
4. Save and wait for the site to build.

Your website will be available at:

```sh
https://<your-username>.github.io/<repository-name>/
```

---

## Technologies Used

- HTML5
- CSS3
- Gradio (via iframe) for embedding the chatbot
- Static hosting (no backend required)

---

## Contact

Feel free to explore my work or reach out:

- GitHub: <https://github.com/Carbaz>
- Hugging Face: <https://huggingface.co/Carbaz>
- LinkedIn: <https://www.linkedin.com/in/cabazaga>

---

## License

This project's code is released under the MIT License.
You are free to use, modify, and distribute it.
