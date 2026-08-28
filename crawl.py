import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from markdownify import markdownify as md
import os
from collections import deque

START_URL = "https://www.cbbusinesssolution.com"
OUTPUT_DIR = "content"

os.makedirs(OUTPUT_DIR, exist_ok=True)

visited = set()
queue = deque([START_URL])

domain = urlparse(START_URL).netloc

all_content = []

while queue:

    url = queue.popleft()

    if url in visited:
        continue

    print(f"Crawling: {url}")

    try:
        response = requests.get(url, timeout=15)

        if response.status_code != 200:
            continue

        visited.add(url)

        soup = BeautifulSoup(response.text, "html.parser")

        # Remove unwanted elements
        for tag in soup(["script", "style", "noscript", "svg", "footer"]):
            tag.decompose()

        # Extract links
        for link in soup.find_all("a", href=True):
            href = urljoin(url, link["href"])

            parsed = urlparse(href)

            href = parsed.scheme + "://" + parsed.netloc + parsed.path

            if parsed.netloc == domain and href not in visited:
                queue.append(href)

        markdown = md(str(soup), heading_style="ATX")

        filename = urlparse(url).path.strip("/")

        if filename == "":
            filename = "home"

        filename = filename.replace("/", "_") + ".md"

        with open(
            os.path.join(OUTPUT_DIR, filename),
            "w",
            encoding="utf-8"
        ) as f:
            f.write(markdown)

        all_content.append(f"# {url}\n\n")
        all_content.append(markdown)
        all_content.append("\n\n---\n\n")

    except Exception as e:
        print(e)

with open(
    os.path.join(OUTPUT_DIR, "website-content.md"),
    "w",
    encoding="utf-8"
) as f:

    f.write("".join(all_content))

print("\nDone!")
print(f"Pages Crawled: {len(visited)}")