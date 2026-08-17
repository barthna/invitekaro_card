import { Template } from './hooks';

export const defaultTemplates: Template[] = [
  {
    id: 1,
    name: "Blue Leaves & Gold",
    category: "Premium",
    thumbnailUrl: "https://images.unsplash.com/photo-1688475747567-a06ecbb15053?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundUrl: "https://images.unsplash.com/photo-1688475747567-a06ecbb15053?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cardStyle: {
      borderStyle: 'gold',
      fontFamilyTitle: 'Cinzel',
      fontFamilyBody: 'Montserrat',
      fontColor: '#F5E6C8',
      overlayOpacity: 0.45,
      dividerStyle: 'leaf'
    }
  },
  {
    id: 2,
    name: "Indian Wedding Marigold",
    category: "Premium",
    thumbnailUrl: "https://images.unsplash.com/photo-1663181890734-9710eeb39853?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundUrl: "https://images.unsplash.com/photo-1663181890734-9710eeb39853?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cardStyle: {
      borderStyle: 'royal',
      fontFamilyTitle: 'Playfair Display',
      fontFamilyBody: 'Montserrat',
      fontColor: '#FFF8E7',
      overlayOpacity: 0.5,
      dividerStyle: 'star'
    }
  },
  {
    id: 3,
    name: "Elegant Wedding",
    category: "Wedding",
    thumbnailUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    cardStyle: {
      borderStyle: 'floral',
      fontFamilyTitle: 'Great Vibes',
      fontFamilyBody: 'Montserrat',
      fontColor: '#FFFFFF',
      overlayOpacity: 0.35,
      dividerStyle: 'leaf'
    }
  },
  {
    id: 4,
    name: "Royal Wedding",
    category: "Wedding",
    thumbnailUrl: "https://plus.unsplash.com/premium_photo-1681554599678-c7cdb0cfd8df?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundUrl: "https://plus.unsplash.com/premium_photo-1681554599678-c7cdb0cfd8df?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cardStyle: {
      borderStyle: 'royal',
      fontFamilyTitle: 'Cinzel',
      fontFamilyBody: 'Playfair Display',
      fontColor: '#FFD700',
      overlayOpacity: 0.6,
      dividerStyle: 'star'
    }
  },
  {
    id: 5,
    name: "Garden Wedding",
    category: "Wedding",
    thumbnailUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    cardStyle: {
      borderStyle: 'floral',
      fontFamilyTitle: 'Playfair Display',
      fontFamilyBody: 'Montserrat',
      fontColor: '#FFFFFF',
      overlayOpacity: 0.4,
      dividerStyle: 'leaf'
    }
  },
  {
    id: 9,
    name: "Birthday Bash",
    category: "Birthday",
    thumbnailUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    cardStyle: {
      borderStyle: 'minimal',
      fontFamilyTitle: 'Montserrat',
      fontFamilyBody: 'Montserrat',
      fontColor: '#FFFFFF',
      overlayOpacity: 0.5,
      dividerStyle: 'line'
    }
  },
  {
    id: 10,
    name: "Kids Birthday",
    category: "Birthday",
    thumbnailUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    cardStyle: {
      borderStyle: 'none',
      fontFamilyTitle: 'Montserrat',
      fontFamilyBody: 'Montserrat',
      fontColor: '#FFEAA7',
      overlayOpacity: 0.3,
      dividerStyle: 'none'
    }
  },
  {
    id: 25,
    name: "Floral Frame - Pink",
    category: "Floral",
    thumbnailUrl: "https://plus.unsplash.com/premium_photo-1681400709202-89539492656d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RmxvcmFsJTIwRnJhbWUlMjAlMjAlMjBQaW5rfGVufDB8fDB8fHww",
    backgroundUrl: "https://plus.unsplash.com/premium_photo-1681400709202-89539492656d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RmxvcmFsJTIwRnJhbWUlMjAlMjAlMjBQaW5rfGVufDB8fDB8fHww",
    cardStyle: {
      borderStyle: 'floral',
      fontFamilyTitle: 'Great Vibes',
      fontFamilyBody: 'Playfair Display',
      fontColor: '#4A2E2B',
      overlayOpacity: 0.2,
      dividerStyle: 'leaf'
    }
  },
  {
    id: 26,
    name: "Floral Frame - Purple",
    category: "Floral",
    thumbnailUrl: "https://images.unsplash.com/photo-1582794543462-0d7922e50cf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    backgroundUrl: "https://images.unsplash.com/photo-1582794543462-0d7922e50cf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    cardStyle: {
      borderStyle: 'floral',
      fontFamilyTitle: 'Playfair Display',
      fontFamilyBody: 'Montserrat',
      fontColor: '#E6E6FA',
      overlayOpacity: 0.3,
      dividerStyle: 'leaf'
    }
  }
];