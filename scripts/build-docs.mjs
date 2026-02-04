import { readFile, writeFile, mkdir, rm, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
);
const docsDir = path.join(rootDir, 'docs');
const outDir = path.join(rootDir, 'site', 'docs');

const getTitle = (markdown, fallback) => {
  const match = markdown.match(/^#\s+(.+)$/m);
  if (match) {
    return match[1].trim();
  }
  return fallback;
};

const renderLayout = (title, content, extraNav = '') => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      :root {
        color-scheme: light dark;
        font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
      }
      body {
        margin: 0;
        padding: 40px 20px;
        background: #0f172a;
        color: #e2e8f0;
      }
      main {
        max-width: 900px;
        margin: 0 auto;
        background: rgba(15, 23, 42, 0.9);
        border-radius: 20px;
        padding: 32px;
        box-shadow: 0 20px 50px rgba(2, 6, 23, 0.5);
      }
      a {
        color: #7dd3fc;
      }
      nav {
        display: flex;
        gap: 16px;
        margin-bottom: 24px;
        font-size: 14px;
      }
      pre {
        background: rgba(15, 23, 42, 0.6);
        padding: 16px;
        border-radius: 12px;
        overflow: auto;
      }
      code {
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      }
      h1, h2, h3 {
        color: #f8fafc;
      }
      ul {
        padding-left: 20px;
      }
    </style>
  </head>
  <body>
    <main>
      <nav>
        <a href="../">Docs home</a>
        ${extraNav}
      </nav>
      ${content}
    </main>
  </body>
</html>
`;

const walkMarkdownFiles = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await walkMarkdownFiles(entryPath);
      files.push(...nested);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(entryPath);
    }
  }

  return files;
};

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const markdownFiles = await walkMarkdownFiles(docsDir);
const pages = [];

for (const filePath of markdownFiles) {
  const markdown = await readFile(filePath, 'utf8');
  const relativePath = path.relative(docsDir, filePath);
  const outputPath = path.join(outDir, relativePath.replace(/\.md$/, '.html'));
  const title = getTitle(markdown, relativePath);
  const content = marked.parse(markdown);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, renderLayout(title, content), 'utf8');

  pages.push({
    title,
    link: relativePath.replace(/\.md$/, '.html')
  });
}

const grouped = pages.reduce((acc, page) => {
  const [section] = page.link.split('/');
  if (!acc[section]) {
    acc[section] = [];
  }
  acc[section].push(page);
  return acc;
}, {});

const sections = Object.entries(grouped)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([section, items]) => {
    const list = items
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((item) => `<li><a href="./${item.link}">${item.title}</a></li>`)
      .join('');
    return `<h2>${section}</h2><ul>${list}</ul>`;
  })
  .join('');

const indexContent = `
  <h1>Liquid Glass Web Docs</h1>
  <p>Research notes, specifications, and implementation references.</p>
  ${sections}
`;

await writeFile(
  path.join(outDir, 'index.html'),
  renderLayout('Liquid Glass Docs', indexContent, '<a href="../../">Site</a>'),
  'utf8'
);
