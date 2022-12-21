import { CATEGORIES } from "../commons/courseCategories";

export const getColorForCategoryBanner = (category) => {
  let colorCode = '';

  switch (category) {
    case CATEGORIES.TECH_TOOLS:
      colorCode = '#EEEBD0';
      break;
    case CATEGORIES.ASSIGNMENT:
      colorCode = '#56CBF9';
      break;
    case CATEGORIES.AGRICULTURE:
      colorCode = '#FFFFFF';
      break;
    case CATEGORIES.PROGRAMMING:
      colorCode = '#ECA400';
      break;
    case CATEGORIES.IT:
      colorCode = '#EE2677';
      break;
    case CATEGORIES.MATHEMATICS:
      colorCode = '#5DB7DE';
      break;
    case CATEGORIES.CHEMISTRY:
      colorCode = '#F1E9DB';
      break;
    case CATEGORIES.BIOLOGY:
      colorCode = '#A39B8B';
      break;
    case CATEGORIES.COMPUTER_HARDWARE:
      colorCode = '#716A5C';
      break;
    case CATEGORIES.ARTIFICIAL_INTELLIGENCE:
      colorCode = '#FEEA00';
      break;
    case CATEGORIES.MUSIC:
      colorCode = '#FEFADC';
      break;
    case CATEGORIES.UI_UX:
      colorCode = '#F6D4BA';
      break;
    case CATEGORIES.BUSINESS:
      colorCode = '#F3B391';
      break;
    case CATEGORIES.CONTENT_CREATION:
      colorCode = '#D5E68D';
      break;
    case CATEGORIES.DEVOPS:
      colorCode = '#89FC00';
      break;
    default:
      colorCode = '#FFD25A';
      break;
  }
  return colorCode;
};
