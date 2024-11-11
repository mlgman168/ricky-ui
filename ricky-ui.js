(function() {
  if (document.querySelector('#rgbContainer')) return;

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
  rgbContainer.style.background = 'black';
  rgbContainer.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
  rgbContainer.style.overflow = 'hidden';
  rgbContainer.style.transition = 'height 0.3s ease';
  document.body.appendChild(rgbContainer);

  const topBar = document.createElement('div');
  topBar.style.width = '100%';
  topBar.style.height = '30px';
  topBar.style.background = 'rgba(255, 255, 255, 0.1)';
  topBar.style.display = 'flex';
  topBar.style.alignItems = 'center';
  topBar.style.justifyContent = 'center';
  topBar.style.cursor = 'grab';
  rgbContainer.appendChild(topBar);

  const title = document.createElement('h2');
  title.innerText = "Ricky's UI";
  title.style.color = 'white';
  title.style.margin = '0';
  title.style.fontSize = '16px';
  title.style.overflow = 'hidden';
  topBar.appendChild(title);

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
    tab.style.transition = 'background 0.3s';
    tab.style.borderBottom = '2px solid transparent';
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

  tabNav.appendChild(createTab('Tab 1', 'content1'));
  tabNav.appendChild(createTab('Tab 2', 'content2'));
  tabNav.appendChild(createTab('Tab 3', 'content3'));
  tabNav.appendChild(createTab('Tab 4', 'content4'));
  tabNav.appendChild(createTab('Tab 5', 'content5'));

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
  }

  createTabContent('content1', '<span id="welcomeText">Welcome to Ricky\'s Awesome UI!</span>');
  createTabContent('content2', 'This is Tab 2 content.');

  // Tab 3: Embedded iframe with scroll
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

  // Tab 4: Another iframe
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

  // Tab 5: Bookmark Manager
  createTabContent('content5', '');
  const content5 = document.getElementById('content5');
  content5.style.display = 'none';
  content5.style.height = '100%';
  content5.style.overflow = 'auto';

  // Create bookmark manager container
  const bookmarkContainer = document.createElement('div');
  bookmarkContainer.style.padding = '10px';
  bookmarkContainer.style.height = '100%';
  bookmarkContainer.style.display = 'flex';
  bookmarkContainer.style.flexDirection = 'column';
  bookmarkContainer.style.gap = '10px';

  // Add bookmark form
  const bookmarkForm = document.createElement('form');
  bookmarkForm.innerHTML = `
    <input type="text" id="bookmarkTitle" placeholder="Title" style="margin-right: 5px; padding: 5px;">
    <input type="url" id="bookmarkUrl" placeholder="URL" style="margin-right: 5px; padding: 5px;">
    <button type="submit" style="padding: 5px 10px; background: #4CAF50; color: white; border: none; cursor: pointer;">Add Bookmark</button>
  `;

  // Bookmark list container
  const bookmarkList = document.createElement('div');
  bookmarkList.style.flex = '1';
  bookmarkList.style.overflow = 'auto';

  // Load existing bookmarks from localStorage
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

  // Function to render bookmarks
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
        <button onclick="deleteBookmark(${index})" style="padding: 5px 10px; background: #f44336; color: white; border: none; cursor: pointer;">Delete</button>
      `;
      bookmarkList.appendChild(bookmarkElement);
    });
  }

  // Add bookmark handler
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

  // Delete bookmark function
  window.deleteBookmark = (index) => {
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    renderBookmarks();
  };

  // Append elements to container
  bookmarkContainer.appendChild(bookmarkForm);
  bookmarkContainer.appendChild(bookmarkList);
  content5.appendChild(bookmarkContainer);

  // Initial render
  renderBookmarks();

  // RGB Border Effect
  let hue = 0;
  function updateRGB() {
    hue = (hue + 1) % 360;
    rgbContainer.style.borderColor = `hsl(${hue}, 100%, 50%)`;
    rgbContainer.style.boxShadow = `0 0 15px hsl(${hue}, 100%, 50%)`;
    requestAnimationFrame(updateRGB);
  }
  updateRGB();

  // RGB Welcome Effect
  const welcomeText = document.getElementById('welcomeText');
  let welcomeHue = 0;
  function updateWelcomeRGB() {
    welcomeHue = (welcomeHue + 1) % 360;
    welcomeText.style.color = `hsl(${welcomeHue}, 100%, 70%)`;
    requestAnimationFrame(updateWelcomeRGB);
  }
  updateWelcomeRGB();

  // Drag functionality
  let isDragging = false;
  let offsetX, offsetY;

  topBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - rgbContainer.getBoundingClientRect().left;
    offsetY = e.clientY - rgbContainer.getBoundingClientRect().top;
    topBar.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      rgbContainer.style.left = `${e.clientX - offsetX}px`;
      rgbContainer.style.top = `${e.clientY - offsetY}px`;
      rgbContainer.style.transform = '';
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      topBar.style.cursor = 'grab';
      localStorage.setItem('uiPosition', JSON.stringify({ left: rgbContainer.style.left, top: rgbContainer.style.top }));
    }
  });

  const savedPosition = JSON.parse(localStorage.getItem('uiPosition'));
  if (savedPosition) {
    rgbContainer.style.left = savedPosition.left;
    rgbContainer.style.top = savedPosition.top;
    rgbContainer.style.transform = '';
  }

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
  minimizeButton.addEventListener('click', () => {
    rgbContainer.style.height = rgbContainer.style.height === '30px' ? '400px' : '30px';
  });
  rgbContainer.appendChild(minimizeButton);

  document.querySelector('[data-content="content1"]').click();
})();
