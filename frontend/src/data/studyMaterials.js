// src/data/studyMaterials.js
export const studyMaterialsData = {
  subjects: [
    {
      id: 1,
      name: "Physics",
      fullName: "HSC Physics",
      icon: "Atom",
      papers: [
        {
          id: 1,
          name: "1st Paper",
          chapters: [
            {
              id: 1,
              title: "Mechanics",
              driveLinks: [
                {
                  name: "Chapter 1 - Motion",
                  url: "https://drive.google.com/your-link-here"
                },
                {
                  name: "Chapter 2 - Forces", 
                  url: "https://drive.google.com/your-link-here"
                }
              ],
              videoLinks: [
                {
                  name: "Motion Basics",
                  url: "https://youtube.com/your-link-here"
                }
              ]
            },
            {
              id: 2,
              title: "Thermodynamics",
              driveLinks: [
                {
                  name: "Heat and Temperature",
                  url: "https://drive.google.com/your-link-here"
                }
              ],
              videoLinks: [
                {
                  name: "Thermodynamics Explained",
                  url: "https://youtube.com/your-link-here"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          name: "2nd Paper",
          chapters: [
            {
              id: 3,
              title: "Waves and Optics",
              driveLinks: [
                {
                  name: "Wave Properties",
                  url: "https://drive.google.com/your-link-here"
                }
              ],
              videoLinks: [
                {
                  name: "Optics Fundamentals",
                  url: "https://youtube.com/your-link-here"
                }
              ]
            },
            {
              id: 4,
              title: "Modern Physics",
              driveLinks: [],
              videoLinks: []
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Chemistry",
      fullName: "HSC Chemistry",
      icon: "FlaskConical",
      papers: [
        {
          id: 3,
          name: "1st Paper",
          chapters: [
            {
              id: 5,
              title: "Organic Chemistry",
              driveLinks: [
                {
                  name: "Organic Compounds",
                  url: "https://drive.google.com/your-link-here"
                }
              ],
              videoLinks: [
                {
                  name: "Organic Chemistry Basics",
                  url: "https://youtube.com/your-link-here"
                }
              ]
            }
          ]
        },
        {
          id: 4,
          name: "2nd Paper",
          chapters: [
            {
              id: 6,
              title: "Inorganic Chemistry",
              driveLinks: [
                {
                  name: "Periodic Table",
                  url: "https://drive.google.com/your-link-here"
                }
              ],
              videoLinks: []
            },
            {
              id: 7,
              title: "Physical Chemistry",
              driveLinks: [],
              videoLinks: [
                {
                  name: "Chemical Kinetics",
                  url: "https://youtube.com/your-link-here"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Mathematics",
      fullName: "HSC Mathematics",
      icon: "Monitor",
      papers: [
        {
          id: 5,
          name: "1st Paper",
          chapters: [
            {
              id: 8,
              title: "Calculus",
              driveLinks: [
                {
                  name: "Differentiation",
                  url: "https://drive.google.com/your-link-here"
                },
                {
                  name: "Integration",
                  url: "https://drive.google.com/your-link-here"
                }
              ],
              videoLinks: [
                {
                  name: "Calculus Fundamentals",
                  url: "https://youtube.com/your-link-here"
                }
              ]
            }
          ]
        },
        {
          id: 6,
          name: "2nd Paper",
          chapters: [
            {
              id: 9,
              title: "Algebra",
              driveLinks: [
                {
                  name: "Linear Equations",
                  url: "https://drive.google.com/your-link-here"
                }
              ],
              videoLinks: [
                {
                  name: "Algebraic Methods",
                  url: "https://youtube.com/your-link-here"
                }
              ]
            },
            {
              id: 10,
              title: "Geometry",
              driveLinks: [],
              videoLinks: []
            }
          ]
        }
      ]
    },
    {
      id: 4,
      name: "ICT",
      fullName: "Information and Communication Technology",
      icon: "Calculator",
      papers: [
        {
          id: 7,
          name: "Full Syllabus",
          chapters: [
            {
              id: 11,
              title: "Programming",
              driveLinks: [
                {
                  name: "Python Basics",
                  url: "https://drive.google.com/your-link-here"
                }
              ],
              videoLinks: [
                {
                  name: "Programming Concepts",
                  url: "https://youtube.com/your-link-here"
                }
              ]
            },
            {
              id: 12,
              title: "Database",
              driveLinks: [
                {
                  name: "SQL Notes",
                  url: "https://drive.google.com/your-link-here"
                }
              ],
              videoLinks: [
                {
                  name: "Database Tutorial",
                  url: "https://youtube.com/your-link-here"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
