(function() {
  // Use a global variable to store the policy so it's only created once.
  if (!window.__trustedHTMLPolicy__ && window.trustedTypes) {
    try {
      window.__trustedHTMLPolicy__ = trustedTypes.createPolicy('default', {
        createHTML: (input) => input
      });
    } catch (e) {
      // If creation fails (policy already exists), we can safely ignore it.
      console.warn("Trusted Types policy 'default' already exists.");
    }
  }
  const trustedHTMLPolicy = window.__trustedHTMLPolicy__ || null;
  const safeHTML = (html) => trustedHTMLPolicy ? trustedHTMLPolicy.createHTML(html) : html;

  // Check if the hub is already loaded
  if (document.querySelector('#rgbContainer')) return;

  // Create Loading Screen
  const loadingOverlay = document.createElement('div');
  loadingOverlay.id = 'loadingOverlay';
  Object.assign(loadingOverlay.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: '#000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '100000',
    color: '#fff',
    fontFamily: 'Arial, sans-serif'
  });

  const loadingText = document.createElement('div');
  loadingText.innerText = 'Loading Phoenix Hub...';
  Object.assign(loadingText.style, {
    fontSize: '24px',
    marginBottom: '20px'
  });

  const spinner = document.createElement('div');
  Object.assign(spinner.style, {
    border: '8px solid #f3f3f3',
    borderTop: '8px solid #3498db',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    animation: 'spin 2s linear infinite'
  });

  const spinnerStyle = document.createElement('style');
  spinnerStyle.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(spinnerStyle);

  loadingOverlay.appendChild(loadingText);
  loadingOverlay.appendChild(spinner);
  document.body.appendChild(loadingOverlay);

  try {
    // Configuration Objects
    const config = {
      tabs: [
        { label: 'Home', contentId: 'content1' },
        { label: 'Features', contentId: 'content2' },
        { label: 'Chat', contentId: 'content3' },
        { label: 'AI', contentId: 'content4' },
        { label: 'Bookmarks', contentId: 'content5' },
        { label: 'Websites', contentId: 'content6' }, // New Websites tab
        { label: 'Keybinds', contentId: 'content7' }  // Renumbered Keybinds tab
      ],
      dropdowns: [
        {
          label: 'Websites 🌐',
          items: [
            { title: 'ChatGPT', url: 'https://chat.openai.com' },
            { title: 'GitHub', url: 'https://github.com' },
            { title: 'YouTube', url: 'https://youtube.com' },
            { title: 'Discord', url: 'https://discord.com' },
            { title: 'Twitter', url: 'https://twitter.com' },
            { title: 'Pinterest', url: 'https://www.pinterest.com' },
            { title: 'Spotify', url: 'https://open.spotify.com' }
          ]
        },
        {
          label: 'Games 🎮',
          items: [
            { title: 'Slither.io', url: 'https://slither.io' },
            { title: 'Skribbl.io', url: 'https://skribbl.io/' },
            { title: 'Drive Mad', url: 'https://poki.com/en/g/drive-mad?msockid=3870dedb96f7653e3fa8cab1974d6494' }
          ]
        },
        {
          label: 'UI Themes 🎨',
          items: [
            { title: 'Neon Theme', theme: 'neon' },
            { title: 'Dark Theme', theme: 'dark' },
            { title: 'Cyber Theme', theme: 'cyber' },
            { title: 'Retro Theme', theme: 'retro' },
            { title: 'Minimal Theme', theme: 'minimal' },
            { title: 'Ocean Breeze', theme: 'ocean' },
            { title: 'Sunset Glow', theme: 'sunset' },
            { title: 'Forest Whisper', theme: 'forest' },
            { title: 'Solar Flare', theme: 'solar' },
            { title: 'Midnight Blue', theme: 'midnight' },
            { title: 'Rose Quartz', theme: 'rose' },
            { title: 'Emerald Dream', theme: 'emerald' },
            { title: 'Lavender Mist', theme: 'lavender' }
          ]
        }
      ],
      themes: {
        neon: {
          background: 'linear-gradient(45deg, #000000, #1a1a1a)',
          boxShadow: '0 0 20px #00ff00'
        },
        dark: {
          background: 'linear-gradient(45deg, #1a1a1a, #2d2d2d)',
          boxShadow: '0 0 20px rgba(255,255,255,0.2)'
        },
        cyber: {
          background: 'linear-gradient(45deg, #000428, #004e92)',
          boxShadow: '0 0 20px #00ffff'
        },
        retro: {
          background: 'linear-gradient(45deg, #2b0537, #760a5e)',
          boxShadow: '0 0 20px #ff00ff'
        },
        minimal: {
          background: '#1a1a1a',
          boxShadow: '0 0 10px rgba(255,255,255,0.1)'
        },
        ocean: {
          background: 'linear-gradient(45deg, #2e8bc0, #0c7b93)',
          boxShadow: '0 0 20px #00d4ff'
        },
        sunset: {
          background: 'linear-gradient(45deg, #ff7e5f, #feb47b)',
          boxShadow: '0 0 20px #ffae00'
        },
        forest: {
          background: 'linear-gradient(45deg, #134e5e, #71b280)',
          boxShadow: '0 0 20px #00ff6a'
        },
        solar: {
          background: 'linear-gradient(45deg, #f7971e, #ffd200)',
          boxShadow: '0 0 20px #ffb400'
        },
        midnight: {
          background: 'linear-gradient(45deg, #232526, #414345)',
          boxShadow: '0 0 20px #0000ff'
        },
        rose: {
          background: 'linear-gradient(45deg, #e96443, #904e95)',
          boxShadow: '0 0 20px #ff66cc'
        },
        emerald: {
          background: 'linear-gradient(45deg, #348f50, #56b4d3)',
          boxShadow: '0 0 20px #00ff99'
        },
        lavender: {
          background: 'linear-gradient(45deg, #b4aee8, #f2f2f2)',
          boxShadow: '0 0 20px #d1b3ff'
        }
      }
    };

    // Default Key Bindings and Load Saved Bindings (if any)
    const defaultKeyBindings = {
      toggleHub: 'KeyH',       // Toggle the hub’s visibility
      homeTab: 'Digit1',       // Switch to Home tab
      featuresTab: 'Digit2',   // Switch to Features tab
      chatTab: 'Digit3',       // Switch to Chat tab
      aiTab: 'Digit4',         // Switch to AI tab
      bookmarksTab: 'Digit5',  // Switch to Bookmarks tab
      websitesTab: 'Digit6',   // Switch to Websites tab
      keybindsTab: 'Digit7',   // Switch to Keybinds tab
      destroyUI: 'AltRight'    // Destroy the UI completely (Right Alt)
    };
    let keyBindings = {};
    try {
      keyBindings = JSON.parse(localStorage.getItem('phoenixHubKeyBindings')) || defaultKeyBindings;
    } catch (e) {
      console.error('Error reading keybindings:', e);
      keyBindings = defaultKeyBindings;
    }
    function saveKeyBindings() {
      try {
        localStorage.setItem('phoenixHubKeyBindings', JSON.stringify(keyBindings));
      } catch (e) {
        console.error('Error saving keybindings:', e);
      }
    }

    // Stylesheet Injection
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
      /* Responsive Styles */
      @media (max-width: 600px) {
        #rgbContainer {
          width: 90%;
          height: 90%;
        }
        .dropdown-btn {
          font-size: 14px;
        }
      }
    `;
    document.head.appendChild(styleSheet);

    // Create Container
    const rgbContainer = document.createElement('div');
    rgbContainer.id = 'rgbContainer';
    Object.assign(rgbContainer.style, {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '500px',
      height: '400px',
      border: '2px solid white',
      borderRadius: '10px',
      padding: '10px',
      zIndex: '10000',
      background: 'linear-gradient(45deg, #000000, #1a1a1a)',
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    });
    document.body.appendChild(rgbContainer);

    // Drag-and-Drop Functionality
    let isDragging = false;
    let offsetX, offsetY;

    const topBar = document.createElement('div');
    Object.assign(topBar.style, {
      width: '100%',
      height: '30px',
      background: 'rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'grab',
      position: 'relative'
    });
    rgbContainer.appendChild(topBar);

    topBar.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - rgbContainer.offsetLeft;
      offsetY = e.clientY - rgbContainer.offsetTop;
      topBar.style.cursor = 'grabbing';
    });

    const onMouseMove = (e) => {
      if (!isDragging) return;
      rgbContainer.style.left = `${e.clientX - offsetX}px`;
      rgbContainer.style.top = `${e.clientY - offsetY}px`;
    };

    const onMouseUp = () => {
      isDragging = false;
      topBar.style.cursor = 'grab';
    };

    // Use capturing phase (true) for these event listeners so they fire before Google Docs/Form listeners.
    document.addEventListener('mousemove', onMouseMove, true);
    document.addEventListener('mouseup', onMouseUp, true);

    // Title
    const title = document.createElement('h2');
    title.innerText = "Phoenix Hub";
    Object.assign(title.style, {
      color: 'white',
      margin: '0',
      fontSize: '16px',
      fontFamily: "'Press Start 2P', cursive",
      animation: 'neonGlow 2s infinite'
    });
    topBar.appendChild(title);

    // Particle Effects
    const particleContainer = document.createElement('div');
    Object.assign(particleContainer.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    });
    rgbContainer.appendChild(particleContainer);

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      Object.assign(particle.style, {
        position: 'absolute',
        width: '2px',
        height: '2px',
        background: 'white',
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        opacity: Math.random(),
        animation: `particleFloat ${Math.random() * 3 + 2}s infinite`
      });
      particleContainer.appendChild(particle);
    }

    // Tab Navigation
    const tabNav = document.createElement('div');
    Object.assign(tabNav.style, {
      display: 'flex',
      justifyContent: 'space-around',
      borderBottom: '2px solid white',
      marginTop: '10px',
      cursor: 'pointer'
    });
    rgbContainer.appendChild(tabNav);

    function createTab({ label, contentId }) {
      const tab = document.createElement('div');
      tab.innerText = label;
      Object.assign(tab.style, {
        padding: '10px',
        color: 'white',
        flex: '1',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        borderBottom: '2px solid transparent'
      });
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

    config.tabs.forEach((tabConfig) => {
      tabNav.appendChild(createTab(tabConfig));
    });

    // Content Areas
    function createTabContent(id, builderFunction) {
      const content = document.createElement('div');
      content.id = id;
      content.className = 'tab-content';
      Object.assign(content.style, {
        color: 'white',
        padding: '10px',
        display: 'none',
        textAlign: 'center',
        flex: '1',
        overflow: 'auto'
      });
      builderFunction(content);
      rgbContainer.appendChild(content);
      return content;
    }

    // Home Content
    createTabContent('content1', (content) => {
      const container = document.createElement('div');
      Object.assign(container.style, {
        animation: 'float 3s infinite ease-in-out',
        marginTop: '40px'
      });

      const welcomeText = document.createElement('span');
      welcomeText.id = 'welcomeText';
      welcomeText.innerText = 'Welcome to Phoenix Hub!';
      Object.assign(welcomeText.style, {
        fontSize: '28px',
        animation: 'neonGlow 2s infinite'
      });
      container.appendChild(welcomeText);

      container.appendChild(document.createElement('br'));
      container.appendChild(document.createElement('br'));
      container.appendChild(document.createElement('br'));

      const madeByText = document.createElement('span');
      madeByText.innerText = 'Made by Ricky';
      Object.assign(madeByText.style, {
        fontSize: '24px',
        animation: 'pulse 2s infinite'
      });
      container.appendChild(madeByText);

      // Insert the copy button immediately under "Made by Ricky"
      container.appendChild(document.createElement('br'));
      container.appendChild(document.createElement('br'));

      const copyButton = document.createElement('button');
      copyButton.innerText = "Click for new UI";
      Object.assign(copyButton.style, {
          padding: '10px 20px',
          fontSize: '16px',
          margin: '20px',
          cursor: 'pointer',
          background: 'linear-gradient(45deg, #2b2b2b, #1a1a1a)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,255,0,0.2)',
          transition: 'all 0.3s ease'
      });
      copyButton.addEventListener('mouseover', () => {
          copyButton.style.transform = 'scale(1.05)';
      });
      copyButton.addEventListener('mouseout', () => {
          copyButton.style.transform = 'scale(1)';
      });
      copyButton.addEventListener('click', () => {
        const snippet = "javascript:(function(){  fetch('https://raw.githubusercontent.com/mlgman168/ricky-ui/refs/heads/main/ricky-ui.js?%27 + new Date().getTime())    .then(function(response){ return response.text(); })    .then(function(code){      var blob = new Blob([code], {type: %27application/javascript%27});      var blobUrl = URL.createObjectURL(blob);      var script = document.createElement(%27script%27);      if(window.trustedTypes) {        var policy;        if(window.__phoenixHubPolicy){          policy = window.__phoenixHubPolicy;        } else {          policy = window.trustedTypes.createPolicy(%27phoenixHubPolicy%27, {            createScriptURL: function(url) { return url; }          });          window.__phoenixHubPolicy = policy;        }        script.src = policy.createScriptURL(blobUrl);      } else {        script.src = blobUrl;      }      script.onload = function(){        URL.revokeObjectURL(blobUrl);      };      document.body.appendChild(script);    })    .catch(function(err){      console.error(%27Error loading ricky-ui.js:%27, err);    });})();";
        navigator.clipboard.writeText(snippet).then(() => {
          const originalText = copyButton.innerText;
          copyButton.innerText = "Copied!";
          setTimeout(() => {
            copyButton.innerText = originalText;
          }, 2000);
        }).catch(err => {
          console.error("Failed to copy text:", err);
        });
      });
      container.appendChild(copyButton);

      // Move the "Last Updated" text down (without absolute positioning)
      container.appendChild(document.createElement('br'));
      container.appendChild(document.createElement('br'));

      const lastUpdated = document.createElement('div');
      lastUpdated.innerText = 'Last Updated: February 25, 2025';
      Object.assign(lastUpdated.style, {
        fontSize: '14px',
        opacity: '0.8'
      });
      container.appendChild(lastUpdated);

      content.appendChild(container);
    });

    // Features Content
    createTabContent('content2', (content) => {
      const container = document.createElement('div');
      Object.assign(container.style, {
        height: '100%',
        padding: '20px'
      });

      const dropdownContainer = document.createElement('div');
      Object.assign(dropdownContainer.style, {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        width: '100%',
        textAlign: 'center',
        marginTop: '40px'
      });

      // Create Dropdowns
      config.dropdowns.forEach((dropdownConfig) => {
        const dropdown = createCustomDropdown(dropdownConfig);
        dropdownContainer.appendChild(dropdown);
      });

      container.appendChild(dropdownContainer);
      content.appendChild(container);
    });

    // Chat Content
    createTabContent('content3', (content) => {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://deadsimplechat.com/yNDNA0hhp';
      iframe.width = '100%';
      iframe.style.height = '600px';
      iframe.style.border = 'none';
      content.appendChild(iframe);
    });

    // AI Content
    createTabContent('content4', (content) => {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.blackbox.ai/';
      iframe.width = '100%';
      iframe.style.height = '600px';
      iframe.style.border = 'none';
      content.appendChild(iframe);
    });

    // Bookmarks Content
    createTabContent('content5', (content) => {
      Object.assign(content.style, {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      });

      const bookmarkContainer = document.createElement('div');
      Object.assign(bookmarkContainer.style, {
        padding: '10px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      });

      const bookmarkForm = document.createElement('form');
      bookmarkForm.style.display = 'flex';
      bookmarkForm.style.alignItems = 'center';
      bookmarkForm.style.gap = '5px';

      const bookmarkTitleInput = document.createElement('input');
      bookmarkTitleInput.type = 'text';
      bookmarkTitleInput.id = 'bookmarkTitle';
      bookmarkTitleInput.placeholder = 'Title';
      Object.assign(bookmarkTitleInput.style, {
        padding: '5px',
        flex: '1'
      });

      const bookmarkUrlInput = document.createElement('input');
      bookmarkUrlInput.type = 'url';
      bookmarkUrlInput.id = 'bookmarkUrl';
      bookmarkUrlInput.placeholder = 'URL';
      Object.assign(bookmarkUrlInput.style, {
        padding: '5px',
        flex: '2'
      });

      const addButton = document.createElement('button');
      addButton.type = 'submit';
      addButton.innerText = 'Add Bookmark';
      Object.assign(addButton.style, {
        padding: '5px 10px',
        background: '#4CAF50',
        color: 'white',
        border: 'none',
        cursor: 'pointer'
      });

      bookmarkForm.appendChild(bookmarkTitleInput);
      bookmarkForm.appendChild(bookmarkUrlInput);
      bookmarkForm.appendChild(addButton);

      const bookmarkList = document.createElement('div');
      Object.assign(bookmarkList.style, {
        flex: '1',
        overflow: 'auto'
      });

      let bookmarks = [];
      try {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      } catch (e) {
        console.error('Error reading bookmarks from localStorage:', e);
      }

      function renderBookmarks() {
        bookmarkList.innerHTML = safeHTML('');
        bookmarks.forEach((bookmark, index) => {
          const bookmarkElement = document.createElement('div');
          Object.assign(bookmarkElement.style, {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            marginBottom: '5px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '5px'
          });

          const link = document.createElement('a');
          link.href = bookmark.url;
          link.target = '_blank';
          link.innerText = bookmark.title;
          Object.assign(link.style, {
            color: 'white',
            textDecoration: 'none'
          });

          const deleteButton = document.createElement('button');
          deleteButton.innerText = 'Delete';
          Object.assign(deleteButton.style, {
            padding: '5px 10px',
            background: '#f44336',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          });
          deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this bookmark?')) {
              deleteBookmark(index);
            }
          });

          bookmarkElement.appendChild(link);
          bookmarkElement.appendChild(deleteButton);
          bookmarkList.appendChild(bookmarkElement);
        });
      }

      bookmarkForm.onsubmit = (e) => {
        e.preventDefault();
        const title = bookmarkTitleInput.value.trim();
        const url = bookmarkUrlInput.value.trim();

        if (title && url) {
          bookmarks.push({ title, url });
          try {
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            renderBookmarks();
            bookmarkForm.reset();
            alert('Bookmark added successfully!');
          } catch (e) {
            console.error('Error saving bookmark:', e);
            alert('Failed to save bookmark.');
          }
        }
      };

      function deleteBookmark(index) {
        bookmarks.splice(index, 1);
        try {
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
          renderBookmarks();
          alert('Bookmark deleted.');
        } catch (e) {
          console.error('Error deleting bookmark:', e);
          alert('Failed to delete bookmark.');
        }
      }

      bookmarkContainer.appendChild(bookmarkForm);
      bookmarkContainer.appendChild(bookmarkList);
      content.appendChild(bookmarkContainer);

      renderBookmarks();
    });

    // Websites Content (New Tab)
    createTabContent('content6', (content) => {
      const container = document.createElement('div');
      Object.assign(container.style, {
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center'
      });
      
      const info = document.createElement('div');
      info.innerText = 'Visit one of these websites:';
      info.style.fontSize = '18px';
      container.appendChild(info);
      
      // First Website Link
      const link1 = document.createElement('a');
      link1.href = 'https://www.exploitsnstuff.org/';
      link1.target = '_blank';
      link1.innerText = 'Exploits n Stuff';
      Object.assign(link1.style, {
        color: 'cyan',
        fontSize: '16px',
        textDecoration: 'none',
        border: '1px solid cyan',
        padding: '10px 20px',
        borderRadius: '5px'
      });
      container.appendChild(link1);
      
      // Second Website Link
      const link2 = document.createElement('a');
      link2.href = 'https://sites.google.com/view/exploitsnstuff2';
      link2.target = '_blank';
      link2.innerText = 'Exploits n Stuff 2';
      Object.assign(link2.style, {
        color: 'cyan',
        fontSize: '16px',
        textDecoration: 'none',
        border: '1px solid cyan',
        padding: '10px 20px',
        borderRadius: '5px'
      });
      container.appendChild(link2);
      
      content.appendChild(container);
    });

    // Keybinds Content (Renumbered to content7)
    createTabContent('content7', (content) => {
      const container = document.createElement('div');
      Object.assign(container.style, {
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      });

      const instructions = document.createElement('div');
      instructions.innerText = 'Click on a key binding to change it. Then press the new key.';
      container.appendChild(instructions);

      Object.keys(keyBindings).forEach((action) => {
        const row = document.createElement('div');
        Object.assign(row.style, {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '5px',
          border: '1px solid white',
          borderRadius: '5px'
        });

        const label = document.createElement('span');
        label.innerText = action;
        row.appendChild(label);

        const keySpan = document.createElement('span');
        keySpan.innerText = keyBindings[action];
        keySpan.style.cursor = 'pointer';
        keySpan.style.padding = '5px';
        keySpan.style.background = 'rgba(255, 255, 255, 0.1)';
        keySpan.style.borderRadius = '3px';
        row.appendChild(keySpan);

        keySpan.addEventListener('click', () => {
          keySpan.innerText = 'Press new key...';
          const onKeyPress = (e) => {
            keyBindings[action] = e.code;
            keySpan.innerText = e.code;
            saveKeyBindings();
            document.removeEventListener('keydown', onKeyPress, true);
          };
          document.addEventListener('keydown', onKeyPress, true);
        });

        container.appendChild(row);
      });

      content.appendChild(container);
    });

    // Close and Minimize Buttons
    const closeButton = document.createElement('button');
    closeButton.innerText = '×';
    Object.assign(closeButton.style, {
      position: 'absolute',
      top: '8px',
      right: '10px',
      width: '30px',
      height: '30px',
      border: 'none',
      background: 'red',
      color: 'white',
      fontSize: '20px',
      cursor: 'pointer'
    });
    closeButton.classList.add('button-glow');
    closeButton.addEventListener('click', () => {
      // Instead of removing, we hide the hub so it can be toggled back with the keybind
      rgbContainer.style.display = 'none';
    });
    rgbContainer.appendChild(closeButton);

    const minimizeButton = document.createElement('button');
    minimizeButton.innerText = '−';
    Object.assign(minimizeButton.style, {
      position: 'absolute',
      top: '8px',
      right: '50px',
      width: '30px',
      height: '30px',
      border: 'none',
      background: 'gray',
      color: 'white',
      fontSize: '20px',
      cursor: 'pointer'
    });
    minimizeButton.classList.add('button-glow');
    minimizeButton.addEventListener('click', () => {
      if (rgbContainer.style.height === '30px') {
        rgbContainer.style.height = '400px';
      } else {
        rgbContainer.style.height = '30px';
      }
    });
    rgbContainer.appendChild(minimizeButton);

    // Dropdown Styles
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
        z-index: 1,
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

    // Create Custom Dropdown
    function createCustomDropdown(dropdownConfig) {
      const dropdown = document.createElement('div');
      dropdown.className = 'custom-dropdown';

      const button = document.createElement('button');
      button.className = 'dropdown-btn';
      button.innerText = dropdownConfig.label;

      const content = document.createElement('div');
      content.className = 'dropdown-content';

      dropdownConfig.items.forEach((item) => {
        const link = document.createElement('a');
        link.innerText = item.title;
        if (item.url) {
          link.href = item.url;
          link.target = '_blank';
        } else if (item.theme) {
          link.href = '#';
          link.addEventListener('click', (e) => {
            e.preventDefault();
            setTheme(item.theme);
          });
        }
        content.appendChild(link);
      });

      dropdown.appendChild(button);
      dropdown.appendChild(content);

      return dropdown;
    }

    // Theme Switching Functionality
    function setTheme(themeName) {
      const theme = config.themes[themeName];
      if (theme) {
        rgbContainer.style.background = theme.background;
        rgbContainer.style.boxShadow = theme.boxShadow;
        try {
          localStorage.setItem('phoenixHubTheme', themeName);
        } catch (e) {
          console.error('Error saving theme to localStorage:', e);
        }
      }
    }

    // Apply Saved Theme
    function applySavedTheme() {
      let savedTheme = 'neon';
      try {
        savedTheme = localStorage.getItem('phoenixHubTheme') || 'neon';
      } catch (e) {
        console.error('Error reading theme from localStorage:', e);
      }
      setTheme(savedTheme);
    }

    applySavedTheme();

    // Global Keydown Listener for Key Bindings (using capturing phase)
    document.addEventListener('keydown', (e) => {
      // Avoid interfering when typing in inputs, textareas, or contenteditable elements
      const active = document.activeElement;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) return;

      if (e.code === keyBindings.toggleHub) {
        rgbContainer.style.display = rgbContainer.style.display === 'none' ? 'block' : 'none';
      }
      if (e.code === keyBindings.homeTab) {
        document.querySelector('[data-content="content1"]').click();
      }
      if (e.code === keyBindings.featuresTab) {
        document.querySelector('[data-content="content2"]').click();
      }
      if (e.code === keyBindings.chatTab) {
        document.querySelector('[data-content="content3"]').click();
      }
      if (e.code === keyBindings.aiTab) {
        document.querySelector('[data-content="content4"]').click();
      }
      if (e.code === keyBindings.bookmarksTab) {
        document.querySelector('[data-content="content5"]').click();
      }
      if (e.code === keyBindings.websitesTab) {
        document.querySelector('[data-content="content6"]').click();
      }
      if (e.code === keyBindings.keybindsTab) {
        document.querySelector('[data-content="content7"]').click();
      }
      // New key binding: destroy the UI completely
      if (e.code === keyBindings.destroyUI) {
        rgbContainer.remove();
      }
    }, true);

    // Initialize Default Tab
    document.querySelector('[data-content="content1"]').click();

    // At the end of successful initialization, remove the loading screen
    loadingOverlay.remove();

  } catch (error) {
    console.error('Error initializing Phoenix Hub:', error);
    loadingOverlay.innerHTML = safeHTML('');
    const errorMessage = document.createElement('div');
    errorMessage.innerText = 'An error occurred while loading Phoenix Hub.';
    Object.assign(errorMessage.style, {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#ff4c4c'
    });
    const errorDetails = document.createElement('div');
    errorDetails.innerText = error.message || 'Unknown error.';
    Object.assign(errorDetails.style, {
      fontSize: '18px',
      color: '#fff'
    });
    loadingOverlay.appendChild(errorMessage);
    loadingOverlay.appendChild(errorDetails);
  }
})();
