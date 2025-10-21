// Sample course data with icons
const courses = [
    {
        id: 1,
        title: 'Web Development Bootcamp',
        description: 'Learn full-stack web development with modern technologies including HTML, CSS, JavaScript, React, Node.js, and MongoDB.',
        category: 'Web Development',
        duration: '12 weeks',
        level: 'Beginner',
        rating: 4.8,
        students: 1250,
        lessons: 45,
        icon: 'laptop-code',
        iconColor: '#4f46e5',
        instructor: 'Sarah Johnson',
        price: 199.99,
        originalPrice: 299.99,
        featured: true
    },
    {
        id: 2,
        title: 'Data Science Fundamentals',
        description: 'Master the basics of data science, including Python, Pandas, NumPy, and data visualization with Matplotlib and Seaborn.',
        category: 'Data Science',
        duration: '10 weeks',
        level: 'Intermediate',
        rating: 4.7,
        students: 980,
        lessons: 38,
        icon: 'chart-line',
        iconColor: '#10b981',
        instructor: 'Michael Chen',
        price: 179.99,
        originalPrice: 249.99,
        featured: true
    },
    {
        id: 3,
        title: 'Mobile App Development with Flutter',
        description: 'Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase with Flutter and Dart.',
        category: 'Mobile Development',
        duration: '8 weeks',
        level: 'Intermediate',
        rating: 4.9,
        students: 750,
        lessons: 32,
        icon: 'mobile-alt',
        iconColor: '#3b82f6',
        instructor: 'David Kim',
        price: 159.99,
        originalPrice: 229.99,
        featured: true
    },
    {
        id: 4,
        title: 'UI/UX Design Masterclass',
        description: 'Learn user interface and user experience design principles, tools, and best practices to create stunning digital products.',
        category: 'Design',
        duration: '6 weeks',
        level: 'Beginner',
        rating: 4.6,
        students: 620,
        lessons: 28,
        icon: 'paint-brush',
        iconColor: '#8b5cf6',
        instructor: 'Emily Rodriguez',
        price: 149.99,
        originalPrice: 199.99,
        featured: true
    },
    {
        id: 5,
        title: 'Python for Beginners',
        description: 'Start your programming journey with Python. Learn the fundamentals and build real-world applications.',
        category: 'Programming',
        duration: '6 weeks',
        level: 'Beginner',
        rating: 4.5,
        students: 2100,
        lessons: 30,
        icon: 'python',
        iconColor: '#f59e0b',
        instructor: 'Alex Turner',
        price: 99.99,
        originalPrice: 149.99,
        featured: true
    },
    {
        id: 6,
        title: 'Advanced JavaScript Patterns',
        description: 'Dive deep into advanced JavaScript concepts, design patterns, and modern ES6+ features.',
        category: 'Web Development',
        duration: '8 weeks',
        level: 'Advanced',
        rating: 4.9,
        students: 890,
        lessons: 35,
        icon: 'js',
        iconColor: '#f59e0b',
        instructor: 'Chris Johnson',
        price: 179.99,
        originalPrice: 249.99,
        featured: true
    },
    {
        id: 7,
        title: 'Machine Learning with Python',
        description: 'Learn machine learning algorithms and how to implement them using Python and popular libraries like scikit-learn and TensorFlow.',
        category: 'Data Science',
        duration: '12 weeks',
        level: 'Intermediate',
        rating: 4.8,
        students: 1100,
        lessons: 42,
        icon: 'robot',
        iconColor: '#ec4899',
        instructor: 'Dr. Maria Garcia',
        price: 249.99,
        originalPrice: 349.99,
        featured: false
    },
    {
        id: 8,
        title: 'iOS App Development with SwiftUI',
        description: 'Build beautiful, responsive iOS applications using SwiftUI and the latest Apple development tools.',
        category: 'Mobile Development',
        duration: '10 weeks',
        level: 'Intermediate',
        rating: 4.7,
        students: 720,
        lessons: 36,
        icon: 'mobile',
        iconColor: '#3b82f6',
        instructor: 'James Wilson',
        price: 229.99,
        originalPrice: 299.99,
        featured: false
    }
];

// DOM Elements
const featuredCoursesContainer = document.getElementById('featuredCourses');
const coursesContainer = document.getElementById('coursesContainer');
const courseGrid = document.getElementById('courseGrid');
const searchInput = document.querySelector('.search-bar input');
const categoryFilter = document.getElementById('categoryFilter');
const levelFilter = document.getElementById('levelFilter');
const sortBy = document.getElementById('sortBy');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // If on homepage, display featured courses
    if (featuredCoursesContainer) {
        displayFeaturedCourses();
    }
    
    // If on courses page, initialize course listing
    if (courseGrid) {
        displayAllCourses();
        setupEventListeners();
    }
    
    // If on course detail page, initialize course data
    if (document.querySelector('.course-detail')) {
        initializeCourseDetailPage();
    }
});

// Display featured courses on homepage
function displayFeaturedCourses() {
    if (!featuredCoursesContainer) return;
    
    const featuredCourses = courses.filter(course => course.featured);
    
    if (featuredCourses.length === 0) {
        featuredCoursesContainer.innerHTML = '<p>No featured courses available at the moment.</p>';
        return;
    }
    
    featuredCoursesContainer.innerHTML = featuredCourses.map(course => createCourseCard(course)).join('');
}

// Display all courses on courses page
function displayAllCourses(filteredCourses = courses) {
    if (!courseGrid) return;
    
    if (filteredCourses.length === 0) {
        courseGrid.innerHTML = '<div class="no-results"><p>No courses found matching your criteria.</p></div>';
        return;
    }
    
    courseGrid.innerHTML = filteredCourses.map(course => createCourseCard(course, false)).join('');
}

// Create a course card element with icon
function createCourseCard(course, isFeatured = true) {
    const discountBadge = course.originalPrice > course.price 
        ? `<div class="discount-badge">${Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF</div>` 
        : '';
    
    const originalPrice = course.originalPrice > course.price 
        ? `<span class="original-price">$${course.originalPrice.toFixed(2)}</span>` 
        : '';
    
    // Generate a consistent background color based on the icon name
    const bgColor = `${course.iconColor}15`; // 10% opacity of the icon color
    
    return `
        <div class="course-card" data-category="${course.category.toLowerCase()}" data-level="${course.level.toLowerCase()}">
            ${discountBadge}
            <div class="course-icon" style="background-color: ${bgColor}; color: ${course.iconColor};">
                <i class="fas fa-${course.icon}"></i>
            </div>
            <div class="course-content">
                <span class="course-category">${course.category}</span>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span><i class="fas fa-star"></i> ${course.rating}</span>
                    <span><i class="fas fa-user-graduate"></i> ${course.students >= 1000 ? (course.students/1000).toFixed(1) + 'k' : course.students}</span>
                    <span><i class="fas fa-play-circle"></i> ${course.lessons} lessons</span>
                </div>
                <div class="course-footer">
                    <div class="course-price">
                        ${course.originalPrice > course.price 
                            ? `<span class="discounted-price">$${course.price.toFixed(2)}</span>
                               <span class="original-price">$${course.originalPrice.toFixed(2)}</span>`
                            : `$${course.price.toFixed(2)}`
                        }
                    </div>
                    <a href="course-detail.html?id=${course.id}" class="btn btn-primary">${isFeatured ? 'Enroll Now' : 'View Details'}</a>
                </div>
            </div>
        </div>
    `;
}

// Setup event listeners for filters and search
function setupEventListeners() {
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', filterCourses);
    }
    
    // Category filter
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterCourses);
    }
    
    // Level filter
    if (levelFilter) {
        levelFilter.addEventListener('change', filterCourses);
    }
    
    // Sort by
    if (sortBy) {
        sortBy.addEventListener('change', sortCourses);
    }
}

// Filter courses based on search and filters
function filterCourses() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const category = categoryFilter ? categoryFilter.value : 'all';
    const level = levelFilter ? levelFilter.value : 'all';
    
    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm) || 
                            course.description.toLowerCase().includes(searchTerm) ||
                            course.instructor.toLowerCase().includes(searchTerm);
        
        const matchesCategory = category === 'all' || 
                             course.category.toLowerCase() === category.toLowerCase();
        
        const matchesLevel = level === 'all' || 
                           course.level.toLowerCase() === level.toLowerCase();
        
        return matchesSearch && matchesCategory && matchesLevel;
    });
    
    displayAllCourses(filteredCourses);
}

// Sort courses based on selected option
function sortCourses() {
    if (!sortBy) return;
    
    const sortValue = sortBy.value;
    let sortedCourses = [...courses];
    
    switch(sortValue) {
        case 'price-asc':
            sortedCourses.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedCourses.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedCourses.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            // Assuming newer courses have higher IDs (for demo purposes)
            sortedCourses.sort((a, b) => b.id - a.id);
            break;
        default:
            // Default sorting (by title)
            sortedCourses.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    displayAllCourses(sortedCourses);
}

// Initialize course detail page
function initializeCourseDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('id'));
    
    if (isNaN(courseId)) {
        // Redirect to courses page if no valid ID is provided
        window.location.href = 'courses.html';
        return;
    }
    
    const course = courses.find(c => c.id === courseId);
    
    if (!course) {
        // Redirect to 404 page or show error message
        document.querySelector('.course-detail').innerHTML = `
            <div class="container">
                <div class="error-message">
                    <h2>Course Not Found</h2>
                    <p>The requested course could not be found. Please check the URL or return to the <a href="courses.html">courses page</a>.</p>
                </div>
            </div>
        `;
        return;
    }
    
    // Populate course details
    document.title = `${course.title} | EduLearn`;
    
    // Set meta description for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', course.description);
    }
    
    // Update course header
    const courseHeader = document.querySelector('.course-header');
    if (courseHeader) {
        const discountBadge = course.originalPrice > course.price 
            ? `<span class="discount-badge">${Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF</span>` 
            : '';
        
        const originalPrice = course.originalPrice > course.price 
            ? `<span class="original-price">$${course.originalPrice.toFixed(2)}</span>` 
            : '';
        
        courseHeader.innerHTML = `
            <div class="course-info">
                <h1>${course.title} ${discountBadge}</h1>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <span><i class="fas fa-star"></i> ${course.rating} (${Math.floor(course.students / 100) * 100}+ students)</span>
                    <span><i class="fas fa-user-graduate"></i> ${course.level}</span>
                    <span><i class="far fa-clock"></i> ${course.duration}</span>
                </div>
                <div class="course-instructor">
                    <div class="instructor-avatar">
                        <img src="https://i.pravatar.cc/100?u=${course.instructor.replace(/\s+/g, '')}" alt="${course.instructor}">
                    </div>
                    <div class="instructor-info">
                        <h4>${course.instructor}</h4>
                        <p class="instructor-title">Instructor</p>
                    </div>
                </div>
            </div>
            <div class="course-cta">
                <div class="course-price">$${course.price.toFixed(2)} ${originalPrice}</div>
                <div class="course-stats">
                    <div class="stat-item">
                        <div class="stat-value">${course.lessons}+</div>
                        <div class="stat-label">Lessons</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${course.duration}</div>
                        <div class="stat-label">Duration</div>
                    </div>
                </div>
                <div class="course-actions">
                    <button class="btn btn-primary btn-block">Enroll Now</button>
                    <button class="btn btn-outline btn-block">Add to Wishlist</button>
                </div>
                <div class="course-includes">
                    <h4>This course includes:</h4>
                    <ul>
                        <li><i class="fas fa-play-circle"></i> ${course.lessons} hours on-demand video</li>
                        <li><i class="far fa-file-alt"></i> 10+ downloadable resources</li>
                        <li><i class="fas fa-infinity"></i> Full lifetime access</li>
                        <li><i class="fas fa-mobile-alt"></i> Access on mobile and TV</li>
                        <li><i class="fas fa-trophy"></i> Certificate of completion</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    // Generate course syllabus
    const syllabus = document.querySelector('.course-syllabus');
    if (syllabus) {
        const modules = [
            {
                title: 'Getting Started',
                lessons: [
                    { id: 1, title: 'Introduction to the Course', duration: '5:20', preview: true },
                    { id: 2, title: 'Course Overview & Objectives', duration: '8:45' },
                    { id: 3, title: 'Setting Up Your Development Environment', duration: '12:30' },
                ]
            },
            {
                title: 'Fundamentals',
                lessons: [
                    { id: 4, title: 'Understanding the Basics', duration: '15:10' },
                    { id: 5, title: 'Core Concepts Explained', duration: '18:25' },
                    { id: 6, title: 'Hands-on Exercises', duration: '22:40' },
                ]
            },
            {
                title: 'Advanced Topics',
                lessons: [
                    { id: 7, title: 'Advanced Techniques', duration: '25:15' },
                    { id: 8, title: 'Real-world Applications', duration: '20:30' },
                    { id: 9, title: 'Case Studies', duration: '30:45' },
                ]
            },
            {
                title: 'Project Work',
                lessons: [
                    { id: 10, title: 'Project Introduction', duration: '10:20' },
                    { id: 11, title: 'Building the Application', duration: '45:30' },
                    { id: 12, title: 'Testing & Debugging', duration: '20:15' },
                    { id: 13, title: 'Deployment', duration: '15:50' },
                ]
            },
            {
                title: 'Next Steps',
                lessons: [
                    { id: 14, title: 'Additional Resources', duration: '8:30' },
                    { id: 15, title: 'Continuing Your Learning Journey', duration: '12:20' },
                    { id: 16, title: 'Course Wrap-up', duration: '5:10' },
                ]
            }
        ];
        
        let syllabusHTML = `
            <div class="syllabus-header">
                <h2 class="syllabus-title">Course Content</h2>
                <div class="syllabus-stats">
                    <span>${modules.length} modules • ${modules.reduce((acc, curr) => acc + curr.lessons.length, 0)} lessons • ${Math.floor(Math.random() * 10) + 5}h ${Math.floor(Math.random() * 60)}m total length</span>
                </div>
            </div>
            <div class="syllabus-tabs">
                <div class="syllabus-tab active">All</div>
                <div class="syllabus-tab">In Progress</div>
                <div class="syllabus-tab">Completed</div>
            </div>
        `;
        
        modules.forEach((module, index) => {
            const isFirst = index === 0;
            syllabusHTML += `
                <div class="module">
                    <div class="module-header ${isFirst ? 'active' : ''}">
                        <div class="module-title">
                            <i class="fas fa-chevron-right"></i>
                            <span>${module.title}</span>
                        </div>
                        <span class="module-lessons">${module.lessons.length} lessons</span>
                    </div>
                    <div class="module-content" ${isFirst ? 'style="display: block;"' : ''}>
                        ${module.lessons.map(lesson => `
                            <div class="lesson" data-lesson-id="${course.id}-${lesson.id}">
                                <div class="lesson-info">
                                    <span class="lesson-complete"><i class="fas fa-check"></i></span>
                                    <div>
                                        <div class="lesson-title">${lesson.title}</div>
                                        <div class="lesson-duration"><i class="far fa-clock"></i> ${lesson.duration}</div>
                                    </div>
                                </div>
                                ${lesson.preview ? '<a href="#" class="lesson-preview">Preview <i class="fas fa-external-link-alt"></i></a>' : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        
        syllabus.innerHTML = syllabusHTML;
    }
}

// Initialize course detail page if on that page
if (document.querySelector('.course-detail')) {
    initializeCourseDetailPage();
}
