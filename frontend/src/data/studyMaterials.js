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
              id: 16,
              title: "Chapter 1",
              driveLinks: [
                {
                  name: "PDF 1",
                  url: "https://drive.google.com/file/d/13hSTEK4C6zTeEjnQ8JztgBDzQp2Rp1yM/view?usp=drive_link"
                },
                {
                  name: "PDF 2",
                  url: "https://drive.google.com/file/d/170QWMr1KJsq4a95tfTmRp9579y3HmArj/view?usp=drive_link"
                }
              ],
              videoLinks: [
                {
                  name: "Lecture 4",
                  url: "https://www.youtube.com/live/0PUZMG4Ks6k?si=nn1qBVQVpCprCbMV"
                }
              ]
            },
            {
              id: 32,
              title: "Chapter 2",
              driveLinks: [],
              videoLinks: [
                {
                  name: "HM-47",
                  url: "https://www.youtube.com/live/CTuJ47Y_nrs?si=QNs6idWheFWrmxpE"
                },
                {
                  name: "HM-48",
                  url: "https://www.youtube.com/live/yn7UhWX1wdM?si=R_48AnkpSTLZca-s"
                }
              ]
            },
            {
              id: 17,
              title: "Chapter 3",
              driveLinks: [
                {
                  name: "PDF 1",
                  url: "https://drive.google.com/file/d/1ca4zL1v60R3aBU0j0xOXVWxGcf2If-Zc/view?usp=sharing"
                },
                {
                  name: "PDF 2",
                  url: "https://drive.google.com/file/d/1_pv1AxrO7gyog_yaQjd_LQzhEUIZEJij/view?usp=sharing"
                },
                {
                  name: "PDF 3",
                  url: "https://drive.google.com/file/d/1JMuK_XTVhVYk77GLClmQtDnBlMc4Ylt8/view?usp=sharing"
                },
                {
                  name: "PDF 4",
                  url: "https://drive.google.com/file/d/1LTFac_CQQuCNpda7_PotEFHLMckCAfYE/view?usp=sharing"
                }
              ],
              videoLinks: []
            },
            {
              id: 18,
              title: "Chapter 4",
              driveLinks: [
                {
                  name: "PDF 1",
                  url: "https://drive.google.com/file/d/1ZtWMvZ0_rOOiMZxgzNR88ZQtYlrMCxfH/view?usp=sharing"
                },
                {
                  name: "PDF 2",
                  url: "https://drive.google.com/file/d/1CaPVO8AnaaTbVHKo8R4qsDuMmdkNYfRa/view?usp=sharing"
                }
              ],
              videoLinks: []
            },
            {
              id: 19,
              title: "Chapter 7",
              driveLinks: [
                {
                  name: "PDF 1",
                  url: "https://drive.google.com/file/d/1PL_fjQvC4edl5QeGgbFOm8uax4gQx8rA/view?usp=sharing"
                },
                {
                  name: "PDF 2",
                  url: "https://drive.google.com/file/d/1wMm7NJbY6blKYkSVWN_Mq8YGzBcsNAq9/view?usp=sharing"
                },
                {
                  name: "PDF 3",
                  url: "https://drive.google.com/file/d/16uqSrXQV0QNfLaJdTKT0hA1elm8HuYod/view?usp=sharing"
                },
                {
                  name: "PDF 4",
                  url: "https://drive.google.com/file/d/1Wug7H-ybBuT1Okbu5m4erZTGwI7hjW8V/view?usp=sharing"
                },
                {
                  name: "PDF 5",
                  url: "https://drive.google.com/file/d/1oHduHfYfGBqIonIVeieysK8Yb1RMAIPs/view?usp=sharing"
                },
                {
                  name: "PDF 6",
                  url: "https://drive.google.com/file/d/1W6yfmhJI2yuw-m3tBGFa3oRZ48zyxfCX/view?usp=sharing"
                }
              ],
              videoLinks: []
            },
            {
              id: 20,
              title: "Chapter 9",
              driveLinks: [
                {
                  name: "PDF 1",
                  url: "https://drive.google.com/file/d/1u18LNbiZY5sX4rcB5V6AbJFxPfPKEADD/view?usp=sharing"
                },
                {
                  name: "PDF 2",
                  url: "https://drive.google.com/file/d/1Q3cto4a4xbaHA58heG4IhTDhKx9Nma5Y/view?usp=sharing"
                },
                {
                  name: "PDF 3",
                  url: "https://drive.google.com/file/d/1uOzNvvImDjGvBwX0_AdDDDMi1SIt35a2/view?usp=sharing"
                },
                {
                  name: "PDF 4",
                  url: "https://drive.google.com/file/d/1wgSseudnzM_aUTCT6ZDtxeDI51XgvQTc/view?usp=sharing"
                }
              ],
              videoLinks: []
            },
            {
              id: 21,
              title: "Chapter 10",
              driveLinks: [
                {
                  name: "PDF 1",
                  url: "https://drive.google.com/file/d/1eQgZUp0RRyAOxuVWNRDMXpuJ2aduMMBR/view?usp=sharing"
                },
                {
                  name: "PDF 2",
                  url: "https://drive.google.com/file/d/1xaO93KI_oSDwgTXAxGnJLZEBUHiygSHh/view?usp=sharing"
                },
                {
                  name: "PDF 3",
                  url: "https://drive.google.com/file/d/1RYjTNs6E6cGNiOQDUangYsJzPf8tBJJn/view?usp=sharing"
                },
                {
                  name: "PDF 4",
                  url: "https://drive.google.com/file/d/1wt6IymqHSNsq5eRTcV-KXhnhadlZfFTz/view?usp=sharing"
                }
              ],
              videoLinks: []
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
                  name: "ICT Chapter 3 Video 1",
                  url: "https://archive.org/details/utkorsho-hsc-24-fpb-2024-hsc-2024-fpc-ict-03-room-1-start-01-20",
                  type: "archive"
                },
                {
                  name: "ICT Chapter 3 Video 2",
                  url: "https://archive.org/details/utkorsho-hsc-24-fpb-2024-hsc-2024-fpc-ict-03-room-1-start-01-20",
                  type: "archive"
                },
                {
                  name: "ICT Chapter 3 Video 3",
                  url: "https://archive.org/details/utkorsho-hsc-24-fpb-2024-hsc-2024-fpc-ict-03-room-1-start-01-20",
                  type: "archive"
                },
                {
                  name: "ICT Chapter 3 Video 4",
                  url: "https://archive.org/details/utkorsho-hsc-24-fpb-2024-hsc-2024-fpc-ict-03-room-1-start-01-20",
                  type: "archive"
                },
                {
                  name: "ICT Chapter 3 Video 5",
                  url: "https://archive.org/details/utkorsho-hsc-24-fpb-2024-hsc-2024-fpc-ict-03-room-1-start-01-20",
                  type: "archive"
                },
                {
                  name: "ICT Chapter 3 Video 6",
                  url: "https://archive.org/details/utkorsho-hsc-24-fpb-2024-hsc-2024-fpc-ict-03-room-1-start-01-20",
                  type: "archive"
                },
                {
                  name: "ICT Chapter 3 Video 7",
                  url: "https://archive.org/details/utkorsho-hsc-24-fpb-2024-hsc-2024-fpc-ict-03-room-1-start-01-20",
                  type: "archive"
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
    },
    {
      id: 5,
      name: "Bangla",
      fullName: "HSC Bangla",
      icon: "BookOpen",
      papers: [
        {
          id: 8,
          name: "1st Paper",
          chapters: [
            {
              id: 22,
              title: "সাহিত্য",
              driveLinks: [
                {
                  name: "অপরিচিতা ও সোনার তরী",
                  url: "https://raw.githubusercontent.com/shaitools891-svg/matherror/main/bangla%201st%201.pdf"
                },
                {
                  name: "আমার পথ ও বিদ্রোহী",
                  url: "https://raw.githubusercontent.com/shaitools891-svg/matherror/main/bangla%20-2.pdf"
                },
                {
                  name: "মানব কল্যাণ ও আঠারো বছর বয়স",
                  url: "https://raw.githubusercontent.com/shaitools891-svg/matherror/main/bangla%20-4%20.pdf"
                },
                {
                  name: "বায়ান্নর দিনগুলো",
                  url: "https://raw.githubusercontent.com/shaitools891-svg/matherror/main/bangla%20-5.pdf"
                }
              ],
              videoLinks: []
            }
          ]
        },
        {
          id: 9,
          name: "2nd Paper",
          chapters: [
            {
              id: 23,
              title: "উচ্চারণের নিয়ম ও প্রতিবেদন লিখন",
              driveLinks: [
                {
                  name: "উচ্চারণের নিয়ম ও প্রতিবেদন লিখন",
                  url: "https://raw.githubusercontent.com/shaitools891-svg/matherror/main/bangla%20-6.pdf"
                },
                {
                  name: "বাংলা বানানের নিয়ম, আবেদনপত্র ও ইমেইল",
                  url: "https://raw.githubusercontent.com/shaitools891-svg/matherror/main/bangla%20-7.pdf"
                }
              ],
              videoLinks: []
            }
          ]
        }
      ]
    },
    {
      id: 6,
      name: "English",
      fullName: "HSC English",
      icon: "Languages",
      papers: [
        {
          id: 10,
          name: "1st Paper",
          chapters: [
            {
              id: 24,
              title: "Chapter 1",
              driveLinks: [],
              videoLinks: [
                {
                  name: "Unit 1 Lesson 1,2",
                  url: "https://www.youtube.com/live/PgJIpUjtVZA?si=Z62wbPNxTzr8ekPT"
                }
              ]
            }
          ]
        },
        {
          id: 11,
          name: "2nd Paper",
          chapters: [
            {
              id: 25,
              title: "Chapter 1",
              driveLinks: [],
              videoLinks: []
            }
          ]
        }
      ]
    },
    {
      id: 7,
      name: "Biology",
      fullName: "HSC Biology",
      icon: "Dna",
      papers: [
        {
          id: 12,
          name: "1st Paper",
          chapters: [
            {
              id: 26,
              title: "Cell Biology",
              driveLinks: [],
              videoLinks: []
            },
            {
              id: 27,
              title: "Genetics",
              driveLinks: [],
              videoLinks: []
            },
            {
              id: 28,
              title: "Molecular Biology",
              driveLinks: [],
              videoLinks: []
            }
          ]
        },
        {
          id: 13,
          name: "2nd Paper",
          chapters: [
            {
              id: 29,
              title: "Ecology",
              driveLinks: [],
              videoLinks: []
            },
            {
              id: 30,
              title: "Evolution",
              driveLinks: [],
              videoLinks: []
            },
            {
              id: 31,
              title: "Human Physiology",
              driveLinks: [],
              videoLinks: []
            }
          ]
        }
      ]
    }
  ]
};
