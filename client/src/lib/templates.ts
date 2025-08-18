import { Template } from './hooks';

// These templates would normally come from the API
export const defaultTemplates: Template[] = [
  // Premium Templates - Featured first
  {
    id: 1,
    name: "Blue Leaves & Gold",
    category: "Premium",
    thumbnailUrl: "https://images.unsplash.com/photo-1688475747567-a06ecbb15053?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundUrl: "https://images.unsplash.com/photo-1688475747567-a06ecbb15053?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    name: "Indian Wedding Marigold",
    category: "Premium",
    thumbnailUrl: "https://images.unsplash.com/photo-1663181890734-9710eeb39853?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundUrl: "https://images.unsplash.com/photo-1663181890734-9710eeb39853?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  
  // Wedding Category
  {
    id: 3,
    name: "Elegant Wedding",
    category: "Wedding",
    thumbnailUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    name: "Royal Wedding",
    category: "Wedding",
    thumbnailUrl: "https://plus.unsplash.com/premium_photo-1681554599678-c7cdb0cfd8df?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundUrl: "https://plus.unsplash.com/premium_photo-1681554599678-c7cdb0cfd8df?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 5,
    name: "Garden Wedding",
    category: "Wedding",
    thumbnailUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 6,
    name: "Modern Wedding",
    category: "Wedding",
    thumbnailUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 7,
    name: "Rustic Wedding",
    category: "Wedding",
    thumbnailUrl: "https://images.unsplash.com/photo-1510076857177-7470076d4098?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1510076857177-7470076d4098?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 8,
    name: "Beach Wedding",
    category: "Wedding",
    thumbnailUrl: "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  
  // Birthday Category
  {
    id: 9,
    name: "Birthday Bash",
    category: "Birthday",
    thumbnailUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 10,
    name: "Kids Birthday",
    category: "Birthday",
    thumbnailUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 11,
    name: "Sweet 16",
    category: "Birthday",
    thumbnailUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 12,
    name: "Neon Birthday",
    category: "Birthday",
    thumbnailUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 13,
    name: "Adult Birthday",
    category: "Birthday",
    thumbnailUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  
  // Corporate Category
  {
    id: 14,
    name: "Corporate Event",
    category: "Corporate",
    thumbnailUrl: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 15,
    name: "Business Conference",
    category: "Corporate",
    thumbnailUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 16,
    name: "Product Launch",
    category: "Corporate",
    thumbnailUrl: "https://images.unsplash.com/photo-1550305080-4e029753abcf?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1550305080-4e029753abcf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 17,
    name: "Networking Event",
    category: "Corporate",
    thumbnailUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  
  // Party Category
  {
    id: 18,
    name: "Cocktail Party",
    category: "Party",
    thumbnailUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 19,
    name: "House Party",
    category: "Party",
    thumbnailUrl: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 20,
    name: "New Year Party",
    category: "Party",
    thumbnailUrl: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 21,
    name: "Graduation Party",
    category: "Party",
    thumbnailUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  
  // Anniversary Category 
  {
    id: 22,
    name: "Anniversary Special",
    category: "Anniversary",
    thumbnailUrl: "https://images.unsplash.com/photo-1549451371-64aa98a6f660?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1549451371-64aa98a6f660?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 23,
    name: "Golden Anniversary",
    category: "Anniversary",
    thumbnailUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 24,
    name: "Silver Anniversary",
    category: "Anniversary",
    thumbnailUrl: "https://images.unsplash.com/photo-1617201460038-6e5555a8a1f5?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundUrl: "https://images.unsplash.com/photo-1617201460038-6e5555a8a1f5?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  
  // Flower Framed Templates
  {
    id: 25,
    name: "Floral Frame - Pink",
    category: "Floral",
    thumbnailUrl: "https://plus.unsplash.com/premium_photo-1681400709202-89539492656d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RmxvcmFsJTIwRnJhbWUlMjAlMjAlMjBQaW5rfGVufDB8fDB8fHww",
    backgroundUrl: "https://plus.unsplash.com/premium_photo-1681400709202-89539492656d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RmxvcmFsJTIwRnJhbWUlMjAlMjAlMjBQaW5rfGVufDB8fDB8fHww"
  },
  {
    id: 26,
    name: "Floral Frame - Purple",
    category: "Floral",
    thumbnailUrl: "https://images.unsplash.com/photo-1582794543462-0d7922e50cf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1582794543462-0d7922e50cf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 27,
    name: "Floral Border - White",
    category: "Floral",
    thumbnailUrl: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 28,
    name: "Floral Border - Red",
    category: "Floral",
    thumbnailUrl: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 29,
    name: "Garden Frame - Green",
    category: "Floral",
    thumbnailUrl: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 30,
    name: "Floral Corner Frame",
    category: "Floral",
    thumbnailUrl: "https://images.unsplash.com/photo-1630300728268-90c227710a3f?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundUrl: "https://images.unsplash.com/photo-1630300728268-90c227710a3f?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];