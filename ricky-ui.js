(function() {
  if (document.querySelector('#rgbContainer')) return;

  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }
    @keyframes pulse {
      0% { box-shadow: 0 0 5px rgba(255,255,255,0.5); }
      50% { box-shadow: 0 0 20px rgba(255,255,255,0.8); }
      100% { box-shadow: 0 0 5px rgba(255,255,255,0.5); }
    }
    @keyframes neonGlow {
      0% { text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #00ff00; }
      50% { text-shadow: 0 0 20px #fff, 0 0 30px #00ff00, 0 0 40px #00ff00; }
      100% { text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #00ff00; }
    }
    @keyframes particleFloat {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
      100% { transform: translateY(0px) rotate(360deg); }
    }
    .tab-hover {
      transition: all 0.3s ease;
    }
    .tab-hover:hover {
      transform: translateY(-5px);
      background: rgba(255,255,255,0.2);
    }
    .button-glow {
      transition: all 0.3s ease;
      animation: pulse 2s infinite;
    }
    .button-glow:hover {
      transform: scale(1.1);
      box-shadow: 0 0 25px rgba(255,255,255,0.8);
    }
  `;
  document.head.appendChild(styleSheet);

  const rgbContainer = document.createElement('div');
  rgbContainer.id = 'rgbContainer';
  rgbContainer.style.position = 'fixed';
  rgbContainer.style.top = '50%';
  rgbContainer.style.left = '50%';
  rgbContainer.style.transform = 'translate(-50%, -50%)';
  rgbContainer.style.width = '500px';
  rgbContainer.style.height = '400px';
  rgbContainer.style.border = '2px solid white';
  rgbContainer.style.borderRadius = '10px';
  rgbContainer.style.padding = '10px';
  rgbContainer.style.zIndex = '10000';
  rgbContainer.style.background = 'linear-gradient(45deg, #000000, #1a1a1a)';
  rgbContainer.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
  rgbContainer.style.overflow = 'hidden';
  document.body.appendChild(rgbContainer);

  let isDragging = false;
  let offsetX, offsetY;

  const topBar = document.createElement('div');
  topBar.style.width = '100%';
  topBar.style.height = '30px';
  topBar.style.background = 'rgba(255, 255, 255, 0.1)';
  topBar.style.display = 'flex';
  topBar.style.alignItems = 'center';
  topBar.style.justifyContent = 'center';
  topBar.style.cursor = 'grab';
  rgbContainer.appendChild(topBar);

  topBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - rgbContainer.offsetLeft;
    offsetY = e.clientY - rgbContainer.offsetTop;
    topBar.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    rgbContainer.style.left = `${e.clientX - offsetX}px`;
    rgbContainer.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    topBar.style.cursor = 'grab';
  });

  const title = document.createElement('h2');
  title.innerText = "Phoenix Hub";
  title.style.color = 'white';
  title.style.margin = '0';
  title.style.fontSize = '16px';
  title.style.fontFamily = "'Press Start 2P', cursive";
  title.style.animation = 'neonGlow 2s infinite';
  topBar.appendChild(title);

  const particleContainer = document.createElement('div');
  particleContainer.style.position = 'absolute';
  particleContainer.style.top = '0';
  particleContainer.style.left = '0';
  particleContainer.style.width = '100%';
  particleContainer.style.height = '100%';
  particleContainer.style.pointerEvents = 'none';
  rgbContainer.appendChild(particleContainer);

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'white';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.opacity = Math.random();
    particle.style.animation = `particleFloat ${Math.random() * 3 + 2}s infinite`;
    particleContainer.appendChild(particle);
  }

  const tabNav = document.createElement('div');
  tabNav.style.display = 'flex';
  tabNav.style.justifyContent = 'space-around';
  tabNav.style.borderBottom = '2px solid white';
  tabNav.style.marginTop = '10px';
  tabNav.style.cursor = 'pointer';
  rgbContainer.appendChild(tabNav);

  function createTab(label, contentId) {
    const tab = document.createElement('div');
    tab.innerText = label;
    tab.style.padding = '10px';
    tab.style.color = 'white';
    tab.style.flex = '1';
    tab.style.textAlign = 'center';
    tab.style.transition = 'all 0.3s ease';
    tab.style.borderBottom = '2px solid transparent';
    tab.classList.add('tab-hover');
    tab.dataset.content = contentId;

    tab.addEventListener('click', () => {
      document.querySelectorAll('[data-content]').forEach((t) => {
        t.style.borderBottom = '2px solid transparent';
        t.style.background = 'none';
      });
      tab.style.borderBottom = '2px solid hsl(180, 100%, 70%)';
      tab.style.background = 'rgba(255, 255, 255, 0.1)';

      document.querySelectorAll('.tab-content').forEach((content) => {
        content.style.display = 'none';
      });
      document.getElementById(contentId).style.display = 'block';
    });

    return tab;
  }

  tabNav.appendChild(createTab('Home', 'content1'));
  tabNav.appendChild(createTab('Features', 'content2'));
  tabNav.appendChild(createTab('Chat', 'content3'));
  tabNav.appendChild(createTab('AI', 'content4'));
  tabNav.appendChild(createTab('Bookmarks', 'content5'));

  function createTabContent(id, text) {
    const content = document.createElement('div');
    content.id = id;
    content.className = 'tab-content';
    content.style.color = 'white';
    content.style.padding = '10px';
    content.style.display = 'none';
    content.style.textAlign = 'center';
    content.style.fontSize = '24px';
    content.style.fontFamily = '"Lucida Console", Monaco, monospace';
    content.innerHTML = text;
    rgbContainer.appendChild(content);
    return content;
  }

  createTabContent('content1', `
    <div style="animation: float 3s infinite ease-in-out; margin-top: 40px;">
      <span id="welcomeText" style="font-size: 28px; animation: neonGlow 2s infinite">Welcome to Phoenix Hub!</span>
      <br><br><br>
      <span style="font-size: 24px; animation: pulse 2s infinite">Made by Ricky</span>
      <br><br><br>
      <div style="position: absolute; bottom: 10px; width: 100%; left: 0; font-size: 14px; opacity: 0.8">
        Last Updated: January 17, 2024
      </div>
    </div>
  `);

  createTabContent('content2', `
    <div style="height: 100%; padding: 20px;">
      <div class="dropdown-container" style="
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        width: 100%;
        text-align: center;
        margin-top: 40px;">
        
        <!-- Websites Dropdown -->
        <div class="custom-dropdown">
          <button class="dropdown-btn">Websites 🌐</button>
          <div class="dropdown-content">
            <a href="https://chat.openai.com" target="_blank">ChatGPT</a>
            <a href="https://github.com" target="_blank">GitHub</a>
            <a href="https://youtube.com" target="_blank">YouTube</a>
            <a href="https://discord.com" target="_blank">Discord</a>
            <a href="https://twitter.com" target="_blank">Twitter</a>
          </div>
        </div>

        <!-- Games Dropdown -->
        <div class="custom-dropdown">
          <button class="dropdown-btn">Games 🎮</button>
          <div class="dropdown-content">
            <a href="https://krunker.io" target="_blank">Krunker.io</a>
            <a href="https://slither.io" target="_blank">Slither.io</a>
            <a href="https://shellshock.io" target="_blank">ShellShock.io</a>
            <a href="https://1v1.lol" target="_blank">1v1.lol</a>
            <a href="https://minecraft.net" target="_blank">Minecraft</a>
          </div>
        </div>

        <!-- UI Themes Dropdown -->
        <div class="custom-dropdown">
          <button class="dropdown-btn">UI Themes 🎨</button>
          <div class="dropdown-content">
            <a href="#" onclick="setTheme('neon')">Neon Theme</a>
            <a href="#" onclick="setTheme('dark')">Dark Theme</a>
            <a href="#" onclick="setTheme('cyber')">Cyber Theme</a>
            <a href="#" onclick="setTheme('retro')">Retro Theme</a>
            <a href="#" onclick="setTheme('minimal')">Minimal Theme</a>
          </div>
        </div>
      </div>
    </div>
  `);

  createTabContent('content3', '');
  const content3 = document.getElementById('content3');
  content3.style.overflow = 'auto';
  content3.style.maxHeight = 'calc(100% - 40px)';
  const iframe1 = document.createElement('iframe');
  iframe1.src = "https://deadsimplechat.com/yNDNA0hhp";
  iframe1.width = "100%";
  iframe1.style.height = '600px';
  iframe1.style.border = 'none';
  content3.appendChild(iframe1);

  createTabContent('content4', '');
  const content4 = document.getElementById('content4');
  content4.style.overflow = 'auto';
  content4.style.maxHeight = 'calc(100% - 40px)';
  const iframe2 = document.createElement('iframe');
  iframe2.src = "https://www.blackbox.ai/";
  iframe2.width = "100%";
  iframe2.style.height = '600px';
  iframe2.style.border = 'none';
  content4.appendChild(iframe2);

  createTabContent('content5', '');
  const content5 = document.getElementById('content5');
  content5.style.display = 'none';
  content5.style.height = '100%';
  content5.style.overflow = 'auto';

  const bookmarkContainer = document.createElement('div');
  bookmarkContainer.style.padding = '10px';
  bookmarkContainer.style.height = '100%';
  bookmarkContainer.style.display = 'flex';
  bookmarkContainer.style.flexDirection = 'column';
  bookmarkContainer.style.gap = '10px';

  const bookmarkForm = document.createElement('form');
  bookmarkForm.innerHTML = `
    <input type="text" id="bookmarkTitle" placeholder="Title" style="margin-right: 5px; padding: 5px;">
    <input type="url" id="bookmarkUrl" placeholder="URL" style="margin-right: 5px; padding: 5px;">
    <button type="submit" style="padding: 5px 10px; background: #4CAF50; color: white; border: none; cursor: pointer;">Add Bookmark</button>
  `;

  const bookmarkList = document.createElement('div');
  bookmarkList.style.flex = '1';
  bookmarkList.style.overflow = 'auto';

  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

  function renderBookmarks() {
    bookmarkList.innerHTML = '';
    bookmarks.forEach((bookmark, index) => {
      const bookmarkElement = document.createElement('div');
      bookmarkElement.style.display = 'flex';
      bookmarkElement.style.justifyContent = 'space-between';
      bookmarkElement.style.alignItems = 'center';
      bookmarkElement.style.padding = '10px';
      bookmarkElement.style.marginBottom = '5px';
      bookmarkElement.style.background = 'rgba(255, 255, 255, 0.1)';
      bookmarkElement.style.borderRadius = '5px';

      bookmarkElement.innerHTML = `
        <a href="${bookmark.url}" target="_blank" style="color: white; text-decoration: none;">${bookmark.title}</a>
        <button onclick="deleteBookmark(${index})" style
        <button onclick="deleteBookmark(${index})" style="padding: 5px 10px; background: #f44336; color: white; border: none; cursor: pointer;">Delete</button>
      `;
      bookmarkList.appendChild(bookmarkElement);
    });
  }

  bookmarkForm.onsubmit = (e) => {
    e.preventDefault();
    const title = document.getElementById('bookmarkTitle').value;
    const url = document.getElementById('bookmarkUrl').value;

    if (title && url) {
      bookmarks.push({ title, url });
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      renderBookmarks();
      bookmarkForm.reset();
    }
  };

  window.deleteBookmark = (index) => {
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    renderBookmarks();
  };

  bookmarkContainer.appendChild(bookmarkForm);
  bookmarkContainer.appendChild(bookmarkList);
  content5.appendChild(bookmarkContainer);

  renderBookmarks();

  const closeButton = document.createElement('button');
  closeButton.innerText = '×';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '8px';
  closeButton.style.right = '10px';
  closeButton.style.width = '30px';
  closeButton.style.height = '30px';
  closeButton.style.border = 'none';
  closeButton.style.background = 'red';
  closeButton.style.color = 'white';
  closeButton.style.fontSize = '20px';
  closeButton.style.cursor = 'pointer';
  closeButton.classList.add('button-glow');
  closeButton.addEventListener('click', () => {
    rgbContainer.remove();
  });
  rgbContainer.appendChild(closeButton);

  const minimizeButton = document.createElement('button');
  minimizeButton.innerText = '−';
  minimizeButton.style.position = 'absolute';
  minimizeButton.style.top = '8px';
  minimizeButton.style.right = '50px';
  minimizeButton.style.width = '30px';
  minimizeButton.style.height = '30px';
  minimizeButton.style.border = 'none';
  minimizeButton.style.background = 'gray';
  minimizeButton.style.color = 'white';
  minimizeButton.style.fontSize = '20px';
  minimizeButton.style.cursor = 'pointer';
  minimizeButton.classList.add('button-glow');
  minimizeButton.addEventListener('click', () => {
    rgbContainer.style.height = rgbContainer.style.height === '30px' ? '400px' : '30px';
  });
  rgbContainer.appendChild(minimizeButton);

  // Add the dropdown styles
  const dropdownStyles = document.createElement('style');
  dropdownStyles.textContent = `
    .custom-dropdown {
      position: relative;
      display: inline-block;
    }

    .dropdown-btn {
      background: linear-gradient(45deg, #2b2b2b, #1a1a1a);
      color: #fff;
      padding: 12px 25px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.3s ease;
      box-shadow: 0 0 10px rgba(0,255,0,0.2);
      width: 80%;
    }

    .dropdown-btn:hover {
      background: linear-gradient(45deg, #3b3b3b, #2a2a2a);
      transform: translateY(-2px);
      box-shadow: 0 0 15px rgba(0,255,0,0.4);
    }

    .dropdown-content {
      display: none;
      position: absolute;
      background: rgba(20, 20, 20, 0.95);
      min-width: 160px;
      box-shadow: 0 0 15px rgba(0,255,0,0.3);
      border-radius: 8px;
      padding: 8px 0;
      z-index: 1;
      backdrop-filter: blur(5px);
      transform: translateY(10px);
      transition: all 0.3s ease;
      left: 50%;
      transform: translateX(-50%);
    }

    .custom-dropdown:hover .dropdown-content {
      display: block;
      animation: dropdownFade 0.3s ease;
    }

    .dropdown-content a {
      color: white;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
      transition: all 0.2s ease;
    }

    .dropdown-content a:hover {
      background: rgba(0,255,0,0.1);
      padding-left: 22px;
    }

    @keyframes dropdownFade {
      from {
        opacity: 0;
        transform: translateY(20px) translateX(-50%);
      }
      to {
        opacity: 1;
        transform: translateY(0) translateX(-50%);
      }
    }
  `;
  document.head.appendChild(dropdownStyles);

  // Theme switching functionality
  window.setTheme = (theme) => {
    const container = document.getElementById('rgbContainer');
    switch(theme) {
      case 'neon':
        container.style.background = 'linear-gradient(45deg, #000000, #1a1a1a)';
        container.style.boxShadow = '0 0 20px #00ff00';
        break;
      case 'dark':
        container.style.background = 'linear-gradient(45deg, #1a1a1a, #2d2d2d)';
        container.style.boxShadow = '0 0 20px rgba(255,255,255,0.2)';
        break;
      case 'cyber':
        container.style.background = 'linear-gradient(45deg, #000428, #004e92)';
        container.style.boxShadow = '0 0 20px #00ffff';
        break;
      case 'retro':
        container.style.background = 'linear-gradient(45deg, #2b0537, #760a5e)';
        container.style.boxShadow = '0 0 20px #ff00ff';
        break;
      case 'minimal':
        container.style.background = '#1a1a1a';
        container.style.boxShadow = '0 0 10px rgba(255,255,255,0.1)';
        break;
    }
  };

  document.querySelector('[data-content="content1"]').click();
})();
