export const farms = [
  {
    id: 1,
    name: "Miller's Family Farm",
    description: "Three generations of sustainable farming practices, specializing in heirloom vegetables and fruits. Our commitment to organic farming ensures the highest quality produce for our customers.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80",
    location: "Vermont, USA",
    distance: 15.2,
    specialty: "Heirloom Vegetables",
    rating: "4.9",
    certifications: ["organic", "sustainable"],
    sustainablePractices: [
      {
        title: "Water Conservation",
        description: "Drip irrigation systems and rainwater harvesting"
      },
      {
        title: "Soil Health",
        description: "Cover cropping and crop rotation"
      },
      {
        title: "Renewable Energy",
        description: "100% solar-powered farm operations"
      }
    ]
  },
  {
    id: 2,
    name: "Green Valley Organics",
    description: "Certified organic farm focusing on regenerative agriculture and biodiversity. We grow a wide variety of seasonal vegetables and fruits using traditional farming methods.",
    image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&q=80",
    location: "California, USA",
    distance: 8.7,
    specialty: "Organic Produce",
    rating: "4.8",
    certifications: ["organic", "local"],
    sustainablePractices: [
      {
        title: "Biodiversity",
        description: "Native plant corridors and beneficial insect habitats"
      },
      {
        title: "Zero Waste",
        description: "Composting and minimal packaging"
      }
    ]
  },
  // Add more farms...
];