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
              title: "Chapter 1",
              driveLinks: [
                {
                  name: "PDF 1",
                  url: "https://drive.google.com/file/d/1N_3IVjVlyUL79WzEjz2druqtEnhGnn_5/view?usp=drive_link"
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
              title: "Chapter 2",
              driveLinks: [
                {
                  name: "PDF 1",
                  url: "https://drive.google.com/file/d/11BBR0MGIg5BHVvfIws440tnYjqlKF9YS/view?usp=drive_link"
                },
                {
                  name: "PDF 2",
                  url: "https://drive.google.com/file/d/10Fkg1accBOu8hT7-5jeHcRkWp7KHRUvs/view?usp=drive_link"
                }
              ],
              videoLinks: [
                {
                  name: "Database Tutorial",
                  url: "https://youtube.com/your-link-here"
                }
              ]
            },
            {
              id: 13,
              title: "Chapter 3",
              driveLinks: [
                {
                  name: "PDF 1",
                  url: "https://drive.google.com/file/d/1TH5zYb46KB-ShqJrUxx_ErJACvpHdKCi/view?usp=drive_link"
                },
                {
                  name: "PDF 2",
                  url: "https://drive.google.com/file/d/1w3TnKe9Z0Mh1l_5pujFulyY_K3HXRePP/view?usp=drive_link"
                },
                {
                  name: "PDF 3",
                  url: "https://drive.google.com/file/d/1G9GBj8eiCIw50UVCrwJFWv4E7hH-FyXR/view?usp=drive_link"
                },
                {
                  name: "PDF 4",
                  url: "https://drive.google.com/file/d/1RDTTG5WXVbpYrE8dvNTsSCzXbotrDx3j/view?usp=drive_link"
                },
                {
                  name: "PDF 5",
                  url: "https://drive.google.com/file/d/1nbwW4PuoTXd0vJ1Mpo2gKy3FsVDPjRxs/view?usp=drive_link"
                },
                {
                  name: "PDF 6",
                  url: "https://drive.google.com/file/d/1qa2_l7Zjo7tf5baT39ySKHRZIRcSM8aq/view?usp=drive_link"
                },
                {
                  name: "PDF 7",
                  url: "https://drive.google.com/file/d/16woBEBIKK9qy2P0UlQAKHHgNr3yd4-j1/view?usp=drive_link"
                }
              ],
              videoLinks: [
                {
                  name: "Database Tutorial",
                  url: "https://youtube.com/your-link-here"
                }
              ]
            },
            {
              id: 14,
              title: "Chapter 4",
              driveLinks: [
                {
                  name: "PDF 1",
                  url: "https://drive.google.com/file/d/1hpUDxh1Eq6x0nyTF0cZxwzySR0SqvDOU/view?usp=drive_link"
                },
                {
                  name: "PDF 2",
                  url: "https://drive.google.com/file/d/1M7JOAZq9LA0_vMM0qe6wz9LX6TmTXuMk/view?usp=drive_link"
                },
                {
                  name: "PDF 3",
                  url: "https://drive.google.com/file/d/1hT8VtqUYKtZg5WbuQ0ouS7kOFh4ogz5v/view?usp=drive_link"
                }
              ],
              videoLinks: []
            },
            {
              id: 15,
              title: "Chapter 5",
              driveLinks: [
                {
                  name: "PDF 1",
                  url: "https://drive.google.com/file/d/1gJ6UUepKASHvQ3DEyPDLyhNWEq0J4pdx/view?usp=drive_link"
                },
                {
                  name: "PDF 2",
                  url: "https://drive.google.com/file/d/1fckg9CqL7aPUaD5KcVCcqqaG4Te9uqr6/view?usp=drive_link"
                },
                {
                  name: "PDF 3",
                  url: "https://drive.google.com/file/d/1AEntVr17mT-jQMu30ynofTdVkfOqBk-z/view?usp=drive_link"
                },
                {
                  name: "PDF 4",
                  url: "https://drive.google.com/file/d/1xZ1d8W1kVMEkBHUsVthkGrBGk1tx23DM/view?usp=drive_link"
                }
              ],
              videoLinks: []
            }
          ]
        }
      ]
    }
  ]
};
