// Simple component loader
function loadComponent(elementId, filePath) {
    console.log('Loading component:', elementId, filePath);
    fetch(filePath)
        .then(response => {
            console.log('Response status:', response.status);
            return response.text();
        })
        .then(data => {
            console.log('Data loaded for:', elementId);
            // Fix relative paths if we're in a subfolder
            if (window.location.pathname.includes('/posts/')) {
                data = data.replace(/href="index\.html"/g, 'href="../index.html"');
                data = data.replace(/href="blog-posts\.html"/g, 'href="../blog-posts.html"');
                data = data.replace(/src="images\//g, 'src="../images/');
            }
            document.getElementById(elementId).innerHTML = data;
            
            // Reinitialize functionality after loading
            if (elementId === 'sidebar-container') {
                setTimeout(function() {
                    var $sidebar = $('#sidebar');
                    if ($sidebar.length && !$sidebar.find('.toggle').length) {
                        $('<a href="#sidebar" class="toggle">Toggle</a>')
                            .appendTo($sidebar)
                            .on('click', function(event) {
                                event.preventDefault();
                                event.stopPropagation();
                                $sidebar.toggleClass('inactive');
                            });
                    }
                }, 100);
            }
            
            if (elementId === 'share-comments-container') {
                // Load Disqus
                setTimeout(function() {
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

// Load components
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, loading components...');
    
    const isInSubfolder = window.location.pathname.includes('/posts/');
    const basePath = isInSubfolder ? '../' : '';
    
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