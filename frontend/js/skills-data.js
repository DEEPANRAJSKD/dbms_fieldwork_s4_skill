// Comprehensive Skills Database - 50+ Skills Across Categories
const skillsDatabase = {
    technical: [
        {
            id: "javascript",
            name: "JavaScript",
            description: "Modern JavaScript programming including ES6+ features",
            resources: [
                { type: "course", title: "JavaScript: The Complete Guide", provider: "Udemy", duration: "40 hours", url: "https://www.udemy.com/course/javascript-complete-guide" },
                { type: "tutorial", title: "MDN JavaScript Guide", provider: "Mozilla", duration: "Self-paced", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
                { type: "practice", title: "JavaScript Exercises", provider: "Codewars", duration: "Ongoing", url: "https://www.codewars.com" }
            ],
            mcqQuestions: [
                {
                    question: "What is the output of: console.log(typeof null)?",
                    options: ["null", "undefined", "object", "string"],
                    correct: 2,
                    explanation: "In JavaScript, typeof null returns 'object' - this is a known bug in the language."
                },
                {
                    question: "Which method adds an element to the end of an array?",
                    options: ["push()", "pop()", "shift()", "unshift()"],
                    correct: 0,
                    explanation: "push() adds elements to the end of an array, while pop() removes from the end."
                }
            ]
        },
        {
            id: "python",
            name: "Python",
            description: "Python programming for web development, data science, and automation",
            resources: [
                { type: "course", title: "Python for Data Science", provider: "Coursera", duration: "60 hours", url: "https://www.coursera.org/learn/python-for-data-science" },
                { type: "tutorial", title: "Python.org Tutorial", provider: "Python Software Foundation", duration: "Self-paced", url: "https://docs.python.org/3/tutorial/" },
                { type: "practice", title: "Python Challenges", provider: "HackerRank", duration: "Ongoing", url: "https://www.hackerrank.com/domains/python" }
            ],
            mcqQuestions: [
                {
                    question: "What is the correct file extension for Python files?",
                    options: [".py", ".python", ".pyt", ".pt"],
                    correct: 0,
                    explanation: "Python files use the .py extension."
                },
                {
                    question: "Which keyword is used to define a function in Python?",
                    options: ["function", "def", "func", "define"],
                    correct: 1,
                    explanation: "The 'def' keyword is used to define functions in Python."
                }
            ]
        },
        {
            id: "react",
            name: "React",
            description: "Modern React development with hooks and state management",
            resources: [
                { type: "course", title: "React - The Complete Guide", provider: "Udemy", duration: "48 hours", url: "https://www.udemy.com/course/react-complete-guide" },
                { type: "tutorial", title: "React Documentation", provider: "Facebook", duration: "Self-paced", url: "https://reactjs.org/docs" },
                { type: "practice", title: "React Projects", provider: "GitHub", duration: "Ongoing", url: "https://github.com/topics/react" }
            ],
            mcqQuestions: [
                {
                    question: "What hook is used for state management in functional components?",
                    options: ["useState", "useEffect", "useContext", "useReducer"],
                    correct: 0,
                    explanation: "useState is the primary hook for managing state in functional components."
                }
            ]
        },
        {
            id: "nodejs",
            name: "Node.js",
            description: "Server-side JavaScript with Node.js and Express",
            resources: [
                { type: "course", title: "Node.js Complete Guide", provider: "Udemy", duration: "36 hours", url: "https://www.udemy.com/course/nodejs-complete-guide" },
                { type: "tutorial", title: "Node.js Documentation", provider: "OpenJS Foundation", duration: "Self-paced", url: "https://nodejs.org/en/docs/" }
            ],
            mcqQuestions: [
                {
                    question: "What is npm?",
                    options: ["Node Package Manager", "New Project Manager", "Node Program Manager", "Network Package Manager"],
                    correct: 0,
                    explanation: "npm stands for Node Package Manager and is used to install Node.js packages."
                }
            ]
        },
        {
            id: "sql",
            name: "SQL",
            description: "Database management with SQL queries and optimization",
            resources: [
                { type: "course", title: "SQL for Beginners", provider: "Khan Academy", duration: "20 hours", url: "https://www.khanacademy.org/computing/computer-programming/sql" },
                { type: "tutorial", title: "W3Schools SQL", provider: "W3Schools", duration: "Self-paced", url: "https://www.w3schools.com/sql/" }
            ],
            mcqQuestions: [
                {
                    question: "Which SQL statement is used to retrieve data from a database?",
                    options: ["GET", "RETRIEVE", "SELECT", "FETCH"],
                    correct: 2,
                    explanation: "The SELECT statement is used to retrieve data from database tables."
                }
            ]
        },
        {
            id: "git",
            name: "Git",
            description: "Version control with Git and GitHub collaboration",
            resources: [
                { type: "course", title: "Git Complete Course", provider: "Udemy", duration: "24 hours", url: "https://www.udemy.com/course/git-complete" },
                { type: "tutorial", title: "Pro Git Book", provider: "Git", duration: "Self-paced", url: "https://git-scm.com/book" }
            ],
            mcqQuestions: [
                {
                    question: "Which command creates a new repository?",
                    options: ["git init", "git start", "git create", "git new"],
                    correct: 0,
                    explanation: "git init initializes a new Git repository."
                }
            ]
        },
        {
            id: "docker",
            name: "Docker",
            description: "Containerization and deployment with Docker",
            resources: [
                { type: "course", title: "Docker Mastery", provider: "Udemy", duration: "16 hours", url: "https://www.udemy.com/course/docker-mastery" },
                { type: "tutorial", title: "Docker Documentation", provider: "Docker", duration: "Self-paced", url: "https://docs.docker.com/" }
            ],
            mcqQuestions: [
                {
                    question: "What is a Docker image?",
                    options: ["A running container", "A template for containers", "A virtual machine", "A configuration file"],
                    correct: 1,
                    explanation: "A Docker image is a template used to create containers."
                }
            ]
        },
        {
            id: "htmlcss",
            name: "HTML/CSS",
            description: "Modern web development with HTML5 and CSS3",
            resources: [
                { type: "course", title: "HTML & CSS Course", provider: "freeCodeCamp", duration: "300 hours", url: "https://www.freecodecamp.org/learn/responsive-web-design/" },
                { type: "tutorial", title: "MDN Web Docs", provider: "Mozilla", duration: "Self-paced", url: "https://developer.mozilla.org/en-US/docs/Web" }
            ],
            mcqQuestions: [
                {
                    question: "Which CSS property is used to change text color?",
                    options: ["text-color", "color", "font-color", "text-style"],
                    correct: 1,
                    explanation: "The 'color' property is used to set the text color in CSS."
                }
            ]
        },
        {
            id: "typescript",
            name: "TypeScript",
            description: "Type-safe JavaScript development with TypeScript",
            resources: [
                { type: "course", title: "TypeScript Course", provider: "Udemy", duration: "28 hours", url: "https://www.udemy.com/course/typescript-course" },
                { type: "tutorial", title: "TypeScript Handbook", provider: "Microsoft", duration: "Self-paced", url: "https://www.typescriptlang.org/docs/" }
            ],
            mcqQuestions: [
                {
                    question: "What is the main benefit of TypeScript?",
                    options: ["Faster execution", "Type safety", "Smaller file size", "Better syntax"],
                    correct: 1,
                    explanation: "TypeScript's main benefit is adding type safety to JavaScript."
                }
            ]
        },
        {
            id: "mongodb",
            name: "MongoDB",
            description: "NoSQL database management with MongoDB",
            resources: [
                { type: "course", title: "MongoDB University", provider: "MongoDB", duration: "40 hours", url: "https://university.mongodb.com/" },
                { type: "tutorial", title: "MongoDB Docs", provider: "MongoDB", duration: "Self-paced", url: "https://docs.mongodb.com/" }
            ],
            mcqQuestions: [
                {
                    question: "What type of database is MongoDB?",
                    options: ["Relational", "NoSQL", "Graph", "Time-series"],
                    correct: 1,
                    explanation: "MongoDB is a NoSQL document-oriented database."
                }
            ]
        },
        {
            id: "aws",
            name: "AWS",
            description: "Cloud computing with Amazon Web Services",
            resources: [
                { type: "course", title: "AWS Cloud Practitioner", provider: "Udemy", duration: "32 hours", url: "https://www.udemy.com/course/aws-cloud-practitioner" },
                { type: "tutorial", title: "AWS Documentation", provider: "Amazon", duration: "Self-paced", url: "https://docs.aws.amazon.com/" }
            ],
            mcqQuestions: [
                {
                    question: "What does AWS stand for?",
                    options: ["Amazon Web Services", "Advanced Web Solutions", "Automated Web Systems", "Application Web Services"],
                    correct: 0,
                    explanation: "AWS stands for Amazon Web Services."
                }
            ]
        },
        {
            id: "vuejs",
            name: "Vue.js",
            description: "Progressive JavaScript framework for building UIs",
            resources: [
                { type: "course", title: "Vue.js Complete Guide", provider: "Udemy", duration: "36 hours", url: "https://www.udemy.com/course/vuejs-complete-guide" },
                { type: "tutorial", title: "Vue.js Documentation", provider: "Vue Team", duration: "Self-paced", url: "https://vuejs.org/guide/" }
            ],
            mcqQuestions: [
                {
                    question: "What directive is used for conditional rendering in Vue?",
                    options: ["v-if", "v-show", "v-else", "All of the above"],
                    correct: 3,
                    explanation: "Vue provides v-if, v-show, and v-else for conditional rendering."
                }
            ]
        }
    ],
    
    design: [
        {
            id: "uiux",
            name: "UI/UX Design",
            description: "User interface and user experience design principles",
            resources: [
                { type: "course", title: "UI/UX Design Bootcamp", provider: "Udemy", duration: "44 hours", url: "https://www.udemy.com/course/ui-ux-design-bootcamp" },
                { type: "tutorial", title: "Nielsen Norman Group", provider: "NN/g", duration: "Self-paced", url: "https://www.nngroup.com/" }
            ],
            mcqQuestions: [
                {
                    question: "What does UX stand for?",
                    options: ["User Experience", "User Interface", "User Exchange", "User Expert"],
                    correct: 0,
                    explanation: "UX stands for User Experience."
                }
            ]
        },
        {
            id: "figma",
            name: "Figma",
            description: "Collaborative design tool for UI/UX design",
            resources: [
                { type: "course", title: "Figma Complete Course", provider: "Udemy", duration: "20 hours", url: "https://www.udemy.com/course/figma-complete-course" },
                { type: "tutorial", title: "Figma Help Center", provider: "Figma", duration: "Self-paced", url: "https://help.figma.com/" }
            ],
            mcqQuestions: [
                {
                    question: "What is Figma primarily used for?",
                    options: ["Coding", "Design", "Database management", "Video editing"],
                    correct: 1,
                    explanation: "Figma is primarily used for UI/UX design and prototyping."
                }
            ]
        },
        {
            id: "photoshop",
            name: "Adobe Photoshop",
            description: "Professional image editing and graphic design",
            resources: [
                { type: "course", title: "Photoshop CC Course", provider: "Udemy", duration: "32 hours", url: "https://www.udemy.com/course/photoshop-cc-course" },
                { type: "tutorial", title: "Adobe Photoshop Tutorials", provider: "Adobe", duration: "Self-paced", url: "https://helpx.adobe.com/photoshop/tutorials.html" }
            ],
            mcqQuestions: [
                {
                    question: "What file format is best for web images with transparency?",
                    options: ["JPEG", "PNG", "GIF", "BMP"],
                    correct: 1,
                    explanation: "PNG is the best format for web images that require transparency."
                }
            ]
        },
        {
            id: "illustrator",
            name: "Adobe Illustrator",
            description: "Vector graphics creation and illustration",
            resources: [
                { type: "course", title: "Illustrator CC Course", provider: "Udemy", duration: "28 hours", url: "https://www.udemy.com/course/illustrator-cc-course" },
                { type: "tutorial", title: "Adobe Illustrator Tutorials", provider: "Adobe", duration: "Self-paced", url: "https://helpx.adobe.com/illustrator/tutorials.html" }
            ],
            mcqQuestions: [
                {
                    question: "What type of graphics does Illustrator create?",
                    options: ["Raster", "Vector", "3D", "Animated"],
                    correct: 1,
                    explanation: "Illustrator creates vector graphics that can be scaled without losing quality."
                }
            ]
        },
        {
            id: "sketch",
            name: "Sketch",
            description: "Digital design platform for UI/UX design",
            resources: [
                { type: "course", title: "Sketch Design Course", provider: "Udemy", duration: "16 hours", url: "https://www.udemy.com/course/sketch-design-course" },
                { type: "tutorial", title: "Sketch Documentation", provider: "Sketch", duration: "Self-paced", url: "https://www.sketch.com/docs/" }
            ],
            mcqQuestions: [
                {
                    question: "Sketch is primarily used for what type of design?",
                    options: ["Web design", "Print design", "Video editing", "3D modeling"],
                    correct: 0,
                    explanation: "Sketch is primarily used for web and mobile UI/UX design."
                }
            ]
        },
        {
            id: "adobexd",
            name: "Adobe XD",
            description: "UI/UX design and prototyping tool",
            resources: [
                { type: "course", title: "Adobe XD Course", provider: "Udemy", duration: "24 hours", url: "https://www.udemy.com/course/adobe-xd-course" },
                { type: "tutorial", title: "Adobe XD Tutorials", provider: "Adobe", duration: "Self-paced", url: "https://helpx.adobe.com/xd/tutorials.html" }
            ],
            mcqQuestions: [
                {
                    question: "What does XD stand for in Adobe XD?",
                    options: ["Experience Design", "Extended Design", "Expert Design", "Express Design"],
                    correct: 0,
                    explanation: "XD stands for Experience Design."
                }
            ]
        },
        {
            id: "invision",
            name: "InVision",
            description: "Digital product design platform and prototyping",
            resources: [
                { type: "course", title: "InVision Studio Course", provider: "Udemy", duration: "18 hours", url: "https://www.udemy.com/course/invision-studio-course" },
                { type: "tutorial", title: "InVision Help Center", provider: "InVision", duration: "Self-paced", url: "https://support.invisionapp.com/" }
            ],
            mcqQuestions: [
                {
                    question: "What is InVision primarily used for?",
                    options: ["Coding", "Prototyping", "Database management", "Video editing"],
                    correct: 1,
                    explanation: "InVision is primarily used for creating interactive prototypes."
                }
            ]
        },
        {
            id: "typography",
            name: "Typography",
            description: "Art and technique of arranging type",
            resources: [
                { type: "course", title: "Typography Course", provider: "Coursera", duration: "12 hours", url: "https://www.coursera.org/learn/typography" },
                { type: "tutorial", title: "Google Fonts", provider: "Google", duration: "Self-paced", url: "https://fonts.google.com/" }
            ],
            mcqQuestions: [
                {
                    question: "What is kerning?",
                    options: ["Line spacing", "Letter spacing", "Font size", "Font weight"],
                    correct: 1,
                    explanation: "Kerning refers to the spacing between individual letters."
                }
            ]
        }
    ],
    
    business: [
        {
            id: "projectmanagement",
            name: "Project Management",
            description: "Planning, executing, and managing projects effectively",
            resources: [
                { type: "course", title: "PMP Certification", provider: "PMI", duration: "40 hours", url: "https://www.pmi.org/" },
                { type: "tutorial", title: "Project Management Institute", provider: "PMI", duration: "Self-paced", url: "https://www.pmi.org/learning/" }
            ],
            mcqQuestions: [
                {
                    question: "What does PMP stand for?",
                    options: ["Project Management Professional", "Program Management Professional", "Project Master Professional", "Process Management Professional"],
                    correct: 0,
                    explanation: "PMP stands for Project Management Professional."
                }
            ]
        },
        {
            id: "agile",
            name: "Agile Methodology",
            description: "Iterative project management and software development",
            resources: [
                { type: "course", title: "Agile Project Management", provider: "Udemy", duration: "24 hours", url: "https://www.udemy.com/course/agile-project-management" },
                { type: "tutorial", title: "Agile Alliance", provider: "Agile Alliance", duration: "Self-paced", url: "https://www.agilealliance.org/" }
            ],
            mcqQuestions: [
                {
                    question: "What is a sprint in Agile?",
                    options: ["A race", "A time-boxed iteration", "A planning meeting", "A testing phase"],
                    correct: 1,
                    explanation: "A sprint is a time-boxed iteration in Agile development."
                }
            ]
        },
        {
            id: "dataanalysis",
            name: "Data Analysis",
            description: "Analyzing and interpreting business data",
            resources: [
                { type: "course", title: "Data Analysis Course", provider: "Coursera", duration: "36 hours", url: "https://www.coursera.org/learn/data-analysis" },
                { type: "tutorial", title: "Kaggle Learn", provider: "Kaggle", duration: "Self-paced", url: "https://www.kaggle.com/learn/" }
            ],
            mcqQuestions: [
                {
                    question: "What is the most common data visualization tool?",
                    options: ["Excel", "Tableau", "Power BI", "All of the above"],
                    correct: 3,
                    explanation: "Excel, Tableau, and Power BI are all popular data visualization tools."
                }
            ]
        },
        {
            id: "marketing",
            name: "Digital Marketing",
            description: "Online marketing strategies and campaigns",
            resources: [
                { type: "course", title: "Digital Marketing Course", provider: "Google", duration: "40 hours", url: "https://learndigital.withgoogle.com/" },
                { type: "tutorial", title: "HubSpot Academy", provider: "HubSpot", duration: "Self-paced", url: "https://academy.hubspot.com/" }
            ],
            mcqQuestions: [
                {
                    question: "What does SEO stand for?",
                    options: ["Search Engine Optimization", "Social Engagement Optimization", "Site Enhancement Options", "Search Engine Operations"],
                    correct: 0,
                    explanation: "SEO stands for Search Engine Optimization."
                }
            ]
        },
        {
            id: "sales",
            name: "Sales Management",
            description: "Sales strategies and customer relationship management",
            resources: [
                { type: "course", title: "Sales Training", provider: "Salesforce", duration: "28 hours", url: "https://trailhead.salesforce.com/" },
                { type: "tutorial", title: "Sales Management Guide", provider: "Harvard Business Review", duration: "Self-paced", url: "https://hbr.org/" }
            ],
            mcqQuestions: [
                {
                    question: "What is CRM?",
                    options: ["Customer Relationship Management", "Customer Resource Management", "Client Relationship Marketing", "Customer Retention Management"],
                    correct: 0,
                    explanation: "CRM stands for Customer Relationship Management."
                }
            ]
        },
        {
            id: "finance",
            name: "Financial Analysis",
            description: "Financial planning and business analysis",
            resources: [
                { type: "course", title: "Financial Analysis Course", provider: "Coursera", duration: "32 hours", url: "https://www.coursera.org/learn/financial-analysis" },
                { type: "tutorial", title: "Investopedia", provider: "Investopedia", duration: "Self-paced", url: "https://www.investopedia.com/" }
            ],
            mcqQuestions: [
                {
                    question: "What does ROI stand for?",
                    options: ["Return on Investment", "Rate of Interest", "Revenue on Investment", "Risk of Investment"],
                    correct: 0,
                    explanation: "ROI stands for Return on Investment."
                }
            ]
        },
        {
            id: "entrepreneurship",
            name: "Entrepreneurship",
            description: "Starting and managing business ventures",
            resources: [
                { type: "course", title: "Entrepreneurship Course", provider: "edX", duration: "24 hours", url: "https://www.edx.org/learn/entrepreneurship" },
                { type: "tutorial", title: "Entrepreneur", provider: "Entrepreneur Magazine", duration: "Self-paced", url: "https://www.entrepreneur.com/" }
            ],
            mcqQuestions: [
                {
                    question: "What is a business plan?",
                    options: ["A financial document", "A strategic document", "A legal document", "All of the above"],
                    correct: 3,
                    explanation: "A business plan includes financial, strategic, and legal aspects."
                }
            ]
        },
        {
            id: "consulting",
            name: "Business Consulting",
            description: "Providing expert advice to businesses",
            resources: [
                { type: "course", title: "Consulting Skills", provider: "LinkedIn Learning", duration: "20 hours", url: "https://www.linkedin.com/learning/" },
                { type: "tutorial", title: "McKinsey Insights", provider: "McKinsey", duration: "Self-paced", url: "https://www.mckinsey.com/insights/" }
            ],
            mcqQuestions: [
                {
                    question: "What is the primary role of a consultant?",
                    options: ["To manage teams", "To provide expert advice", "To code solutions", "To design products"],
                    correct: 1,
                    explanation: "The primary role of a consultant is to provide expert advice to organizations."
                }
            ]
        }
    ],
    
    soft: [
        {
            id: "communication",
            name: "Communication",
            description: "Effective verbal and written communication skills",
            resources: [
                { type: "course", title: "Communication Skills", provider: "Coursera", duration: "16 hours", url: "https://www.coursera.org/learn/communication-skills" },
                { type: "tutorial", title: "Toastmasters International", provider: "Toastmasters", duration: "Self-paced", url: "https://www.toastmasters.org/" }
            ],
            mcqQuestions: [
                {
                    question: "What is active listening?",
                    options: ["Speaking loudly", "Focusing completely on the speaker", "Taking notes only", "Interrupting politely"],
                    correct: 1,
                    explanation: "Active listening involves focusing completely on the speaker and understanding their message."
                }
            ]
        },
        {
            id: "leadership",
            name: "Leadership",
            description: "Leading teams and inspiring others",
            resources: [
                { type: "course", title: "Leadership Development", provider: "Harvard Business School", duration: "32 hours", url: "https://online.hbs.edu/" },
                { type: "tutorial", title: "Mind Tools", provider: "Mind Tools", duration: "Self-paced", url: "https://www.mindtools.com/" }
            ],
            mcqQuestions: [
                {
                    question: "What is the most important leadership quality?",
                    options: ["Technical skills", "Communication", "Vision", "All of the above"],
                    correct: 3,
                    explanation: "Effective leadership requires a combination of technical skills, communication, and vision."
                }
            ]
        },
        {
            id: "problemsolving",
            name: "Problem Solving",
            description: "Analytical thinking and creative problem-solving",
            resources: [
                { type: "course", title: "Problem Solving Course", provider: "edX", duration: "20 hours", url: "https://www.edx.org/learn/problem-solving" },
                { type: "tutorial", title: "MIT OpenCourseWare", provider: "MIT", duration: "Self-paced", url: "https://ocw.mit.edu/" }
            ],
            mcqQuestions: [
                {
                    question: "What is the first step in problem solving?",
                    options: ["Brainstorming solutions", "Identifying the problem", "Implementing solutions", "Evaluating results"],
                    correct: 1,
                    explanation: "The first step in problem solving is clearly identifying and understanding the problem."
                }
            ]
        },
        {
            id: "teamwork",
            name: "Teamwork",
            description: "Collaborating effectively in team environments",
            resources: [
                { type: "course", title: "Team Collaboration", provider: "LinkedIn Learning", duration: "12 hours", url: "https://www.linkedin.com/learning/" },
                { type: "tutorial", title: "Atlassian Team Playbook", provider: "Atlassian", duration: "Self-paced", url: "https://www.atlassian.com/team-playbook" }
            ],
            mcqQuestions: [
                {
                    question: "What is essential for effective teamwork?",
                    options: ["Individual work", "Clear communication", "Strict hierarchy", "Competition"],
                    correct: 1,
                    explanation: "Clear communication is essential for effective teamwork."
                }
            ]
        },
        {
            id: "timemanagement",
            name: "Time Management",
            description: "Prioritizing tasks and managing time effectively",
            resources: [
                { type: "course", title: "Time Management", provider: "Udemy", duration: "8 hours", url: "https://www.udemy.com/course/time-management" },
                { type: "tutorial", title: "Todoist Blog", provider: "Todoist", duration: "Self-paced", url: "https://todoist.com/productivity-methods/" }
            ],
            mcqQuestions: [
                {
                    question: "What is the Pomodoro Technique?",
                    options: ["A cooking method", "A time management method", "A project management tool", "A programming language"],
                    correct: 1,
                    explanation: "The Pomodoro Technique is a time management method using 25-minute focused work intervals."
                }
            ]
        },
        {
            id: "negotiation",
            name: "Negotiation",
            description: "Negotiating deals and resolving conflicts",
            resources: [
                { type: "course", title: "Negotiation Skills", provider: "Harvard Law School", duration: "24 hours", url: "https://www.pon.harvard.edu/" },
                { type: "tutorial", title: "Negotiation Experts", provider: "Negotiation Experts", duration: "Self-paced", url: "https://www.negotiationexperts.com/" }
            ],
            mcqQuestions: [
                {
                    question: "What is win-win negotiation?",
                    options: ["One side wins", "Both sides benefit", "No one wins", "One side loses"],
                    correct: 1,
                    explanation: "Win-win negotiation aims for both parties to benefit from the agreement."
                }
            ]
        },
        {
            id: "creativity",
            name: "Creativity",
            description: "Creative thinking and innovation",
            resources: [
                { type: "course", title: "Creative Thinking", provider: "Coursera", duration: "16 hours", url: "https://www.coursera.org/learn/creative-thinking" },
                { type: "tutorial", title: "TED Talks", provider: "TED", duration: "Self-paced", url: "https://www.ted.com/" }
            ],
            mcqQuestions: [
                {
                    question: "What is brainstorming?",
                    options: ["Individual thinking", "Group idea generation", "Problem analysis", "Solution implementation"],
                    correct: 1,
                    explanation: "Brainstorming is a group technique for generating ideas and solutions."
                }
            ]
        },
        {
            id: "adaptability",
            name: "Adaptability",
            description: "Adapting to change and new situations",
            resources: [
                { type: "course", title: "Adaptability Skills", provider: "LinkedIn Learning", duration: "10 hours", url: "https://www.linkedin.com/learning/" },
                { type: "tutorial", title: "Psychology Today", provider: "Psychology Today", duration: "Self-paced", url: "https://www.psychologytoday.com/" }
            ],
            mcqQuestions: [
                {
                    question: "What is adaptability in the workplace?",
                    options: ["Resisting change", "Embracing change", "Ignoring change", "Avoiding change"],
                    correct: 1,
                    explanation: "Adaptability means embracing and adjusting to change effectively."
                }
            ]
        }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = skillsDatabase;
}

// Make available globally
window.skillsDatabase = skillsDatabase;
