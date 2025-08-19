// Mock data for Math ERROR coaching center
export const mockData = {
  siteInfo: {
    name: "Math ERROR",
    tagline: "Study Materials – Updated Regularly",
    description: "HSC 26 preparation materials for HSC 26"
  },
  
  subjects: [
    {
      id: "ict",
      name: "ICT",
      fullName: "Information and Communication Technology",
      icon: "Monitor",
      chapters: [
        { id: 1, title: "Chapter 1", driveLink: "", videoLink: "" },
        { id: 2, title: "Chapter 2", driveLink: "", videoLink: "" },
        { id: 3, title: "Chapter 3", driveLink: "", videoLink: "" },
        { id: 4, title: "Chapter 4", driveLink: "", videoLink: "" },
        { id: 5, title: "Chapter 5", driveLink: "", videoLink: "" },
        { id: 6, title: "Chapter 6", driveLink: "", videoLink: "" }
      ]
    },
    {
      id: "chemistry-1st",
      name: "Chemistry 1st Paper",
      fullName: "Chemistry First Paper",
      icon: "Atom",
      chapters: [
        { id: 1, title: "Chapter 1", driveLink: "", videoLink: "" },
        { id: 2, title: "Chapter 2", driveLink: "", videoLink: "" },
        { id: 3, title: "Chapter 3", driveLink: "", videoLink: "" },
        { id: 4, title: "Chapter 4", driveLink: "", videoLink: "" },
        { id: 5, title: "Chapter 5", driveLink: "", videoLink: "" }
      ]
    },
    {
      id: "chemistry-2nd",
      name: "Chemistry 2nd Paper",
      fullName: "Chemistry Second Paper",
      icon: "FlaskConical",
      chapters: [
        { id: 1, title: "Chapter 1", driveLink: "", videoLink: "" },
        { id: 2, title: "Chapter 2", driveLink: "", videoLink: "" },
        { id: 3, title: "Chapter 3", driveLink: "", videoLink: "" },
        { id: 4, title: "Chapter 4", driveLink: "", videoLink: "" }
      ]
    }
  ],

  colorThemes: [
    {
      id: "golden",
      name: "Golden",
      primary: "#D4AF37",
      secondary: "#FFF8DC",
      accent: "#B8860B",
      background: "#FFFFFF",
      text: "#2C2C2C"
    },
    {
      id: "ocean",
      name: "Ocean",
      primary: "#0EA5E9",
      secondary: "#E0F2FE", 
      accent: "#0284C7",
      background: "#FFFFFF",
      text: "#1E293B"
    },
    {
      id: "forest",
      name: "Forest",
      primary: "#059669",
      secondary: "#ECFDF5",
      accent: "#047857",
      background: "#FFFFFF", 
      text: "#1F2937"
    },
    {
      id: "sunset",
      name: "Sunset",
      primary: "#EA580C",
      secondary: "#FFF7ED",
      accent: "#C2410C",
      background: "#FFFFFF",
      text: "#1C1917"
    }
  ]
};
