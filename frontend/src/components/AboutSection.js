<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Matherror</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px);
        }
        
        .mission-icon {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .offer-icon {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        
        .dark-mode {
            background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
        }
        
        .text-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .toggle-checkbox:checked {
            right: 0;
            border-color: #667eea;
        }
        
        .toggle-checkbox:checked + .toggle-label {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
    </style>
</head>
<body class="bg-gray-100 text-gray-800 transition-colors duration-300">
    <div class="max-w-6xl w-full mx-auto">
        <!-- Header -->
        <header class="flex justify-between items-center mb-12 p-4 bg-white rounded-xl shadow-lg dark:bg-gray-800">
            <h1 class="text-2xl font-bold text-gradient">Matherror</h1>
            
            <!-- Dark mode toggle -->
            <div class="flex items-center">
                <span class="mr-2 text-sm text-gray-600 dark:text-gray-300">Light</span>
                <div class="relative inline-block w-12 h-6">
                    <input type="checkbox" class="toggle-checkbox opacity-0 w-0 h-0" id="dark-mode-toggle">
                    <label for="dark-mode-toggle" class="toggle-label block w-12 h-6 bg-gray-300 rounded-full cursor-pointer transition-colors duration-300"></label>
                </div>
                <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">Dark</span>
            </div>
        </header>

        <!-- About Section -->
        <section class="bg-white rounded-2xl shadow-xl overflow-hidden dark:bg-gray-800">
            <div class="md:flex">
                <!-- Image Section -->
                <div class="md:w-2/5 bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex flex-col justify-center items-center text-white">
                    <div class="w-32 h-32 rounded-full bg-white flex items-center justify-center mb-6">
                        <i class="fas fa-user-graduate text-6xl text-blue-500"></i>
                    </div>
                    <h2 class="text-2xl font-bold mb-2">Shakib</h2>
                    <p class="text-blue-100 mb-4">CSE Student</p>
                    <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4 w-full max-w-xs">
                        <h3 class="font-semibold mb-2">Quick Info</h3>
                        <p class="text-sm"><i class="fas fa-book mr-2"></i> Free PDF Resources</p>
                        <p class="text-sm"><i class="fas fa-link mr-2"></i> Class Links</p>
                        <p class="text-sm"><i class="fas fa-users mr-2"></i> WhatsApp Group</p>
                    </div>
                </div>
                
                <!-- Content Section -->
                <div class="md:w-3/5 p-8">
                    <h2 class="text-3xl font-bold mb-6 text-gray-800 dark:text-white">About Matherror</h2>
                    
                    <div class="space-y-4 mb-8">
                        <div class="flex items-start">
                            <div class="bg-blue-100 p-2 rounded-full mr-4 dark:bg-blue-900/30">
                                <i class="fas fa-graduation-cap text-blue-500"></i>
                            </div>
                            <p class="text-gray-600 dark:text-gray-300">
                                I am Shakib, a student of Computer Science and Engineering (CSE).
                            </p>
                        </div>
                        
                        <div class="flex items-start">
                            <div class="bg-green-100 p-2 rounded-full mr-4 dark:bg-green-900/30">
                                <i class="fas fa-bullseye text-green-500"></i>
                            </div>
                            <p class="text-gray-600 dark:text-gray-300">
                                The primary purpose behind creating this website is to consolidate all free PDF resources and important class links in one place. Often, these resources are difficult to find or get accidentally deleted.
                            </p>
                        </div>
                        
                        <div class="flex items-start">
                            <div class="bg-purple-100 p-2 rounded-full mr-4 dark:bg-purple-900/30">
                                <i class="fab fa-whatsapp text-purple-500"></i>
                            </div>
                            <p class="text-gray-600 dark:text-gray-300">
                                The website is named after one of my WhatsApp groups. There are plans to add more features in the future.
                            </p>
                        </div>
                        
                        <div class="flex items-start">
                            <div class="bg-yellow-100 p-2 rounded-full mr-4 dark:bg-yellow-900/30">
                                <i class="fas fa-code text-yellow-500"></i>
                            </div>
                            <p class="text-gray-600 dark:text-gray-300">
                                As it is a static website, I am somewhat uncertain about how far I can take it, but I intend to keep trying, Insha'Allah.
                            </p>
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="card bg-gray-50 p-6 rounded-xl dark:bg-gray-700">
                            <div class="mission-icon w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4">
                                <i class="fas fa-bullseye text-xl"></i>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Our Mission</h3>
                            <p class="text-gray-600 dark:text-gray-300">Making quality education accessible to every HSC student.</p>
                        </div>
                        
                        <div class="card bg-gray-50 p-6 rounded-xl dark:bg-gray-700">
                            <div class="offer-icon w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4">
                                <i class="fas fa-book-open text-xl"></i>
                            </div>
                            <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">What We Offer</h3>
                            <p class="text-gray-600 dark:text-gray-300">PDF notes, video lectures, and practice materials for all subjects.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Footer -->
        <footer class="mt-12 text-center text-gray-600 dark:text-gray-400">
            <p>© 2025 Matherror. All rights reserved.</p>
        </footer>
    </div>

    <script>
        // Dark mode toggle functionality
        const toggle = document.getElementById('dark-mode-toggle');
        const body = document.body;
        
        // Check for saved theme preference or respect OS preference
        if (localStorage.getItem('theme') === 'dark' || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'))) {
            body.classList.add('dark-mode');
            toggle.checked = true;
        }
        
        toggle.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    </script>
</body>
</html>
