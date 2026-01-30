// Simple component loader
function loadComponent(elementId, filePath) {
	console.log('Loading component:', elementId, filePath);
	fetch(filePath + '?v=' + new Date().getTime())
		.then(response => {
			console.log('Response status:', response.status);
			// Check if the response is successful (status 200-299)
			if (!response.ok) {
				console.warn(`Component not found: ${filePath} (${response.status})`);
				return ''; // Return empty string for missing components
			}
			return response.text();
		})
		.then(data => {
			// Only inject if we have data
			if (!data) {
				console.log(`Skipping empty component: ${elementId}`);
				return;
			}

			console.log('Data loaded for:', elementId);
			// Fix relative paths if we're in a subfolder
			if (window.location.pathname.includes('/posts/')) {
				let relPath = '../';
				if (window.location.pathname.match(/\/posts\/\d{4}\//)) {
					relPath = '../../';
				}

				data = data.replace(/href="index\.html"/g, `href="${relPath}index.html"`);
				data = data.replace(/href="about\.html"/g, `href="${relPath}about.html"`);
				data = data.replace(/href="blog-posts\.html"/g, `href="${relPath}blog-posts.html"`);
				data = data.replace(/href="posts\//g, `href="${relPath}posts/`);
				data = data.replace(/src="images\//g, `src="${relPath}images/`);
			}
			document.getElementById(elementId).innerHTML = data;

			// Reinitialize functionality after loading
			if (elementId === 'sidebar-container') {
				setTimeout(function () {
					var $sidebar = $('#sidebar');
					if ($sidebar.length && !$sidebar.find('.toggle').length) {
						// Check if breakpoints is available (from main.js)
						if (typeof breakpoints !== 'undefined') {
							// Get saved state from localStorage
							var sidebarState = localStorage.getItem('sidebarState');

							// On mobile/tablet (<=large), ALWAYS default to inactive for better UX
							// This prevents the sidebar from blocking content on mobile
							if (breakpoints.active('<=large')) {
								// Always start inactive on mobile, ignore localStorage
								$sidebar.addClass('inactive');
							} else {
								// On desktop (>large), respect user preference or default to active
								if (sidebarState === 'inactive') {
									$sidebar.addClass('inactive');
								} else {
									$sidebar.removeClass('inactive');
								}
							}
						}

						$('<a href="#sidebar" class="toggle">Toggle</a>')
							.appendTo($sidebar)
							.on('click', function (event) {
								event.preventDefault();
								event.stopPropagation();
								$sidebar.toggleClass('inactive');

								// Save sidebar state to localStorage
								if ($sidebar.hasClass('inactive')) {
									localStorage.setItem('sidebarState', 'inactive');
								} else {
									localStorage.setItem('sidebarState', 'active');
								}
							});
					}
				}, 100);
			}

			if (elementId === 'share-comments-container') {
				// Load Disqus
				setTimeout(function () {
					const disqusScript = document.createElement('script');
					disqusScript.src = 'https://tushargupta-github-io.disqus.com/embed.js';
					disqusScript.setAttribute('data-timestamp', +new Date());
					document.head.appendChild(disqusScript);
				}, 500);
			}
		})
		.catch(error => {
			console.error('Error loading component:', elementId, error);
		});
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
	console.log('DOM loaded, initializing components...');

	let basePath = '';
	if (window.location.pathname.match(/\/posts\/\d{4}\//)) {
		basePath = '../../';
	} else if (window.location.pathname.includes('/posts/')) {
		basePath = '../';
	}

	if (document.getElementById('header-container')) {
		loadComponent('header-container', basePath + 'includes/header.html');
	}

	if (document.getElementById('sidebar-container')) {
		loadComponent('sidebar-container', basePath + 'includes/sidebar.html');
	}

	if (document.getElementById('share-comments-container')) {
		loadComponent('share-comments-container', basePath + 'includes/share-comments.html');
	}

	if (document.getElementById('cta-section-container')) {
		loadComponent('cta-section-container', basePath + 'includes/cta-section.html');
	}
});